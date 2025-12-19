'use client';

import { useEffect, useState } from 'react';
import { FinalForm } from './FinalForm';
import QuizResultDialog from './QuizResultDialog';


type QuizOption = {
  id: string;
  text: string;
  value: string;
};

type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};




export default function QuizSection({
  quizId,
  onExitQuiz,
}: {
  quizId: number;
  onExitQuiz: () => void;
}) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [showFinalForm, setShowFinalForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);



  // final form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [result, setResult] = useState<null | {
  score: number;
  percentage: number;
  pdfUrl: string;
}>(null);

  // 🔹 Load quiz questions
  useEffect(() => {
    async function loadQuestions() {
      setLoading(true);
      setQuestions([]);
      setCurrent(0);
      setAnswers({});

      const res = await fetch(`/api/quiz?quiz_id=${quizId}`);
      const json = await res.json();

      setQuestions(json.questions || []);
      setLoading(false);
    }

    loadQuestions();
  }, [quizId]);

  if (loading) {
    return (
      <p className="text-center py-20 text-white">
        Loading…
      </p>
    );
  }

  // 🔹 FINAL FORM
  if (showFinalForm) {
    return (
      <FinalForm
        onBack={() => setShowFinalForm(false)}
        onSubmit={async (fullPhone: string) => {
          setSubmitting(true);

          try {
            // 1️⃣ Validate quiz
            const validateRes = await fetch('/api/quiz/validate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                quiz_id: quizId,
                answers,
              }),
            });

            const validateJson = await validateRes.json();

            if (!validateJson.success) {
              alert(
                validateJson.message ||
                  'Please answer all required questions'
              );
              return;
            }

            // 2️⃣ Submit quiz
            const payload = {
              quiz_id: quizId,
              answers,
              user_name: name,
              user_email: email,
              user_phone: fullPhone, // ✅ correct
              lifestyle: answers.lifestyle,
              weight_loss: answers.weight_loss,
            };

            const submitRes = await fetch('/api/quiz/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });

            const submitJson = await submitRes.json();
            console.log('SUBMIT RESPONSE', submitJson);

           if (submitJson.success) {
  if (submitJson.success) {
    setShowFinalForm(false);
  setResult({
    score: submitJson.score,
    percentage: submitJson.percentage,
    pdfUrl: submitJson.pdf_url,
  });
}

}

          } catch (err) {
            console.error(err);
            alert('Something went wrong. Please try again.');
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
    );
  }

  const question = questions[current];

  if (!question) {
    return (
      <section className="bg-[#E5391C] text-white py-20 text-center">
        <p className="text-lg font-semibold">
          Loading questions…
        </p>
      </section>
    );
  }

  return (
  <>
    {/* 🔹 RESULT MODAL (ALWAYS AT TOP LEVEL) */}
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

    {/* 🔹 FINAL FORM */}
    {showFinalForm ? (
      <FinalForm
        onBack={() => setShowFinalForm(false)}
        onSubmit={async (fullPhone: string) => {
          setSubmitting(true);

          try {
            const validateRes = await fetch('/api/quiz/validate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                quiz_id: quizId,
                answers,
              }),
            });

            const validateJson = await validateRes.json();
            if (!validateJson.success) {
              alert(
                validateJson.message ||
                  'Please answer all required questions'
              );
              return;
            }

            const payload = {
              quiz_id: quizId,
              answers,
              user_name: name,
              user_email: email,
              user_phone: fullPhone,
            };

            const submitRes = await fetch('/api/quiz/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });

            const submitJson = await submitRes.json();

            if (submitJson.success) {
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
      <section className="bg-[#E5391C] text-white py-20">
        {/* Progress */}
        <div className="flex justify-center gap-3 mb-10">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${
                i <= current ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        <h2 className="text-center text-2xl font-bold mb-8 px-4">
          {questions[current].question}
        </h2>

        <div className="max-w-xl mx-auto space-y-4 px-6">
          {questions[current].options.map((opt) => (
            <button
              key={opt.id}
              onClick={() =>
                setAnswers({
                  ...answers,
                  [questions[current].id]: opt.value,
                })
              }
              className={`w-full p-4 rounded-lg text-left font-semibold ${
                answers[questions[current].id] === opt.value
                  ? 'bg-[#FFA46A] text-black'
                  : 'bg-white text-black'
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={() => {
              if (current === 0) onExitQuiz();
              else setCurrent((c) => c - 1);
            }}
            className="px-6 py-3 border rounded-lg"
          >
            ← Back
          </button>

          <button
            disabled={!answers[questions[current].id]}
            onClick={() => {
              if (current === questions.length - 1) {
                setShowFinalForm(true);
              } else {
                setCurrent((c) => c + 1);
              }
            }}
            className="px-6 py-3 bg-black rounded-lg disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </section>
    )}
  </>
);

}
