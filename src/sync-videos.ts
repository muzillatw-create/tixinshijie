/**
 * Sync video records from the dev environment to production.
 *
 * Dev and production use separate databases, so content added via the dev
 * admin API does not automatically appear in production. This script compares
 * videos by category between the two environments and inserts any missing
 * ones into production via the admin API.
 *
 * Usage:
 *   ADMIN_KEY=xxxx PROD_URL=https://xn--rhqt44buwpwnv.com DEV_URL=http://localhost:80 \
 *     pnpm --filter @workspace/scripts run sync-videos -- happiness
 */

type Video = {
  id: number;
  youtubeUrl: string;
  title: string;
  description: string | null;
  published: boolean;
  category: string;
};

async function fetchVideos(baseUrl: string, category: string): Promise<Video[]> {
  const res = await fetch(`${baseUrl}/api/videos?category=${encodeURIComponent(category)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch videos from ${baseUrl}: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as Video[];
}

async function addVideo(baseUrl: string, adminKey: string, video: Pick<Video, "youtubeUrl" | "title" | "description" | "published" | "category">): Promise<Video> {
  const res = await fetch(`${baseUrl}/api/admin/videos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: adminKey, ...video }),
  });
  if (!res.ok) {
    throw new Error(`Failed to add video "${video.title}" to ${baseUrl}: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as Video;
}

async function main() {
  const category = process.argv[2];
  if (!category) {
    console.error("Usage: sync-videos <category>");
    process.exit(1);
  }

  const devUrl = process.env.DEV_URL ?? "http://localhost:80";
  const prodUrl = process.env.PROD_URL ?? "https://xn--rhqt44buwpwnv.com";
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) {
    console.error("ADMIN_KEY env var is required to write to production.");
    process.exit(1);
  }

  const [devVideos, prodVideos] = await Promise.all([
    fetchVideos(devUrl, category),
    fetchVideos(prodUrl, category),
  ]);

  const prodUrls = new Set(prodVideos.map((v) => v.youtubeUrl));
  const missing = devVideos.filter((v) => !prodUrls.has(v.youtubeUrl));

  if (missing.length === 0) {
    console.log(`Production already has all ${devVideos.length} "${category}" videos. Nothing to sync.`);
    return;
  }

  console.log(`Found ${missing.length} video(s) missing from production:`);
  for (const v of missing) {
    console.log(`  - ${v.title} (${v.youtubeUrl})`);
  }

  for (const v of missing) {
    const created = await addVideo(prodUrl, adminKey, {
      youtubeUrl: v.youtubeUrl,
      title: v.title,
      description: v.description,
      published: v.published,
      category: v.category,
    });
    console.log(`Added to production: ${created.title} (id ${created.id})`);
  }

  console.log("Sync complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
