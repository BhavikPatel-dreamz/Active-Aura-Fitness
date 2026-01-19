"use client";

export default function ShimmerSkeleton() {
  return (
    <div className="w-full max-w-[900px] mx-auto bg-white rounded-2xl p-6 shadow-md relative overflow-hidden">
      {/* Shimmer animation layer */}
      <div className="absolute inset-0 pointer-events-none animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-70" />

      {/* Month Header */}
      <div className="h-7 w-48 bg-[#e5e5e5] rounded-md mb-6" />

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3 mb-8">
        {[...Array(28)].map((_, i) => (
          <div
            key={i}
            className="h-12 w-full bg-[#e5e5e5] rounded-md"
          ></div>
        ))}
      </div>

      {/* Time Slots heading */}
      <div className="h-6 w-40 bg-[#e5e5e5] rounded-md mb-4" />

      {/* Time Slot buttons */}
      <div className="flex flex-wrap gap-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-28 bg-[#e5e5e5] rounded-md"
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
