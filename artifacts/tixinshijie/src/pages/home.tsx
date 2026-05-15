import { Layout } from "../components/layout";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { Battery, Clock, Infinity as InfinityIcon, Sparkles, Droplets, Wind, Zap, CheckCircle2, ShieldCheck, Mail, Phone, Clock as ClockIcon } from "lucide-react";
import { useSendContactMessage, useListVideos, getListVideosQueryKey } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(1, "請輸入姓名"),
  email: z.string().email("請輸入有效的電子郵件"),
  message: z.string().min(1, "請輸入訊息"),
});

export default function Home() {
  const { toast } = useToast();
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
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            <span className="text-white">重新定義</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] to-[#0080ff]">
              吃喝玩樂
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            環境狀態優化貼片採用專利的奈米傳導技術 讓您在 1 分鐘內感受到穩定的能量補給
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/order">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-[#0080ff] text-primary-foreground font-bold text-lg px-8 py-6 shadow-[0_0_20px_rgba(0,212,255,0.4)] border-0">
                立即訂購
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-white/20 hover:bg-white/5">
              了解更多
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-destructive/10 border-y border-destructive/20 py-4 px-4 text-center">
        <p className="text-destructive font-medium text-sm md:text-base max-w-4xl mx-auto">
          本環境狀態優化貼片不適合直接貼在人體上是無效的 · 本產品非醫療器材 · 不具醫療效果 · 不可替代醫療行為 · 不可直接貼人體
        </p>
      </div>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">產品特色</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "即效能量補充", desc: "專利的科技貼片在一分鐘內即可感受到明顯的不同。" },
              { icon: Clock, title: "365天持續作用", desc: "持續 24 小時使用可讓你的新陳代謝穩定。" },
              { icon: Battery, title: "吃喝玩樂動起來", desc: "應用在各種生活物品上，效果極佳。" },
              { icon: InfinityIcon, title: "天馬行空的生活", desc: "貼片帶著走，想像過著神仙般的生活。" },
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card/50 backdrop-blur border border-card-border p-8 rounded-2xl flex flex-col items-center text-center hover:border-primary/50 transition-colors group"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">使用方法</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", icon: Sparkles, title: "貼片撕下", desc: "貼於物品的底部，不要貼在皮膚上面。" },
              { num: "02", icon: Wind, title: "乾燥無水", desc: "要在乾燥的地方貼上貼片，可重複使用。" },
              { num: "03", icon: Droplets, title: "感受效果", desc: "有含液體的物質等待一分鐘即可感受到口感的不同。" },
              { num: "04", icon: ClockIcon, title: "持續使用", desc: "每片效能為一年，效果奇佳。" }
            ].map((step, i) => (
              <div key={i} className="relative p-6 bg-card border border-card-border rounded-xl">
                <div className="text-4xl font-black text-white/5 absolute top-4 right-4">{step.num}</div>
                <step.icon className="h-8 w-8 text-primary mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card/30 border-t border-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">用戶評價</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "林小姐", role: "科技公司工程師", text: "女生的化妝品瓶瓶罐罐，貼片貼在底部，感覺皮膚變得很細緻，用後的效果極佳，整個人精神奕奕，是一個不錯的商品。" },
              { name: "陳先生", role: "馬拉松跑者", text: "跑步的時候喝了有環境狀態優化貼片的飲料水，刹那間察覺到能量在身上，可以很輕鬆地跑完全程。" },
              { name: "王太太", role: "三個孩子的媽媽", text: "身為家庭主婦，照顧小孩非常費體力，有了這個貼片，感覺思緒會非常清楚，所以也就不會那麼累了。" }
            ].map((t, i) => (
              <div key={i} className="p-8 bg-background border border-white/10 rounded-2xl relative">
                <div className="text-primary text-4xl font-serif absolute top-4 left-6 opacity-50">"</div>
                <p className="text-muted-foreground relative z-10 pt-4 mb-6 leading-relaxed text-sm md:text-base">{t.text}</p>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/5 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-black text-white mb-2">98<span className="text-primary">%</span></div>
              <div className="text-muted-foreground font-medium">顧客滿意度</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">50,000<span className="text-primary">+</span></div>
              <div className="text-muted-foreground font-medium">滿意用戶</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <ShieldCheck className="h-12 w-12 text-primary" />
              </div>
              <div className="text-xl font-bold text-white mb-1">SGS</div>
              <div className="text-muted-foreground font-medium">安全認證</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">環境狀態優化貼片</h2>
          <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-8">
            NT$ 1,688 <span className="text-xl text-muted-foreground font-medium">/ 盒</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> 效能一年
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> 3-5工作天到貨
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> SGS安全認證
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> 30天退換保障
            </span>
          </div>

          <Link href="/order">
            <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-[#0080ff] text-primary-foreground font-bold text-xl px-12 py-8 shadow-[0_0_30px_rgba(0,212,255,0.3)] border-0 rounded-full">
              前往結帳
            </Button>
          </Link>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-card/30 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="text-primary">▶</span> 影音觀看區
            </h2>
            <Link href="/videos">
              <Button variant="outline" className="border-white/20">查看全部</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos?.slice(0, 3).map((video) => (
              <div key={video.id} className="bg-background border border-white/10 rounded-xl overflow-hidden">
                <div className="aspect-video w-full bg-black">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={video.youtubeUrl.replace("watch?v=", "embed/")} 
                    title={video.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">{video.title}</h3>
                  {video.description && <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>}
                </div>
              </div>
            ))}
            {(!videos || videos.length === 0) && (
              <div className="col-span-full text-center py-12 text-muted-foreground border border-dashed border-white/20 rounded-xl">
                目前沒有影音內容
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8">聯絡我們</h2>
              <div className="space-y-6 text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-white">電話</div>
                    <div>02-89920958</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Email</div>
                    <div>xinan5788@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <ClockIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-white">服務時間</div>
                    <div>週一至週五 09:00–18:00</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-2xl border border-card-border">
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onSubmitContact)} className="space-y-4">
                  <FormField
                    control={contactForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">姓名</FormLabel>
                        <FormControl>
                          <Input placeholder="王大明" className="bg-background/50 border-white/10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">電子郵件</FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" className="bg-background/50 border-white/10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">訊息內容</FormLabel>
                        <FormControl>
                          <Textarea placeholder="請輸入您的問題或建議..." className="bg-background/50 border-white/10 min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-[#0080ff] text-primary-foreground font-bold mt-4" disabled={sendContact.isPending}>
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
