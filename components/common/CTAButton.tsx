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
      className={`
        text-[40px]
        inline-block
        bg-[#e23b00]
        hover:bg-[#ff4500]
        hover:transform hover:scale-105
        transform transition-transform duration-300
        text-white
        font-normal
        px-14.5
        py-3
        mt-7.5
        rounded-[12px]
        transition
        font-bebas
        w-[500px]
        h-[82px]
        capitalize
        ${className}
      `}
    >
      {text}
    </Link>
  );
}


