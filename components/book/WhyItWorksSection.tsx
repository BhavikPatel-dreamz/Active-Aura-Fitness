import Image from 'next/image';

import CTAButton from '../common/CTAButton';
import { PAGE_SLUGS } from '@/lib/constants/pageSlugs';

type WhyItWorksSectionProps = {
  data: {
    wiw_title: string;
    wiw_image: string;
    wiw_description: string; // HTML
    wiw_cta_button?: {
      title: string;
      url: string;
      target?: string;
    };
  };
};

export default function WhyItWorksSection({
  data,
}: WhyItWorksSectionProps) {
  if (!data) return null;

  return (
    <section className="bg-[#3B3B3B] py-12.5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 🔹 Left Image */}
        <div className="relative w-full rounded-xl overflow-hidden h-[240px] sm:h-[320px] md:h-full">
          <Image
            src={data.wiw_image}
            alt={data.wiw_title}
            fill
            className="object-cover object-top"
          />
        </div>

        {/* 🔹 Right Content */}
        <div className="text-white">
          <h2 className="text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] mb-4 font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
            {data.wiw_title}
          </h2>

          <div
            className="text-[#FFFFFFCC] text-lg leading-relaxed space-y-6 mb-6"
            dangerouslySetInnerHTML={{
              __html: data.wiw_description,
            }}
          />

          {typeof data.wiw_cta_button === 'object' &&
  data.wiw_cta_button?.title && (
    <CTAButton
      text={data.wiw_cta_button.title.replace(/&nbsp;/g, '').trim()}
      href={
        data.wiw_cta_button.url &&
        data.wiw_cta_button.url !== '#'
          ? data.wiw_cta_button.url
          : `/${PAGE_SLUGS.RESERVATION}`
      }
      target={
        data.wiw_cta_button.target === '_blank'
          ? '_blank'
          : '_self'
      }
      className="bg-[#E5391C] hover:bg-[#cf341a] px-8 py-4 uppercase"
    />
)}

        </div> 
      </div>
    </section>
  );
}
