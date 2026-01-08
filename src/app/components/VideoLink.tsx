import { Card, CardContent } from "./ui/card";
import { Play, Clock, Minimize2, Maximize2 } from "lucide-react";
import type { VideoLink as VideoLinkType } from "../data/content";
import { useState } from "react";

interface VideoLinkProps {
  video: VideoLinkType;
}

export function VideoLink({ video }: VideoLinkProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Check if URL is YouTube
  const isYouTube = video.url.includes('youtube.com') || video.url.includes('youtu.be');
  
  // Get YouTube embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.includes('watch?v=') 
      ? url.split('watch?v=')[1]?.split('&')[0]
      : url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (isExpanded) {
    return (
      <Card className="border-2 border-primary/20 bg-card max-w-3xl mx-auto">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">
                {video.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {video.description}
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
            >
              <Minimize2 className="size-4" />
              Minimize
            </button>
          </div>
          
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {isYouTube ? (
              <iframe
                src={getYouTubeEmbedUrl(video.url)}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={video.url}
                controls
                className="absolute top-0 left-0 w-full h-full rounded-lg object-contain bg-black"
                controlsList="nodownload"
              />
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <button 
      onClick={() => setIsExpanded(true)}
      className="block w-full text-left"
    >
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {/* Video Icon */}
            <div className="relative flex-shrink-0">
              <div className="size-16 sm:size-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-0 group-hover:opacity-75"></div>
                <Play className="size-8 sm:size-10 text-primary fill-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                <Clock className="size-3" />
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold mb-1 text-lg group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {video.description}
              </p>
              <div className="mt-2 text-sm text-primary font-medium flex items-center gap-1">
                Watch Video
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}