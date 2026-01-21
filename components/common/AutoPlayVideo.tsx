'use client';

import { useEffect, useRef } from "react";

interface AutoVideoProps {
  src: string;
  className?: string;
}

export default function AutoVideo({ src, className }: AutoVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // The browser will allow play WITH sound only after interaction
    const enableSound = () => {
      video.muted = false;   // unmute
      video.play().catch(() => {});
      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
    };

    window.addEventListener("click", enableSound);
    window.addEventListener("touchstart", enableSound);

    return () => {
      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      playsInline
      controls
      autoPlay
      muted  
      preload="auto"
      className={className}
    />
  );
}
