
import Image from 'next/image';
import { getLogos } from '@/lib/api';

export default async function TopHeader() {
  const logo = await getLogos();

  return (
    <header className="w-full py-6 flex justify-center bg-[#2f2f2f]">
     <div className='site-logo'>
      <a
      href="/"
      className="flex items-center"
      aria-label="Active Aura Fitness"
    >
      <h1 className="text-white font-bold text-[26px] sm:text-[32px] lg:text-[40px] tracking-wide">
        Active Aura Fitness
      </h1>
    </a>
      </div>
    </header>
  );
}
