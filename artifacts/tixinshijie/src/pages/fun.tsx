import { Layout } from "../components/layout";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useEffect } from "react";
import heroImg from "@assets/吃喝玩樂4_1782913834938.jpg";

const articles = [
  {
    id: 1,
    title: "放慢腳步，享受獨處時光",
    summary: "在忙碌的生活中，給自己一點空間與時間。閱讀一本喜歡的書，泡一杯熱茶，聽著輕音樂，讓心靈沉澱，重新找回平靜與力量。",
    tag: "慢活美學",
  },
  {
    id: 2,
    title: "休閒娛樂，豐富生活樂趣",
    summary: "看一場電影、追一部好劇，或是聽音樂、玩遊戲，都是生活的小確幸。適度的娛樂能讓我們釋放壓力，讓心情更愉快、生活更有活力。",
    tag: "生活娛樂",
  },
  {
    id: 3,
    title: "與家人共度幸福時光——家庭的力量",
    summary: "生活中最珍貴的，是與家人共享的每一個時刻。圍坐客廳、一起唱歌、共享美食，讓每一天都充滿幸福與溫暖。",
    tag: "家庭時光",
  },
  {
    id: 4,
    title: "營造舒適環境，提升生活品質",
    summary: "一個舒適的居家環境，是幸福生活的基礎。環境狀態優化貼片可貼於居家環境中的各種物品，陪伴您打造更舒適、安心的生活空間。",
    tag: "居家生活",
  },
];

export default function FunPage() {
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
          <img src={heroImg} alt="樂" className="w-full h-full object-cover" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🏡 樂</h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            生活中的每一刻，都值得用心感受。與家人共度時光、與自己好好相處，讓每一天都充滿幸福與快樂。無論是放慢腳步的獨處時光、豐富多彩的休閒娛樂，還是溫馨的家庭聚會，環境狀態優化貼片陪伴您的每一個角落，讓幸福時光延續每一天。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {articles.map((a) => (
            <div key={a.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-colors group">
              <div className="aspect-video bg-gradient-to-br from-purple-900/40 to-pink-900/40 flex items-center justify-center">
                <span className="text-5xl">🏡</span>
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
