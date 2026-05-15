import { Layout } from "../components/layout";
import { useListVideos } from "@workspace/api-client-react";
import { Play, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "../components/ui/button";

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

function getEmbedUrl(url: string): string {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : "";
}

function getThumbnail(url: string): string {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

function VideoCard({ video }: { video: { id: number; youtubeUrl: string; title: string; description: string | null; createdAt: string } }) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = getEmbedUrl(video.youtubeUrl);
  const thumbnail = getThumbnail(video.youtubeUrl);

  return (
    <div className="bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-colors group">
      <div className="aspect-video w-full bg-black relative cursor-pointer" onClick={() => setPlaying(true)}>
        {playing && embedUrl ? (
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <>
            {thumbnail && (
              <img
                src={thumbnail}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
              <div className="h-16 w-16 rounded-full bg-cyan-500/90 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform">
                <Play className="h-7 w-7 text-black ml-1" />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">{video.title}</h3>
        {video.description && (
          <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm">
            {video.description}
          </p>
        )}
        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-muted-foreground/60">
          發布於 {new Date(video.createdAt).toLocaleDateString('zh-TW')}
        </div>
      </div>
    </div>
  );
}

export default function VideosPage() {
  const { data: videos, isLoading } = useListVideos();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-20 min-h-[80vh]">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="border-white/20 text-gray-300 hover:text-white gap-2">
              <ArrowLeft className="h-4 w-4" />
              返回首頁
            </Button>
          </Link>
        </div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-cyan-500/10 text-cyan-400 mb-6">
            <Play className="h-8 w-8 ml-1" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">影音觀看區</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            透過我們的精選影音，深入了解環境狀態優化貼片的作用原理與使用成效。
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500">載入中...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos?.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
            {(!videos || videos.length === 0) && (
              <div className="col-span-full text-center py-24 border border-dashed border-white/20 rounded-2xl text-gray-500">
                目前沒有影音內容
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
