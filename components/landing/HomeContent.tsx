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
