// ============================================================
// 📝 文章資料管理檔
// ============================================================
// 要新增文章，只需在下方 articles 陣列中新增一筆物件。
// 填好以下欄位後，網站會自動顯示在對應的分類頁面。
//
// category 填寫規則：
//   "eat"   → 顯示在「吃」頁面
//   "drink" → 顯示在「喝」頁面
//   "play"  → 顯示在「玩」頁面
//   "fun"   → 顯示在「樂」頁面
//
// heroImage / images：填入圖片的完整網址（https://...）
//   或使用 /images/xxx.jpg 放在 public/images/ 資料夾
// ============================================================

export interface Article {
  id: number;
  category: "eat" | "drink" | "play" | "fun";
  title: string;
  date: string;         // 格式：YYYY-MM-DD
  heroImage: string;    // 主圖網址（16:9 比例效果最佳）
  summary: string;      // 簡短摘要（50～80字）
  content: string;      // 文章內容（支援換行 \n）
  images: string[];     // 內文圖片，1～3 張網址
}

// ============================================================
// ⬇️ 在這裡新增文章（複製下方範例格式貼上即可）
// ============================================================
export const articles: Article[] = [

  // ── 吃 ──────────────────────────────────────────────────
  {
    id: 1,
    category: "eat",
    title: "牛肉麵裡的幸福——一碗麵的能量密碼",
    date: "2026-07-01",
    heroImage: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&auto=format&fit=crop",
    summary: "每一口熱騰騰的牛肉麵，都是對自己最溫柔的犒賞。搭配環境狀態優化貼片，讓每一餐都充滿能量與滿足感。",
    content: `美食，是生活中最簡單的幸福。

一碗好的牛肉麵，需要時間的淬鍊——慢火熬煮的牛骨湯底，軟嫩入味的牛腱肉，還有那一把彈牙的麵條。每一口都是廚師對食材的尊重，也是對用餐者的一份心意。

我們相信，在舒適的環境中用餐，能讓每一頓飯都更加美味。環境狀態優化貼片不直接接觸食物，而是貼於餐桌、餐具收納處等環境，營造更好的用餐氛圍。

無論是一個人的獨享時光，還是與家人朋友共桌的溫馨時刻，讓美食成為生活中最療癒的儀式。`,
    images: [
      "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556040220-4096d522378d?w=600&auto=format&fit=crop",
    ],
  },

  // ── 喝 ──────────────────────────────────────────────────
  {
    id: 2,
    category: "drink",
    title: "一杯好茶，讓心靜下來",
    date: "2026-07-01",
    heroImage: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop",
    summary: "茶，陪伴我們度過忙碌的每一刻。無論是清香的綠茶、回甘的烏龍茶，一壺好茶讓每個下午都成為享受。",
    content: `茶，是東方生活美學的精髓。

一杯好茶的誕生，需要適合的水溫、適當的時間，以及一份安靜的心。就像生活中最美好的事物，都需要放慢腳步才能細細品味。

從清晨的一杯清香綠茶，到午後的一壺烏龍，再到夜晚的一盞菊花茶，每一種茶都有它獨特的個性，陪伴著我們走過一天的不同時刻。

我們的環境狀態優化貼片，可以貼於茶具收納區、飲水機旁等環境，讓您在享用每一口好茶時，都能感受到舒適安心的氛圍。

放慢腳步，泡一壺好茶，享受屬於自己的慢生活。`,
    images: [
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
    ],
  },

  // ── 玩 ──────────────────────────────────────────────────
  {
    id: 3,
    category: "play",
    title: "週末露營指南：親近自然，放鬆身心",
    date: "2026-07-01",
    heroImage: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop",
    summary: "走進戶外，呼吸新鮮空氣，感受陽光與微風。無論是露營、登山還是海邊散步，讓心靈回歸平靜，重新找回生活的能量。",
    content: `旅行，不只是移動，更是心靈的放鬆與成長。

每一次走進大自然，都是一次與自己的對話。在城市喧囂中，我們往往忘了抬頭看看天空。當帳篷搭好、營火燃起，那份寧靜與滿足，是任何室內娛樂都無法替代的。

露營裝備清單：帳篷、睡袋、折疊椅、燈具，當然還有我們的環境狀態優化貼片——貼於帳篷周圍或折疊桌上，讓戶外空間也能保持舒適的能量狀態。

每一次探索，都是值得珍藏的回憶。讓生活充滿更多美好與可能！`,
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&auto=format&fit=crop",
    ],
  },

  // ── 樂 ──────────────────────────────────────────────────
  {
    id: 4,
    category: "fun",
    title: "放慢腳步，享受獨處時光",
    date: "2026-07-01",
    heroImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop",
    summary: "在忙碌的生活中，給自己一點空間與時間。閱讀、音樂、一杯熱茶，讓心靈沉澱，重新找回平靜與力量。",
    content: `在這個步調飛快的時代，「慢下來」反而成了一種奢侈。

但其實，放慢腳步並不需要特別的條件。一本喜歡的書、一杯熱茶、窗邊的陽光，就是最簡單的幸福配方。

獨處，不是孤獨，而是與自己最真實的相處。在這段時光裡，我們可以整理思緒、重新充電，以更好的狀態面對明天的挑戰。

我們的環境狀態優化貼片，適合貼於書桌旁、沙發邊或任何您喜歡靜靜待著的角落，陪伴您享受每一個屬於自己的美好時刻。

給自己一個喘息的機會，生活會因此更加美好。`,
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop",
    ],
  },

  // ============================================================
  // ⬆️ 在上方新增更多文章，格式參考上面的範例
  // 記得每筆文章的 id 要唯一，不能重複
  // ============================================================
];

// 依分類篩選文章的工具函式（頁面自動使用，不需修改）
export function getArticlesByCategory(category: Article["category"]): Article[] {
  return articles.filter((a) => a.category === category);
}
