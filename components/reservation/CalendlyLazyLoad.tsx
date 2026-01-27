"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";


const CalendlyEmbed = dynamic(
  () => import("@/components/reservation/CalendlyEmbed"),
  { ssr: false }
);

export default function CalendlyLazyLoad() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(containerRef.current);
  }, []);

  return (
    <div ref={containerRef} >
      {shouldLoad ? (
  <CalendlyEmbed />
) : (
  <div className="flex justify-center py-20">
    <div className="w-full max-w-md h-[600px] rounded-xl bg-gray-100 animate-pulse" />
  </div>
)}
    </div>
  );
}
