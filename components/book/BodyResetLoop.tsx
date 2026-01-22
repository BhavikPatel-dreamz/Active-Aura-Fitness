import CTAButton from "../common/CTAButton";
import { PAGE_SLUGS } from "@/lib/constants/pageSlugs";
import AutoplayVideo from "../common/AutoPlayVideo";

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
    <section className="body-reset-loop-section bg-[#ECECEB] text-black lg:py-20 md:py-12 py-8">
      <div className="max-w-6xl mx-auto sm:px-6 px-4">
        {/* TITLE */}
        <h2 className="text-center text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] mb-4 font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
          {data.brl_title}
        </h2>

        {/* DESCRIPTION */}
        {data.brl_description && (
          <div
            className="max-w-5xl mx-auto  text-sm xl:text-lg sm:text-base leading-[26px] sm:leading-[30px] space-y-6 sm:space-y-9 mb-8 sm:mb-10"
            dangerouslySetInnerHTML={{
              __html: data.brl_description,
            }}
          />
        )}

        {/* VIDEO */}
        {data.brl_video && (
          <div className="relative max-w-5xl mx-auto rounded-xl overflow-hidden">
            {/* <video
              src={data.brl_video}
              autoPlay
              loop
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center"
            /> */}
            <AutoplayVideo
              src={data.brl_video}
              className="w-full h-full object-cover object-center"
            />  
          </div>
        )}

        {/* CTA */}
        {typeof data.brl_cta_button === "object" &&
          data.brl_cta_button?.title && (
            <div className="text-center lg:mb-20 sm:mb-12 mb-8 ">
              <CTAButton
                text={data.brl_cta_button.title.replace(/&nbsp;/g, "").trim()}
                href={
                  data.brl_cta_button.url && data.brl_cta_button.url !== "#"
                    ? data.brl_cta_button.url
                    : `/${PAGE_SLUGS.RESERVATION}`
                }
                target={
                  data.brl_cta_button.target === "_blank" ? "_blank" : "_self"
                }
                className="sm:px-12 sm:py-4 bg-[#6F00FF]"
              />
            </div>
          )}

        {/* PROVEN TITLE */}
        {data.brl_proven_title && (
          <h3 className="max-w-5xl mx-auto text-center text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] mb-8 font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
            {data.brl_proven_title}
          </h3>
        )}

        {/* PROVEN STATS */}
        {data.brl_proven_stats && data.brl_proven_stats.length > 0 && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-[30px] gap-x-[40px]">
            {data.brl_proven_stats.map((item, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF0D] rounded-xl p-6 flex flex-col justify-between"
              >
                {/* RATING */}
                <div className="flex gap-1 text-[#FEE106] mb-3 text-2xl">
                  {Array.from({ length: Number(item.rating) }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* TITLE */}
                <h4 className="font-semibold text-lg mb-4">{item.title}</h4>

                {/* COMMENT */}
                <div
                  className=" text-sm xl:text-lg sm:text-base leading-relaxed space-y-4 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: item.comment,
                  }}
                />

                {/* AUTHOR */}
                <p className="font-semibold text-black text-lg">
                  {item.author}
                </p>
                <p className="text-sm ">{item.author_city}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
