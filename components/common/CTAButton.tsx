'use client';

import { useRouter } from 'next/navigation';

type CTAButtonProps = {
  text: string;
  href: string;
  target?: '_self' | '_blank';
  className?: string;
};

export default function CTAButton({
  text,
  href,
  target = '_self',
  className = '',
}: CTAButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (target === '_blank') {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        bg-[#e23b00]
        hover:bg-[#ff4500]
        text-white
        font-bold
        px-10
        py-4
        rounded-lg
        transition
        ${className}
      `}
    >
      {text}
    </button>
  );
}
