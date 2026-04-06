type TrackEventOptions = {
  dedupeKey?: string;
  dedupeWindowMs?: number;
};

const DEFAULT_DEDUPE_WINDOW_MS = 1500;
const recentlyTrackedEvents = new Map<string, number>();

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