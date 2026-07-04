import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, ChevronRight, List } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";

export interface FaqItem { q: string; a: string; }

export interface ArticleSection {
  id: string;
  h2: string;
  content: string[];
  h3s?: { heading: string; content: string[] }[];
  imageAfter?: boolean;
}

export interface ArticleDarkData {
  seoTitle: string;
  metaDesc: string;
  category: string;
  categorySlug: "eat" | "drink" | "play" | "fun";
  categoryIcon: string;
  h1: string;
  heroSrc: string;
  heroAlt: string;
  publishDate: string;
  intro: string;
  sections: ArticleSection[];
  inlineImages?: (string | null)[];
  relatedLinks: string[];
  faq: FaqItem[];
}

const NAV_ORDER: ArticleDarkData["categorySlug"][] = ["eat", "drink", "play", "fun"];
const NAV_LABELS: Record<string, string> = { eat: "🍜 吃", drink: "☕ 喝", play: "🌏 玩", fun: "🏡 樂" };
const NAV_TITLES: Record<string, string> = {
  eat: "每一口美食，都是幸福時光的開始",
  drink: "品味每一杯飲品，享受生活的每一刻",
  play: "探索世界，留下最美好的回憶",
  fun: "享受生活，創造屬於自己的幸福",
};

const PLACEHOLDER_IMGS = [
  { label: "精彩圖片 1", color: "from-cyan-900/30 to-blue-900/20" },
  { label: "精彩圖片 2", color: "from-purple-900/30 to-indigo-900/20" },
  { label: "精彩圖片 3", color: "from-teal-900/30 to-cyan-900/20" },
];

function ImagePlaceholder({ index, alt }: { index: number; alt: string }) {
  const ph = PLACEHOLDER_IMGS[index % PLACEHOLDER_IMGS.length];
  return (
    <div className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${ph.color} border border-white/10 flex flex-col items-center justify-center gap-3 my-6`}>
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
        <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-gray-500 text-sm">{alt || ph.label}</p>
      <p className="text-gray-600 text-xs">圖片說明（可替換為實際圖片）</p>
    </div>
  );
}

interface DbArticle { id: number; title: string; summary: string; heroImage: string; date: string; }

export function ArticleDark({ data }: { data: ArticleDarkData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [tocOpen, setTocOpen] = useState(false);

  const currentIdx = NAV_ORDER.indexOf(data.categorySlug);
  const prevSlug = NAV_ORDER[(currentIdx + 3) % 4];
  const nextSlug = NAV_ORDER[(currentIdx + 1) % 4];

  // SEO
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = data.seoTitle;
    const set = (name: string, content: string, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        prop ? el.setAttribute("property", name) : (el.name = name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    set("description", data.metaDesc);
    set("og:title", data.seoTitle, true);
    set("og:description", data.metaDesc, true);
    set("og:type", "article", true);

    document.querySelectorAll("script[data-cat-schema]").forEach(e => e.remove());

    const articleSchema = {
      "@context": "https://schema.org", "@type": "Article",
      headline: data.h1, description: data.metaDesc, datePublished: data.publishDate,
      publisher: { "@type": "Organization", name: "貼心世界" },
    };
    const faqSchema = {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: data.faq.map(f => ({
        "@type": "Question", name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    [articleSchema, faqSchema].forEach(schema => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-cat-schema", "1");
      s.text = JSON.stringify(schema);
      document.head.appendChild(s);
    });
    return () => document.querySelectorAll("script[data-cat-schema]").forEach(e => e.remove());
  }, [data]);

  const { data: dbArticles = [] } = useQuery<DbArticle[]>({
    queryKey: ["articles", data.categorySlug],
    queryFn: async () => {
      const res = await fetch(`/api/articles?category=${data.categorySlug}`);
      return res.ok ? res.json() : [];
    },
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  };

  const tocItems = data.sections.map(s => ({ id: s.id, label: s.h2 }));
  let imgIdx = 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />首頁
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-cyan-400">{data.categoryIcon} {data.category}</span>
      </nav>

      {/* Hero Image */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-xl shadow-black/40">
        <img src={data.heroSrc} alt={data.heroAlt} className="w-full h-full object-cover" loading="lazy" />
      </div>

      {/* Category Badge + H1 */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 bg-cyan-500/20 text-cyan-400 text-sm font-medium px-3 py-1 rounded-full mb-4">
          {data.categoryIcon} {data.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">{data.h1}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>{data.publishDate}</span>
          <span>·</span>
          <span>貼心世界</span>
        </div>
        <div className="mt-4 h-px bg-gradient-to-r from-cyan-500/40 via-white/5 to-transparent" />
      </div>

      {/* Mobile TOC toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setTocOpen(!tocOpen)}
          className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-cyan-500/40 transition-colors"
        >
          <span className="flex items-center gap-2"><List className="h-4 w-4 text-cyan-400" />文章目錄</span>
          <span className={`transition-transform ${tocOpen ? "rotate-180" : ""}`}>▼</span>
        </button>
        {tocOpen && (
          <div className="mt-2 rounded-xl bg-white/5 border border-white/10 p-4 space-y-1">
            {tocItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="w-full text-left text-sm text-gray-400 hover:text-cyan-400 transition-colors py-1.5 flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-cyan-500 mt-2 shrink-0" />{item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_240px] gap-10 items-start">
        {/* ── Main Article ── */}
        <article>
          {/* Intro */}
          <p className="text-gray-300 text-lg leading-relaxed mb-10 border-l-2 border-cyan-500 pl-4">
            {data.intro}
          </p>

          {/* Sections */}
          {data.sections.map((section) => {
            const showImg = section.imageAfter;
            const currentImgIdx = showImg ? imgIdx++ : -1;
            return (
              <section key={section.id} id={section.id} className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full bg-cyan-500 shrink-0" />
                  {section.h2}
                </h2>
                {section.content.map((para, pi) => (
                  <p key={pi} className="text-gray-400 leading-relaxed mb-4">{para}</p>
                ))}
                {section.h3s?.map((sub, hi) => (
                  <div key={hi} className="mb-5 ml-4 pl-4 border-l border-white/10">
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">{sub.heading}</h3>
                    {sub.content.map((p, pi) => (
                      <p key={pi} className="text-gray-400 leading-relaxed mb-3">{p}</p>
                    ))}
                  </div>
                ))}
                {showImg && (() => {
                  const imgUrl = data.inlineImages?.[currentImgIdx];
                  return imgUrl
                    ? (
                      <div className="w-full aspect-video overflow-hidden rounded-2xl my-6 shadow-lg">
                        <img src={imgUrl} alt={`${data.category}精彩圖片 ${currentImgIdx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    )
                    : <ImagePlaceholder index={currentImgIdx} alt={`${data.category}精彩圖片 ${currentImgIdx + 1}`} />;
                })()}
              </section>
            );
          })}

          {/* Brand Strip */}
          <div className="my-10 rounded-2xl bg-gradient-to-r from-cyan-900/30 to-blue-900/20 border border-cyan-500/20 p-6 text-center">
            <p className="text-white font-bold text-lg mb-1">幸福時光｜吃喝玩樂</p>
            <p className="text-gray-400 text-sm">每一天，都值得留下最美好的回憶。</p>
            <p className="text-gray-600 text-xs mt-2">※ 環境狀態優化貼片｜非藥品、非醫療器材，不直接貼於人體，適合使用於物品與環境表面。</p>
          </div>

          {/* DB Articles */}
          {dbArticles.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-cyan-400" />更多精彩文章
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {dbArticles.map(a => (
                  <div key={a.id} className="min-w-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all hover:-translate-y-0.5 group">
                    <div className="w-full aspect-video overflow-hidden">
                      <img src={a.heroImage || undefined} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar className="h-3 w-3" />{a.date}</p>
                      <h3 className="font-bold text-white text-sm mb-2 group-hover:text-cyan-400 transition-colors">{a.title}</h3>
                      <p className="text-gray-400 text-xs line-clamp-2">{a.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Extended Reading */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">🔗 延伸閱讀</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 grid sm:grid-cols-2 gap-2">
              {data.relatedLinks.map((link, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer text-sm py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />{link}
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-5">❓ 常見問題 FAQ</h2>
            <div className="space-y-3">
              {data.faq.map((item, i) => (
                <div key={i} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0">Q</span>
                      <span className="text-gray-200 font-medium text-sm">{item.q}</span>
                    </div>
                    <span className={`text-cyan-400 text-lg shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 flex gap-3">
                      <span className="w-7 h-7 rounded-full bg-white/10 text-gray-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">A</span>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Prev / Next */}
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
            <Link href={`/${prevSlug}`}>
              <div className="group flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-cyan-500/40 transition-all cursor-pointer">
                <ArrowLeft className="h-4 w-4 text-cyan-400 shrink-0 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">上一篇</p>
                  <p className="text-sm text-gray-300 font-medium group-hover:text-cyan-400 transition-colors line-clamp-2">{NAV_TITLES[prevSlug]}</p>
                </div>
              </div>
            </Link>
            <Link href={`/${nextSlug}`}>
              <div className="group flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-cyan-500/40 transition-all cursor-pointer text-right justify-end">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">下一篇</p>
                  <p className="text-sm text-gray-300 font-medium group-hover:text-cyan-400 transition-colors line-clamp-2">{NAV_TITLES[nextSlug]}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-cyan-400 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </article>

        {/* ── Desktop Sidebar ── */}
        <aside className="hidden lg:block sticky top-24 space-y-5">
          {/* TOC */}
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2">
              <List className="h-4 w-4 text-cyan-400" />
              <span className="text-white text-sm font-bold">文章目錄</span>
            </div>
            <nav className="p-4 space-y-1">
              {tocItems.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  className="w-full text-left text-sm text-gray-400 hover:text-cyan-400 transition-colors flex items-start gap-2 py-1.5">
                  <span className="w-1 h-1 rounded-full bg-cyan-500 mt-2 shrink-0" />{item.label}
                </button>
              ))}
              <hr className="border-white/10 my-2" />
              <button onClick={() => scrollTo("faq-anchor")}
                className="w-full text-left text-sm text-gray-400 hover:text-cyan-400 transition-colors flex items-start gap-2 py-1.5">
                <span className="w-1 h-1 rounded-full bg-cyan-500 mt-2 shrink-0" />常見問題 FAQ
              </button>
            </nav>
          </div>

          {/* Category Nav */}
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <div className="px-5 py-3 border-b border-white/10">
              <span className="text-white text-sm font-bold">探索分類</span>
            </div>
            <div className="p-3 space-y-1">
              {NAV_ORDER.map(slug => (
                <Link key={slug} href={`/${slug}`}>
                  <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                    slug === data.categorySlug
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                  }`}>
                    {NAV_LABELS[slug]}
                    {slug === data.categorySlug && <span className="ml-auto text-xs opacity-60">目前</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Back to Home */}
          <Link href="/">
            <Button variant="outline" className="w-full border-white/20 text-gray-300 hover:text-white hover:border-white/40 gap-2">
              <ArrowLeft className="h-4 w-4" />返回首頁
            </Button>
          </Link>
        </aside>
      </div>
    </div>
  );
}
