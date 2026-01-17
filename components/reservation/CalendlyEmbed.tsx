"use client";

import { useEffect } from "react";

export default function CalendlyEmbed() {
  useEffect(() => {
    const existingScript = document.getElementById("calendly-script");

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/harmeetsinghtalwar310/30min"
      style={{
        minWidth: "520px",
        height: "800px",
      }}
    />
  );
}
