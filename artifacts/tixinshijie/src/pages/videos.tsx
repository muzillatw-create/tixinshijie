import { Layout } from "../components/layout";
import { useListVideos } from "@workspace/api-client-react";
import { Play } from "lucide-react";

export default function VideosPage() {
  const { data: videos, isLoading } = useListVideos();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 min-h-[80vh]">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
            <Play className="h-8 w-8 ml-1" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">影音觀看區</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            透過我們的精選影音，深入了解環境狀態優化貼片的作用原理與使用成效。
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">載入中...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos?.map((video) => (
              <div key={video.id} className="bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group">
                <div className="aspect-video w-full bg-black relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={video.youtubeUrl.replace("watch?v=", "embed/")} 
                    title={video.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                    className="absolute inset-0"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
                  {video.description && (
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {video.description}
                    </p>
                  )}
                  <div className="mt-4 pt-4 border-t border-white/10 text-xs text-muted-foreground/60">
                    發布於 {new Date(video.createdAt).toLocaleDateString('zh-TW')}
                  </div>
                </div>
              </div>
            ))}
            {(!videos || videos.length === 0) && (
              <div className="col-span-full text-center py-24 border border-dashed border-white/20 rounded-2xl text-muted-foreground">
                目前沒有影音內容
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
