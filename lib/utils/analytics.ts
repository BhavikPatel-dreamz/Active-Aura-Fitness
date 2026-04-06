type TrackEventOptions = {
  dedupeKey?: string;
  dedupeWindowMs?: number;
};

const DEFAULT_DEDUPE_WINDOW_MS = 1500;
const recentlyTrackedEvents = new Map<string, number>();
const STANDARD_META_EVENTS = new Set([
  "AddPaymentInfo",
  "AddToCart",
  "AddToWishlist",
  "CompleteRegistration",
  "Contact",
  "CustomizeProduct",
  "Donate",
  "FindLocation",
  "InitiateCheckout",
  "Lead",
  "PageView",
  "Purchase",
  "Schedule",
  "Search",
  "StartTrial",
  "SubmitApplication",
  "Subscribe",
  "ViewContent",
]);

export const trackEvent = (
  metaEvent: string,
  gaEvent: string,
  label: string,
  options?: TrackEventOptions
) => {
  if (typeof window !== "undefined") {
    const now = Date.now();
    const dedupeWindowMs = options?.dedupeWindowMs ?? DEFAULT_DEDUPE_WINDOW_MS;
    const dedupeKey = options?.dedupeKey ?? `${metaEvent}|${gaEvent}|${label}`;
    const lastTrackedAt = recentlyTrackedEvents.get(dedupeKey);

    if (lastTrackedAt && now - lastTrackedAt < dedupeWindowMs) {
      return;
    }

    recentlyTrackedEvents.set(dedupeKey, now);

    // Facebook Pixel
    if ((window as any).fbq) {
      const metaTrackMethod = STANDARD_META_EVENTS.has(metaEvent)
        ? "track"
        : "trackCustom";

      (window as any).fbq(metaTrackMethod, metaEvent);
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