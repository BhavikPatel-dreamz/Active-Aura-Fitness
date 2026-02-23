export const trackEvent = (
  metaEvent: string,
  gaEvent: string,
  label: string
) => {
  if (typeof window !== "undefined") {
    // Facebook Pixel
    if ((window as any).fbq) {
      (window as any).fbq("track", metaEvent);
    }

    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag("event", gaEvent, {
        event_category: "engagement",
        event_label: label,
      });
    }
  }
};