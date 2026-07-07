import { Layout } from "../components/layout";
import { ArticleDark } from "../components/article-dark";
import type { ArticleDarkData } from "../components/article-dark";
import heroSrc from "@assets/吃喝玩樂4_1782913834938.jpg";

const data: ArticleDarkData = {
  seoTitle: "樂｜享受生活，創造屬於自己的幸福｜幸福時光吃喝玩樂",
  metaDesc: "從居家生活、電影、音樂、閱讀、親子互動到寵物陪伴，幸福時光陪你在平凡日常中找到快樂，創造屬於自己的美好生活。",
  category: "樂",
  categorySlug: "fun",
  categoryIcon: "🏡",
  h1: "享受生活，創造屬於自己的幸福",
  heroSrc,
  heroAlt: "幸福時光｜生活享受",
  publishDate: "2026-07-02",
  intro: "真正的幸福，不一定來自轟轟烈烈的大事，而是生活中的每一個小確幸。和家人一起看電影、與朋友聊天、閱讀一本好書、欣賞音樂、陪伴毛小孩，這些看似平凡的時刻，往往最令人難忘。",
  seriesImage: "/images/fun-series.jpg",
  inlineImages: ["/images/fun-pain-patch.jpg", "/images/fun-shoe.jpg", "/images/fun-movie.jpg", "/images/fun-le-tea.jpg"],
  sections: [
    {
      id: "fun-attitude",
      h2: "樂，是一種生活態度",
      content: [
        "當我們願意放慢腳步，感受日常中的小美好，就會發現生活並不只是忙碌與壓力，也可以充滿溫度與微笑。",
        "幸福不需要遠求，它就藏在每天的早晨陽光裡、藏在一頓溫暖的家常飯裡、藏在朋友傳來的一則貼心訊息裡。",
      ],
      imageAfter: true,
    },
    {
      id: "fun-varieties",
      h2: "探索生活中多元的快樂方式",
      content: [
        "幸福時光希望分享更多居家生活、休閒娛樂、電影、音樂、閱讀、親子互動、寵物生活以及心靈成長等內容，陪伴大家找到屬於自己的生活節奏。",
        "每個人對快樂的定義不同。有些人喜歡熱鬧聚會，有些人喜歡安靜閱讀，有些人喜歡旅行，有些人只想在家好好休息。只要那一刻讓你感到自在、放鬆與滿足，就是屬於你的幸福時光。",
      ],
      h3s: [
        {
          heading: "居家生活的小確幸",
          content: ["把家布置成自己喜歡的樣子，在熟悉的空間裡找到最深的放鬆。一盆植物、一杯熱飲、一首喜歡的歌，就能讓家成為最療癒的避風港。"],
        },
        {
          heading: "電影與音樂帶來的感動",
          content: ["一部好電影能讓我們哭、讓我們笑、讓我們思考；一首好音樂能在瞬間打開記憶的閘門。這些藝術創作，是生活最美的陪伴。"],
        },
      ],
      imageAfter: true,
    },
    {
      id: "future-fun-content",
      h2: "未來「樂」主題的溫暖規劃",
      content: [
        "未來在「樂」這個主題中，我們會持續整理居家生活靈感、電影與音樂推薦、親子活動、寵物日常、生活儀式感與放鬆小技巧，讓每一天都更有溫度。",
        "幸福不是等待未來，而是從今天開始，用心感受身邊的一切美好。",
      ],
      imageAfter: true,
    },
    {
      id: "fun-le-series",
      h2: "🌿 樂系列｜讓生活，多一點美好與放鬆",
      content: [
        "忙碌的生活，也別忘了留點時間給自己。無論是與家人相聚、好友聊天，或是一個人的悠閒時光，都值得細細品味。",
        "放慢腳步，享受每一刻的幸福，讓快樂成為每天最自然的習慣。",
        "幸福時光｜吃喝玩樂——每一天，都值得留下最美好的回憶。",
      ],
      imageAfter: true,
    },
  ],
  relatedLinks: [
    { label: "居家生活分享", url: "https://www.cw.com.tw/topic/life" },
    { label: "電影推薦", url: "https://www.atmovies.com.tw/movie/" },
    { label: "音樂欣賞", url: "https://www.kkbox.com" },
    { label: "親子活動", url: "https://tw.trip.com/guide/destination/%E8%A6%AA%E5%AD%90%E6%97%85%E9%81%8A.html" },
    { label: "寵物日常", url: "https://wepet.tw" },
    { label: "心靈成長", url: "https://www.wazaiii.com/articles?id=lifestyle-spiritual-development-class" },
    { label: "放鬆生活提案", url: "https://blog.charmingyoga.com.tw/667/" },
  ],
  faq: [
    {
      q: "幸福時光的「樂」主要分享什麼？",
      a: "主要分享居家生活、休閒娛樂、電影、音樂、親子、寵物與心靈成長等內容，讓日常生活更有溫度與意義。",
    },
    {
      q: "「樂」和「玩」有什麼不同？",
      a: "「玩」偏向外出探索與活動，「樂」偏向日常生活中的放鬆、陪伴與心情愉悅，是生活中更內在的幸福感受。",
    },
    {
      q: "這個主題適合放在首頁嗎？",
      a: "適合，可以讓網站更有人情味，也能補足吃喝玩樂中最溫暖的生活面向，增加讀者的情感共鳴。",
    },
  ],
};

export default function FunPage() {
  return (
    <Layout>
      <ArticleDark data={data} />
    </Layout>
  );
}
