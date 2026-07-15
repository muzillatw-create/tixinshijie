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
  intro: "生活可以很忙碌，但別忘了留一點時間給自己。一杯香濃咖啡、一壺清香好茶、一杯沁涼果汁，或是夜晚與好友共享的一杯紅酒，都能讓心情慢慢沉澱。喝的不只是飲品，更是生活的節奏，也是屬於自己的放鬆時光。",
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
  inlineImages: ["/images/drink-morning.jpg", "/images/drink-tea.jpg", "/images/drink-wine-gathering.jpg", "/images/drink-oolong.jpg", "/images/drink-series7.jpg", "/images/drink-series6.jpg", "/images/drink-series8.jpg", "/images/drink-series9.jpg", "/images/drink-series10.jpg", "/images/drink-series11.jpg", "/images/drink-series12.jpg"],
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
    {
      id: "drink-series11",
      h2: "🌙【喝】夢幻童話｜星空下的一杯茶，時間都慢了下來",
      content: [
        "深邃的星空為頂，發光的蘑菇為燈，水晶茶杯中盛著閃閃發亮的魔法飲品——在這片夢幻的森林空地裡，每一口都帶著星塵的甘甜與月光的清涼。",
        "有時候，喝一杯茶不只是解渴，更是給自己一段與星空對話的時光。放下所有煩惱，讓這份寧靜的魔法，輕輕填滿你的心。",
        "✨幸福時光｜吃喝玩樂",
        "每一天，都值得留下最美好的回憶。",
      ],
      imageAfter: true,
    },
    {
      id: "drink-series10",
      h2: "🐾【喝】毛小孩系列｜喝水喝得認真，連貓咪都有儀式感",
      content: [
        "貓咪蹲在水碗前，認真地用小舌頭一下一下舔著水；小狗則把整個臉埋進水盆，喝得滿地水花，抬起頭還帶著一臉滿足的表情。",
        "連毛小孩都懂得，好好補水才能好好生活。看著牠們認真喝水的模樣，不禁也想為自己倒上一杯，細細品味這份純粹的日常小幸福。",
        "✨幸福時光｜吃喝玩樂",
        "每一天，都值得留下最美好的回憶。",
      ],
      imageAfter: true,
    },
    {
      id: "drink-series9",
      h2: "☕【喝】溫馨故事｜好友相聚，一杯飲品暖了心",
      content: [
        "好久不見的朋友，在熟悉的咖啡館重逢。點上各自喜歡的飲品，聊著這段時間的喜怒哀樂，笑聲一陣一陣，時間彷彿停了下來。",
        "最好的飲品，不是最貴的那一杯，而是有人陪著一起喝的那一刻。珍惜每一次相聚，讓友情在一杯一杯之間，越來越濃。",
        "✨幸福時光｜吃喝玩樂",
        "每一天，都值得留下最美好的回憶。",
      ],
      imageAfter: true,
    },
    {
      id: "drink-series8",
      h2: "💧 喝｜好喝的水，好心情每一天！",
      content: [
        "一杯好喝的飲品，為今天補充滿滿的好心情。",
        "清涼的果汁、香濃的咖啡、回甘的好茶，每一口都讓生活更加輕鬆自在。與家人朋友一起分享，就是最簡單的幸福時光。",
        "✨幸福時光｜吃喝玩樂",
        "每一天，都值得留下最美好的回憶。",
      ],
      imageAfter: true,
    },
    {
      id: "drink-series12",
      h2: "☕【喝】從清晨到深夜，每一杯都有滋味",
      content: [
        "一杯茶，是對自己的溫柔；一壺手沖咖啡，是山間露營的儀式感；一杯調酒，是夜晚與朋友的默契；一瓶鮮奶，是牧場清晨的純粹——每一種飲品，都有它獨特的語言，訴說著不同的生活故事。",
        "慢下來，為自己沖一杯喜歡的飲料，感受它帶來的那份寧靜與滿足。生活的美好，有時就藏在這樸實的一口裡。",
        "✨幸福時光｜吃喝玩樂",
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
