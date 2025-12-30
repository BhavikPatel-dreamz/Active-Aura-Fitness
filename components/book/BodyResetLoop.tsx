import CTAButton from "../common/CTAButton";
import { PAGE_SLUGS } from '@/lib/constants/pageSlugs';

type ProvenStat = {
  rating: string;
  title: string;
  comment: string;
  author: string;
  author_city: string;
};

type BodyResetLoopData = {
  brl_title: string;
  brl_description: string;
  brl_video?: string;
  brl_cta_button?: {
    title?: string;
    url?: string;
    target?: string;
  };
  brl_proven_title?: string;
  brl_proven_stats?: ProvenStat[];
};

export default function BodyResetLoopSection({
  data,
}: {
  data: BodyResetLoopData;
}) {
  if (!data) return null;

  return (
    <section className="body-reset-loop-section bg-[#303030] text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* TITLE */}
        <h2 className="text-center text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] mb-4 font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
          {data.brl_title}
        </h2>

        {/* DESCRIPTION */}
        {data.brl_description && (
          <div
            className="max-w-5xl mx-auto text-[#FFFFFFCC] text-base sm:text-lg leading-[26px] sm:leading-[30px] space-y-6 sm:space-y-9 mb-8 sm:mb-10"
            dangerouslySetInnerHTML={{
              __html: data.brl_description,
            }}
          />
        )}

        {/* VIDEO */}
        {data.brl_video && (
          <div className="relative max-w-5xl mx-auto rounded-xl overflow-hidden">
            <video
              src={data.brl_video}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-auto rounded-2xl"
            />
          </div>
        )}

        {/* CTA */}
        {typeof data.brl_cta_button === 'object' &&
  data.brl_cta_button?.title && (
    <div className="text-center sm:mb-20 mb-12">
      <CTAButton
        text={data.brl_cta_button.title.replace(/&nbsp;/g, '').trim()}
        href={
          data.brl_cta_button.url &&
          data.brl_cta_button.url !== '#'
            ? data.brl_cta_button.url
            : `/${PAGE_SLUGS.RESERVATION}`
        }
        target={
          data.brl_cta_button.target === '_blank'
            ? '_blank'
            : '_self'
        }
        className="px-12 py-4"
      />
    </div>
)}


        {/* PROVEN TITLE */}
        {data.brl_proven_title && (
          <h3 className="max-w-[950px] mx-auto text-center text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] mb-8 font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
            {data.brl_proven_title}
          </h3>
        )}

        {/* PROVEN STATS */}
        {data.brl_proven_stats && data.brl_proven_stats.length > 0 && (
          <div className="max-w-[950px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-[30px] gap-x-[40px]">
            {data.brl_proven_stats.map((item, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF0D] rounded-xl p-6"
              >
                {/* RATING */}
                <div className="flex gap-1 text-[#FEE106] mb-3 text-2xl">
                  {Array.from({ length: Number(item.rating) }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* TITLE */}
                <h4 className="font-semibold text-lg mb-4">
                  {item.title}
                </h4>

                {/* COMMENT */}
                <div
                  className="text-[#FFFFFFCC] text-lg leading-relaxed space-y-4 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: item.comment,
                  }}
                />

                {/* AUTHOR */}
                <p className="font-semibold text-white text-lg">
                  {item.author}
                </p>
                <p className="text-sm text-[#FFFFFFCC]">
                  {item.author_city}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
