'use client';

import { useEffect, useRef, useState } from "react";

interface AutoVideoProps {
  src: string;
  className?: string;
}

export default function AutoVideo({ src, className }: AutoVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Detect user interaction to "unlock" audio permission
    const handleInteraction = () => {
      setHasInteracted(true);
      // Remove listeners after first interaction
      window.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    window.addEventListener("mousedown", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    // 2. Intersection Observer to handle Viewport logic
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Attempt to play first
            const playPromise = video.play();

            if (playPromise !== undefined) {
              playPromise.then(() => {
                // Video is playing successfully
                if (hasInteracted) {
                  video.muted = false;
                  // Re-trigger play just in case unmuting caused a pause
                  video.play().catch(() => {}); 
                }
              }).catch((error) => {
                console.log("Autoplay waiting for interaction:", error);
              });
            }
          } else {
            // Mute when not visible, but keep it playing (or pause if you prefer)
            video.muted = true;
          }
        });
      },
      { threshold: 0.1 } // Trigger as soon as 10% is visible
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [hasInteracted]); // Re-run effect when hasInteracted changes

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      playsInline
      autoPlay
      controls
      muted // Stays muted until interaction + visibility
      preload="auto"
      className={className}
    />
  );
}