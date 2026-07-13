import { Layout } from "../components/layout";
import { ArticleDark } from "../components/article-dark";
import type { ArticleDarkData } from "../components/article-dark";
import heroSrc from "@assets/吃喝玩樂2_1782913834937.jpg";

const data: ArticleDarkData = {
  seoTitle: "喝｜品味每一杯飲品，享受生活的每一刻｜幸福時光吃喝玩樂",
  metaDesc: "從咖啡、茶飲、果汁、手搖飲到紅酒與特色飲品，幸福時光陪你品味生活中的每一杯美好，讓喝飲品成為日常的小幸福。",
  category: "喝",
  categorySlug: "drink",
  categoryIcon: "☕",
  h1: "品味每一杯飲品，享受生活的每一刻",
  heroSrc,
  heroAlt: "幸福時光｜飲品文化",
  publishDate: "2026-07-02",
  intro: "一杯好茶、一杯咖啡，或是一杯沁涼飲品，都能為生活增添美好節奏。無論清晨、午後或夜晚，都值得放慢腳步，好好享受飲品帶來的放鬆與愉悅，讓每天都充滿活力與好心情。",
  seriesImage: "/images/drink-series.jpg",
  seriesImage2: "/images/drink-series2.jpg",
  seriesImage2Title: "喝｜品味生活，從每一杯開始",
  seriesImage2Text: "無論是清晨的一杯咖啡、下午的珍珠奶茶，還是傍晚的一壺好茶，每一種飲品都有自己的故事。讓美好的飲品時光，成為生活中最舒心的儀式。",
  seriesImage3: "/images/drink-series3.jpg",
  seriesImage3Title: "喝系列",
  seriesImage3Text: "好喝的每一刻，都是生活的幸福時光！一杯好水開啟美好一天，香濃咖啡提神又療癒，歡樂時光來一杯放鬆一下——喝，是生活裡最溫柔的儀式。",
  seriesImage4: "/images/drink-series4.jpg",
  seriesImage4Title: "喝｜一杯飲品，療癒一天的心情",
  seriesImage4Text: "清晨的一杯咖啡，午後的一壺好茶，傍晚的一杯果汁，每一種飲品都有屬於自己的故事。生活不需要太匆忙，給自己幾分鐘，好好享受這片刻的寧靜。當心情放鬆了，每一天都會變得更加美好。",
  seriesImage5: "/images/drink-series5.jpg",
  seriesImage5Title: "喝｜讓每一天充滿活力",
  seriesImage5Text: "一杯清水、一杯咖啡、一壺好茶，都是生活中不可缺少的陪伴。從早晨的第一口開始，為自己補充滿滿元氣，享受片刻寧靜，也迎接新的挑戰。放慢節奏，感受飲品帶來的溫暖，讓生活多一份自在、多一份幸福。",
  inlineImages: ["/images/drink-morning.jpg", "/images/drink-tea.jpg", "/images/drink-wine-gathering.jpg", "/images/drink-coffee-culture.jpg", "/images/drink-oolong.jpg", "/images/drink-series6.jpg", "/images/drink-series7.jpg"],
  sections: [
    {
      id: "drink-as-lifestyle",
      h2: "喝，不只是解渴，更是一種生活品味",
      content: [
        "當我們願意放慢腳步，用心感受一杯飲品的溫度、香氣與味道，就會發現生活其實藏著很多細緻的幸福。",
        "一杯手沖咖啡的香氣、一壺龍井茶的清香、一杯夏日果汁的酸甜，這些感官的觸動，都在悄悄豐富著我們的生活底蘊。",
      ],
      imageAfter: true,
    },
    {
      id: "drink-varieties",
      h2: "各種飲品的文化與魅力",
      content: [
        "幸福時光將分享各種咖啡、茶飲、果汁、手搖飲、紅酒、威士忌以及特色飲品資訊，介紹不同地區的飲食文化，也分享飲品搭配、美味推薦與生活小知識。",
        "不論是在家泡一壺茶，還是在咖啡館度過午後時光，或是在旅行途中喝到一杯令人驚喜的飲品，這些片刻都能成為生活中美好的記憶。",
      ],
      h3s: [
        {
          heading: "咖啡文化的深度探索",
          content: ["從義式濃縮到手沖單品，咖啡的世界博大精深。每一種烘焙度、每一個產區，都帶來截然不同的風味體驗，值得細細品味。"],
        },
        {
          heading: "茶葉文化的千年傳承",
          content: ["台灣茶舉世聞名，從高山烏龍到東方美人，每一款茶都有其獨特的製作工藝與文化背景，是最具代表性的生活美學之一。"],
        },
      ],
      imageAfter: true,
    },
    {
      id: "future-drink-content",
      h2: "未來「喝」主題的豐富規劃",
      content: [
        "未來在「喝」這個主題中，我們會持續整理咖啡知識、茶葉文化、手搖飲推薦、果汁分享、飲品搭配、聚會飲品與生活儀式感內容，讓每一次舉杯，都成為幸福時光的一部分。",
        "每一杯飲品，都是生活中最美好的停頓。願你在忙碌之餘，也能好好享受屬於自己的那一杯。",
      ],
      imageAfter: true,
    },
    {
      id: "drink-fresh-start",
      h2: "☕ 一杯好飲品，讓心情重新出發",
      content: [
        "清晨的一杯咖啡、午後的一壺熱茶，或是一杯沁涼的果汁，都能為生活增添美好的節奏。每一口飲品，都像是在提醒自己放鬆片刻，享受當下。幸福，其實就藏在每一次舉杯之間。",
      ],
      imageAfter: true,
    },
    {
      id: "drink-oolong",
      h2: "烏龍茶｜台灣之驕傲，一壺千年香",
      content: [
        "台灣高山烏龍茶舉世聞名，從阿里山到梨山，每一款都承載著茶農的心血與大地的恩賜。金黃的茶湯、醇厚的香氣、回甘的滋味，讓每一口都是對台灣風土最深情的品味。",
        "泡一壺好茶，靜靜地坐下來，讓茶香帶走一天的疲憊。這樣的時刻，就是屬於自己最純粹的幸福。",
      ],
      imageAfter: true,
    },
    {
      id: "drink-infused",
      h2: "☕ 喝｜一杯好飲品，開啟美好的一天",
      content: [
        "一杯咖啡提振精神，一壺熱茶放鬆身心，一杯新鮮果汁帶來滿滿活力。生活其實很簡單，只要找到屬於自己的那一杯，就能讓今天充滿好心情。",
      ],
      imageAfter: true,
    },
    {
      id: "drink-puppy",
      h2: "💧【喝】一口清涼，一份關懷",
      content: [
        "喝水看似平凡，卻是健康生活不可缺少的一部分。陪伴小狗養成良好的飲水習慣，也是在照顧牠每一天的活力。幸福，其實就藏在這些微小而溫暖的日常裡。",
        "✨ 幸福時光｜吃喝玩樂",
        "每一天，都值得留下最美好的回憶。",
      ],
      imageAfter: true,
    },
  ],
  relatedLinks: [
    { label: "精品咖啡介紹", url: "https://www.zhanlu.com.tw" },
    { label: "手沖咖啡技巧", url: "https://www.zhanlu.com.tw/%E6%89%8B%E6%B2%96%E5%92%96%E5%95%A1-2/" },
    { label: "茶葉文化分享", url: "https://www.taiwan.net.tw" },
    { label: "手搖飲推薦", url: "https://www.skyful-group.com/en/blog/boba-tea-beverage-shop" },
    { label: "果汁與健康飲品", url: "https://icook.tw" },
    { label: "紅酒與聚會飲品", url: "https://www.vivino.com/TW/zh" },
  ],
  faq: [
    {
      q: "幸福時光的「喝」會介紹哪些內容？",
      a: "會分享咖啡、茶飲、果汁、手搖飲、紅酒、威士忌與特色飲品等生活內容，帶大家深入了解飲品文化。",
    },
    {
      q: "文章適合搭配什麼圖片？",
      a: "可以搭配咖啡杯、茶具、果汁、戶外飲品、朋友聚會與陽光生活感圖片，讓文章更有溫度與視覺吸引力。",
    },
    {
      q: "「喝」的文章可以怎麼延伸？",
      a: "可以延伸成咖啡專題、茶葉專題、手搖飲推薦、飲品搭配與聚會飲品攻略，建立豐富的飲品知識庫。",
    },
  ],
};

export default function DrinkPage() {
  return (
    <Layout>
      <ArticleDark data={data} />
    </Layout>
  );
}
