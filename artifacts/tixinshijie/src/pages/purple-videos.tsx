import { Layout } from "../components/layout";
import { useListVideos } from "@workspace/api-client-react";
import { Clock, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "../components/ui/button";

const TOTAL_SLOTS = 19;

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

function PurpleVideoCard({ video }: {
  video: { id: number; youtubeUrl: string; title: string; description: string | null; createdAt: string }
}) {
  const thumbnail = getThumbnail(video.youtubeUrl);

  return (
    <a
      href={video.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#0d0d1a] border border-purple-500/20 rounded-2xl overflow-hidden hover:border-purple-400/60 transition-all group block"
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
        <h3 className="font-bold text-white mb-1 line-clamp-2 group-hover:text-purple-400 transition-colors text-sm">
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
    <div className="bg-[#0d0d1a] border border-purple-500/10 rounded-2xl overflow-hidden opacity-40">
      <div className="aspect-video w-full bg-white/3 flex items-center justify-center">
        <Clock className="h-8 w-8 text-purple-800" />
      </div>
      <div className="p-4">
        <div className="text-sm font-medium text-gray-600 mb-1">影片 #{index}</div>
        <div className="text-xs text-gray-700 bg-purple-500/5 border border-purple-500/10 rounded-lg px-2 py-1 inline-block">
          即將上架
        </div>
      </div>
    </div>
  );
}

export default function PurpleVideosPage() {
  const { data: videos, isLoading } = useListVideos({ category: "purple" });

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

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-purple-500/10 text-purple-400 mb-5">
            <span className="text-2xl">🟣</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            貼片使用方式和說明
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            紫色貼片完整使用教學與說明影片，深入了解環境狀態優化貼片的使用方法。
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500">
            <span className="h-2 w-2 rounded-full bg-purple-500 inline-block" />
            {realVideos.length} 支影片上架中
            <span className="mx-1">·</span>
            共 {TOTAL_SLOTS} 格
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500">載入中...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {realVideos.map((video) => (
              <PurpleVideoCard key={video.id} video={video} />
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
