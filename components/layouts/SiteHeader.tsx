import Image from "next/image";
import { getLogos } from "@/lib/api";

export default async function SiteHeader() {
  const logo = await getLogos();
  return (
    <header className="w-full">
      {/* TOP OFFER BAR */}
      <div className="w-full bg-[#303030] sm:py-[19px] py-2 sm:h-[66px] h-[44px] flex items-center">
        <div className="max-w-7xl mx-auto sm:px-4 px-3 text-white text-uppercase text-xs md:text-lg font-weight-normal  text-center tracking-wide flex items-center justify-center">
          EXCLUSIVE OFFER FOR: 🇮🇳{" "}
          <span className="sm:text-sm text-xs font-normal uppercase text-white">
            &nbsp;#1
          </span>{" "}
          <img
            src="/logo-amazon.svg"
            alt="amazon"
            className="sm:mx-2 mx-1 sm:w-[90px] xs:w-[60px] w-[50px] sm:h-[27px] h-auto object-contain relative sm:bottom-[-5px] bottom-[-3px]"
          />{" "}
          <span className="uppercase sm:text-base text-xs">BESTSELLER</span>
        </div>
      </div>

      {/* BRAND HEADER */}
      <div className="w-full bg-[#DB3706] sm:pt-8.5 pt-5 sm:pb-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          {/* Logo + Name */}
          <a
            href="/"
            className="flex items-center gap-2"
            aria-label="Site Logo"
          >
            <Image
              src={logo.url}
              alt={logo.alt || "Active Aura"}
              width={logo.width || 323}
              height={logo.height || 60}
              priority
              className="sm:w-[323px] w-[240px] sm:h-[60px] h-[40px] object-contain"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
