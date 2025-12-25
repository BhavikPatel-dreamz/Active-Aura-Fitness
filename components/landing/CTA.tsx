'use client';

import { useRouter } from 'next/navigation';

type Props = {
  text: string;
  href: string;
};

export default function CTA({ text, href }: Props) {
  const router = useRouter();

  return (
    <div className="text-center mt-10 sm:mt-12 mb-4 px-4">
      <button
        onClick={() => router.push(href)}
        className="
          bg-[#282828] text-white font-bebas font-normal
          w-full max-w-[826px] lg:w-[826px]
          h-auto lg:h-[82px]
          px-6 sm:px-8 py-4
          rounded-[12px]
          text-[22px] sm:text-[30px] lg:text-[45px]
          leading-[30px] sm:leading-[40px] lg:leading-[58px]
          hover:opacity-90 hover:scale-105
          transition-all duration-300
          cursor-pointer
        "
      >
        {text}
      </button>
    </div>
  );
}
