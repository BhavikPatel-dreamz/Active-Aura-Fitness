import Image from "next/image";
import { getLogos } from "@/lib/api";

export default async function SiteHeader() {
  const logo = await getLogos();
  return (
    <header className="w-full">
      {/* TOP OFFER BAR */}
      <div className="w-full bg-[#2b2b2b] text-white text-xs md:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 text-center tracking-wide">
          EXCLUSIVE OFFER FOR: 🇮🇳 <span className="font-bold">#1</span>{" "}
          <span className="font-bold">amazon</span>{" "}
          <span className="uppercase">BESTSELLER</span>
        </div>
      </div>

      {/* BRAND HEADER */}
      <div className="w-full bg-[#E5391C] py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
            <Image
              src={logo.url}
              alt={logo.alt || "Active Aura"}
              width={logo.width || 160}
              height={logo.height || 40}
              priority
              className="object-contain"
            />
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
