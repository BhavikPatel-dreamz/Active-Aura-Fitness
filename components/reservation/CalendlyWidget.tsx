"use client";

import { InlineWidget } from "react-calendly";

export default function CalendlyWidget() {
  return (
    <div className="flex justify-center overflow-hidden">
      <div style={{ minWidth: "320px", height: "900px" }}>
        <InlineWidget
          url="https://calendly.com/harmeetsinghtalwar310/30min"
        />
      </div>
    </div>
  );
}

