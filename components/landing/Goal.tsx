'use client';

import { useState, useCallback } from 'react';
import QuizSection from '@/components/quiz/QuizSection';
import type { QuizSlug } from '@/lib/constants/pageSlugs';
import { normalizeKey } from '@/lib/utils/normalizeKey';
import { setCachedQuiz, getCachedQuiz } from '@/lib/quizCache';
import { getQuizQuestions } from '@/lib/api';

type Goal = {
  text: string;
  value: string;
};

export default function Goals({
  goals,
  quizMap,
  onSelectGoal
}: {
  goals: Goal[];
  quizMap: Record<string, QuizSlug>;
  onSelectGoal: (slug: QuizSlug) => void;
}) {

  const prefetchQuiz = useCallback(async (slug: QuizSlug) => {
    if (getCachedQuiz(slug)) return;

    try {
      const data = await getQuizQuestions(slug);
      if (data?.questions?.length) {
        setCachedQuiz(slug, data.questions);
      }
    } catch (error) {
      console.error('Quiz prefetch failed:', error);
    }
  }, []);

  return (
    <section className="px-3 sm:px-6 pb-8 sm:pb-14 mt-4">

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6.25 max-w-154.75 mx-auto">
        {goals.map((goal) => {
          const quizSlug = quizMap[normalizeKey(goal.text)];
          if (!quizSlug) return null;

          return (
            <button
              key={goal.text}
              onMouseEnter={() => prefetchQuiz(quizSlug)}
              onFocus={() => prefetchQuiz(quizSlug)}
              onClick={() => onSelectGoal(quizSlug)}   // ✔ FIXED
              className="bg-white text-[#303030] text-[16px] sm:text-[18px]
                         capitalize rounded-[10px] px-3 py-2 sm:p-4 font-semibold
                         flex justify-between items-center w-full
                         max-w-74.25 mx-auto h-auto sm:h-15 cursor-pointer"
            >
              <span className="text-left">{goal.text}</span>

              <span className="shrink-0">
                <svg width="17" height="14" viewBox="0 0 17 14" fill="none">
                  <path
                    d="M1.16658 8.15561L12.8333 8.15561L8.99492 11.9939..."
                    fill="#303030"
                  />
                </svg>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
