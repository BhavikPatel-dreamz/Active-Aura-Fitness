"use client";

import { useState } from "react";
import CTA from "./CTA";
import Goals from "./Goal";
import QuizSection from "@/components/quiz/QuizSection";
import { QuizSlug } from "@/lib/constants/pageSlugs";

export default function HomeContent({ landingData, quizMap }: any) {
  const [showGoalsFromCTA, setShowGoalsFromCTA] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<QuizSlug | null>(null);

  // When quiz is started → show ONLY quiz (CTA + Goals + Back Button hidden)
  if (activeQuiz) {
    return (
      <QuizSection
        quizSlug={activeQuiz}
        onExitQuiz={() => {
          setActiveQuiz(null);
          setShowGoalsFromCTA(false); // reset back to full landing page
        }}
      />
    );
  }

  return (
    <>
      {/* CTA visible only before user clicks it */}
      <h3
            className="
              max-w-5xl mx-auto text-center
              text-[20px] sm:text-[16px] lg:text-[45px]
              leading-9.5 sm:leading-12 lg:leading-15
              capitalize text-black poppins font-semibold
              mb-4 sm:mb-8 mt-5
            "
          >
            What’s Your #1 Goal Right Now?
          </h3>
      
      {!showGoalsFromCTA && (
        <CTA
          text={landingData.cta_button_text}
          onClick={() => setShowGoalsFromCTA(true)}
        />
      )}



      {/* Goals ALWAYS visible except when quiz is opened */}
      <Goals
        goals={landingData.goal_options}
        quizMap={quizMap}
        onSelectGoal={(slug: QuizSlug) => setActiveQuiz(slug)}
      />

      {/* Back button ONLY when CTA clicked AND quiz is NOT opened */}
     {showGoalsFromCTA && !activeQuiz && (
  <div className="w-full flex justify-center px-4 my-4">
    <button
      onClick={() => setShowGoalsFromCTA(false)}
      className="
        group
        w-full max-w-[250px] 
        sm:max-w-[200px]
        h-[48px] sm:h-[55px]
        px-4 sm:px-6
        border border-[#282828]
        rounded-[10px]
        bg-[#ECECEC]
        hover:bg-white
        text-black
        text-sm sm:text-base
        font-semibold
        flex items-center justify-center gap-2
        transition-all duration-300
      "
    >
      {/* Arrow Icon */}
      <span className="flex items-center transition-transform duration-200">
        <svg
          width="18"
          height="11"
          viewBox="0 0 20 11"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-black"
        >
          <path d="M0.731379 7.01275L3.95638 10.2711C4.03385 10.3492 4.12602 10.4112 4.22757 10.4535C4.32912 10.4958 4.43804 10.5176 4.54805 10.5176C4.65806 10.5176 4.76698 10.4958 4.86853 10.4535C4.97008 10.4112 5.06224 10.3492 5.13971 10.2711C5.29492 10.1149 5.38204 9.90373 5.38204 9.68358C5.38204 9.46342 5.29492 9.25222 5.13971 9.09608L2.17305 6.10441L19.1647 6.10441C19.3857 6.10441 19.5977 6.01661 19.754 5.86033C19.9102 5.70405 19.998 5.49209 19.998 5.27108C19.998 5.05007 19.9102 4.8381 19.754 4.68182C19.5977 4.52554 19.3857 4.43775 19.1647 4.43775L2.12304 4.43775L5.13971 1.42941C5.21782 1.35194 5.27981 1.25978 5.32212 1.15823C5.36443 1.05668 5.38621 0.947756 5.38621 0.837746C5.38621 0.727736 5.36443 0.618814 5.32212 0.517265C5.27981 0.415716 5.21782 0.323547 5.13971 0.246078C5.06224 0.167972 4.97008 0.105976 4.86853 0.0636692C4.76698 0.0213623 4.65806 -0.000419617 4.54805 -0.000419617C4.43804 -0.000419617 4.32912 0.0213623 4.22757 0.0636692C4.12602 0.105976 4.03385 0.167972 3.95638 0.246078L0.731379 3.47941C0.26321 3.94816 0.000246048 4.58358 0.000246048 5.24608C0.000246048 5.90858 0.26321 6.54399 0.731379 7.01275Z" />
        </svg>
      </span>

      <span>Back</span>
    </button>
  </div>
)}

    </>
  );
}
