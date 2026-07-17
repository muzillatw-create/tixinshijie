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
  intro: "真正的快樂，不一定來自轟轟烈烈，而是那些溫暖的小瞬間。和家人野餐、陪毛小孩散步、與朋友歡聚、欣賞夕陽、閱讀一本好書、享受音樂帶來的感動，都能讓平凡的日子充滿幸福。珍惜每一個微笑，每一天，都值得留下最美好的回憶。",
  seriesImage: "/images/fun-series.jpg",
  seriesImage2: "/images/fun-series2.jpg",
  seriesImage2Title: "樂｜把快樂留在每一天",
  seriesImage2Text: "幸福其實很簡單，一場野餐、一杯咖啡、一段與家人朋友相聚的時光，都能帶來滿滿的感動。珍惜每一個微笑、每一次陪伴，讓生活充滿溫暖與喜悅，因為每一天，都值得留下最美好的回憶。",
  seriesImage3: "/images/fun-series3.jpg",
  seriesImage3Title: "樂系列",
  seriesImage3Text: "享受每一刻，讓生活充滿快樂！閱讀的悠閒午後、與家人一起看電影的歡笑、煙火下的美好瞬間，都是屬於自己的幸福時光。",
  seriesImage4: "/images/fun-series4.jpg",
  seriesImage4Title: "樂｜幸福，其實就在生活裡",
  seriesImage4Text: "最快樂的時光，不一定轟轟烈烈。有時候，一場音樂、一段聊天、一個微笑、一頓晚餐，就能讓平凡的一天變得特別。珍惜身邊的人，把握每一次相聚，讓歡笑成為每天最美的風景。",
  seriesImage5: "/images/fun-series5.jpg",
  seriesImage5Title: "樂｜快樂，其實很簡單",
  seriesImage5Text: "快樂不需要等待特別的日子，一次聚會、一場電影、一首喜歡的音樂，甚至一個燦爛的笑容，都能讓生活更加精彩。珍惜身邊的人，享受當下的每一刻，把平凡的日子過得充滿溫度，讓幸福陪伴每一天。",
  inlineImages: ["/images/fun-pain-patch.jpg", "/images/fun-shoe.jpg", "/images/fun-movie.jpg", "/images/fun-helmet.jpg", "/images/fun-series7.jpg", "/images/fun-series6.jpg", "/images/fun-series8.jpg", "/images/fun-series9.jpg", "/images/fun-series10.jpg", "/images/fun-series11.jpg", "/images/fun-series12.jpg", "/images/fun-series13.jpg", "/images/fun-series14.jpg"],
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
      id: "fun-safe-ride",
      h2: "安全出行｜戴上頭盔，平安是最大的幸福",
      content: [
        "不管是騎單車環島、機車兜風，還是各種戶外騎乘活動，戴上安全頭盔是對自己和家人最重要的承諾。安全不只是一種規定，更是一種對生命的尊重與愛護。",
        "每一次出行前戴上頭盔，就是告訴自己：我要好好的回家。平安出行，才能繼續享受生活中更多的美好與快樂。",
      ],
      imageAfter: true,
    },
    {
      id: "fun-adventure",
      h2: "🌈 樂｜把快樂分享給每一個人",
      content: [
        "和家人聊天、與朋友歡笑、陪伴毛小孩玩耍，每一個溫暖的瞬間，都會成為未來最珍貴的回憶。願今天的笑容，成為明天繼續前進的力量。",
        "✨ 幸福時光｜吃喝玩樂",
        "每一天，都值得留下最美好的回憶。",
      ],
      imageAfter: true,
    },
    {
      id: "fun-puppy",
      h2: "❤️【樂】最珍貴的是陪伴",
      content: [
        "一天的最後，和最愛的家人、小狗一起放鬆休息，就是最簡單的幸福。真正讓人難忘的，不是多麼精彩的安排，而是彼此陪伴的每一個瞬間。把握今天，也期待明天更多美好的故事。",
        "✨ 幸福時光｜吃喝玩樂",
        "每一天，都值得留下最美好的回憶。",
      ],
      imageAfter: true,
    },
    {
      id: "fun-series11",
      h2: "🌈【樂】夢幻童話｜躺在花海裡，讓快樂像彩虹一樣綻放",
      content: [
        "夕陽把天空染成金橘粉紫，熱氣球在遠方悠悠飄過，四周是一望無際的花海，蝴蝶在耳邊輕輕飛舞。躺下來，閉上眼，深呼吸——這一刻，整個世界都是你的。",
        "快樂不需要追趕，它就像這片花海一樣，靜靜地在你身邊盛開。願你隨時都能找到屬於自己的那一片夢幻天地，讓每一天都活得像童話一樣美麗。",
        "✨幸福時光｜吃喝玩樂",
        "每一天，都值得留下最美好的回憶。",
      ],
      imageAfter: true,
    },
    {
      id: "fun-series10",
      h2: "🐾【樂】毛小孩系列｜有牠在，家就是最溫暖的地方",
      content: [
        "回到家，牠第一個衝過來迎接你。不管今天多辛苦、多疲憊，看見那搖著尾巴的身影或是慵懶蜷縮在沙發角落的貓咪，一切都值得了。",
        "毛小孩不會說話，卻是最懂得陪伴的生命。牠們用全部的愛守著這個家，讓每一個平凡的夜晚，都充滿了無聲卻深厚的幸福。",
        "✨幸福時光｜吃喝玩樂",
        "每一天，都值得留下最美好的回憶。",
      ],
      imageAfter: true,
    },
    {
      id: "fun-series9",
      h2: "🏡【樂】溫馨故事｜陪伴，是最長情的告白",
      content: [
        "窩在沙發上，一家人蓋著毛毯看電影，爆米花的香味飄在空氣中，孩子的笑聲是今晚最美的背景音樂。不需要特別的地點，不需要特別的理由，只要在一起，就是最完整的快樂。",
        "生命中最珍貴的，不是去了多遠的地方，而是有多少個這樣的夜晚——平凡、溫暖、充滿愛。願每個家庭，都能擁有這樣的幸福時光。",
        "✨幸福時光｜吃喝玩樂",
        "每一天，都值得留下最美好的回憶。",
      ],
      imageAfter: true,
    },
    {
      id: "fun-series8",
      h2: "🌅 樂｜享受生活，每一刻的快樂",
      content: [
        "快樂，其實就在生活裡的每一個瞬間。",
        "聽一首喜歡的音樂、欣賞夕陽、參加節慶活動，或陪伴最愛的人，都能讓平凡的一天充滿幸福。願每一天都笑容滿滿，快樂相伴。",
        "✨幸福時光｜吃喝玩樂",
        "每一天，都值得留下最美好的回憶。",
      ],
      imageAfter: true,
    },
    {
      id: "fun-series14",
      h2: "🌅【樂】張開雙臂，擁抱每一個美好瞬間",
      content: [
        "面朝夕陽海景的陽台、手捧咖啡的愜意時光，彈著吉他沉浸在音符裡，一家人在草地上野餐歡笑，熱氣球漂浮在彩霞之中——這些畫面，就是「樂」最真實的模樣。",
        "快樂不需要理由，只需要你願意張開雙臂，去擁抱每一個當下。",
        "✨幸福時光｜吃喝玩樂",
        "每一天，都值得留下最美好的回憶。",
      ],
      imageAfter: true,
    },
    {
      id: "fun-series13",
      h2: "🌈《樂》系列｜真正的幸福，來自生活中的每一個小確幸",
      content: [
        "真正的幸福，來自生活中的每一個小確幸。",
        "陪伴家人、擁抱毛小孩、聽喜歡的音樂、欣賞美麗風景，每一個平凡的瞬間，都值得珍惜。願快樂常伴左右，讓幸福成為每天最自然的模樣。",
        "#幸福時光 #樂系列 #幸福生活 #溫暖陪伴 #每一天都值得回憶",
      ],
      imageAfter: true,
    },
    {
      id: "fun-series12",
      h2: "🎡【樂】生活的精彩，就藏在每一個當下",
      content: [
        "春日公園裡，一家四口吹著泡泡，孩子的笑聲是最美的背景音樂；夜晚KTV裡，朋友們高舉麥克風，忘掉所有煩惱；溫泉裡，讓疲憊在熱氣中緩緩散去；夜景山頂，靜靜俯瞰城市的燦爛燈火。",
        "快樂從來不是一種奢侈品，它就藏在家人的擁抱、朋友的歡笑、一個人安靜閱讀的片刻裡。找到屬於自己的樂趣，每天都是值得慶祝的日子。",
        "✨幸福時光｜吃喝玩樂",
        "每一天，都值得留下最美好的回憶。",
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
