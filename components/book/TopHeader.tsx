'use client';

import Image from 'next/image';

export default function TopHeader() {
  return (
    <header className="bg-[#2f2f2f] py-4">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Image
            src="https://dddemo.net/wordpress/2025/aura-fitness/wp-content/uploads/2025/12/active-aura-white-logo.png"
            alt="Active Aura"
            width={198}
            height={198}
            priority
          />

          {/* Brand Text */}
          <div className="text-white leading-tight">
            <h1 className="text-xl font-semibold tracking-wide">
              Active Aura
            </h1>
            <p className="text-[11px] tracking-widest text-gray-300">
              YOUR JOURNEY TO INNER PEACE
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
