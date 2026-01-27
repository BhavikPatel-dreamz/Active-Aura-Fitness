// lib/quizCache.ts

import type { QuizQuestion } from '../lib/types';

const quizCache = new Map<string, QuizQuestion[]>();

export function getCachedQuiz(slug: string) {
  return quizCache.get(slug);
}

export function setCachedQuiz(slug: string, questions: QuizQuestion[]) {
  quizCache.set(slug, questions);
}
