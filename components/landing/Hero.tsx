import Image from 'next/image';

type Benefit = {
  text: string;
  image: {
    url: string;
    alt: string;
  };
};

type Props = {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  benefits: Benefit[];
};

export default function Hero({
  heroTitle,
  heroSubtitle,
  heroDescription,
  benefits,
}: Props) {
  const leftBenefits = benefits.slice(0, 3);
  const rightBenefits = benefits.slice(3, 6);

  return (
    <section className="relative px-6 max-w-7xl mx-auto">
      {/* LEFT BENEFITS */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-6">
        {leftBenefits.map((item, index) => (
          <div
            key={item.text}
            className="bg-white text-black w-50 px-5 py-4 rounded-xl shadow-xl flex flex-col items-center text-center"
            style={{ transform: `rotate(${-8 + index * 2}deg)` }}
          >
            <Image
              src={item.image.url}
              alt={item.image.alt}
              width={36}
              height={36}
              className="mb-2"
            />
            <span className="text-sm font-semibold">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* RIGHT BENEFITS */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-6">
        {rightBenefits.map((item, index) => (
          <div
            key={item.text}
            className="bg-white text-black w-50 px-5 py-4 rounded-xl shadow-xl flex flex-col items-center text-center"
            style={{ transform: `rotate(${8 - index * 2}deg)` }}
          >
            <Image
              src={item.image.url}
              alt={item.image.alt}
              width={36}
              height={36}
              className="mb-2"
            />
            <span className="text-sm font-semibold">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* HERO CONTENT */}
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-2xl font-bold mb-4 text-[#303030] font-poppins">
          {heroTitle}
        </h2>

        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 font-bebas">
          {heroSubtitle}
        </h1>

        <div
  className="text-base md:text-lg font-medium opacity-90"
  dangerouslySetInnerHTML={{ __html: heroDescription }}
/>
      </div>
    </section>
  );
}

