import { Layout } from "../components/layout";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { Battery, Clock, Infinity as InfinityIcon, Zap, ShoppingCart, ArrowRight, ChevronDown, Star, Mail, Phone, Clock as ClockIcon } from "lucide-react";
import { useSendContactMessage, useListVideos, getListVideosQueryKey } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import { useCart } from "../lib/cart-context";
import { useState } from "react";
import newVideo1 from "@assets/介紹99_compressed.mp4";

import bannerPurple from "@assets/bannerPurple.jpg";
import bannerHappiness from "@assets/bannerHappiness.jpg";
import bannerHappinessHero from "@assets/home-paragliding.jpg";
import bannerPrice from "@assets/bannerPrice.jpg";

const PRICE = 880;

const contactSchema = z.object({
  name: z.string().min(1, "請輸入姓名"),
  email: z.string().email("請輸入有效的電子郵件"),
  message: z.string().min(1, "請輸入訊息"),
});

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const features = [
  { icon: Zap, title: "即效能量補充", desc: "採用專利科技設計，使用方式簡單便利，可輕鬆應用於日常生活與各種環境。許多使用者表示，在使用後短時間內即可感受到環境氛圍與使用體驗有所不同。無論是工作、休閒、旅行或居家時光，都能陪伴您迎接每一天，讓生活多一份安心與舒適。", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
  { icon: Clock, title: "365天持續陪伴", desc: "採用耐用設計，無需充電、無需耗材，日常使用更輕鬆便利。適合搭配居家、辦公、旅行等多元生活情境，長時間陪伴您的每一天，讓生活更加從容自在。", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  { icon: Battery, title: "吃喝玩樂動起來", desc: "靈活應用於各種生活用品與日常環境，輕鬆融入吃、喝、玩、樂的每一個生活場景。簡單使用，陪伴您探索更多美好時光，讓每一天都充滿活力與樂趣。", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
  { icon: InfinityIcon, title: "天馬行空的生活", desc: "帶著貼片一起出發，把美好的想像融入每一段旅程。無論山林、海邊、城市或遠方，都能自在探索、留下珍貴回憶，讓每一天都充滿期待與驚喜。", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
];

const howToSteps = [
  { num: "01", title: "貼片撕下", desc: "貼於物品的底部，不要貼在皮膚上面。" },
  { num: "02", title: "乾燥無水", desc: "要在乾燥的地方貼上貼片，可重複使用。" },
  { num: "03", title: "感受效果", desc: "有含液體的物質等待一分鐘即可感受到口感的不同。" },
  { num: "04", title: "持續使用", desc: "每片效能為一年，效果奇佳。" }
];

const testimonials = [
  { name: "林小姐", role: "科技公司工程師", text: "女生的化妝品瓶瓶罐罐，貼片貼在底部，感覺皮膚變得很細緻，用後的效果極佳，整個人精神奕奕，是一個不錯的商品。", rating: 5 },
  { name: "陳先生", role: "馬拉松跑者", text: "跑步的時候喝了有環境狀態優化貼片的飲料水，刹那間察覺到能量在身上，可以很輕鬆地跑完全程。", rating: 5 },
  { name: "王太太", role: "三個孩子的媽媽", text: "身為家庭主婦，照顧小孩非常費體力，有了這個貼片，感覺思緒會非常清楚，所以也就不會那麼累了。", rating: 5 }
];

const stats = [
  { value: "98%", label: "顧客滿意度" },
  { value: "50,000+", label: "滿意用戶" },
  { value: "SGS", label: "安全認證" }
];

export default function Home() {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const sendContact = useSendContactMessage();
  const { data: videos } = useListVideos({ query: { enabled: true, queryKey: getListVideosQueryKey() } });

  const onSubmitContact = (data: z.infer<typeof contactSchema>) => {
    sendContact.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "發送成功", description: "我們已收到您的訊息，將盡快回覆。" });
        contactForm.reset();
      },
      onError: () => {
        toast({ title: "發送失敗", description: "請稍後再試", variant: "destructive" });
      }
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/4 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #00ffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative text-center max-w-4xl mx-auto w-full">
          <motion.div initial="hidden" animate="visible" variants={container}>

            <motion.div variants={item}>
              <span className="inline-block mb-6 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full px-4 py-1.5 text-sm font-medium">
                ✦ 重新定義環境狀態優化貼片的思維
              </span>
            </motion.div>

            <motion.div variants={item} className="mb-4">
              <img
                src="/images/happiness-banner.jpg"
                alt="幸福時光 吃喝玩樂 美好生活"
                className="w-full max-w-lg mx-auto rounded-2xl object-cover"
              />
            </motion.div>

            <motion.div variants={item} className="mb-6">
              <img src="/images/home-banner2.jpg" alt="我們的每一天都值得回憶" className="w-full max-w-lg mx-auto rounded-2xl object-cover" />
            </motion.div>

            <motion.div variants={item} className="mb-8 w-full max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-2 items-start">
                <Link href="/happiness" className="block">
                  <img src="/images/side-video1-thumb.jpg" alt="幸福時光" className="w-full rounded-2xl cursor-pointer hover:opacity-90 transition-opacity" />
                  <p className="text-center text-cyan-400 text-sm mt-1 animate-pulse">👆 點擊進入</p>
                </Link>
                <Link href="/purple-videos" className="block">
                  <img src={bannerPurple} alt="貼片使用方式和說明" className="w-full rounded-2xl cursor-pointer hover:opacity-90 transition-opacity" />
                  <p className="text-center text-cyan-400 text-sm mt-1 animate-pulse">👆 點擊進入</p>
                </Link>
                <Link href="/order" className="block">
                  <img src="/images/side-video2-thumb.jpg" alt="立即訂購" className="w-full rounded-2xl cursor-pointer hover:opacity-90 transition-opacity" />
                  <p className="text-center text-cyan-400 text-sm mt-1 animate-pulse">👆 點擊進入</p>
                </Link>
              </div>
            </motion.div>

            <motion.div variants={item} className="mb-4 text-center">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-3 text-white mb-4">
                <span className="text-cyan-400">▶</span> 影音觀看區
              </h2>
              <Link href="/videos">
                <Button variant="outline" className="border-white/20 text-gray-300 hover:text-white cursor-pointer">查看全部影片</Button>
              </Link>
              <p className="text-cyan-400 text-sm mt-2 animate-pulse">👆 點擊進入</p>
            </motion.div>

            <motion.div variants={item} className="flex justify-center mb-4">
              <Link href="/order">
                <Button size="lg" className="relative bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-10 py-5 text-xl h-auto group shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:shadow-[0_0_45px_rgba(6,182,212,0.8)] transition-all duration-300 animate-pulse-slow cursor-pointer">
                  立即訂購 <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={item} className="mb-10 w-full max-w-2xl mx-auto">
              <img src="/images/eat-series6.jpg" alt="幸福時光 好味時刻" className="w-full rounded-2xl object-cover" />
              <div className="mt-3 text-left px-1">
                <h3 className="text-white font-bold text-lg mb-1">🐾 吃｜連毛小孩都知道，吃飯是一天中最幸福的事</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-1">看著牠專注享用每一口的模樣，讓人不禁會心一笑。吃，從來不只是填飽肚子，更是一種純粹的快樂與滿足。</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">學牠一樣，放下雜念，好好品味眼前的美好，讓每一口都成為今天最暖心的回憶。</p>
                <p className="text-cyan-400/70 text-xs">#幸福時光 #吃出幸福 #毛小孩 #生活日常 #每一天都值得回憶</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="mb-10 w-full max-w-2xl mx-auto">
              <img src="/images/drink-series9.jpg" alt="幸福時光 品味好時光" className="w-full rounded-2xl object-cover" />
              <div className="mt-3 text-left px-1">
                <h3 className="text-white font-bold text-lg mb-1">🍵 喝｜一杯好飲品，品出生活的滋味</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-1">茶藝館裡的一壺清茶、搖曳燭光下的一杯紅酒、純白杯中的溫醇牛奶——每一種飲品，都有屬於自己的故事與溫度。</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">停下來，為自己倒一杯喜歡的飲品，讓心情也跟著慢下來，好好感受這片刻的寧靜與幸福。</p>
                <p className="text-cyan-400/70 text-xs">#幸福時光 #喝出好心情 #茶藝 #品味生活 #每一天都值得回憶</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="mb-10 w-full max-w-2xl mx-auto">
              <img src="/images/play-series7.jpg" alt="幸福時光 玩樂時光" className="w-full rounded-2xl object-cover" />
              <div className="mt-3 text-left px-1">
                <h3 className="text-white font-bold text-lg mb-1">🚴 玩｜動起來，讓生活充滿活力與驚喜</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-1">騎著腳踏車迎風而行、在球場上揮出完美一桿、划著船感受水面的輕盈——每一種玩法，都是與生活最直接的對話。</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">身體動起來，心情也跟著飛揚。把每一次活動都變成值得回味的精彩時光。</p>
                <p className="text-cyan-400/70 text-xs">#幸福時光 #玩出精彩 #腳踏車 #高爾夫 #每一天都值得回憶</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="mb-10 w-full max-w-2xl mx-auto">
              <img src="/images/fun-series7.jpg" alt="幸福時光 樂活時光" className="w-full rounded-2xl object-cover" />
              <div className="mt-3 text-left px-1">
                <h3 className="text-white font-bold text-lg mb-1">🎈 樂｜生活的樂趣，就在每一次出發裡</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-1">乘著熱氣球俯瞰大地、划船穿越靜謐水道、騎單車馳騁山林、在星空下紮營入眠——每一種體驗，都讓心靈更加自由豐富。</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">人生最美好的事，就是不斷去嘗試、去感受、去享受。願每一次出發，都帶回滿滿的快樂與感動。</p>
                <p className="text-cyan-400/70 text-xs">#幸福時光 #快樂生活 #熱氣球 #露營 #每一天都值得回憶</p>
              </div>
            </motion.div>

            <motion.div variants={item} className="mb-10 w-full max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-white text-center mb-4">探索更多幸福生活</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { href: "/eat", emoji: "🍜", label: "吃", color: "from-cyan-900/50 to-blue-900/50 border-cyan-500/30 hover:border-cyan-400" },
                  { href: "/drink", emoji: "☕", label: "喝", color: "from-amber-900/50 to-orange-900/50 border-amber-500/30 hover:border-amber-400" },
                  { href: "/play", emoji: "🌏", label: "玩", color: "from-green-900/50 to-teal-900/50 border-green-500/30 hover:border-green-400" },
                  { href: "/fun", emoji: "🏡", label: "樂", color: "from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:border-purple-400" },
                ].map(({ href, emoji, label, color }) => (
                  <Link key={href} href={href}>
                    <div className={`bg-gradient-to-br ${color} border rounded-2xl p-6 text-center cursor-pointer transition-all hover:scale-105`}>
                      <div className="text-4xl mb-2">{emoji}</div>
                      <div className="text-xl font-bold text-white">{label}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Brand story card */}
            <motion.div variants={item} className="mb-10 w-full max-w-2xl mx-auto">
              <Link href="/about">
                <div className="relative overflow-hidden border border-cyan-500/20 rounded-2xl p-6 bg-gradient-to-br from-[#041530]/80 to-[#07070f]/80 hover:border-cyan-500/50 transition-all cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">✨</div>
                    <div className="text-left">
                      <div className="text-xs text-cyan-400 font-medium mb-1 uppercase tracking-widest">關於我們</div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">品牌故事</h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                        從服飾到貼片，我們只想做一件事——讓生活更便利、更有質感。了解貼心世界的初心與理念。
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.p variants={item} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              環境狀態優化貼片採用專利的奈米傳導技術 讓您在 1 分鐘內感受到穩定的能量補給。
            </motion.p>

            <motion.div variants={item} className="mb-8">
              <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-left">
                  <div className="text-xs text-gray-500">環境狀態優化貼片</div>
                  <div className="text-xs text-gray-500 line-through">NT$1,288 / 盒</div>
                  <div className="text-sm text-cyan-400 font-bold">促銷價 NT$880 / 盒</div>
                </div>
                <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-cyan-500/20 flex items-center justify-center transition-colors text-white"
                  >−</button>
                  <span className="w-6 text-center font-bold text-white">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-cyan-500/20 flex items-center justify-center transition-colors text-white"
                  >+</button>
                </div>
                <button
                  onClick={() => { addToCart(qty); toast({ title: "已加入購物車", description: `已加入 ${qty} 盒` }); }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-2 rounded-xl transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.5)] cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />加入購物車
                </button>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex justify-center mb-16">
              <Button variant="outline" size="lg" className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5 px-8 py-4 text-lg h-auto">
                了解更多 <ChevronDown className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">產品特色</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-card/50 border ${f.border} p-6 rounded-2xl flex flex-col items-center text-center hover:border-opacity-80 transition-colors group`}
              >
                <div className={`h-14 w-14 rounded-full ${f.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <f.icon className={`h-7 w-7 ${f.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="max-w-2xl mx-auto mt-12">
          <video src={newVideo1} autoPlay muted loop playsInline className="w-full rounded-2xl" />
        </div>
      </section>

      {/* How to use */}
      <section id="howto" className="py-24 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">使用方法</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howToSteps.map((step, i) => (
              <div key={i} className="relative p-6 bg-card border border-white/10 rounded-xl">
                <div className="text-4xl font-black text-white/5 absolute top-4 right-4">{step.num}</div>
                <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                  <span className="text-cyan-400 font-bold text-sm">{step.num}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No-skin Disclaimer Section */}
      <section className="px-4 pb-8">
        <div className="max-w-3xl mx-auto">
          <img src="/images/disclaimer-thumb.jpg" alt="貼片使用警語" className="w-full rounded-2xl shadow-lg mb-4" />
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {["本產品非醫療器材","不具醫療效果","不可替代醫療行為","不可直接貼人體"].map(t => (
              <div key={t} className="bg-red-950/50 border border-red-700/40 rounded-xl px-3 py-2">
                <span className="text-red-400 text-sm font-semibold">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">用戶評價</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 bg-white/3 border border-white/10 rounded-2xl relative">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed text-sm">{t.text}</p>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white">聯絡我們</h2>
              <div className="space-y-6 text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">電話</div>
                    <div>02-89920958</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Email</div>
                    <div>xinan5788@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <ClockIcon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">服務時間</div>
                    <div>週一至週五 09:00–18:00</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/3 p-8 rounded-2xl border border-white/10">
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onSubmitContact)} className="space-y-4">
                  <FormField control={contactForm.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">姓名</FormLabel>
                      <FormControl><Input placeholder="王大明" className="bg-white/5 border-white/10" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={contactForm.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">電子郵件</FormLabel>
                      <FormControl><Input placeholder="example@email.com" className="bg-white/5 border-white/10" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={contactForm.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">訊息內容</FormLabel>
                      <FormControl><Textarea placeholder="請輸入您的問題或建議..." className="bg-white/5 border-white/10 min-h-[120px]" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold mt-4" disabled={sendContact.isPending}>
                    {sendContact.isPending ? "發送中..." : "送出訊息"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky bottom buy bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#020d1f] via-[#041530] to-[#020d1f] backdrop-blur-md border-t border-cyan-500/50 px-4 py-3 flex items-center justify-between gap-3 sm:hidden shadow-[0_-4px_24px_rgba(6,182,212,0.2)]">
        <div className="flex items-center gap-2">
          <span className="animate-pulse bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">限時促銷</span>
          <div className="text-left">
            <div className="text-xs text-gray-400 line-through">NT$1,288</div>
            <div className="text-base font-bold text-cyan-300">NT$880 / 盒</div>
          </div>
        </div>
        <Link href="/order" className="flex-shrink-0">
          <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 text-base h-auto animate-pulse-slow cursor-pointer">
            立即訂購 <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </Link>
      </div>

    </Layout>
  );
}
