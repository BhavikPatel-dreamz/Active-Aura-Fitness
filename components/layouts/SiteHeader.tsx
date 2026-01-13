import Image from "next/image";
import { getLogos } from "@/lib/api";

export default async function SiteHeader() {
  const logo = await getLogos();
  return (
    <header className="w-full">
    
      {/* BRAND HEADER */}
      <div className="w-full bg-[#DB3706] sm:pt-8.5 pt-5 sm:pb-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          {/* Logo + Name */}
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
      </div>
    </header>
  );
}
