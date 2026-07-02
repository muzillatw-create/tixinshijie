import { Layout } from "../components/layout";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useEffect } from "react";
import heroImg from "@assets/吃喝玩樂1_1782913834936.jpg";

const articles = [
  {
    id: 1,
    title: "牛肉麵裡的幸福——一碗麵的能量密碼",
    summary: "每一口熱騰騰的牛肉麵，都是對自己最溫柔的犒賞。搭配環境狀態優化貼片，讓每一餐都充滿能量與滿足感。",
    tag: "美食體驗",
  },
  {
    id: 2,
    title: "家常小菜的療癒力：與家人共桌的溫度",
    summary: "一道道家常料理，承載著記憶與情感。放慢腳步，細心品嚐，讓美食成為生活中最療癒的時刻。",
    tag: "家庭美食",
  },
  {
    id: 3,
    title: "火鍋季來臨！如何讓每次聚餐都元氣滿滿",
    summary: "天氣轉涼，火鍋飄香。與朋友圍爐共享，搭配貼片優化環境，讓聚餐氛圍更加舒適自在。",
    tag: "聚餐攻略",
  },
  {
    id: 4,
    title: "早餐的儀式感：從第一口開啟美好的一天",
    summary: "一頓用心準備的早餐，是對新的一天最好的宣言。選擇讓身體舒適的環境，從早晨就開始幸福。",
    tag: "日常飲食",
  },
];

export default function EatPage() {
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
          <img src={heroImg} alt="吃" className="w-full h-full object-cover" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🍜 吃</h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            美食，是生活中最簡單的幸福。無論是一碗熱騰騰的牛肉麵、家人圍坐的火鍋，還是街邊的一份小吃，每一口都承載著記憶與情感。我們相信，在舒適的環境中用餐，能讓每一頓飯都更加美味。環境狀態優化貼片陪伴您，從餐桌開始，感受生活的溫度與滿足。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {articles.map((a) => (
            <div key={a.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-colors group">
              <div className="aspect-video bg-gradient-to-br from-cyan-900/40 to-blue-900/40 flex items-center justify-center">
                <span className="text-5xl">🍜</span>
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
