import { Router } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";
import { z } from "zod";

const router = Router();

const ChatBody = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string(),
  })),
});

const SYSTEM_PROMPT = `你是貼心世界的 AI 客服助理，專門回答關於「環境狀態優化貼片」的問題。

關於產品：
- 產品名稱：環境狀態優化貼片（命の光）
- 價格：促銷價 NT$1,288 / 盒（原價 NT$1,688）
- 技術：採用專利奈米傳導技術，1 分鐘內可感受效果
- 使用方式：貼於物品底部（不貼皮膚），乾燥無水的地方，可重複使用
- 每片效能為一年
- 通過 SGS 安全認證
- 顧客滿意度 98%，超過 50,000 名滿意用戶

特色功能：
1. 即效能量補充 — 一分鐘內可感受到明顯的不同
2. 365天持續作用 — 24小時使用讓新陳代謝穩定
3. 吃喝玩樂動起來 — 應用在各種生活物品上，效果極佳
4. 天馬行空的生活 — 貼片帶著走，想像神仙般的生活

訂購方式：可在官網直接訂購，或透過聯絡表單詢問。

請用繁體中文親切友善地回答顧客問題。如果顧客詢問你不確定的事，請建議他們透過網站的聯絡表單與我們聯繫，或直接前往訂購頁面。`;

router.post("/chat", async (req, res): Promise<void> => {
  const parsed = ChatBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "無效的請求格式" });
    return;
  }

  const { messages } = parsed.data;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-5-mini",
      max_completion_tokens: 1024,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    req.log.error(err, "Chat error");
    res.write(`data: ${JSON.stringify({ error: "發生錯誤，請稍後再試" })}\n\n`);
    res.end();
  }
});

export default router;
