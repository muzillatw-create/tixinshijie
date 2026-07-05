import { Layout } from "../components/layout";
import { Link } from "wouter";
import { Zap, ArrowRight, Heart, Lightbulb, Star } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function AboutPage() {
  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-32 px-4">
        <motion.div
          className="max-w-2xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Header */}
          <motion.div variants={item} className="text-center mb-16">
            <span className="inline-block mb-4 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full px-4 py-1.5 text-sm font-medium">
              關於我們
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              品牌故事
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              每一段旅程，都從一個簡單的想法開始。
            </p>
          </motion.div>

          {/* Story section 1 */}
          <motion.div variants={item} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-white">品牌創立的初衷</h2>
            </div>
            <div className="border-l-2 border-cyan-500/30 pl-6 ml-5 space-y-4 text-gray-300 leading-relaxed">
              <p>
                品牌創立的初衷，來自一個簡單的想法：希望透過日常用品，讓生活變得更便利、更有質感。
              </p>
            </div>
          </motion.div>

          {/* Story section 2 */}
          <motion.div variants={item} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-bold text-white">從服飾到貼片的轉變</h2>
            </div>
            <div className="border-l-2 border-purple-500/30 pl-6 ml-5 space-y-4 text-gray-300 leading-relaxed">
              <p>
                最初，我們曾經嘗試以服飾作為產品方向，希望將理念融入穿著之中。然而，隨著開發的深入，我們發現服飾需要面對款式、尺寸、季節、庫存等龐大的管理問題，不僅成本高，也難以讓更多人輕鬆使用。
              </p>
              <p>
                經過長時間的研究與思考，我們決定改變方向，選擇以小巧、方便、不受尺寸限制的貼片作為核心產品。貼片更容易搭配各種生活用品與日常環境，無論是在家中、辦公室，或外出旅行，都能輕鬆使用，也讓品牌理念更容易融入每一天的生活。
              </p>
            </div>
          </motion.div>

          {/* Story section 3 */}
          <motion.div variants={item} className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-white">持續前進的初心</h2>
            </div>
            <div className="border-l-2 border-amber-500/30 pl-6 ml-5 space-y-4 text-gray-300 leading-relaxed">
              <p>
                我們相信，真正好的設計，不一定要複雜，而是能自然地陪伴生活、帶來便利與美感。
              </p>
              <p>
                因此，我們持續以這份初心前進，希望透過每一項產品，傳遞對生活品質的重視，陪伴大家一起創造更多美好的幸福時光。
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            {[
              { label: "便利", desc: "小巧貼片，融入每天生活", color: "border-cyan-500/30 bg-cyan-500/5" },
              { label: "品質", desc: "對每項產品精益求精", color: "border-purple-500/30 bg-purple-500/5" },
              { label: "幸福", desc: "陪你創造美好生活時光", color: "border-amber-500/30 bg-amber-500/5" },
            ].map(({ label, desc, color }) => (
              <div key={label} className={`border rounded-2xl p-5 text-center ${color}`}>
                <div className="text-2xl font-bold text-white mb-2">{label}</div>
                <div className="text-sm text-gray-400">{desc}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={item} className="text-center">
            <p className="text-gray-400 mb-6">想體驗貼片帶來的生活改變？</p>
            <Link href="/order">
              <button className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition-colors cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.5)]">
                立即訂購 <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
