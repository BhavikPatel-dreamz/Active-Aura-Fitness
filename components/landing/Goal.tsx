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
}: {
  goals: Goal[];
  quizMap: Record<string, QuizSlug>;
}) {
  const [activeQuizSlug, setActiveQuizSlug] =
    useState<QuizSlug | null>(null);

  // PREFETCH FUNCTION 
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

  // ✅ When quiz is active → render QuizSection
  if (activeQuizSlug) {
    return (
      <QuizSection
        quizSlug={activeQuizSlug}
        onExitQuiz={() => setActiveQuizSlug(null)}
      />
    );
  }

  return (
    <section className="px-4 sm:px-6 pb-8 sm:pb-14">
      {/* Heading */}
      <h3
        className="
          max-w-4xl mx-auto text-center
          text-[24px] sm:text-[30px] lg:text-[35px]
          leading-9.5 sm:leading-12 lg:leading-15
          capitalize text-black poppins font-semibold
          mb-6 sm:mb-8
        "
      >
        What’s Your #1 Goal Right Now?
      </h3>

      {/* Goals Grid */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6.25 max-w-154.75 mx-auto">
        {goals.map((goal) => {
          // ✅ normalize text → match quizMap keys
          const quizSlug = quizMap[normalizeKey(goal.text)];

          if (!quizSlug) return null;

          return (
            <button
              key={goal.text}
              onMouseEnter={() => prefetchQuiz(quizSlug)} // 🚀 PREFETCH
              onFocus={() => prefetchQuiz(quizSlug)}     // ♿ keyboard
              onClick={() => setActiveQuizSlug(quizSlug)}
              className="
                bg-white text-[#303030]
                text-[16px] sm:text-[18px]
                capitalize rounded-[10px]
                px-4 py-3 sm:p-4
                font-semibold
                flex justify-between items-center
                w-full max-w-74.25 mx-auto
                h-auto sm:h-15
                cursor-pointer
              "
            >
              <span className="text-left">{goal.text}</span>
              <span className="shrink-0">
                <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.16658 8.15561L12.8333 8.15561L8.99492 11.9939C8.88557 12.1024 8.79878 12.2314 8.73955 12.3736C8.68032 12.5158 8.64982 12.6683 8.64982 12.8223C8.64982 12.9763 8.68032 13.1288 8.73955 13.2709C8.79878 13.4131 8.88557 13.5422 8.99492 13.6506C9.21351 13.8679 9.5092 13.9899 9.81742 13.9899C10.1256 13.9899 10.4213 13.8679 10.6399 13.6506L15.6449 8.63394C16.0831 8.19837 16.3306 7.60678 16.3333 6.98894C16.3276 6.37515 16.0803 5.78832 15.6449 5.35561L10.6399 0.338943C10.5311 0.230931 10.4022 0.145402 10.2603 0.0872393C10.1185 0.0290766 9.96659 -0.000580788 9.81329 -3.91006e-05C9.66 0.000502586 9.50831 0.0312338 9.36689 0.0903969C9.22548 0.149561 9.0971 0.235999 8.98908 0.344778C8.88107 0.453556 8.79554 0.582544 8.73738 0.724377C8.67922 0.866209 8.64956 1.01811 8.6501 1.1714C8.65064 1.3247 8.68137 1.47638 8.74054 1.6178C8.7997 1.75922 8.88614 1.8876 8.99492 1.99561L12.8333 5.82228L1.16658 5.82228C0.857165 5.82228 0.560418 5.94519 0.341625 6.16399C0.122833 6.38278 -8.2016e-05 6.67952 -8.2016e-05 6.98894C-8.2016e-05 7.29836 0.122833 7.59511 0.341625 7.8139C0.560418 8.03269 0.857165 8.15561 1.16658 8.15561Z" fill="#303030"/>
                </svg>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
