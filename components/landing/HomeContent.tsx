"use client";

import { useState } from "react";
import CTA from "./CTA";
import Goals from "./Goal";
import QuizSection from "@/components/quiz/QuizSection";
import QuizStarter from "./QuizStarter";
import { QuizSlug } from "@/lib/constants/pageSlugs";

export default function HomeContent({
  landingData,
  quizMap,
}: {
  landingData: any;
  quizMap: any;
}) {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const defaultQuizSlug = quizMap["reduce_belly_fat"]; 

  const handleExitQuiz = () => {
    setActiveQuiz(null); 
  };

  return (
    <>

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
    
      <QuizStarter
        text={landingData.cta_button_text}
        onClick={() => setActiveQuiz(defaultQuizSlug)}
      />

      {/* Hide Goals when quiz opens */}
      {!activeQuiz && (
        <Goals goals={landingData.goal_options} quizMap={quizMap} />
      )}

      {/* Show Quiz when active */}
      {activeQuiz && <QuizSection quizSlug={activeQuiz as QuizSlug} onExitQuiz={handleExitQuiz} />}
    </>
  );
}
