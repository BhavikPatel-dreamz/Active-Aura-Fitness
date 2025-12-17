'use client';

import { useEffect, useState } from 'react';
import { FinalForm } from './FinalForm';

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
  onExitQuiz,
}: {
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

  useEffect(() => {
    async function loadQuiz() {
      const res = await fetch('/api/quiz');
      const json = await res.json();
      setQuestions(json.questions);
      setLoading(false);
    }
    loadQuiz();
  }, []);

  if (loading) {
    return <p className="text-center py-20 text-white">Loading…</p>;
  }

  // 👉 SHOW FINAL FORM
  if (showFinalForm) {
    return (
      <FinalForm
        onBack={() => setShowFinalForm(false)}
        onSubmit={async () => {
          setSubmitting(true);

          const payload = {
            quiz_id: 123, // 🔴 replace if dynamic
            answers,
            user_name: name,
            user_email: email,
            user_phone: phone,
            goal: 'lose_weight', // optional for now
            lifestyle: answers.lifestyle,
            weight_loss: answers.weight_loss,
          };

          const res = await fetch('/api/quiz/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          const json = await res.json();
          console.log('SUBMIT RESPONSE', json);

          setSubmitting(false);

          // 👉 later: redirect to pdf_url
          alert('Quiz submitted successfully!');
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
  
  function exitQuiz() {
  setCurrent(0);
  setAnswers({});
  setShowFinalForm(false);
  onExitQuiz();
}

  const question = questions[current];

  return (
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
        {question.question}
      </h2>

      <div className="max-w-xl mx-auto space-y-4 px-6">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() =>
              setAnswers({ ...answers, [question.id]: opt.value })
            }
            className={`w-full p-4 rounded-lg text-left font-semibold ${
              answers[question.id] === opt.value
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
    if (current === 0) {
      // FIRST QUESTION → EXIT QUIZ → SHOW CTA
      onExitQuiz();
    } else {
      // 🔁 Go to previous question
      setCurrent((c) => c - 1);
    }
  }}
  className="px-6 py-3 border rounded-lg"
>
  ← Back
</button>


        <button
          disabled={!answers[question.id]}
          onClick={() => {
            if (current === questions.length - 1) {
              setShowFinalForm(true);
            } else {
              setCurrent((c) => c + 1);
            }
          }}
          className="px-6 py-3 bg-black rounded-lg"
        >
          Next →
        </button>
      </div>
    </section>
  );
}
