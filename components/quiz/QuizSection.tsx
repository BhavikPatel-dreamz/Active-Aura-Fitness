'use client';

import { useEffect, useState } from 'react';
import { FinalForm } from './FinalForm';
import QuizResultDialog from './QuizResultDialog';
import { getQuizQuestions } from '@/lib/api';
import { getCachedQuiz } from '@/lib/quizCache';
import type { QuizSlug } from '@/lib/constants/pageSlugs';
import { QuizApiResponse,QuizOption,QuizQuestion } from '@/lib/types';


export default function QuizSection({
  quizSlug,
  onExitQuiz,
}: {
  quizSlug: QuizSlug;
  onExitQuiz: () => void;
}) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [showFinalForm, setShowFinalForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quizId, setQuizId] = useState<number | null>(null);

  // Final form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [result, setResult] = useState<null | {
    score: number;
    percentage: number;
    pdfUrl: string;
  }>(null);

  //cache 

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setCurrent(0);
      setAnswers({});

      // ✅ 1. Try cache first
      const cached = getCachedQuiz(quizSlug);
      if (cached && mounted) {
        setQuestions(cached);
        setLoading(false);
        return;
      }

      // ✅ 2. Fallback to API
      try {
        const res = await getQuizQuestions(quizSlug);
        if (!mounted) return;

        setQuizId(res.quiz_id);
        setQuestions(res.questions || []);
      } catch (err) {
        console.error('Failed to load quiz questions', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [quizSlug]);

  // =====================================================
  if (loading) {
    return (
      <p className="text-center lg:py-20 md:py-12 py-8 text-white">
        Loading…
      </p>
    );
  }

  const question = questions[current];
  if (!question) return null;


   const MAX_DOTS = 5;
  const TOTAL_SEGMENTS = MAX_DOTS - 1; // 4
  const TOTAL_STEPS = TOTAL_SEGMENTS * 2; // 8 half-steps

  const stepIndex = Math.min(
    TOTAL_STEPS,
    Math.round((current / (questions.length - 1)) * TOTAL_STEPS)
  );

  const segmentWidth = 100 / TOTAL_SEGMENTS;
  const fullSegments = Math.floor(stepIndex / 2);
  const isHalf = stepIndex % 2 === 1;

  const activeProgressWidth =
    fullSegments * segmentWidth +
    (isHalf ? segmentWidth / 2 : 0);


return (
    <>
      {/* Result Modal */}
      {result && (
        <QuizResultDialog
          score={result.score}
          total={questions.length}
          percentage={result.percentage}
          pdfUrl={result.pdfUrl}
          onClose={() => {
            setResult(null);
            onExitQuiz();
          }}
        />
      )}

        {/* ================= PROGRESS BAR ================= */}
        <div className="flex justify-center mb-8 sm:mb-10 px-4">
          <div className="relative flex items-center w-full max-w-136.25">
            
            {/* Background line */}
            <div className="
              absolute left-0 top-1/2
              h-1 sm:h-1.25
              w-full
              bg-white
              -translate-y-1/2
            " />

            {/* Active line */}
            {stepIndex > 0 && (
              <div
                className="
                  absolute left-0 top-1/2
                  h-[4.5px] sm:h-[5.5px]
                  bg-[#5B5B5B]
                  -translate-y-1/2
                  transition-all duration-300 ease-in-out
                "
                style={{ width: `${activeProgressWidth}%` }}
              />
            )}

            {/* Dots */}
            <div className="relative z-10 flex justify-between w-full">
              {Array.from({ length: MAX_DOTS }).map((_, i) => {
                const isActive = stepIndex >= i * 2;
                return (
                  <span
                    key={i}
                    className={`
                      w-5.5 h-5.5
                      sm:w-7.25 sm:h-7.25
                      rounded-full
                      transition-colors duration-300
                      ${isActive ? 'bg-[#5B5B5B]' : 'bg-white'}
                    `}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/* ================================================= */} 
        
      {/* Final Form */}
      {showFinalForm ? (
        <FinalForm
          onBack={() => setShowFinalForm(false)}
          onSubmit={async (fullPhone: string) => {
            setSubmitting(true);
            try {
              const validateRes = await fetch('/api/quiz/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quiz_id: quizId, answers }),
              });

              const validateJson = await validateRes.json();
              if (!validateJson.success) {
                alert(validateJson.message || 'Please answer all questions');
                return;
              }

              const submitRes = await fetch('/api/quiz/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  quiz_id: quizId,
                  answers,
                  user_name: name,
                  user_email: email,
                  user_phone: fullPhone,
                }),
              });

              const submitJson = await submitRes.json();
              if (submitJson.success) {
                setShowFinalForm(false);
                setResult({
                  score: submitJson.score,
                  percentage: submitJson.percentage,
                  pdfUrl: submitJson.pdf_url,
                });
              }
            } finally {
              setSubmitting(false);
            }
          }}
          submitting={submitting}
          name={name}
          email={email}
          phone={phone}
          accepted={accepted}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
          setAccepted={setAccepted}
        />
      ) : (
        <section className="bg-[#DB3706] text-white py-20">
         



          <h2 className="text-center font-semibold px-4 mb-8 max-w-185 mx-auto text-[22px] sm:text-[28px] lg:text-[35px] leading-7.5 sm:leading-9.5 lg:leading-12">
            {question.question}
          </h2>

          <div className="max-w-154.75 mx-auto space-y-5.5 px-6">
            {question.options.map((opt) => {
              const isSelected = answers[question.id] === opt.value;

              return (
                <button
                  key={opt.id}
                  onClick={() =>
                    setAnswers({ ...answers, [question.id]: opt.value })
                  }
                  className={`w-full py-4.5 px-4.5 rounded-[10px] flex justify-between font-semibold transition-all
                    ${isSelected ? 'bg-[#FFFFFF4D] text-white' : 'bg-white text-black'}
                  `}
                >
                  {/* Option Text */}
                  <span>{opt.text}</span>

                  {/* Check SVG */}
                  {isSelected && (
                    <span className="flex items-center justify-center w-6 h-6">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="10" cy="10" r="10" fill="white" />
                        <path
                          d="M5 10.5L8.5 14L15 7"
                          stroke="#DB3706"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 py-10 px-4 border-t border-b border-[#282828]">
            
            {/* BACK BUTTON */}
            <button
              onClick={() => {
                if (current === 0) onExitQuiz();
                else setCurrent((c) => c - 1);
              }}
              className="
                group
                w-full sm:w-45
                px-6 py-3
                border border-white
                text-base sm:text-lg
                font-semibold
                rounded-[10px]
                bg-[#FFFFFF33]
                hover:bg-white
                text-white
                hover:text-black
                transition-colors duration-300
                flex items-center gap-2
                justify-center
                cursor-pointer
              "
            >
              {/* Arrow SVG */}
              <span className="flex items-center transition-transform duration-200 group-hover:-translate-x-1 mr-3">
                <svg
                  width="20"
                  height="11"
                  viewBox="0 0 20 11"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white group-hover:fill-black transition-colors duration-200"
                >
                  <path d="M0.731379 7.01275L3.95638 10.2711C4.03385 10.3492 4.12602 10.4112 4.22757 10.4535C4.32912 10.4958 4.43804 10.5176 4.54805 10.5176C4.65806 10.5176 4.76698 10.4958 4.86853 10.4535C4.97008 10.4112 5.06224 10.3492 5.13971 10.2711C5.29492 10.1149 5.38204 9.90373 5.38204 9.68358C5.38204 9.46342 5.29492 9.25222 5.13971 9.09608L2.17305 6.10441L19.1647 6.10441C19.3857 6.10441 19.5977 6.01661 19.754 5.86033C19.9102 5.70405 19.998 5.49209 19.998 5.27108C19.998 5.05007 19.9102 4.8381 19.754 4.68182C19.5977 4.52554 19.3857 4.43775 19.1647 4.43775L2.12304 4.43775L5.13971 1.42941C5.21782 1.35194 5.27981 1.25978 5.32212 1.15823C5.36443 1.05668 5.38621 0.947756 5.38621 0.837746C5.38621 0.727736 5.36443 0.618814 5.32212 0.517265C5.27981 0.415716 5.21782 0.323547 5.13971 0.246078C5.06224 0.167972 4.97008 0.105976 4.86853 0.0636692C4.76698 0.0213623 4.65806 -0.000419617 4.54805 -0.000419617C4.43804 -0.000419617 4.32912 0.0213623 4.22757 0.0636692C4.12602 0.105976 4.03385 0.167972 3.95638 0.246078L0.731379 3.47941C0.26321 3.94816 0.000246048 4.58358 0.000246048 5.24608C0.000246048 5.90858 0.26321 6.54399 0.731379 7.01275Z" />
                </svg>
              </span>
              <span>Back</span>
            </button>

            {/* NEXT BUTTON */}
            <button
              disabled={!answers[questions[current].id]}
              onClick={() => {
                if (current === questions.length - 1) {
                  setShowFinalForm(true);
                } else {
                  setCurrent((c) => c + 1);
                }
              }}
              className="
                group
                w-full sm:w-45
                px-6 py-3
                border border-white
                text-base sm:text-lg
                font-semibold
                rounded-[10px]
                bg-[#FFFFFF33]
                hover:bg-white
                text-white
                hover:text-black
                transition-colors duration-300
                flex items-center gap-2
                justify-center
                disabled:opacity-50
                disabled:cursor-not-allowed
                cursor-pointer
              "
            >
              <span>Next</span>

              {/* Right Arrow SVG */}
              <span className="flex items-center transition-transform duration-200 group-hover:translate-x-1 ml-3">
                <svg
                  width="20"
                  height="11"
                  viewBox="0 0 20 11"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white group-hover:fill-black transition-colors duration-200"
                >
                  <path d="M19.2686 3.98725L16.0436 0.728907C15.9662 0.650801 15.874 0.588805 15.7724 0.546498C15.6709 0.504191 15.562 0.482409 15.452 0.482409C15.342 0.482409 15.233 0.504191 15.1315 0.546498C15.0299 0.588805 14.9378 0.650801 14.8603 0.728907C14.7051 0.885047 14.618 1.09625 14.618 1.3164C14.618 1.53656 14.7051 1.74775 14.8603 1.9039L17.827 4.89557H0.835329C0.614318 4.89557 0.402362 4.98337 0.246081 5.13965C0.0897995 5.29593 0.002 5.50789 0.002 5.7289C0.002 5.94991 0.0897995 6.16187 0.246081 6.31815C0.402362 6.47443 0.614318 6.56223 0.835329 6.56223H17.877L14.8603 9.57057C14.7822 9.64804 14.7202 9.74021 14.6779 9.84176C14.6356 9.94331 14.6138 10.0522 14.6138 10.1623C14.6138 10.2723 14.6356 10.3812 14.6779 10.4827C14.7202 10.5843 14.7822 10.6764 14.8603 10.7539C14.9378 10.832 15.0299 10.894 15.1315 10.9363C15.233 10.9786 15.342 11.0004 15.452 11.0004C15.562 11.0004 15.6709 10.9786 15.7724 10.9363C15.874 10.894 15.9662 10.832 16.0436 10.7539L19.2686 7.52057C19.7368 7.05182 19.9998 6.4164 19.9998 5.7539C19.9998 5.0914 19.7368 4.45599 19.2686 3.98725Z" />
                </svg>
              </span>
            </button>
          </div>

        </section>
      )}
    </>
  );
}
