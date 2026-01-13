import CTAButton from "../common/CTAButton";
import { PAGE_SLUGS } from '@/lib/constants/pageSlugs';

type HeroSectionProps = {
  data: {
    hero_subtitle: string;
    hero_title: string;
    hero_steps: { step_text: string }[];
    hero_video: string;
    hero_cta: {
      title: string;
      url: string;
      target: string;
    };
  };
};

export default function HeroSection({ data }: HeroSectionProps) {
  if (!data) return null;

  return (
    <section className="text-center pt-6 sm:pt-8 md:pt-10 pb-10 md:pb-14 px-4 sm:px-6">
      
      {/* Subtitle */}
      <p className="text-[18px] sm:text-[22px] lg:text-[26px] font-normal text-white uppercase mb-2 text-shadow-[0px_4px_4px_rgba(255,_255,_255,_0.1)] font-bebas">
        {data.hero_subtitle}
      </p>

      {/* Title */}
      <h1 className="text-[32px] sm:text-[42px] lg:text-[56px] font-normal text-white text-shadow-[0px_4px_4px_rgba(255,_255,_255,_0.1)] mb-4 md:mb-6 font-bebas leading-tight lg:leading-normal">
        {data.hero_title}
      </h1>

      {/* Steps */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-8 md:mb-10 capitalize">
        {data.hero_steps.map((step, i) => (
          <span key={i} className="text-white font-semibold text-sm sm:text-sm lg:text-base xl:text-xl border-r border-[#FFFFFF33] pr-0 sm:pr-2 lg:pr-4 last:border-r-0">
            <span className="text-[#DB3706]">Step {i + 1}:</span> {step.step_text}
          </span>
        ))}
      </div>

      {/* Video */}
      <div className="px-0 sm:px-4">
        <video
          src={data.hero_video}
          autoPlay
          loop
          playsInline
          controls
          width={1104}
          height={621}
          className="mx-auto rounded-[8px] max-w-[1104px] w-full h-auto outline-0"
        />
      </div>

      {/* CTA */}
      {data.hero_cta?.title && (
        <div className="hero-cta-btn flex justify-center">
          <CTAButton
            text={data.hero_cta.title.trim()}
            href={
              data.hero_cta.url && data.hero_cta.url !== '#'
                ? data.hero_cta.url
                : `/${PAGE_SLUGS.RESERVATION}`
            }
            target={data.hero_cta.target === '_blank' ? '_blank' : '_self'}
          />
        </div>
      )}
    </section>
  );
}
