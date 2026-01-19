'use client';

import { useEffect, useState } from 'react';

function formatTime(seconds: number) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

export default function ConsultationCtaWithTimer() {
  const [timeLeft, setTimeLeft] = useState(11 * 3600 + 50 * 60);

  // ---------- SLOT COUNTER LOGIC ----------
  const MIN_SLOTS = 5;
  const START_SLOTS = 25;
  const REDUCE_INTERVAL = 90 * 60 * 1000; // every 90 minutes

  const [slots, setSlots] = useState<number>(START_SLOTS);

  useEffect(() => {
    // Load from localStorage if exists
    const savedSlots = localStorage.getItem("slotsRemaining");
    const lastUpdated = localStorage.getItem("slotsUpdatedAt");

    if (savedSlots && lastUpdated) {
      const parsedSlots = parseInt(savedSlots, 10);
      const lastUpdateTime = parseInt(lastUpdated, 10);
      const now = Date.now();

      // Calculate how many reductions should have happened
      const reductions = Math.floor((now - lastUpdateTime) / REDUCE_INTERVAL);
      const newSlots = Math.max(MIN_SLOTS, parsedSlots - reductions);

      setSlots(newSlots);

      // If reductions occurred, update timestamp
      if (reductions > 0) {
        localStorage.setItem("slotsRemaining", String(newSlots));
        localStorage.setItem("slotsUpdatedAt", String(now));
      }
    } else {
      // First time user
      localStorage.setItem("slotsRemaining", String(START_SLOTS));
      localStorage.setItem("slotsUpdatedAt", String(Date.now()));
      setSlots(START_SLOTS);
    }
  }, []);

  // ---------- TIMER ----------
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <section className="consultation-cta-with-timer text-center pb-10 sm:pb-14 md:pb-20 px-4">
      
      {/* TIMER CARD */}
      <div className="max-w-[670px] mx-auto border-2 border-[#FFFFFF33] rounded-[12px] px-4 sm:px-[15px] py-6 sm:py-[27px]">
        
        {/* Header */}
        <div className="flex flex-row items-center justify-center uppercase mb-3 sm:mb-8.5 text-center">
          <span className="w-5 h-5 sm:w-10 sm:h-10 mr-[5px] -mt-[2px]">
            <img src="/fire.gif" alt="fire gif icon" className="w-full h-full object-contain" />
          </span>

          <span className="text-[26px] sm:text-[26px] md:text-[40px] font-bebas font-normal leading-tight">
            Just <span className="text-[#DB3706]">{slots}</span> Slots Remaining — Don’t Miss Out
          </span>
        </div>

        {/* Timer */}
        <div className="mx-2 sm:mx-4">
          <p className="text-white text-[42px] sm:text-[64px] md:text-[100px] max-w-[396px] mx-auto font-normal font-bebas leading-[120%] sm:leading-[140%] bg-[#6F00FF] rounded-xl py-2 sm:py-0">
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>
    </section>
  );
}
