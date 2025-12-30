import CTAButton from "../common/CTAButton";
import { PAGE_SLUGS } from '@/lib/constants/pageSlugs';

type Props = {
  data: {
    co_title: string;
    co_description: string; // HTML (ordered list)
    co_before_cta_content?: string; // HTML
    co_cta_button?: {
      title: string;
      url: string;
      target?: string;
    };
  };
};

export default function ConsultationSection({ data }: Props) {
  if (!data) return null;

  return (
    <section className="consultation-section bg-[#303030] text-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="max-w-5xl mx-auto text-center text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] mb-6 font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
          {data.co_title}
        </h2>
        
        <div className="rounded-xl p-10 bg-[#FFFFFF1A] mb-10">
          {/* Ordered List */}
          <div
            className="text-[#FFFFFFCC] text-lg leading-relaxed
                      [&_ol]:list-decimal [&_ol]:pl-6 
                      [&_li]:mb-6
                      [&_strong]:text-white [&_strong]:font-semibold capitalize"
            dangerouslySetInnerHTML={{ __html: data.co_description }}
          />
        </div>
        {/* Text before CTA */}
        {data.co_before_cta_content && (
          <div
            className="text-[#FFFFFFCC] text-lg leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{
              __html: data.co_before_cta_content,
            }}
          />
        )}

        {/* CTA */}
        {typeof data.co_cta_button === 'object' &&
  data.co_cta_button?.title && (
    <div className="text-center">
      <CTAButton
        text={data.co_cta_button.title.replace(/&nbsp;/g, '').trim()}
        href={
          data.co_cta_button.url &&
          data.co_cta_button.url !== '#'
            ? data.co_cta_button.url
            : `/${PAGE_SLUGS.RESERVATION}`
        }
        target={
          data.co_cta_button.target === '_blank'
            ? '_blank'
            : '_self'
        }
        // className="bg-[#E5391C] hover:bg-[#cf341a] px-10 py-4 uppercase"
      />
    </div>
)}

      </div>
    </section>
  );
}
