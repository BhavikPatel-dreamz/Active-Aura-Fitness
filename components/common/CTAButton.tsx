import Link from 'next/link';

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
  return (
    <Link
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={`outline-0 inline-block text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] bg-[#6F00FF] hover:bg-[#6F00FF] transform transition-transform duration-300 hover:scale-105 text-white font-normal px-4 sm:px-10 xl:px-14.5 py-2.5 sm:py-3 mt-6 sm:mt-7.5 sm:rounded-[12px] rounded-[8px] font-bebas sm:w-auto lg:w-[500px] h-auto lg:h-[82px] capitalize text-center ${className}`}
    >
      {text}
    </Link>
  );
}
