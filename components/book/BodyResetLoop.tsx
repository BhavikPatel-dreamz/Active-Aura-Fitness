import CTAButton from "../common/CTAButton";

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
    <section className="bg-[#3a3a3a] text-white py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* TITLE */}
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase leading-tight mb-10">
          {data.brl_title}
        </h2>

        {/* DESCRIPTION */}
        {data.brl_description && (
          <div
            className="max-w-4xl mx-auto text-gray-300 text-[15px] md:text-[16px] leading-relaxed space-y-6 text-center mb-14"
            dangerouslySetInnerHTML={{
              __html: data.brl_description,
            }}
          />
        )}

        {/* VIDEO */}
        {data.brl_video && (
          <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden mb-16">
            <video
              src={data.brl_video}
              controls
              className="w-full h-auto rounded-2xl"
            />
          </div>
        )}

        {/* CTA */}
        {typeof data.brl_cta_button === 'object' &&
  data.brl_cta_button?.title && (
    <div className="text-center mb-24">
      <CTAButton
        text={data.brl_cta_button.title.replace(/&nbsp;/g, '').trim()}
        href={
          data.brl_cta_button.url &&
          data.brl_cta_button.url !== '#'
            ? data.brl_cta_button.url
            : '/${data.slug}'
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
          <h3 className="text-center text-2xl md:text-3xl font-extrabold uppercase mb-16 max-w-5xl mx-auto">
            {data.brl_proven_title}
          </h3>
        )}

        {/* PROVEN STATS */}
        {data.brl_proven_stats && data.brl_proven_stats.length > 0 && (
          <div className="grid md:grid-cols-2 gap-10">
            {data.brl_proven_stats.map((item, index) => (
              <div
                key={index}
                className="bg-[#2f2f2f] rounded-2xl p-8 shadow-lg"
              >
                {/* RATING */}
                <div className="flex gap-1 text-orange-500 mb-4">
                  {Array.from({ length: Number(item.rating) }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* TITLE */}
                <h4 className="font-bold text-lg mb-4">
                  {item.title}
                </h4>

                {/* COMMENT */}
                <div
                  className="text-gray-300 text-[15px] leading-relaxed space-y-4 mb-6"
                  dangerouslySetInnerHTML={{
                    __html: item.comment,
                  }}
                />

                {/* AUTHOR */}
                <p className="font-semibold text-white">
                  {item.author}
                </p>
                <p className="text-sm text-gray-400">
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
