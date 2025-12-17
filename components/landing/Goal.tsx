'use client';

import { useState } from 'react';
import QuizSection from '@/components/quiz/QuizSection';

type Goal = {
  text: string;
  value: string;
};

export default function Goals({
  goals,
  quizMap,
}: {
  goals: Goal[];
  quizMap: Record<string, number>;
}) {
  const [activeQuizId, setActiveQuizId] = useState<number | null>(null);

  if (activeQuizId) {
    return (
      <QuizSection
        quizId={activeQuizId}
        onExitQuiz={() => setActiveQuizId(null)}
      />
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 pb-20">
      <h3 className="text-center text-xl font-bold mb-6">
        What’s Your #1 Goal Right Now?
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const quizId = quizMap[goal.value];

          return (
            <button
              key={goal.value}
              onClick={() => setActiveQuizId(quizId)}
              className="bg-white text-black p-4 rounded-lg font-semibold flex justify-between"
            >
              {goal.text}
              <span>→</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
