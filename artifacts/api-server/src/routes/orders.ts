import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, ordersTable } from "@workspace/db";
import {
  CreateOrderBody,
  LookupOrderBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

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

router.post("/orders", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [order] = await db
    .insert(ordersTable)
    .values({
      name: parsed.data.name,
      phone: parsed.data.phone,
      quantity: parsed.data.quantity,
      storeId: parsed.data.storeId,
      storeName: parsed.data.storeName,
      storeBrand: parsed.data.storeBrand,
      storeAddress: parsed.data.storeAddress ?? null,
      notes: parsed.data.notes ?? null,
      paymentMethod: parsed.data.paymentMethod,
      status: "pending",
    })
    .returning();

  req.log.info({ orderId: order.id }, "Order created");
  res.status(201).json(formatOrder(order));
});

router.post("/orders/lookup", async (req, res): Promise<void> => {
  const parsed = LookupOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [order] = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.id, parsed.data.id));

  if (!order) {
    res.status(404).json({ error: "找不到訂單" });
    return;
  }

  if (order.phone !== parsed.data.phone) {
    res.status(403).json({ error: "手機號碼與訂單不符，請確認資料是否正確" });
    return;
  }

  res.json(formatOrder(order));
});

export default router;
