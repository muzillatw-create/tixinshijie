import { Layout } from "../components/layout";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { ArrowLeft, BookOpen, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import heroImg from "@assets/吃喝玩樂2_1782913834937.jpg";

interface Article {
  id: number; category: string; title: string; date: string;
  heroImage: string; summary: string; content: string; images: string[];
}

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-8 px-4" onClick={onClose}>
      <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <img src={article.heroImage} alt={article.title} className="w-full aspect-video object-cover rounded-t-2xl" />
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3"><Calendar className="h-3 w-3" />{article.date}</div>
          <h2 className="text-xl font-bold text-white mb-4">{article.title}</h2>
          {article.content.split("\n").map((p, i) => p.trim() && <p key={i} className="text-gray-400 text-sm leading-relaxed mb-3">{p}</p>)}
          {article.images.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              {article.images.map((img, i) => <img key={i} src={img} alt="" className="w-full rounded-xl object-cover aspect-video" />)}
            </div>
          )}
          <Button onClick={onClose} variant="outline" className="mt-6 border-white/20 text-gray-300 hover:text-white">關閉</Button>
        </div>
      </div>
    </div>
  );
}

export default function DrinkPage() {
  const [selected, setSelected] = useState<Article | null>(null);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["articles", "drink"],
    queryFn: async () => {
      const res = await fetch("/api/articles?category=drink");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-20 min-h-[80vh]">
        <div className="mb-8">
          <Link href="/"><Button variant="outline" className="border-white/20 text-gray-300 hover:text-white gap-2"><ArrowLeft className="h-4 w-4" />返回首頁</Button></Link>
        </div>
        <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden mb-8">
          <img src={heroImg} alt="喝" className="w-full h-full object-cover" />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">☕ 喝</h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            想喝的每一口，都是對自己最好的照顧。從清晨的一杯咖啡到午後的一壺好茶，每一種飲品都有它獨特的魔力。
          </p>
        </div>
        {isLoading ? (
          <div className="text-center text-gray-500 py-12">載入中...</div>
        ) : articles.length === 0 ? (
          <div className="text-center text-gray-500 py-12">尚無文章</div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {articles.map((a) => (
              <div key={a.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-colors group">
                <div className="aspect-video overflow-hidden">
                  <img src={a.heroImage} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2"><Calendar className="h-3 w-3" />{a.date}</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{a.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{a.summary}</p>
                  <Button variant="outline" size="sm" onClick={() => setSelected(a)} className="border-white/20 text-gray-300 hover:text-white gap-2">
                    <BookOpen className="h-3 w-3" />閱讀更多
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selected && <ArticleModal article={selected} onClose={() => setSelected(null)} />}
    </Layout>
  );
}
