import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, videosTable } from "@workspace/db";

const router: IRouter = Router();

function formatVideo(video: typeof videosTable.$inferSelect) {
  return {
    ...video,
    description: video.description ?? null,
    createdAt: video.createdAt.toISOString(),
  };
}

router.get("/videos", async (_req, res): Promise<void> => {
  const videos = await db
    .select()
    .from(videosTable)
    .where(eq(videosTable.published, true))
    .orderBy(videosTable.createdAt);

  res.json(videos.map(formatVideo));
});

export default router;
