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
    <section className="bg-[#2f2f2f] text-center sm:pb-20 pb-10">
      
      {/* TIMER CARD */}
      <div className="max-w-[470px] mx-auto border-2 border-[#FFFFFF33] rounded-[12px] px-[15px] py-[27px]">
        {/* Header */}
        <div className="flex items-center justify-center text-white font-bold uppercase text-sm mb-8.5">
          <span className="w-10 h-10 mr-[5px] -mt-[2px]"><img src="/fire.gif" alt="fire gif icon" /></span>
          <span className='text-white text-[31px] font-bebas font-normal'>
            Just <span className="text-[#DB3706]">5</span> Slots Remaining Don’t Miss Out
          </span>
        </div>

        {/* Timer */}
        <div className="mx-4">
          <p className="text-white text-4xl md:text-[100px] max-w-[396px] font-normal font-bebas leading-[140%] bg-[#DB3706] rounded-xl">
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>
    </section>
  );
}
