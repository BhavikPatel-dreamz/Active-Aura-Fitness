"use client";

import { useEffect } from "react";

export default function CalendlyEmbed() {
  useEffect(() => {
    if (!document.getElementById("calendly-script")) {
      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
   
  return (
  <div className="flex justify-center overflow-hidden">
    <div
      className="calendly-inline-widget 
                 w-full 
                 max-w-5xl 
                 h-[650px] 
                 sm:h-[750px] 
                 lg:h-[900px]
                 lg:w-[900px]
                 "
      data-url="https://calendly.com/harmeetsinghtalwar310/30min"
    />
  </div>

  );
}
