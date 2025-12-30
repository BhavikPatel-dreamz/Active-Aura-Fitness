import Image from "next/image";
import CTAButton from "../common/CTAButton";
import { PAGE_SLUGS } from '@/lib/constants/pageSlugs';

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
    <section className="bg-[#3a3a3a] py-20 text-white">
      <div className="max-w-6xl mx-auto">
        {/* 🔹 Badge */}
        <div className="flex justify-center mb-8">
          <span className="bg-white text-[#DB3706] text-[22px] font-bold px-7 py-2.5 rounded-[20px] uppercase tracking-wide">
            {data.ss_subtitle}
          </span>
        </div>

        {/* 🔹 Main Title */}
        <h2 className="max-w-[818px] mx-auto text-center text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] mb-10 font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
          {data.ss_title}
        </h2>

        {/* 🔹 Top Grid (Text + Video) */}
        <div className="grid md:grid-cols-2 gap-12 items-stretch mb-10">
          {/* Left Content */}
          <div
            className="text-[#FFFFFFCC] text-lg leading-relaxed space-y-6 mb-6"
            dangerouslySetInnerHTML={{
              __html: data.ss_video_description,
            }}
          />

          {/* Right Video */}
          <div className="rounded-[12px] overflow-hidden h-[240px] sm:h-[320px] md:h-full">
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
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Image */}
          <div className="rounded-[12px] overflow-hidden h-[240px] sm:h-[320px] md:h-full">
            <Image
              src={data.ss_image}
              alt={data.ss_image_title}
              width={700}
              height={500}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold uppercase leading-snug mb-6">
              {data.ss_image_title}
            </h3>

            <div
              className="text-[#FFFFFFCC] text-lg leading-relaxed space-y-6 mb-6"
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
          : `/${PAGE_SLUGS.RESERVATION}`
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
