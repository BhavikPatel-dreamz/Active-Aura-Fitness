'use client';

import { useState } from 'react';
import QuizSection from '@/components/quiz/QuizSection';
import { GoalOption } from '@/lib/types';

export default function Goals({ goals }: { goals: GoalOption[] }) {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <>
      {!showQuiz && (
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <h3 className="text-center text-xl font-bold mb-6">
            What’s Your #1 Goal Right Now?
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {goals.map((goal) => (
              <button
                key={goal.value}
                onClick={() => setShowQuiz(true)}
                className="bg-white text-black p-4 rounded-lg font-semibold flex justify-between"
              >
                {goal.text}
                <span>→</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* {showQuiz && <QuizSection />} */}

      {showQuiz && (
  <QuizSection onExitQuiz={() => setShowQuiz(false)} />
)}

    </>

  );
}
