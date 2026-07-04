import { Router, type IRouter } from "express";
import { eq, and, desc } from "drizzle-orm";
import { db, articlesTable } from "@workspace/db";

const router: IRouter = Router();

const ADMIN_KEY = process.env.ADMIN_KEY ?? "admin2026";

function computeSimilarity(a: string, b: string): number {
  const getBigrams = (str: string): Set<string> => {
    const bigrams = new Set<string>();
    for (let i = 0; i < str.length - 1; i++) {
      bigrams.add(str.slice(i, i + 2));
    }
    return bigrams;
  };
  const bigramsA = getBigrams(a);
  const bigramsB = getBigrams(b);
  if (bigramsA.size === 0 && bigramsB.size === 0) return 1;
  if (bigramsA.size === 0 || bigramsB.size === 0) return 0;
  let intersection = 0;
  for (const bg of bigramsA) {
    if (bigramsB.has(bg)) intersection++;
  }
  return (2 * intersection) / (bigramsA.size + bigramsB.size);
}

function formatArticle(a: typeof articlesTable.$inferSelect) {
  return {
    ...a,
    createdAt: a.createdAt.toISOString(),
  };
}

// GET /api/articles?category=eat
// 公開端點：列出已發布文章，可依分類篩選
router.get("/articles", async (req, res): Promise<void> => {
  const { category } = req.query;

  let rows;
  if (category && typeof category === "string") {
    rows = await db
      .select()
      .from(articlesTable)
      .where(and(eq(articlesTable.published, true), eq(articlesTable.category, category)))
      .orderBy(desc(articlesTable.createdAt));
  } else {
    rows = await db
      .select()
      .from(articlesTable)
      .where(eq(articlesTable.published, true))
      .orderBy(desc(articlesTable.createdAt));
  }

  res.json(rows.map(formatArticle));
});

// POST /api/admin/articles  body: { key, category, title, date, heroImage, summary, content, images[], force? }
router.post("/admin/articles", async (req, res): Promise<void> => {
  const { key, category, title, date, heroImage, summary, content, images, published, force } = req.body as {
    key?: string;
    category?: string;
    title?: string;
    date?: string;
    heroImage?: string;
    summary?: string;
    content?: string;
    images?: string[];
    published?: boolean;
    force?: boolean;
  };

  if (key !== ADMIN_KEY) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  if (!category || !title || !date || heroImage === undefined || heroImage === null || !summary || !content) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const allArticles = await db.select().from(articlesTable);

  // 1. 完全相同標題 → 直接拒絕（force 也不例外）
  const titleMatch = allArticles.find(a => a.title === title);
  if (titleMatch) {
    res.status(409).json({ error: "DUPLICATE_TITLE", message: "文章標題已存在" });
    return;
  }

  // 2. 內容相似度 ≥ 70% → 警告，除非 force=true
  if (!force) {
    for (const article of allArticles) {
      const similarity = computeSimilarity(content, article.content);
      if (similarity >= 0.7) {
        res.status(409).json({
          error: "SIMILAR_CONTENT",
          message: `此文章與「${article.title}」內容相似度達 ${Math.round(similarity * 100)}%，可能是重複文章`,
          similarArticle: { id: article.id, title: article.title, similarity: Math.round(similarity * 100) },
        });
        return;
      }
    }
  }

  const [article] = await db
    .insert(articlesTable)
    .values({
      category,
      title,
      date,
      heroImage,
      summary,
      content,
      images: images ?? [],
      published: published !== false,
    })
    .returning();

  req.log.info({ articleId: article.id }, "Article created");
  res.status(201).json(formatArticle(article));
});

// PATCH /api/admin/articles/:id?key=xxx  body: partial article fields
router.patch("/admin/articles/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id as string, 10);
  const key = req.query.key;

  if (key !== ADMIN_KEY) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const { category, title, date, heroImage, summary, content, images, published } = req.body as Partial<{
    category: string;
    title: string;
    date: string;
    heroImage: string;
    summary: string;
    content: string;
    images: string[];
    published: boolean;
  }>;

  const updates: Record<string, unknown> = {};
  if (category !== undefined) updates.category = category;
  if (title !== undefined) updates.title = title;
  if (date !== undefined) updates.date = date;
  if (heroImage !== undefined) updates.heroImage = heroImage;
  if (summary !== undefined) updates.summary = summary;
  if (content !== undefined) updates.content = content;
  if (images !== undefined) updates.images = images;
  if (published !== undefined) updates.published = published;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No fields to update" });
    return;
  }

  const [article] = await db
    .update(articlesTable)
    .set(updates)
    .where(eq(articlesTable.id, id))
    .returning();

  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  res.json(formatArticle(article));
});

// DELETE /api/admin/articles/:id?key=xxx
router.delete("/admin/articles/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id as string, 10);
  const key = req.query.key;

  if (key !== ADMIN_KEY) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const [article] = await db
    .delete(articlesTable)
    .where(eq(articlesTable.id, id))
    .returning();

  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
