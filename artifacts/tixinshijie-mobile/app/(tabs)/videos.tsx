import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { listVideos } from "@workspace/api-client-react";
import type { Video } from "@workspace/api-client-react";

function getYoutubeThumbnail(url: string): string {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  return "";
}

function getYoutubeUrl(url: string): string {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://www.youtube.com/watch?v=${match[1]}`;
  return url;
}

function VideoCard({ video }: { video: Video }) {
  const colors = useColors();
  const thumbUrl = getYoutubeThumbnail(video.youtubeUrl);
  const watchUrl = getYoutubeUrl(video.youtubeUrl);

  const handlePress = () => {
    if (Platform.OS === "web") {
      window.open(watchUrl, "_blank");
    } else {
      import("expo-linking").then((Linking) => Linking.openURL(watchUrl));
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.videoCard,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.9 : 1 },
      ]}
    >
      <View style={styles.thumbContainer}>
        {thumbUrl ? (
          <View style={[styles.thumbPlaceholder, { backgroundColor: colors.muted }]}>
            {/* React Native Web: use <img> via Image; native: expo-image */}
            <NativeThumb url={thumbUrl} />
          </View>
        ) : (
          <View style={[styles.thumbPlaceholder, { backgroundColor: colors.muted }]}>
            <MaterialCommunityIcons name="youtube" size={40} color={colors.primary} />
          </View>
        )}
        <View style={styles.playOverlay}>
          <View style={[styles.playBtn, { backgroundColor: colors.primary + "dd" }]}>
            <Ionicons name="play" size={20} color={colors.primaryForeground} />
          </View>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: colors.background + "cc" }]}>
          <Text style={[styles.categoryText, { color: colors.primary, fontFamily: "Inter_600SemiBold" }]}>
            {video.category}
          </Text>
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Text
          numberOfLines={2}
          style={[styles.videoTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}
        >
          {video.title}
        </Text>
        {video.description && (
          <Text numberOfLines={2} style={[styles.videoDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            {video.description}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

function NativeThumb({ url }: { url: string }) {
  const colors = useColors();
  if (Platform.OS === "web") {
    return (
      <img
        src={url}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        alt="video thumbnail"
      />
    );
  }
  const ExpoImage = require("expo-image").Image;
  return (
    <ExpoImage
      source={{ uri: url }}
      style={{ width: "100%", height: "100%" }}
      contentFit="cover"
      transition={200}
    />
  );
}

export default function VideosScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : 0;

  const { data: videos, isLoading, isError, refetch } = useQuery({
    queryKey: ["videos"],
    queryFn: () => listVideos(),
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 120 + (Platform.OS === "web" ? 34 : 0), paddingTop: topPad + insets.top + 16 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>影片介紹</Text>
        <Text style={[styles.pageSubtitle, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          了解貼片的科技與使用方式
        </Text>
      </View>

      {isLoading && (
        <View style={styles.center}>
          <View style={[styles.loadingSpinner, { borderColor: colors.primary }]} />
          <Text style={[styles.loadingText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            載入中...
          </Text>
        </View>
      )}

      {isError && (
        <View style={[styles.errorBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="alert-circle-outline" size={40} color="#ef4444" />
          <Text style={[styles.errorTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
            載入失敗
          </Text>
          <Pressable
            onPress={() => refetch()}
            style={[styles.retryBtn, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.retryText, { color: colors.primaryForeground, fontFamily: "Inter_600SemiBold" }]}>
              重試
            </Text>
          </Pressable>
        </View>
      )}

      {!isLoading && !isError && videos?.length === 0 && (
        <View style={[styles.emptyBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <MaterialCommunityIcons name="video-off-outline" size={48} color={colors.mutedForeground} />
          <Text style={[styles.emptyText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            目前暫無影片
          </Text>
        </View>
      )}

      {videos && videos.length > 0 && (
        <View style={styles.videoList}>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingBottom: 16 },
  pageTitle: { fontSize: 28, marginBottom: 4 },
  pageSubtitle: { fontSize: 14 },
  videoList: { paddingHorizontal: 16, gap: 16 },
  videoCard: { borderRadius: 20, borderWidth: 1, overflow: "hidden" },
  thumbContainer: { height: 200, position: "relative" },
  thumbPlaceholder: {
    width: "100%", height: "100%",
    alignItems: "center", justifyContent: "center", overflow: "hidden",
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center", justifyContent: "center",
  },
  playBtn: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center" },
  categoryBadge: { position: "absolute", top: 12, left: 12, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  categoryText: { fontSize: 12 },
  videoInfo: { padding: 16, gap: 6 },
  videoTitle: { fontSize: 16, lineHeight: 22 },
  videoDesc: { fontSize: 13, lineHeight: 18 },
  center: { padding: 60, alignItems: "center", gap: 12 },
  loadingSpinner: { width: 36, height: 36, borderRadius: 18, borderWidth: 3, borderTopColor: "transparent" },
  loadingText: { fontSize: 14 },
  errorBox: { margin: 16, padding: 40, borderRadius: 20, borderWidth: 1, alignItems: "center", gap: 12 },
  errorTitle: { fontSize: 16 },
  retryBtn: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 12 },
  retryText: { fontSize: 15 },
  emptyBox: { margin: 16, padding: 60, borderRadius: 20, borderWidth: 1, alignItems: "center", gap: 12 },
  emptyText: { fontSize: 15 },
});
