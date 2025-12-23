import Image from "next/image";
import CTAButton from "../common/CTAButton";

type ShockingStatisticSectionProps = {
  data: {
    ss_subtitle: string;
    ss_title: string;
    ss_video_description: string; // HTML
    ss_video: string;
    ss_image: string;
    ss_image_title: string;
    ss_image_description: string; // HTML
    ss_image_cta_button?: {
      title: string;
      url: string;
      target?: string;
    };
  };
};

export default function ShockingStatisticSection({
  data,
}: ShockingStatisticSectionProps) {
  if (!data) return null;

  return (
    <section className="bg-[#3a3a3a] py-20 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        {/* 🔹 Badge */}
        <div className="flex justify-center mb-8">
          <span className="bg-white text-[#e43d12] text-sm font-bold px-6 py-2 rounded-full uppercase tracking-wide">
            {data.ss_subtitle}
          </span>
        </div>

        {/* 🔹 Main Title */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold uppercase leading-tight mb-14">
          {data.ss_title}
        </h2>

        {/* 🔹 Top Grid (Text + Video) */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <div
            className="text-gray-300 text-[15px] leading-relaxed space-y-5"
            dangerouslySetInnerHTML={{
              __html: data.ss_video_description,
            }}
          />

          {/* Right Video */}
          <div className="rounded-xl overflow-hidden">
            <video
              src={data.ss_video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* 🔹 Bottom Grid (Image + Content) */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="rounded-xl overflow-hidden">
            <Image
              src={data.ss_image}
              alt={data.ss_image_title}
              width={700}
              height={500}
              className="rounded-xl object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold uppercase leading-snug mb-6">
              {data.ss_image_title}
            </h3>

            <div
              className="text-gray-300 text-[15px] leading-relaxed space-y-5 mb-8"
              dangerouslySetInnerHTML={{
                __html: data.ss_image_description,
              }}
            />
{typeof data.ss_image_cta_button === 'object' &&
  data.ss_image_cta_button?.title && (
    <CTAButton
      text={data.ss_image_cta_button.title.replace(/&nbsp;/g, '').trim()}
      href={
        data.ss_image_cta_button.url &&
        data.ss_image_cta_button.url !== '#'
          ? data.ss_image_cta_button.url
          : '/reservation'
      }
      target={
        data.ss_image_cta_button.target === '_blank'
          ? '_blank'
          : '_self'
      }
      className="bg-[#e43d12] hover:bg-[#c7350f] px-10 py-4 uppercase"
    />
)}

          </div>
        </div>
      </div>
    </section>
  );
}
