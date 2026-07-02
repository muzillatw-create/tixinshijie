import { Layout } from "../components/layout";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useEffect } from "react";
import heroImg from "@assets/吃喝玩樂2_1782913834937.jpg";

const articles = [
  {
    id: 1,
    title: "一杯好茶，讓心靜下來",
    summary: "茶，陪伴我們度過忙碌的每一刻。無論是清香的綠茶、回甘的烏龍茶，一壺好茶配上貼片的能量支持，讓每個下午時光都成為享受。",
    tag: "茶飲文化",
  },
  {
    id: 2,
    title: "療癒系飲品推薦：珍奶、果汁、氣泡飲",
    summary: "各種繽紛的飲品，總能滿足不同的心情。與朋友聊天、與家人分享，讓每一次的飲品時光，都變成幸福的回憶。",
    tag: "飲品推薦",
  },
  {
    id: 3,
    title: "咖啡提神術：如何讓一杯咖啡發揮最大效果",
    summary: "一杯好咖啡不只是提神，更是一種生活態度。搭配環境狀態優化貼片，讓身體在最佳狀態下，品味每一口香醇。",
    tag: "咖啡時光",
  },
  {
    id: 4,
    title: "精緻生活從品味開始——紅酒與慢生活",
    summary: "飲品不只是解渴，更是一種生活美學。在舒適的環境中，細細品味一杯好酒，感受生活的精緻與從容。",
    tag: "品味生活",
  },
];

export default function DrinkPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-20 min-h-[80vh]">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="border-white/20 text-gray-300 hover:text-white gap-2">
              <ArrowLeft className="h-4 w-4" />返回首頁
            </Button>
          </Link>
        </div>

        <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden mb-8">
          <img src={heroImg} alt="喝" className="w-full h-full object-cover" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">☕ 喝</h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            想喝的每一口，都是對自己最好的照顧。從清晨的一杯咖啡到午後的一壺好茶，從朋友聚會的珍珠奶茶到夜晚的一杯紅酒，每一種飲品都有它獨特的魔力。環境狀態優化貼片不直接接觸飲品，貼於杯具、桌面等環境，陪伴您享受每一口美好時光。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {articles.map((a) => (
            <div key={a.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-colors group">
              <div className="aspect-video bg-gradient-to-br from-amber-900/40 to-orange-900/40 flex items-center justify-center">
                <span className="text-5xl">☕</span>
              </div>
              <div className="p-6">
                <span className="text-xs text-cyan-400 border border-cyan-500/30 rounded-full px-2 py-0.5 mb-3 inline-block">{a.tag}</span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{a.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{a.summary}</p>
                <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:text-white gap-2">
                  <BookOpen className="h-3 w-3" />閱讀更多
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
