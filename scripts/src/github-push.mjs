/**
 * Push project source files to GitHub via the Git Data API + Replit connectors proxy.
 * Uses concurrent blob uploads for speed.
 */
import { ReplitConnectors } from "@replit/connectors-sdk";
import { readFileSync, readdirSync, statSync } from "fs";
import path from "path";

const connectors = new ReplitConnectors();
const OWNER = "muzillatw-create";
const REPO = "tixinshijie";
const CONCURRENCY = 8;
// Skip files larger than 2MB (GitHub API has a 100MB file limit but large files are slow)
const MAX_SIZE = 2 * 1024 * 1024;

async function ghApi(endpoint, options = {}) {
  const response = await connectors.proxy("github", endpoint, options);
  let data;
  try { data = await response.json(); } catch { data = {}; }
  if (!response.ok) {
    throw new Error(`GH ${response.status} on ${endpoint}: ${JSON.stringify(data).substring(0, 100)}`);
  }
  return data;
}

const IGNORE_DIRS = new Set([
  ".git", "node_modules", ".local", ".agents", "dist", ".cache", "attached_assets",
]);
const IGNORE_PATTERNS = [
  /\.tsbuildinfo$/,
  /artifacts\/mockup-sandbox\//,
  /pnpm-lock\.yaml$/,
  /\/\.replit-artifact\//,
  /\.mp4$/,
  /\.mov$/,
  /\.webm$/,
];

function getFiles(root) {
  const files = [];
  function walk(dir) {
    for (const name of readdirSync(dir)) {
      if (IGNORE_DIRS.has(name)) continue;
      const full = path.join(dir, name);
      const rel = path.relative(root, full);
      if (IGNORE_PATTERNS.some((p) => p.test(rel))) continue;
      const stat = statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else {
        if (stat.size > MAX_SIZE) {
          console.log(`  Skipping large (${(stat.size/1024/1024).toFixed(1)}MB): ${rel}`);
          continue;
        }
        files.push({ full, rel });
      }
    }
  }
  walk(root);
  return files;
}

async function createBlob(content, encoding) {
  return ghApi(`/repos/${OWNER}/${REPO}/git/blobs`, {
    method: "POST",
    body: JSON.stringify({ content, encoding }),
    headers: { "Content-Type": "application/json" },
  });
}

async function processFile({ full, rel }) {
  try {
    const raw = readFileSync(full);
    const blob = await createBlob(raw.toString("base64"), "base64");
    return { path: rel, mode: "100644", type: "blob", sha: blob.sha };
  } catch (err) {
    console.warn(`  Skip ${rel}: ${err.message.substring(0, 60)}`);
    return null;
  }
}

async function runConcurrent(items, fn, concurrency) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const item = items[i++];
      results.push(await fn(item));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results.filter(Boolean);
}

async function main() {
  const root = process.cwd();
  const files = getFiles(root);
  console.log(`Found ${files.length} files to push (concurrent=${CONCURRENCY})`);

  // Upload blobs concurrently
  let done = 0;
  const treeItems = await runConcurrent(files, async (f) => {
    const result = await processFile(f);
    done++;
    if (done % 20 === 0) console.log(`  ${done}/${files.length} processed`);
    return result;
  }, CONCURRENCY);

  console.log(`\nCreated ${treeItems.length} blobs. Building tree...`);

  // Get base commit
  const refData = await ghApi(`/repos/${OWNER}/${REPO}/git/ref/heads/main`);
  const baseCommitSha = refData.object.sha;
  const baseCommit = await ghApi(`/repos/${OWNER}/${REPO}/git/commits/${baseCommitSha}`);
  const baseTreeSha = baseCommit.tree.sha;

  // Create tree
  const tree = await ghApi(`/repos/${OWNER}/${REPO}/git/trees`, {
    method: "POST",
    body: JSON.stringify({ tree: treeItems, base_tree: baseTreeSha }),
    headers: { "Content-Type": "application/json" },
  });
  console.log("Tree SHA:", tree.sha);

  // Create commit
  const commit = await ghApi(`/repos/${OWNER}/${REPO}/git/commits`, {
    method: "POST",
    body: JSON.stringify({
      message: "backup: 貼心世界 project — full source backup from Replit",
      tree: tree.sha,
      parents: [baseCommitSha],
      author: { name: "Replit Agent", email: "noreply@replit.com", date: new Date().toISOString() },
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log("Commit SHA:", commit.sha);

  // Update main branch
  await ghApi(`/repos/${OWNER}/${REPO}/git/refs/heads/main`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha, force: true }),
    headers: { "Content-Type": "application/json" },
  });

  console.log(`\n✓ Done! https://github.com/${OWNER}/${REPO}`);
}

main().catch((err) => { console.error("Push failed:", err.message); process.exit(1); });
