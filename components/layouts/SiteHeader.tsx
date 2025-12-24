import Image from 'next/image';

export default function SiteHeader() {
  return (
    <header className="w-full">
      {/* TOP OFFER BAR */}
      <div className="w-full bg-[#303030] text-white text-uppercase text-xs md:text-lg font-weight-normal py-[19px]">
        <div className="max-w-7xl mx-auto px-4 text-center tracking-wide">
          EXCLUSIVE OFFER FOR: 🇮🇳{' '}
          <span className="font-normal text-sm">#1</span>{' '}
          <span className="font-bold">amazon</span>{' '}
          <span className="uppercase text-[16px]">BESTSELLER</span>
        </div>
      </div>

      {/* BRAND HEADER */}
      <div className="w-full bg-[#DB3706] pt-8.5 pb-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
           <Image
                       src="https://dddemo.net/wordpress/2025/aura-fitness/wp-content/uploads/2025/12/active-aura-white-logo.png"
                       alt="Active Aura"
                       width={323}
                       height={60}
                       priority
                     />
          </div>

          
        </div>
      </div>
    </header>
  );
}
