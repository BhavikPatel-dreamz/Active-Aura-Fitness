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
    <section className="bg-[#3a3a3a] text-white py-28">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase leading-tight mb-8">
          {data.secret_title}
        </h2>

        {/* DESCRIPTION */}
        {data.secret_description && (
          <div
            className="text-gray-300 text-[15px] md:text-[16px] leading-relaxed space-y-6 max-w-4xl mx-auto mb-14"
            dangerouslySetInnerHTML={{
              __html: data.secret_description,
            }}
          />
        )}

        {/* CTA */}
        {data.secret_cta_button?.title && (
          <a
            href={data.secret_cta_button.url || '#'}
            target={data.secret_cta_button.target || '_self'}
            className="inline-block bg-[#ff3d00] hover:bg-[#e63600] transition-colors text-white font-bold uppercase px-12 py-4 rounded-xl text-sm tracking-wide"
          >
            {data.secret_cta_button.title.trim()}
          </a>
        )}
      </div>
    </section>
  );
}
