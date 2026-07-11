import { Layout } from "../components/layout";
import { ArticleDark } from "../components/article-dark";
import type { ArticleDarkData } from "../components/article-dark";
import heroSrc from "@assets/吃喝玩樂1_1782913834936.jpg";

const data: ArticleDarkData = {
  seoTitle: "吃｜每一口美食，都是幸福時光的開始｜幸福時光吃喝玩樂",
  metaDesc: "從美食、餐廳、夜市小吃到露營烤肉，幸福時光陪你探索生活中的每一口美味，讓吃飯不只是填飽肚子，更是留下美好回憶的開始。",
  category: "吃",
  categorySlug: "eat",
  categoryIcon: "🍜",
  h1: "每一口美食，都是幸福時光的開始",
  heroSrc,
  heroAlt: "幸福時光｜美食探索",
  publishDate: "2026-07-02",
  intro: "美食不只是填飽肚子，更是一種生活的享受。從熱騰騰的家常料理到各地特色美食，每一道佳餚都值得細細品味。帶著愉快的心情探索不同風味，讓每一餐都成為幸福時光，留下最美好的回憶。",
  seriesImage: "/images/eat-series.jpg",
  seriesImage2: "/images/eat-series2.jpg",
  seriesImage2Title: "吃｜品味每一口幸福",
  seriesImage2Text: "美食不只是填飽肚子，更是生活中的小確幸。無論是一碗熱騰騰的牛肉麵、香酥炸雞，還是精緻甜點，每一道料理都承載著溫暖與回憶。幸福時光陪你探索更多美食，讓每一餐都成為值得珍藏的美好時刻。",
  seriesImage3: "/images/eat-series3.jpg",
  seriesImage3Title: "吃系列｜一章",
  seriesImage3Text: "吃，是生活的儀式感，也是幸福最簡單的模樣。早餐時光開啟活力一天，美食相伴分享快樂時光，深夜食光治癒一天的疲憊——每一餐，都是屬於自己的小幸福。",
  seriesImage4: "/images/eat-series4.jpg",
  seriesImage4Title: "吃｜每一口，都是幸福的開始",
  seriesImage4Text: "忙碌了一整天，最期待的就是坐下來，好好享受一頓美食。真正讓人難忘的，不只是食物本身，而是與家人、朋友一起分享的笑容。放慢腳步，細細品味每一道料理，讓生活多一點溫暖、多一點幸福。幸福時光，從每一口美味開始。",
  seriesImage5: "/images/eat-series5.jpg",
  seriesImage5Title: "吃｜生活不止詩和遠方，還有眼前的好吃的",
  seriesImage5Text: "人生最美好的事，就是吃到讓自己開心的食物。無論是一籠熱氣騰騰的小籠包、新鮮的西瓜、一碗濃郁的拉麵，還是甜蜜的冰淇淋，每一口都是對生活最純粹的喜愛。記得在忙碌中停下來，好好品嚐這些平凡卻珍貴的幸福滋味。",
  inlineImages: ["/images/eat-beefnoodle.jpg", "/images/eat-nightmarket.jpg", "/images/eat-family-meal.jpg", "/images/eat-breakfast.jpg"],
  sections: [
    {
      id: "memory-and-food",
      h2: "吃，是生活中最容易感受到幸福的時刻",
      content: [
        "很多人最難忘的回憶，都與美食有關。可能是童年的家常菜，也可能是旅行途中偶然發現的小吃，甚至是露營時大家圍坐在一起分享料理的歡樂時光。",
        "食物連結著記憶，也連結著人與人之間的情感。每一次用餐，都是一次與自己和他人的相遇，那份溫暖的滋味，往往比食物本身更令人難忘。",
      ],
      imageAfter: true,
    },
    {
      id: "explore-food",
      h2: "探索更多美食，分享生活中的每一口美好",
      content: [
        "幸福時光希望陪伴大家探索更多美食，分享餐廳推薦、夜市美食、地方特色料理、家庭料理、露營烤肉、美食旅遊等內容，讓每一次用餐都成為生活中最值得珍藏的一刻。",
        "我們相信，美食可以拉近人與人的距離，也能讓平凡的一天變得更加溫暖。無論今天吃的是簡單便當，還是精緻料理，只要與喜歡的人一起分享，就是最美好的幸福時光。",
      ],
      h3s: [
        {
          heading: "餐廳推薦與在地美食",
          content: ["從台北到高雄，各地都有令人驚艷的在地美食，等待著你去發現。一碗道地的滷肉飯、一份現炸的蚵仔煎，都是屬於台灣的幸福滋味。"],
        },
        {
          heading: "夜市小吃攻略",
          content: ["夜市是台灣最具特色的飲食文化場域，琳琅滿目的小吃攤位，每一個都是在地人的驕傲，也是旅人最難忘的美食記憶。"],
        },
      ],
      imageAfter: true,
    },
    {
      id: "future-content",
      h2: "未來「吃」主題將持續豐富精彩內容",
      content: [
        "未來在「吃」這個主題中，我們會持續整理各種實用內容，包括熱門餐廳推薦、在地美食介紹、夜市攻略、露營烤肉小技巧、家庭聚餐靈感與節慶美食分享，讓每位來到網站的朋友，都能找到值得收藏的美味資訊。",
        "吃喝玩樂的第一站，就從一頓好好吃飯開始。讓每一口美食，都成為生活中值得留下的回憶。",
      ],
      imageAfter: true,
    },
    {
      id: "food-simple-happiness",
      h2: "🍜 美食，是每天最簡單的幸福",
      content: [
        "一頓用心準備的美食，不只是填飽肚子，更能讓生活充滿溫暖。放慢腳步，好好享受每一口食物的香氣與味道，把平凡的一天變成值得珍藏的幸福時光。因為，美食不只是味覺的享受，更是生活最真實的感動。",
      ],
      imageAfter: true,
    },
  ],
  relatedLinks: [
    { label: "牛肉麵推薦", url: "https://guide.michelin.com/tw/zh_TW/best-of/must-eat-beef-noodles-taiwan-recommendations" },
    { label: "夜市美食攻略", url: "https://www.taiwan.net.tw" },
    { label: "火鍋餐廳推薦", url: "https://ifoodie.tw" },
    { label: "早餐與下午茶推薦", url: "https://www.klook.com/zh-TW/blog/" },
    { label: "露營烤肉分享", url: "https://blog.asiayo.com" },
    { label: "家庭料理靈感", url: "https://icook.tw" },
  ],
  faq: [
    {
      q: "幸福時光的「吃」主要分享什麼？",
      a: "主要分享美食、餐廳、夜市小吃、家庭料理、露營烤肉與美食旅遊等生活內容，讓每次用餐都成為值得珍藏的幸福時光。",
    },
    {
      q: "文章會介紹特定餐廳嗎？",
      a: "未來可以依照地區慢慢整理，例如台北美食、台中美食、高雄美食、夜市美食與特色小吃，讓大家找到適合的用餐地點。",
    },
    {
      q: "這個主題適合放在網站首頁嗎？",
      a: "適合。美食是最容易吸引讀者停留的主題，也很適合搭配圖片與延伸文章，能增加網站整體的豐富度與吸引力。",
    },
  ],
};

export default function EatPage() {
  return (
    <Layout>
      <ArticleDark data={data} />
    </Layout>
  );
}
