import Image from 'next/image';

export default function SiteHeader() {
  return (
    <header className="w-full">
      {/* TOP OFFER BAR */}
      <div className="w-full bg-[#2b2b2b] text-white text-xs md:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 text-center tracking-wide">
          EXCLUSIVE OFFER FOR: 🇮🇳{' '}
          <span className="font-bold">#1</span>{' '}
          <span className="font-bold">amazon</span>{' '}
          <span className="uppercase">BESTSELLER</span>
        </div>
      </div>

      {/* BRAND HEADER */}
      <div className="w-full bg-[#E5391C] py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo-icon.png" // replace with your logo path
              alt="Active Aura Logo"
              width={36}
              height={36}
              priority
            />
            <span className="text-white text-xl font-semibold tracking-wide">
              Active Aura
            </span>
          </div>

          {/* Tagline */}
          <p className="text-white/80 text-xs mt-1 tracking-wide italic">
            “Your journey to inner peace”
          </p>
        </div>
      </div>
    </header>
  );
}
