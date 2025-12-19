'use client';

import { useEffect, useState } from 'react';

function formatTime(seconds: number) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

export default function ConsultationCtaWithTimer() {
  // ⏱ 11:50:00 → total seconds
  const [timeLeft, setTimeLeft] = useState(11 * 3600 + 50 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <section className="bg-[#2f2f2f] py-20 text-center">
      
      {/* TIMER CARD */}
      <div className="max-w-sm mx-auto border border-white/20 rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 text-white font-bold uppercase text-sm mb-6">
          <span className="text-orange-500 text-lg">🔥</span>
          <span>
            Just <span className="text-orange-500">5</span> Slots Remaining Don’t Miss Out
          </span>
        </div>

        {/* Timer */}
        <div className="bg-[#ff3d00] rounded-xl py-6">
          <p className="text-white text-4xl md:text-5xl font-extrabold tracking-widest">
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>
    </section>
  );
}
