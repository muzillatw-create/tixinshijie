import { Layout } from "../components/layout";
import { useListVideos } from "@workspace/api-client-react";
import { Clock, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import bannerHappiness from "@assets/file_000000004b607209a451854b99a6b587_1782656449153.png";

const TOTAL_SLOTS = 50;

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const shorts = url.match(/youtube\.com\/shorts\/([^?&/]+)/);
  if (shorts) return shorts[1];
  const short = url.match(/youtu\.be\/([^?&/]+)/);
  if (short) return short[1];
  const watch = url.match(/[?&]v=([^?&]+)/);
  if (watch) return watch[1];
  return null;
}

function getThumbnail(url: string): string {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

function VideoCard({ video }: {
  video: { id: number; youtubeUrl: string; title: string; description: string | null; createdAt: string }
}) {
  const thumbnail = getThumbnail(video.youtubeUrl);

  return (
    <a
      href={video.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#0d0d1a] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all group block"
    >
      <div className="aspect-video w-full bg-black relative">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white mb-1 line-clamp-2 group-hover:text-cyan-400 transition-colors text-sm">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-xs text-gray-500 line-clamp-2">{video.description}</p>
        )}
        <div className="mt-3 pt-3 border-t border-white/5 text-xs text-gray-600">
          {new Date(video.createdAt).toLocaleDateString('zh-TW')}
        </div>
      </div>
    </a>
  );
}

function PlaceholderCard({ index }: { index: number }) {
  return (
    <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl overflow-hidden opacity-50">
      <div className="aspect-video w-full bg-white/3 flex items-center justify-center">
        <Clock className="h-8 w-8 text-gray-600" />
      </div>
      <div className="p-4">
        <div className="text-sm font-medium text-gray-600 mb-1">影片 #{index}</div>
        <div className="text-xs text-gray-700 bg-white/5 border border-white/5 rounded-lg px-2 py-1 inline-block">
          即將上架
        </div>
      </div>
    </div>
  );
}

export default function HappinessPage() {
  const { data: videos, isLoading } = useListVideos({ category: "happiness" });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const realVideos = videos ?? [];
  const placeholderCount = Math.max(0, TOTAL_SLOTS - realVideos.length);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-20 min-h-[80vh]">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="border-white/20 text-gray-300 hover:text-white gap-2">
              <ArrowLeft className="h-4 w-4" />
              返回首頁
            </Button>
          </Link>
        </div>

        <div className="mb-10">
          <img src={bannerHappiness} alt="幸福時光" className="w-full max-w-3xl mx-auto rounded-2xl object-cover block" />
          <div className="mt-4 text-center inline-flex items-center gap-2 text-sm text-gray-500 w-full justify-center">
            <span className="h-2 w-2 rounded-full bg-cyan-500 inline-block" />
            {realVideos.length} 支影片上架中
            <span className="mx-1">·</span>
            共 {TOTAL_SLOTS} 格
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500">載入中...</div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {realVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
            {Array.from({ length: placeholderCount }, (_, i) => (
              <PlaceholderCard key={`ph-${i}`} index={realVideos.length + i + 1} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
