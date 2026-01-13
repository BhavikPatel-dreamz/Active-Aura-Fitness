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
    <section className="relative max-w-[1350px] max-[1400px]:max-w-[1200px] mx-auto px-4 xl:px-0">
      {/* ================= DESKTOP LEFT BENEFITS (UNCHANGED VISUALLY) ================= */}
      <div className="hidden xl:block absolute left-0 top-10">
        {leftBenefits.map((item) => (
          <div
            key={item.text}
            className="
              white-rotate-box bg-white text-black
              w-full max-w-[210px] xl:w-[210px]
              h-[160px] px-2 py-4
              flex flex-col items-center justify-center text-center
            "
            style={{ boxShadow: '0px 4px 4px 0px #FFFFFF2E' }}
          >
            <Image
              src={item.image.url}
              alt={item.image.alt}
              width={36}
              height={36}
              className="mb-3"
            />
            <span className="font-poppins font-semibold text-[18px] leading-[27px] capitalize text-[#303030]">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP RIGHT BENEFITS (UNCHANGED VISUALLY) ================= */}
      <div className="hidden xl:block absolute right-0 top-10">
        {rightBenefits.map((item) => (
          <div
            key={item.text}
            className="
              white-rotate-box bg-white text-black
              w-full max-w-[210px] xl:w-[210px]
              h-[160px] px-2 py-4
              flex flex-col items-center justify-center text-center
            "
            style={{ boxShadow: '0px 4px 4px 0px #FFFFFF2E' }}
          >
            <Image
              src={item.image.url}
              alt={item.image.alt}
              width={36}
              height={36}
              className="mb-2"
            />
            <span className="font-poppins font-semibold text-[18px] leading-[27px] capitalize text-[#303030]">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* ================= HERO CONTENT ================= */}
      <div className="text-center relative z-10 md:py-4 py-5 xl:py-0">
        <h2 className="text-xl xl:text-2xl font-bold max-w-4xl max-[1400px]:max-w-[700px] mx-auto mb-[30px] text-[#303030] font-poppins">
          {heroTitle}
        </h2>

        <h1 className="text-3xl xl:text-[56px] max-w-[856px] max-[1400px]:max-w-[700px] mx-auto leading-tight xl:leading-[62px] mb-6 font-bebas">
          {heroSubtitle}
        </h1>

        <div
          className="text-[16px] xl:text-[19px] leading-[26px] xl:leading-[30px] uppercase font-bold max-w-[942px] max-[1400px]:max-w-[700px] mx-auto text-[#282828] font-poppins"
          dangerouslySetInnerHTML={{ __html: heroDescription }}
        />
      </div>

    
    </section>
  );
}
