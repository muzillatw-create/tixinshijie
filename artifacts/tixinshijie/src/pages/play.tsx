import { Layout } from "../components/layout";
import { ArticleDark } from "../components/article-dark";
import type { ArticleDarkData } from "../components/article-dark";
import heroSrc from "@assets/吃喝玩樂3_1782913834937.jpg";

const data: ArticleDarkData = {
  seoTitle: "玩｜探索世界，留下最美好的回憶｜幸福時光吃喝玩樂",
  metaDesc: "旅行、露營、高爾夫、海邊、登山與親子活動，幸福時光陪你探索世界，把每一次出發變成值得珍藏的生活回憶。",
  category: "玩",
  categorySlug: "play",
  categoryIcon: "🌏",
  h1: "探索世界，留下最美好的回憶",
  heroSrc,
  heroAlt: "幸福時光｜旅遊探索",
  publishDate: "2026-07-02",
  intro: "旅行讓人開闊視野，戶外活動讓人釋放壓力。不論是騎單車、露營、衝浪、登山，還是體驗各地風景，都能創造屬於自己的精彩故事。勇敢探索世界，讓每一次出發都成為珍貴的回憶。",
  seriesImage: "/images/play-series.jpg",
  seriesImage2: "/images/play-series2.jpg",
  seriesImage2Title: "玩｜探索世界的精彩",
  seriesImage2Text: "旅行讓視野更開闊，冒險讓人生更精彩。無論是露營、高爾夫、划獨木舟，還是海邊水上活動，每一次出發都是新的回憶。帶著愉快的心情，一起探索世界，留下屬於自己的精彩故事。",
  seriesImage3: "/images/play-series3.jpg",
  seriesImage3Title: "玩系列",
  seriesImage3Text: "探索世界，創造美好回憶！無論是星空下的營火夜談、遊樂園的雲霄飛車歡笑，還是水上活動的刺激冒險，每一次出發都值得盡情享受。",
  inlineImages: ["/images/play-rollercoaster.jpg", "/images/play-picnic.jpg", "/images/play-helmet.jpg", "/images/play-travel2.jpg"],
  sections: [
    {
      id: "play-recharge",
      h2: "玩，是讓生活重新充電的方式",
      content: [
        "當我們離開熟悉的環境，走進山林、海邊、城市街道或戶外營地，就會看見不同的風景，也會遇見不一樣的自己。",
        "每一次出走，都是一次與日常生活的告別，也是一次重新整理心情的機會。那份輕鬆與自由，往往是城市生活中最缺少的養分。",
      ],
      imageAfter: true,
    },
    {
      id: "play-varieties",
      h2: "探索多元的休閒活動與旅遊樂趣",
      content: [
        "幸福時光希望陪伴大家分享各地旅遊景點、美食旅遊、親子旅行、露營、高爾夫、登山、海邊活動、國內外旅遊攻略以及各種休閒活動，讓每一次出發，都充滿期待。",
        "旅行最大的收穫，不是去了多少地方，而是留下多少笑容與回憶。每一張照片、每一次相聚、每一次探索，都將成為人生中最珍貴的故事。",
      ],
      h3s: [
        {
          heading: "露營與戶外生活",
          content: ["在星空下紮營，圍著營火分享料理，感受大自然的寧靜與壯闊。露營不只是一種戶外活動，更是一種回歸自然、放慢生活節奏的生活哲學。"],
        },
        {
          heading: "親子旅行的美好時光",
          content: ["帶著孩子一起出遊，是家庭最珍貴的投資。每一次旅行都是孩子成長的養分，也是家人之間最美好的共同記憶。"],
        },
      ],
      imageAfter: true,
    },
    {
      id: "future-play-content",
      h2: "未來「玩」主題的豐富規劃",
      content: [
        "未來在「玩」這個主題中，我們會持續整理旅遊景點、露營攻略、親子出遊、高爾夫分享、戶外活動、假日行程與自由行建議，讓大家在忙碌生活中，也能找到屬於自己的放鬆方式。",
        "出發，不一定要很遠；重要的是願意走出去，讓生活多一點陽光、多一點笑容，也多一點值得留下的美好回憶。",
      ],
    },
    {
      id: "play-golf",
      h2: "高爾夫｜增加距離，突破自我",
      content: [
        "揮桿的瞬間，所有壓力都隨著球飛向遠方。高爾夫不只是一項運動，更是一種專注與放鬆的生活方式。",
        "每一次練習都是進步的積累，每一桿都是挑戰自己的機會。讓幸福時光陪你在球場上，創造屬於自己的精彩。",
      ],
    },
    {
      id: "play-helmet",
      h2: "安全防護｜盡情玩，也要平安回家",
      content: [
        "無論是騎車、登山還是各種戶外活動，安全裝備是享受冒險的第一步。做好防護，才能讓每一次出發都更安心、更盡興。",
        "幸福時光提醒你：玩得開心的同時，也要照顧好自己，平安回家才是最重要的事。",
      ],
      imageAfter: true,
    },
    {
      id: "play-moments",
      h2: "把日常暫停，用風景療癒自己",
      content: [
        "把日常暫停，出門走走看看世界，用美食和風景療癒自己，享受當下的每一刻，這就是我最喜歡的時光！",
        "旅行不一定要走很遠，一個轉角的老街、一杯午後的鬆餅、一本窗邊的好書——生活裡藏著無數個值得珍惜的小瞬間。",
      ],
      imageAfter: true,
    },
    {
      id: "play-journey",
      h2: "旅行，是與更好的自己相遇",
      content: [
        "旅行，不只是到達目的地，更是讓心情重新充電的開始。放慢腳步，欣賞沿途的風景，品嚐當地美食，留下每一個值得珍藏的瞬間。",
        "每一次出發，都是與世界相遇，也是與更好的自己相遇。幸福，其實就在每一次開心探索的旅程中。",
        "✨ #幸福時光 #吃喝玩樂 #旅行日常 #探索世界 #美好回憶",
      ],
      imageAfter: false,
    },
  ],
  relatedLinks: [
    { label: "國內旅遊推薦", url: "https://travel.liontravel.com/category/zh-tw/taiwan/index" },
    { label: "國外自由行", url: "https://trip.eztravel.com.tw/" },
    { label: "露營攻略", url: "https://www.funtime.com.tw/blog/funtime/camping-spots-in-taiwan" },
    { label: "高爾夫分享", url: "https://www.taiwan.net.tw/m1.aspx?sNo=0030361" },
    { label: "海邊景點", url: "https://www.taiwan.net.tw" },
    { label: "親子旅行", url: "https://tw.trip.com/guide/destination/%E8%A6%AA%E5%AD%90%E6%97%85%E9%81%8A.html" },
    { label: "假日一日遊", url: "https://blog.asiayo.com" },
  ],
  faq: [
    {
      q: "幸福時光的「玩」主要分享什麼？",
      a: "主要分享旅遊、露營、高爾夫、海邊、登山、親子活動與戶外休閒內容，讓每次出發都充滿期待與驚喜。",
    },
    {
      q: "這個主題適合做成系列文章嗎？",
      a: "非常適合，可以依照地區、季節、活動類型慢慢建立長期內容，形成完整的旅遊與休閒知識庫。",
    },
    {
      q: "「玩」的文章對網站有什麼幫助？",
      a: "旅遊與休閒內容搜尋量高，也很適合搭配圖片、地點介紹與延伸閱讀，能有效增加網站停留時間與流量。",
    },
  ],
};

export default function PlayPage() {
  return (
    <Layout>
      <ArticleDark data={data} />
    </Layout>
  );
}
