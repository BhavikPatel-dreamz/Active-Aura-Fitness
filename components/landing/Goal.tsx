'use client';

import { useState } from 'react';
import QuizSection from '@/components/quiz/QuizSection';
import type { QuizSlug } from '@/lib/constants/pageSlugs';
import { normalizeKey } from '@/lib/utils/normalizeKey';



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

  if (activeQuizSlug) {
    return (
      <QuizSection
        quizSlug={activeQuizSlug}
        onExitQuiz={() => setActiveQuizSlug(null)}
      />
    );

  }

  return (
    <section className="px-4 sm:px-6 pb-16 sm:pb-20">
      {/* Heading */}
      <h3 className="
        max-w-4xl mx-auto text-center
        text-[26px] sm:text-[30px] lg:text-[35px]
        leading-9.5 sm:leading-12 lg:leading-15
        capitalize text-white poppins font-semibold
        mb-6 sm:mb-8
      ">
        What’s Your #1 Goal Right Now?
      </h3>

      {/* Goals Grid */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6.25 max-w-154.75 mx-auto">
        {goals.map((goal) => {
          const quizSlug = quizMap[normalizeKey(goal.text)];


          if (!quizSlug) return null;

          return (
            <button
              key={goal.text}
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
              <span className="shrink-0">{/* arrow svg */}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
