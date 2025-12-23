'use client';

import { useRouter } from 'next/navigation';

type Props = {
  text: string;
  href: string;
};

export default function CTA({ text, href }: Props) {
  const router = useRouter();

  return (
    <div className="text-center my-12">
      <button
        onClick={() => router.push(href)}
        className="bg-black text-white px-8 py-4 rounded-lg font-bold hover:opacity-90"
      >
        {text}
      </button>
    </div>
  );
}
