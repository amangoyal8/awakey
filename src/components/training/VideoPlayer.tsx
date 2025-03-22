import { useState, useRef, useEffect } from "react";
import { PlayCircle, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  videoUrl: string;
  onTimeUpdate: (currentTime: number, duration: number) => void;
  onVideoEnded: () => void;
  lastPosition?: number;
  onPlay?: () => void;
  onPause?: () => void;
}

export function VideoPlayer({
  videoUrl,
  onTimeUpdate,
  onVideoEnded,
  lastPosition = 0,
  onPlay,
  onPause
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastAllowedTimeRef = useRef<number>(lastPosition); // To prevent skipping

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (lastPosition) video.currentTime = lastPosition;

      // Prevent playback speed change
      const handleRateChange = () => {
        if (video.playbackRate !== 1) {
          video.playbackRate = 1;
        }
      };
      video.addEventListener("ratechange", handleRateChange);

      return () => {
        video.removeEventListener("ratechange", handleRateChange);
      };
    }
  }, [lastPosition]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;
    const duration = video.duration;

    if (currentTime > lastAllowedTimeRef.current + 1) {
      video.currentTime = lastAllowedTimeRef.current;
      return;
    }

    if (!video.paused && currentTime > lastAllowedTimeRef.current) {
      lastAllowedTimeRef.current = currentTime;
      onTimeUpdate(currentTime, duration);
    }
  };

  const handleSeeking = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.currentTime > lastAllowedTimeRef.current + 1) {
      video.currentTime = lastAllowedTimeRef.current;
    }
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      onPause?.();
    } else {
      video.play();
      setIsPlaying(true);
      onPlay?.();
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-black">
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full max-h-[450px]"
          controls
          onTimeUpdate={handleTimeUpdate}
          onSeeking={handleSeeking}
          onSeeked={handleSeeking}
          onPlay={() => {
            setIsPlaying(true);
            onPlay?.();
          }}
          onPause={() => {
            setIsPlaying(false);
            onPause?.();
          }}
          onEnded={onVideoEnded}
        />
      ) : (
        <div className="w-full h-80 flex items-center justify-center bg-muted">
          <p>Video not available</p>
        </div>
      )}

      {/* Custom Play/Pause Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-4 right-4 rounded-full bg-background/80 hover:bg-background"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <PauseCircle className="h-6 w-6" />
        ) : (
          <PlayCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
