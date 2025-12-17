import { Benefit } from '@/lib/types';
import Image from 'next/image';

type Props = {
  benefits: Benefit[];
};

export default function Benefits({ benefits }: Props) {
  return (
    <section className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-6">
      {benefits.map((benefit, i) => (
        <div
          key={i}
          className="bg-white text-black p-6 rounded-lg shadow-lg flex items-center gap-4"
        >
          <Image
            src={benefit.image.url}
            alt={benefit.image.alt}
            width={48}
            height={48}
          />
          <p className="font-semibold">{benefit.text}</p>
        </div>
      ))}
    </section>
  );
}
