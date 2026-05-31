import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, ordersTable, videosTable } from "@workspace/db";
import {
  AdminListOrdersQueryParams,
  AdminShipOrderBody,
  AdminShipOrderParams,
  AdminUpdateOrderStatusBody,
  AdminUpdateOrderStatusParams,
  AdminAddVideoBody,
  AdminDeleteVideoParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

const ADMIN_KEY = process.env.ADMIN_KEY ?? "admin2026";

function formatOrder(order: typeof ordersTable.$inferSelect) {
  return {
    ...order,
    storeAddress: order.storeAddress ?? null,
    notes: order.notes ?? null,
    trackingNumber: order.trackingNumber ?? null,
    bookingNote: order.bookingNote ?? null,
    notifiedAt: order.notifiedAt ? order.notifiedAt.toISOString() : null,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  };
}

function formatVideo(video: typeof videosTable.$inferSelect) {
  return {
    ...video,
    description: video.description ?? null,
    createdAt: video.createdAt.toISOString(),
  };
}

router.get("/admin/orders", async (req, res): Promise<void> => {
  const parsed = AdminListOrdersQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (parsed.data.key !== ADMIN_KEY) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  let query = db.select().from(ordersTable).$dynamic();

  if (parsed.data.status) {
    query = query.where(eq(ordersTable.status, parsed.data.status));
  }

  const orders = await query.orderBy(ordersTable.createdAt);
  res.json(orders.map(formatOrder));
});

router.post("/admin/orders/:orderId/ship", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.orderId) ? req.params.orderId[0] : req.params.orderId;
  const params = AdminShipOrderParams.safeParse({ orderId: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = AdminShipOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (parsed.data.key !== ADMIN_KEY) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const [order] = await db
    .update(ordersTable)
    .set({
      status: "shipped",
      trackingNumber: parsed.data.trackingNumber,
      bookingNote: parsed.data.bookingNote ?? null,
      notifiedAt: new Date(),
    })
    .where(eq(ordersTable.id, params.data.orderId))
    .returning();

  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  req.log.info({ orderId: order.id }, "Order shipped");
  res.json(formatOrder(order));
});

router.patch("/admin/orders/:orderId/status", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.orderId) ? req.params.orderId[0] : req.params.orderId;
  const params = AdminUpdateOrderStatusParams.safeParse({ orderId: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = AdminUpdateOrderStatusBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (parsed.data.key !== ADMIN_KEY) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const [order] = await db
    .update(ordersTable)
    .set({ status: parsed.data.status })
    .where(eq(ordersTable.id, params.data.orderId))
    .returning();

  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json(formatOrder(order));
});

router.post("/admin/videos", async (req, res): Promise<void> => {
  const parsed = AdminAddVideoBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (parsed.data.key !== ADMIN_KEY) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const [video] = await db
    .insert(videosTable)
    .values({
      youtubeUrl: parsed.data.youtubeUrl,
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      published: parsed.data.published,
      category: parsed.data.category ?? "general",
    })
    .returning();

  res.status(201).json(formatVideo(video));
});

router.patch("/admin/videos/:videoId", async (req, res): Promise<void> => {
  const id = parseInt(req.params.videoId as string, 10);
  const key = req.query.key;
  if (key !== ADMIN_KEY) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }
  const { title, youtubeUrl } = req.body as { title?: string; youtubeUrl?: string };
  if (!title && !youtubeUrl) {
    res.status(400).json({ error: "title or youtubeUrl required" });
    return;
  }
  const updates: { title?: string; youtubeUrl?: string } = {};
  if (title) updates.title = title;
  if (youtubeUrl) updates.youtubeUrl = youtubeUrl;
  const [video] = await db
    .update(videosTable)
    .set(updates)
    .where(eq(videosTable.id, id))
    .returning();
  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }
  res.json(formatVideo(video));
});

router.delete("/admin/videos/:videoId", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.videoId) ? req.params.videoId[0] : req.params.videoId;
  const params = AdminDeleteVideoParams.safeParse({ videoId: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const key = req.query.key;
  if (key !== ADMIN_KEY) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const [video] = await db
    .delete(videosTable)
    .where(eq(videosTable.id, params.data.videoId))
    .returning();

  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
