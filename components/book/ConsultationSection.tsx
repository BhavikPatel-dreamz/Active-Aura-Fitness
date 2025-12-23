import CTAButton from "../common/CTAButton";
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
    <section className="bg-[#2f2f2f] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
          {data.co_title}
        </h2>

        {/* Ordered List */}
        <div
          className="text-gray-300 text-[15px] leading-relaxed space-y-4
                     [&_ol]:list-decimal [&_ol]:pl-6
                     [&_li]:mb-4
                     [&_strong]:text-white"
          dangerouslySetInnerHTML={{ __html: data.co_description }}
        />

        {/* Text before CTA */}
        {data.co_before_cta_content && (
          <div
            className="text-gray-300 text-[15px] leading-relaxed mt-10 space-y-4"
            dangerouslySetInnerHTML={{
              __html: data.co_before_cta_content,
            }}
          />
        )}

        {/* CTA */}
        {typeof data.co_cta_button === 'object' &&
  data.co_cta_button?.title && (
    <div className="text-center mt-12">
      <CTAButton
        text={data.co_cta_button.title.replace(/&nbsp;/g, '').trim()}
        href={
          data.co_cta_button.url &&
          data.co_cta_button.url !== '#'
            ? data.co_cta_button.url
            : '/reservation'
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
