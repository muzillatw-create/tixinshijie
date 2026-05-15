import { Router, type IRouter } from "express";
import { db, contactsTable } from "@workspace/db";
import { SendContactMessageBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SendContactMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.insert(contactsTable).values({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  });

  req.log.info({ email: parsed.data.email }, "Contact message received");
  res.json({ ok: true });
});

export default router;
