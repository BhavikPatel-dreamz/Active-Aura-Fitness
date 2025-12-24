import CTAButton from "../common/CTAButton";
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
    <section className="text-center py-20 px-6">
      <p className="text-sm uppercase mb-4">
        {data.hero_subtitle}
      </p>

      <h1 className="text-4xl font-bold mb-6">
        {data.hero_title}
      </h1>

      <div className="flex justify-center gap-6 mb-8">
        {data.hero_steps.map((step, i) => (
          <span key={i} className="text-orange-500">
            Step {i + 1}: {step.step_text}
          </span>
        ))}
      </div>

      <video
        src={data.hero_video}
        controls
        className="mx-auto rounded-xl max-w-4xl"
      />

      {data.hero_cta?.title && (
  <div className="mt-8">
    <CTAButton
      text={data.hero_cta.title.trim()}
      href={
        data.hero_cta.url && data.hero_cta.url !== '#'
          ? data.hero_cta.url
          : '/reservation'
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
