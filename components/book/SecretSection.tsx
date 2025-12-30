import CTAButton from "../common/CTAButton";
import { PAGE_SLUGS } from '@/lib/constants/pageSlugs';

type SecretSectionData = {
  secret_title: string;
  secret_description: string;
  secret_cta_button?: {
    title?: string;
    url?: string;
    target?: string;
  };
};

export default function SecretSection({
  data,
}: {
  data: SecretSectionData;
}) {
  if (!data) return null;

  return (
    <section className="secret-section bg-[#3B3B3B] text-white py-12.5">
      <div className="max-w-5xl mx-auto sm:px-6 px-4 text-center">
        {/* TITLE */}
        <h2 className="text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] mb-4 font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
          {data.secret_title}
        </h2>

        {/* DESCRIPTION */}
        {data.secret_description && (
          <div
            className="text-[#FFFFFFCC] text-sm xl:text-lg sm:text-base leading-[26px] sm:leading-[30px] space-y-6 sm:space-y-9"
            dangerouslySetInnerHTML={{
              __html: data.secret_description,
            }}
          />
        )}

        {/* CTA */}
        {typeof data.secret_cta_button === 'object' &&
  data.secret_cta_button?.title && (
    <CTAButton
      text={data.secret_cta_button.title.replace(/&nbsp;/g, '').trim()}
      href={
        data.secret_cta_button.url &&
        data.secret_cta_button.url !== '#'
          ? data.secret_cta_button.url
          : `/${PAGE_SLUGS.RESERVATION}`
      }
      target={
        data.secret_cta_button.target === '_blank'
          ? '_blank'
          : '_self'
      }
    />
)}


      </div>
    </section>
  );
}
