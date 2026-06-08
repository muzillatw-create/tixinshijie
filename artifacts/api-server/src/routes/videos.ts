import { Router, type IRouter } from "express";
import { and, asc, eq } from "drizzle-orm";
import { db, videosTable } from "@workspace/db";

const router: IRouter = Router();

function formatVideo(video: typeof videosTable.$inferSelect) {
  return {
    ...video,
    description: video.description ?? null,
    createdAt: video.createdAt.toISOString(),
  };
}

router.get("/videos", async (req, res): Promise<void> => {
  const category = typeof req.query.category === "string" ? req.query.category : null;

  const conditions = [eq(videosTable.published, true)];
  if (category) {
    conditions.push(eq(videosTable.category, category));
  } else {
    conditions.push(eq(videosTable.category, "general"));
  }

  const videos = await db
    .select()
    .from(videosTable)
    .where(and(...conditions))
    .orderBy(asc(videosTable.id));

  res.json(videos.map(formatVideo));
});

export default router;
