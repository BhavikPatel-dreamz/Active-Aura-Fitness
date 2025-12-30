import CTAButton from '../common/CTAButton';
import { PAGE_SLUGS } from '@/lib/constants/pageSlugs';

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
    <div className="rounded-[12px] overflow-hidden h-[240px] sm:h-[320px] md:h-full">
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
    <div className="mt-6 md:mt-0">
      <h2 className="text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] mb-4 font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
        {data.problem_title}
      </h2>

      {data.problem_description && (
        <div
          className="text-[#FFFFFFCC] text-sm xl:text-lg sm:text-base leading-[26px] sm:leading-[30px] space-y-6 sm:space-y-9"
          dangerouslySetInnerHTML={{
            __html: data.problem_description,
          }}
        />
      )}

      {typeof data.problem_cta_button === 'object' &&
        data.problem_cta_button?.title && (
          <CTAButton
            text={data.problem_cta_button.title
              .replace(/&nbsp;/g, '')
              .trim()}
            href={
              data.problem_cta_button.url &&
              data.problem_cta_button.url !== '#'
                ? data.problem_cta_button.url
                : `/${PAGE_SLUGS.RESERVATION}`
            }
            target={
              data.problem_cta_button.target === '_blank'
                ? '_blank'
                : '_self'
            }
          />
        )}
    </div>
  );

  return (
    <section className="image-with-text bg-[#303030] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 items-center">
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
