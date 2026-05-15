import { Layout } from "../components/layout";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { Battery, Clock, Infinity as InfinityIcon, Sparkles, Droplets, Wind, Zap, ShoppingCart, ArrowRight, ChevronDown, Star, ShieldCheck, Mail, Phone, Clock as ClockIcon } from "lucide-react";
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
import eatingFun from "@assets/eating-fun2.png";
import productHero from "@assets/product-hero.png";
import noSkin from "@assets/no-skin.jpg";
import heroVideo from "@assets/mingzhiguang-video.mp4";
import glowingHandVideo from "@assets/glowing-hand-video.mp4";
import grokVideo from "@assets/grok_video.mp4";

const PRICE = 1688;

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
  { icon: Zap, title: "即效能量補充", desc: "專利的科技貼片在一分鐘內即可感受到明顯的不同。", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
  { icon: Clock, title: "365天持續作用", desc: "持續 24 小時使用可讓你的新陳代謝穩定。", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  { icon: Battery, title: "吃喝玩樂動起來", desc: "應用在各種生活物品上，效果極佳。", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
  { icon: InfinityIcon, title: "天馬行空的生活", desc: "貼片帶著走，想像過著神仙般的生活。", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
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

            <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">重新定義</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                吃喝玩樂
              </span>
            </motion.h1>

            <motion.div variants={item} className="mb-6">
              <video
                src={heroVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg"
              />
            </motion.div>

            <motion.div variants={item} className="mb-6">
              <img src={eatingFun} alt="吃喝玩樂 環境狀態優化貼片" className="w-full max-w-2xl mx-auto rounded-2xl" />
            </motion.div>

            <motion.div variants={item} className="mb-6">
              <img src={productHero} alt="命の光 環境狀態優化貼片" className="w-full max-w-2xl mx-auto rounded-2xl" />
            </motion.div>

            <motion.p variants={item} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              環境狀態優化貼片採用專利的奈米傳導技術 讓您在 1 分鐘內感受到穩定的能量補給。
            </motion.p>

            <motion.div variants={item} className="mb-8">
              <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-left">
                  <div className="text-xs text-gray-500">環境狀態優化貼片</div>
                  <div className="text-sm text-white font-medium">NT${PRICE.toLocaleString()} / 盒</div>
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
                  className="bg-white/10 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />加入購物車
                </button>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/order">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 text-lg h-auto group">
                  立即訂購 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
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
      </section>

      {/* Glowing hand video */}
      <section className="py-8 px-4 flex justify-center">
        <div className="w-full max-w-sm flex justify-center">
          <video
            src={glowingHandVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-h-[225px] object-contain rounded-2xl"
          />
        </div>
      </section>

      {/* Grok video */}
      <section className="py-8 px-4 flex justify-center">
        <div className="w-full max-w-sm">
          <video
            src={grokVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full max-h-[225px] object-contain rounded-2xl shadow-[0_0_60px_rgba(34,211,238,0.3)]"
          />
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
          <img src={noSkin} alt="本環境狀態優化貼片不適合直接貼在人體上是無效的" className="w-full rounded-2xl shadow-lg" />
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

      {/* Video Section */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-white">
              <span className="text-cyan-400">▶</span> 影音觀看區
            </h2>
            <Link href="/videos">
              <Button variant="outline" className="border-white/20 text-gray-300 hover:text-white">查看全部</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos?.slice(0, 3).map((video) => {
              const ytId = video.youtubeUrl.match(/shorts\/([^?&/]+)/)?.[1]
                ?? video.youtubeUrl.match(/youtu\.be\/([^?&/]+)/)?.[1]
                ?? video.youtubeUrl.match(/[?&]v=([^?&]+)/)?.[1];
              const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "";
              return (
                <a key={video.id} href={video.youtubeUrl} target="_blank" rel="noopener noreferrer"
                  className="bg-white/3 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-colors group block">
                  <div className="aspect-video w-full bg-black relative">
                    {thumb && <img src={thumb} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                      <div className="h-12 w-12 rounded-full bg-cyan-500/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-5 w-5 text-black ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white mb-1 line-clamp-2 group-hover:text-cyan-400 transition-colors">{video.title}</h3>
                    {video.description && <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>}
                  </div>
                </a>
              );
            })}
            {(!videos || videos.length === 0) && (
              <div className="col-span-full text-center py-12 text-gray-500 border border-dashed border-white/20 rounded-xl">
                目前沒有影音內容
              </div>
            )}
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

    </Layout>
  );
}
