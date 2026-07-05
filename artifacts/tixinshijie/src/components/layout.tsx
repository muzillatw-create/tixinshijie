import { Link, useLocation } from "wouter";
import { ShoppingCart, Zap, Search } from "lucide-react";
import { useCart } from "../lib/cart-context";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const stars = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 2,
}));

export function Layout({ children }: { children: React.ReactNode }) {
  const { quantity } = useCart();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col dark text-foreground overflow-x-hidden bg-[#07070f]">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {stars.map(s => (
          <div
            key={s.id}
            style={{
              position: "absolute",
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: "50%",
              backgroundColor: "white",
              animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#07070f]/95 border-b border-white/5 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Zap className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="currentColor" />
            <span className="font-bold text-lg tracking-widest text-white">貼心世界</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            {location === "/" ? (
              <>
                <button onClick={() => scrollTo("features")} className="hover:text-white transition-colors">產品特色</button>
                <button onClick={() => scrollTo("howto")} className="hover:text-white transition-colors">使用方法</button>
                <button onClick={() => scrollTo("testimonials")} className="hover:text-white transition-colors">用戶評價</button>
                <button onClick={() => scrollTo("contact")} className="hover:text-white transition-colors">聯絡我們</button>
              </>
            ) : (
              <>
                <Link href="/" className="hover:text-white transition-colors">產品特色</Link>
                <Link href="/" className="hover:text-white transition-colors">使用方法</Link>
                <Link href="/" className="hover:text-white transition-colors">用戶評價</Link>
                <Link href="/" className="hover:text-white transition-colors">聯絡我們</Link>
              </>
            )}
            <Link href="/about" className="hover:text-white transition-colors text-cyan-400 hover:text-cyan-300">品牌故事</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Search className="hidden md:block h-4 w-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Link href="/track" className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap">
              查詢訂單
            </Link>
            <Link href="/order" className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              {quantity > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-cyan-500 text-[10px] font-bold flex items-center justify-center text-black">
                  {quantity}
                </span>
              )}
            </Link>
            <Link href="/order">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-none border-0 text-sm px-4 h-9 cursor-pointer">
                立即訂購
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-white/5 bg-[#07070f] py-12 mt-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Zap className="h-7 w-7 text-cyan-400 mx-auto mb-6 opacity-40" fill="currentColor" />
          <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">產品特色</Link>
            <Link href="/about" className="hover:text-white transition-colors">品牌故事</Link>
            <Link href="/track" className="hover:text-white transition-colors">查詢訂單</Link>
            <Link href="/videos" className="hover:text-white transition-colors">影音觀看區</Link>
            <a href="#" className="hover:text-white transition-colors">隱私政策</a>
            <a href="#" className="hover:text-white transition-colors">服務條款</a>
          </div>
          <p className="text-gray-600 text-sm">
            © 2026 貼心世界. 保留所有權利.
          </p>
        </div>
      </footer>
    </div>
  );
}
