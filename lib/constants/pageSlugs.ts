
export const PAGE_SLUGS = {
  LANDING: 'active-aura-fitness-landing-page',
  BOOK_FREE: 'book-your-free',
  RESERVATION: 'reservation-page',
} as const;

export type PageSlug =
  (typeof PAGE_SLUGS)[keyof typeof PAGE_SLUGS];
