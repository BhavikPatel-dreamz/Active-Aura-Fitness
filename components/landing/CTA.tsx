'use client';

import { useRouter } from 'next/navigation';

type Props = {
  text: string;
  href: string;
};

export default function CTA({ text, href }: Props) {
  const router = useRouter();

  return (
    <div className="text-center mt-10 sm:mt-12 mb-2 px-4">
      <button
        onClick={() => router.push(href)}
        className="
          bg-[#282828] text-white font-bebas font-normal
          w-full max-w-206.5 lg:w-206.5
          h-auto lg:h-20.5
          px-4 sm:px-8 py-4
          rounded-xl
          text-[22px] sm:text-[30px] lg:text-[45px]
          leading-7.5 sm:leading-10 lg:leading-14.5
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
