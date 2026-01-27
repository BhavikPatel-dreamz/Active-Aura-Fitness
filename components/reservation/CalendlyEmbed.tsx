// "use client";

// import { useEffect } from "react";

// export default function CalendlyEmbed() {
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const tryInit = () => {
//       if ((window as any).Calendly) {
//         (window as any).Calendly.initInlineWidgets();
//       }
//     };

//     // Try immediately
//     tryInit();

//     // Safety retry (script may finish loading slightly later)
//     const interval = setInterval(() => {
//       tryInit();
//     }, 300);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex justify-center overflow-hidden">
//       <div
//         className="calendly-inline-widget
//                    w-full
//                    max-w-5xl
//                    h-[650px]
//                    sm:h-[750px]
//                    lg:h-[900px]
//                    lg:w-[900px]"
//         data-url="https://calendly.com/harmeetsinghtalwar310/30min"
//       />
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Calendly?: any;
  }
}

export default function CalendlyEmbed() {
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const loadScript = () => {
      if (document.getElementById("calendly-script")) return;

      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src =
        "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    };

    const initCalendly = () => {
      if (window.Calendly?.initInlineWidgets) {
        window.Calendly.initInlineWidgets();
        clearInterval(interval);
      }
    };

    loadScript();

    // 🔁 Retry until Calendly is ready
    interval = setInterval(initCalendly, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center overflow-hidden">
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/harmeetsinghtalwar310/30min"
        style={{ minWidth: "320px", height: "900px" }}
      />
    </div>
  );
}


