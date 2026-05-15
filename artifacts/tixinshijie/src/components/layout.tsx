import { Link, useLocation } from "wouter";
import { ShoppingCart, Zap } from "lucide-react";
import { useCart } from "../lib/cart-context";
import { Button } from "./ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const { quantity } = useCart();
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col dark text-foreground overflow-x-hidden">
      <div className="bg-primary/20 text-primary text-center py-2 text-sm font-medium tracking-wider flex items-center justify-center gap-2">
        <span className="text-lg">✦</span> 重新定義環境狀態優化貼片的思維
      </div>
      
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Zap className="h-6 w-6 text-primary group-hover:text-[#0080ff] transition-colors" fill="currentColor" />
            <span className="font-bold text-xl tracking-widest text-white">貼心世界</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-white transition-colors">產品特色</Link>
            <Link href="/" className="hover:text-white transition-colors">使用方法</Link>
            <Link href="/" className="hover:text-white transition-colors">用戶評價</Link>
            <Link href="/" className="hover:text-white transition-colors">聯絡我們</Link>
            <Link href="/track" className="hover:text-white transition-colors">查詢訂單</Link>
            <Link href="/videos" className="hover:text-white transition-colors">影音觀看區</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/order" className="relative inline-flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white hover:text-primary transition-colors" />
              {quantity > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground">
                  {quantity}
                </span>
              )}
            </Link>
            <Link href="/order">
              <Button className="hidden md:inline-flex bg-primary hover:bg-[#0080ff] text-primary-foreground font-bold shadow-[0_0_15px_rgba(0,212,255,0.3)] border-0">
                立即訂購
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-white/10 bg-background py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <Zap className="h-8 w-8 text-primary mx-auto mb-6 opacity-50" />
          <div className="flex justify-center gap-6 text-muted-foreground text-sm mb-8">
            <Link href="/" className="hover:text-white">產品特色</Link>
            <Link href="/track" className="hover:text-white">查詢訂單</Link>
            <a href="#" className="hover:text-white">隱私政策</a>
            <a href="#" className="hover:text-white">服務條款</a>
          </div>
          <p className="text-muted-foreground/60 text-sm">
            © 2026 貼心世界. 保留所有權利.
          </p>
        </div>
      </footer>
    </div>
  );
}
