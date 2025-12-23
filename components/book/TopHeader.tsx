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
        </div>
      </div>
    </header>
  );
}
