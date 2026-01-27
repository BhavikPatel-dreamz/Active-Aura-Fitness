"use client";
import { useState, useEffect, useRef } from "react";
import { InlineWidget } from "react-calendly";

const FAKE_CALENDAR = (
  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 space-y-4 shadow-xl">
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" />
      <div>
        <div className="h-5 bg-blue-200 rounded w-28 animate-pulse mb-2" />
        <div className="h-4 bg-blue-100 rounded w-36 animate-pulse" />
      </div>
    </div>
    <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-600 mb-4">
      {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
        <div key={day} className="h-8 bg-white rounded-lg shadow-sm animate-pulse flex items-center justify-center" />
      ))}
    </div>
    <div className="space-y-2">
      {[1,2,3,4,5,6,7,8].map((i) => (
        <div key={i} className="h-14 bg-gradient-to-r from-emerald-200 via-blue-200 to-purple-200 rounded-xl shadow-md animate-pulse" />
      ))}
    </div>
  </div>
);

export default function InstantCalendly() {
  const [showReal, setShowReal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowReal(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center overflow-hidden" style={{ minWidth: "320px", height: "900px" }}>
      <div className="w-full h-full relative rounded-2xl shadow-2xl overflow-hidden" style={{ minWidth: "320px", height: "900px" }}>
        {/* FAKE CALENDAR - Shows instantly */}
        {!showReal && FAKE_CALENDAR}
        
        {/* REAL WIDGET - Covers everything */}
        {showReal && (
          <div style={{ 
            position: "absolute", 
            inset: 0, 
            minWidth: "320px", 
            height: "900px",
            borderRadius: "16px",
            overflow: "hidden"
          }}>
            <InlineWidget
              url="https://calendly.com/harmeetsinghtalwar310/30min"
              styles={{ 
                height: "900px", 
                width: "100%",
                minWidth: "320px"
              }}
              pageSettings={{
                hideEventTypeDetails: true,
                hideLandingPageDetails: true,
                hideGdprBanner: true
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
