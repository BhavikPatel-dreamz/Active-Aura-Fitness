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
    <section className="text-center pt-5 pb-10 px-4">
      <p className="text-[26px] font-normal text-white uppercase mb-2 text-shadow-[0px_4px_4px_rgba(255,_255,_255,_0.1)] font-bebas">
        {data.hero_subtitle}
      </p>

      <h1 className="text-[56px] font-normal text-white text-shadow-[0px_4px_4px_rgba(255,_255,_255,_0.1)] mb-4 font-bebas">
        {data.hero_title}
      </h1>

      <div className="flex justify-center gap-6 mb-10 capitalize">
        {data.hero_steps.map((step, i) => (
          <span
            key={i}
            className="
              text-white font-semibold text-xl
              border-r border-[#FFFFFF33] pr-4
              last:border-r-0 last:pr-0
            "
          >
            <span className="text-[#DB3706]">Step {i + 1}:</span> {step.step_text}
          </span>
        ))}
      </div>


      <video
        src={data.hero_video}
        controls
        className="mx-auto rounded-[8px] max-w-[1104px] outline-0"
      />

      {data.hero_cta?.title && (
  <div className="mt-10.5">
    <CTAButton
      text={data.hero_cta.title.trim()}
      href={
        data.hero_cta.url && data.hero_cta.url !== '#'
          ? data.hero_cta.url
          : `/${PAGE_SLUGS.RESERVATION}`
      }
      target={
        data.hero_cta.target === '_blank'
          ? '_blank'
          : '_self'
      }
    />
  </div>
)}

    </section>
  );
}
