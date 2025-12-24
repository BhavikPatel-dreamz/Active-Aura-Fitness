import Image from 'next/image';

import CTAButton from '../common/CTAButton';

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
    <section className="bg-[#3a3a3a] py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 🔹 Left Image */}
        <div className="relative w-full h-130 rounded-xl overflow-hidden">
          <Image
            src={data.wiw_image}
            alt={data.wiw_title}
            fill
            className="object-cover"
          />
        </div>

        {/* 🔹 Right Content */}
        <div className="text-white">
          <h2 className="text-3xl lg:text-4xl font-extrabold uppercase leading-tight mb-6">
            {data.wiw_title}
          </h2>

          <div
            className="text-gray-300 text-[15px] leading-relaxed space-y-5 mb-10"
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
          : '/reservation'
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
