"use client";

import { useEffect } from "react";

let calendlyLoaded = false;

export default function CalendlyPreloader() {
  useEffect(() => {
    if (calendlyLoaded) return;

    const loadCalendly = () => {
      if (calendlyLoaded) return;

      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);

      calendlyLoaded = true;
    };

    // Load on first interaction
    ["scroll", "mousemove", "touchstart"].forEach((event) =>
      window.addEventListener(event, loadCalendly, { once: true })
    );

    // Fallback auto-load
    const timer = setTimeout(loadCalendly, 2000);

    return () => {
      ["scroll", "mousemove", "touchstart"].forEach((event) =>
        window.removeEventListener(event, loadCalendly)
      );
      clearTimeout(timer);
    };
  }, []);

  return null;
}
