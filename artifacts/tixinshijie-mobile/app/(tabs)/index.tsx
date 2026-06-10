import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const { width } = Dimensions.get("window");

const FEATURES = [
  {
    icon: "flash" as const,
    title: "能量提升",
    desc: "在1分鐘內優化物品能量狀態，讓您感受顯著差異",
  },
  {
    icon: "heart-pulse" as const,
    title: "代謝穩定",
    desc: "促進新陳代謝平衡，支持身體自然活力",
  },
  {
    icon: "shield-check" as const,
    title: "科技驗證",
    desc: "奈米導電技術，通過多項科學測試驗證",
  },
  {
    icon: "star-four-points" as const,
    title: "多元應用",
    desc: "適用於保養品、飲品、運動裝備等各類物品",
  },
];

const TESTIMONIALS = [
  { name: "陳小姐", text: "用了一週後感覺精神好很多，朋友都說我氣色變好了！", rating: 5 },
  { name: "林先生", text: "貼在運動水壺上，運動後恢復速度確實快了不少。", rating: 5 },
  { name: "王女士", text: "半信半疑試了看看，沒想到效果這麼明顯，已經回購第三次了。", rating: 5 },
];

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  const colors = useColors();
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }], width: (width - 48) / 2 }}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <View style={[styles.featureIcon, { backgroundColor: colors.primary + "22" }]}>
          <MaterialCommunityIcons name={icon as any} size={24} color={colors.primary} />
        </View>
        <Text style={[styles.featureTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>{title}</Text>
        <Text style={[styles.featureDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>{desc}</Text>
      </Pressable>
    </Animated.View>
  );
}

function TestimonialCard({ name, text, rating }: { name: string; text: string; rating: number }) {
  const colors = useColors();
  return (
    <View style={[styles.testimonialCard, { backgroundColor: colors.card, borderColor: colors.border, width: width - 64 }]}>
      <View style={styles.stars}>
        {Array.from({ length: rating }).map((_, i) => (
          <Ionicons key={i} name="star" size={14} color={colors.primary} />
        ))}
      </View>
      <Text style={[styles.testimonialText, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}>"{text}"</Text>
      <Text style={[styles.testimonialName, { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" }]}>— {name}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : 0;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 120 + (Platform.OS === "web" ? 34 : 0) }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <LinearGradient
        colors={["#0d1220", "#07070f"]}
        style={[styles.hero, { paddingTop: topPad + insets.top + 24 }]}
      >
        <View style={styles.glowDot1} />
        <View style={styles.glowDot2} />
        <View style={styles.heroBadge}>
          <MaterialCommunityIcons name="atom" size={14} color={colors.primary} />
          <Text style={[styles.heroBadgeText, { color: colors.primary, fontFamily: "Inter_500Medium" }]}>
            奈米導電科技
          </Text>
        </View>
        <Text style={[styles.heroTitle, { fontFamily: "Inter_700Bold" }]}>
          <Text style={{ color: colors.primary }}>貼心</Text>
          <Text style={{ color: colors.foreground }}>世界</Text>
        </Text>
        <Text style={[styles.heroSubtitle, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}>
          環境狀態優化貼片
        </Text>
        <Text style={[styles.heroDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          只需 1 分鐘，即可優化物品能量狀態{"\n"}提升活力、穩定代謝、改善體感
        </Text>
        <Pressable
          onPress={() => router.push("/(tabs)/order")}
          style={({ pressed }) => [
            styles.ctaButton,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
          testID="cta-order-btn"
        >
          <Ionicons name="bag-add" size={18} color={colors.primaryForeground} />
          <Text style={[styles.ctaText, { color: colors.primaryForeground, fontFamily: "Inter_700Bold" }]}>
            立即訂購
          </Text>
        </Pressable>
      </LinearGradient>

      {/* Features */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          產品特色
        </Text>
        <View style={styles.featureGrid}>
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
          ))}
        </View>
      </View>

      {/* How it works */}
      <View style={[styles.howSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold", marginBottom: 16 }]}>
          使用方式
        </Text>
        {[
          { step: "1", text: "取出貼片，撕開背膠" },
          { step: "2", text: "貼於物品表面（保養品、飲品、裝備）" },
          { step: "3", text: "靜置 1 分鐘，讓能量場穩定" },
          { step: "4", text: "正常使用，感受明顯差異" },
        ].map((item) => (
          <View key={item.step} style={styles.stepRow}>
            <View style={[styles.stepNum, { backgroundColor: colors.primary }]}>
              <Text style={[styles.stepNumText, { color: colors.primaryForeground, fontFamily: "Inter_700Bold" }]}>
                {item.step}
              </Text>
            </View>
            <Text style={[styles.stepText, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}>
              {item.text}
            </Text>
          </View>
        ))}
      </View>

      {/* Testimonials */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          使用者心得
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </ScrollView>
      </View>

      {/* CTA bottom */}
      <View style={[styles.bottomCta, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.bottomCtaTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            現在就體驗
          </Text>
          <Text style={[styles.bottomCtaDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            免費超商取貨，貨到付款
          </Text>
        </View>
        <Pressable
          onPress={() => router.push("/(tabs)/order")}
          style={({ pressed }) => [
            styles.smallCta,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text style={[styles.smallCtaText, { color: colors.primaryForeground, fontFamily: "Inter_700Bold" }]}>
            訂購
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { padding: 24, paddingBottom: 40, overflow: "hidden" },
  glowDot1: {
    position: "absolute", top: 60, right: -40, width: 200, height: 200,
    borderRadius: 100, backgroundColor: "#00d4ff14",
  },
  glowDot2: {
    position: "absolute", top: 120, left: -60, width: 160, height: 160,
    borderRadius: 80, backgroundColor: "#0080ff0d",
  },
  heroBadge: {
    flexDirection: "row", alignItems: "center", gap: 6,
    alignSelf: "flex-start", backgroundColor: "#00d4ff18",
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 16,
  },
  heroBadgeText: { fontSize: 12, letterSpacing: 1 },
  heroTitle: { fontSize: 48, lineHeight: 56, marginBottom: 4 },
  heroSubtitle: { fontSize: 18, marginBottom: 12, letterSpacing: 2 },
  heroDesc: { fontSize: 15, lineHeight: 24, marginBottom: 28 },
  ctaButton: {
    flexDirection: "row", alignItems: "center", gap: 8,
    paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14,
    alignSelf: "flex-start",
  },
  ctaText: { fontSize: 16 },
  section: { paddingHorizontal: 16, paddingTop: 32 },
  sectionTitle: { fontSize: 20, marginBottom: 16 },
  featureGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  featureCard: {
    padding: 16, borderRadius: 16, borderWidth: 1, gap: 10,
  },
  featureIcon: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  featureTitle: { fontSize: 15 },
  featureDesc: { fontSize: 13, lineHeight: 18 },
  howSection: {
    margin: 16, marginTop: 32, padding: 20, borderRadius: 20, borderWidth: 1,
  },
  stepRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 14 },
  stepNum: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  stepNumText: { fontSize: 13 },
  stepText: { fontSize: 15, flex: 1 },
  stars: { flexDirection: "row", gap: 2, marginBottom: 10 },
  testimonialCard: { padding: 20, borderRadius: 20, borderWidth: 1 },
  testimonialText: { fontSize: 14, lineHeight: 22, marginBottom: 10 },
  testimonialName: { fontSize: 13 },
  bottomCta: {
    flexDirection: "row", alignItems: "center", margin: 16, marginTop: 32,
    padding: 20, borderRadius: 20, borderWidth: 1, gap: 16,
  },
  bottomCtaTitle: { fontSize: 17, marginBottom: 4 },
  bottomCtaDesc: { fontSize: 13 },
  smallCta: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  smallCtaText: { fontSize: 15 },
});
