import { Layout } from "../components/layout";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useEffect } from "react";
import heroImg from "@assets/吃喝玩樂3_1782913834937.jpg";

const articles = [
  {
    id: 1,
    title: "親近自然，放鬆身心——露營指南",
    summary: "走進戶外，呼吸新鮮空氣，感受陽光與微風。無論是露營、登山還是海邊散步，讓心靈回歸平靜，重新找回生活的能量。",
    tag: "戶外活動",
  },
  {
    id: 2,
    title: "探索世界，拓展視野——旅行的意義",
    summary: "每一次旅行，都是一次學習與成長。走訪不同的城市、體驗不同的文化，品嚐在地美食，讓生命充滿更多精彩的故事。",
    tag: "旅遊探索",
  },
  {
    id: 3,
    title: "享受運動，活力生活——高爾夫球場的寧靜",
    summary: "運動不值帶來健康，更帶來快樂與自信。無論是高爾夫、騎單車或健行，讓身體動起來，每天都充滿活力與正能量。",
    tag: "運動健康",
  },
  {
    id: 4,
    title: "週末小旅行：用兩天充電，迎接全新的一週",
    summary: "不需要遠行，一個週末的短途旅行就能讓身心煥然一新。帶著貼片出發，讓旅途中的每個時刻都舒適從容。",
    tag: "週末旅遊",
  },
];

export default function PlayPage() {
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
          <img src={heroImg} alt="玩" className="w-full h-full object-cover" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🌏 玩</h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            旅行，不只是移動，更是心靈的放鬆與成長。每一次探索，都是值得珍藏的回憶，讓生活充滿更多美好與可能！無論是親近大自然的露營、探索異國文化的旅行，還是享受運動帶來的活力，環境狀態優化貼片陪伴您，讓每一次的玩樂時光都更加盡興舒適。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {articles.map((a) => (
            <div key={a.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-colors group">
              <div className="aspect-video bg-gradient-to-br from-green-900/40 to-teal-900/40 flex items-center justify-center">
                <span className="text-5xl">🌏</span>
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
