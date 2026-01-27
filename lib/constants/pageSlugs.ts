
export const PAGE_SLUGS = {
  LANDING: 'active-aura-fitness-landing-page',
  BOOK_FREE: 'book-your-free',
  RESERVATION: 'reservation-page',
} as const;

export const QUIZ_SLUGS = {
  FEEL_CONFIDENT: 'feel-confident-again',
  IMPROVE_ENERGY: 'improve-energy',
  LOSE_WEIGHT: 'lose-weight',
  REDUCE_BELLY: 'reduce-belly-fat',
} as const;



export type PageSlug =
  (typeof PAGE_SLUGS)[keyof typeof PAGE_SLUGS];

export type QuizSlug =
  (typeof QUIZ_SLUGS)[keyof typeof QUIZ_SLUGS];
