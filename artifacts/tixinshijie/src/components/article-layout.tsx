import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export interface FaqItem { q: string; a: string; }
export interface ArticleSection {
  id: string;
  h2: string;
  content: string[];
  h3s?: { heading: string; content: string[] }[];
  imageAfter?: boolean;
}

export interface ArticleData {
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
  relatedLinks: string[];
  faq: FaqItem[];
}

const PLACEHOLDER_IMAGES = [
  "https://placehold.co/800x450/FFB400/ffffff?text=%E7%B2%BE%E5%BD%A9%E5%9C%96%E7%89%87+1",
  "https://placehold.co/800x450/6C63FF/ffffff?text=%E7%B2%BE%E5%BD%A9%E5%9C%96%E7%89%87+2",
  "https://placehold.co/800x450/F97316/ffffff?text=%E7%B2%BE%E5%BD%A9%E5%9C%96%E7%89%87+3",
];

const CATEGORY_NAMES: Record<string, string> = {
  eat: "吃", drink: "喝", play: "玩", fun: "樂",
};

export function ArticleLayout({ data }: { data: ArticleData }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = data.seoTitle;

    const upsertMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    const upsertOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
      el.content = content;
    };

    upsertMeta("description", data.metaDesc);
    upsertOg("og:title", data.seoTitle);
    upsertOg("og:description", data.metaDesc);
    upsertOg("og:type", "article");
    upsertOg("og:image", PLACEHOLDER_IMAGES[0]);

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.h1,
      description: data.metaDesc,
      image: PLACEHOLDER_IMAGES[0],
      datePublished: data.publishDate,
      publisher: {
        "@type": "Organization",
        name: "幸福時光｜吃喝玩樂",
      },
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };

    document.querySelectorAll("script[data-happiness-schema]").forEach((el) => el.remove());

    const s1 = document.createElement("script");
    s1.type = "application/ld+json";
    s1.setAttribute("data-happiness-schema", "article");
    s1.text = JSON.stringify(articleSchema);
    document.head.appendChild(s1);

    const s2 = document.createElement("script");
    s2.type = "application/ld+json";
    s2.setAttribute("data-happiness-schema", "faq");
    s2.text = JSON.stringify(faqSchema);
    document.head.appendChild(s2);

    return () => {
      document.querySelectorAll("script[data-happiness-schema]").forEach((el) => el.remove());
    };
  }, [data]);

  const { data: dbArticles = [] } = useQuery<{ id: number; title: string; summary: string; heroImage: string; date: string }[]>({
    queryKey: ["articles", data.categorySlug],
    queryFn: async () => {
      const res = await fetch(`/api/articles?category=${data.categorySlug}`);
      return res.ok ? res.json() : [];
    },
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  let imageIndex = 0;

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      {/* Breadcrumb */}
      <div className="bg-[#FFF9EE] border-b border-[#FFB400]/20 py-3">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#FFB400] transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />首頁
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#FFB400] font-medium">{data.categoryIcon} {data.category}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero Image */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-xl mb-8">
          <img
            src={data.heroSrc}
            alt={data.heroAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Category Badge + Title */}
        <div className="mb-8">
          <span
            className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-4"
            style={{ background: "#FFB400", color: "#fff" }}
          >
            {data.categoryIcon} {data.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight" style={{ color: "#222" }}>
            {data.h1}
          </h1>
          <p className="text-gray-500 text-sm">{data.publishDate} · 幸福時光｜吃喝玩樂</p>
          <div className="mt-4 h-1 w-16 rounded-full" style={{ background: "#FFB400" }} />
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_260px] gap-12 items-start">
          {/* Main Content */}
          <article>
            {/* Intro */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 border-l-4 pl-4" style={{ borderColor: "#FFB400" }}>
              {data.intro}
            </p>

            {/* Sections */}
            {data.sections.map((section, si) => {
              const imgSrc = section.imageAfter ? PLACEHOLDER_IMAGES[imageIndex++ % 3] : null;
              return (
                <section key={section.id} id={section.id} className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4" style={{ color: "#6C63FF" }}>
                    {section.h2}
                  </h2>
                  {section.content.map((para, pi) => (
                    <p key={pi} className="text-gray-700 leading-relaxed mb-4">{para}</p>
                  ))}
                  {section.h3s?.map((sub, hi) => (
                    <div key={hi} className="mb-4 ml-2">
                      <h3 className="text-lg font-semibold mb-2" style={{ color: "#FFB400" }}>{sub.heading}</h3>
                      {sub.content.map((p, pi) => (
                        <p key={pi} className="text-gray-700 leading-relaxed mb-3">{p}</p>
                      ))}
                    </div>
                  ))}
                  {imgSrc && (
                    <div className="my-6 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={imgSrc}
                        alt={`${data.category}精彩圖片 ${si + 1}`}
                        className="w-full aspect-video object-cover hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                      />
                      <p className="text-center text-xs text-gray-400 py-2 bg-gray-50">
                        ▲ 圖片說明文字（可替換為實際圖片）
                      </p>
                    </div>
                  )}
                </section>
              );
            })}

            {/* Brand Footer Strip */}
            <div
              className="rounded-2xl p-6 text-center my-12"
              style={{ background: "linear-gradient(135deg, #FFB400 0%, #FF8C00 100%)" }}
            >
              <p className="text-white font-bold text-xl mb-2">幸福時光｜吃喝玩樂</p>
              <p className="text-white/90 text-sm">每一天，都值得留下最美好的回憶。</p>
              <p className="text-white/70 text-xs mt-3">
                ※ 環境狀態優化貼片｜非藥品、非醫療器材，不直接貼於人體，適合使用於物品與環境表面。
              </p>
            </div>

            {/* DB Articles - Related */}
            {dbArticles.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6" style={{ color: "#6C63FF" }}>📚 更多精彩文章</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {dbArticles.map((a) => (
                    <div
                      key={a.id}
                      className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white cursor-pointer group"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={a.heroImage}
                          alt={a.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-gray-400 mb-1">{a.date}</p>
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#FFB400] transition-colors">{a.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{a.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Extended Reading Links */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-5" style={{ color: "#6C63FF" }}>🔗 延伸閱讀</h2>
              <ul className="space-y-2">
                {data.relatedLinks.map((link, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 hover:text-[#FFB400] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#FFB400" }} />
                    <span className="cursor-pointer hover:underline">{link}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{ color: "#6C63FF" }}>❓ 常見問題 FAQ</h2>
              <div className="space-y-4">
                {data.faq.map((item, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-semibold text-gray-800 bg-[#FFF9EE] hover:bg-[#FFB400]/10 transition-colors list-none">
                      <span className="flex items-center gap-3">
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                          style={{ background: "#6C63FF" }}
                        >
                          Q
                        </span>
                        {item.q}
                      </span>
                      <span className="text-[#FFB400] text-xl shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                    </summary>
                    <div className="px-6 py-4 bg-white">
                      <div className="flex gap-3">
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5"
                          style={{ background: "#FFB400" }}
                        >
                          A
                        </span>
                        <p className="text-gray-600 leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </article>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block sticky top-24">
            <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4" style={{ background: "#6C63FF" }}>
                <p className="text-white font-bold text-sm">📋 文章目錄</p>
              </div>
              <nav className="px-5 py-4 bg-white space-y-2">
                {data.sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="w-full text-left text-sm text-gray-600 hover:text-[#FFB400] transition-colors flex items-start gap-2 py-1"
                  >
                    <span className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: "#FFB400" }} />
                    {s.h2}
                  </button>
                ))}
                <hr className="my-2 border-gray-100" />
                <button
                  onClick={() => document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full text-left text-sm text-gray-600 hover:text-[#6C63FF] transition-colors flex items-start gap-2 py-1"
                >
                  <span className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: "#6C63FF" }} />
                  常見問題 FAQ
                </button>
              </nav>
            </div>

            {/* Category Nav Card */}
            <div className="mt-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4" style={{ background: "#FFB400" }}>
                <p className="text-white font-bold text-sm">🌟 探索更多</p>
              </div>
              <div className="p-3 bg-white space-y-1">
                {(["eat", "drink", "play", "fun"] as const).map((slug) => {
                  const labels = { eat: "🍜 吃", drink: "☕ 喝", play: "🌏 玩", fun: "🏡 樂" };
                  const isActive = slug === data.categorySlug;
                  return (
                    <Link
                      key={slug}
                      href={`/${slug}`}
                      className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      style={isActive ? { background: "#6C63FF" } : {}}
                    >
                      {labels[slug]}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom Brand Strip */}
      <div className="border-t border-gray-100 py-8 bg-[#FFF9EE]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="font-bold text-gray-800 mb-1">幸福時光｜吃喝玩樂</p>
          <p className="text-sm text-gray-500">每一天，都值得留下最美好的回憶。</p>
          <div className="flex justify-center gap-4 mt-4">
            {(["eat", "drink", "play", "fun"] as const).map((slug) => {
              const labels = { eat: "🍜 吃", drink: "☕ 喝", play: "🌏 玩", fun: "🏡 樂" };
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="text-sm text-gray-400 hover:text-[#FFB400] transition-colors"
                >
                  {labels[slug]}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
