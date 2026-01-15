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
    <section className="shokicking-statistics-section  py-12.5 ">
      <div className="max-w-7xl mx-auto sm:px-6 px-4">
        {/* 🔹 Badge */}
        <div className="flex justify-center mb-8">
          <span className="bg-white text-[#DB3706] sm:text-[22px] text-[14px] font-bold px-7 py-2.5 rounded-[20px] uppercase tracking-wide">
            {data.ss_subtitle}
          </span>
        </div>

        {/* 🔹 Main Title */}
        <h2 className="max-w-[818px] mx-auto text-center text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] md:mb-10 mb-5 font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
          {data.ss_title}
        </h2>

        {/* 🔹 Top Grid (Text + Video) */}
        <div className="grid lg:grid-cols-2 gap-10 lg:flex-row items-stretch mb-10">
          {/* Left Content */}
          <div
            className=" text-sm xl:text-lg sm:text-base leading-relaxed space-y-6 order-2 lg:order-1"
            dangerouslySetInnerHTML={{
              __html: data.ss_video_description,
            }}
          />

          {/* Right Video */}
          <div className="rounded-[12px] overflow-hidden h-[240px] sm:h-[320px] md:h-full order-1 lg:order-2">
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
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
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
            <h3 className="text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] mb-6 font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
              {data.ss_image_title}
            </h3>

            <div
              className=" text-sm xl:text-lg sm:text-base leading-relaxed space-y-6"
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
      
    />
)}

          </div>
        </div>
      </div>
    </section>
  );
}
