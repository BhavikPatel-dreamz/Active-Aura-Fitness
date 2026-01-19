"use client";

import { useEffect, useRef } from "react";

export default function AutoplayVideo({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try autoplay muted (required by browsers)
    video.muted = true;
    video.play().catch(() => {});

    // After user interaction → unmute + keep playing
    const enableSound = () => {
      video.muted = false;
      video.play().catch(() => {});
      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
      window.removeEventListener("scroll", enableSound);
    };

    window.addEventListener("click", enableSound);
    window.addEventListener("touchstart", enableSound);
    window.addEventListener("scroll", enableSound);
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      playsInline
      controls
      preload="auto"
      className={className}
    />
  );
}
