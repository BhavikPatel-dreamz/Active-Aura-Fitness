type Problem = {
  problem_title: string;
  problem_media_type: 'video' | 'image';
  media_position: 'left' | 'right';
  problem_video?: string | false;
  problem_image?: string | false;
  problem_description?: string;
  problem_cta_button?: {
    title?: string;
    url?: string;
    target?: string;
  } | string;
};

export default function ProblemSection({ data }: { data: Problem }) {
  if (!data) return null;

  const isMediaLeft = data.media_position === 'left';

  const Media = (
    <div className="rounded-2xl overflow-hidden">
      {data.problem_media_type === 'video' && data.problem_video ? (
        <video
          src={data.problem_video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      ) : data.problem_image ? (
        <img
          src={data.problem_image}
          alt=""
          className="w-full h-full object-cover"
        />
      ) : null}
    </div>
  );

  const Content = (
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold uppercase leading-tight mb-6">
        {data.problem_title}
      </h2>

      {data.problem_description && (
        <div
          className="text-gray-300 text-[15px] leading-relaxed space-y-5 mb-10"
          dangerouslySetInnerHTML={{
            __html: data.problem_description,
          }}
        />
      )}

      {typeof data.problem_cta_button === 'object' &&
        data.problem_cta_button?.title && (
          <a
            href={data.problem_cta_button.url || '#'}
            target={data.problem_cta_button.target || '_self'}
            className="inline-block bg-[#ff3d00] hover:bg-[#e63600] transition text-white font-bold uppercase px-10 py-4 rounded-xl text-sm tracking-wide"
          >
            {data.problem_cta_button.title.trim()}
          </a>
        )}
    </div>
  );

  return (
    <section className="bg-[#3a3a3a] text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {isMediaLeft ? (
            <>
              {Media}
              {Content}
            </>
          ) : (
            <>
              {Content}
              {Media}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
