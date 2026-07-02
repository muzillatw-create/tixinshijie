import { Router, type IRouter } from "express";
import { eq, and, desc } from "drizzle-orm";
import { db, articlesTable } from "@workspace/db";

const router: IRouter = Router();

const ADMIN_KEY = process.env.ADMIN_KEY ?? "admin2026";

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

// POST /api/admin/articles  body: { key, category, title, date, heroImage, summary, content, images[] }
router.post("/admin/articles", async (req, res): Promise<void> => {
  const { key, category, title, date, heroImage, summary, content, images, published } = req.body as {
    key?: string;
    category?: string;
    title?: string;
    date?: string;
    heroImage?: string;
    summary?: string;
    content?: string;
    images?: string[];
    published?: boolean;
  };

  if (key !== ADMIN_KEY) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  if (!category || !title || !date || !heroImage || !summary || !content) {
    res.status(400).json({ error: "Missing required fields" });
    return;
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
