import { Router, type IRouter } from "express";
import { createHash } from "crypto";
import { db, ordersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const MERCHANT_ID = process.env.ECPAY_MERCHANT_ID!;
const HASH_KEY = process.env.ECPAY_HASH_KEY!;
const HASH_IV = process.env.ECPAY_HASH_IV!;
const ECPAY_URL = "https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5";

function getReturnUrl() {
  const domains = process.env.REPLIT_DOMAINS?.split(",")[0];
  const base = domains ? `https://${domains}` : "https://xn--rhqt44buwpwnv.com";
  return base;
}

function generateCheckMacValue(params: Record<string, string>): string {
  const sorted = Object.keys(params)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map((k) => `${k}=${params[k]}`)
    .join("&");

  const raw = `HashKey=${HASH_KEY}&${sorted}&HashIV=${HASH_IV}`;
  const encoded = encodeURIComponent(raw)
    .toLowerCase()
    .replace(/%20/g, "+")
    .replace(/%21/g, "!")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")
    .replace(/%2a/g, "*")
    .replace(/%2d/g, "-")
    .replace(/%2e/g, ".")
    .replace(/%5f/g, "_")
    .replace(/%7e/g, "~");

  return createHash("sha256").update(encoded).digest("hex").toUpperCase();
}

router.get("/payment/form/:orderId", async (req, res): Promise<void> => {
  const orderId = parseInt(req.params.orderId);
  if (isNaN(orderId)) {
    res.status(400).json({ error: "無效的訂單編號" });
    return;
  }

  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, orderId));
  if (!order) {
    res.status(404).json({ error: "找不到訂單" });
    return;
  }

  if (order.paymentMethod !== "online") {
    res.status(400).json({ error: "此訂單非線上付款" });
    return;
  }

  const baseUrl = getReturnUrl();
  const tradeNo = `TX${Date.now()}`.slice(0, 20);
  const tradeDate = new Date().toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).replace(/\//g, "/").replace(",", "");

  const amount = (1688 * order.quantity).toString();

  const params: Record<string, string> = {
    MerchantID: MERCHANT_ID,
    MerchantTradeNo: tradeNo,
    MerchantTradeDate: tradeDate,
    PaymentType: "aio",
    TotalAmount: amount,
    TradeDesc: "環境狀態優化貼片",
    ItemName: `環境狀態優化貼片 x${order.quantity}`,
    ReturnURL: `${baseUrl}/api/payment/callback`,
    OrderResultURL: `${baseUrl}/track?orderId=${order.id}`,
    ChoosePayment: "Credit",
    EncryptType: "1",
    ClientBackURL: `${baseUrl}/track?orderId=${order.id}`,
    Remark: `orderId:${order.id}`,
  };

  params.CheckMacValue = generateCheckMacValue(params);

  const formFields = Object.entries(params)
    .map(([k, v]) => `<input type="hidden" name="${k}" value="${v.replace(/"/g, "&quot;")}">`)
    .join("\n");

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>跳轉至綠界付款...</title></head>
<body>
<p style="font-family:sans-serif;text-align:center;margin-top:80px">正在跳轉至綠界付款頁面，請稍候...</p>
<form id="ecpay" action="${ECPAY_URL}" method="POST">
${formFields}
</form>
<script>document.getElementById('ecpay').submit();</script>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(html);
});

router.post("/payment/callback", async (req, res): Promise<void> => {
  const body = req.body as Record<string, string>;
  const { CheckMacValue, ...rest } = body;

  const computed = generateCheckMacValue(rest);
  if (computed !== CheckMacValue) {
    res.status(400).send("0|ErrorMessage");
    return;
  }

  if (body.RtnCode === "1") {
    const remark = body.Remark ?? "";
    const match = remark.match(/orderId:(\d+)/);
    if (match) {
      const orderId = parseInt(match[1]);
      await db
        .update(ordersTable)
        .set({ status: "paid", updatedAt: new Date() })
        .where(eq(ordersTable.id, orderId));
    }
  }

  res.send("1|OK");
});

export default router;
