type SabotageSectionProps = {
  data: {
    sabotage_title: string;
    sabotage_secondary_title: string;
    sabotage_description: string; // HTML from WP
  };
};

export default function SabotageSection({
  data,
}: SabotageSectionProps) {
  if (!data) return null;

  return (
    <section className="bg-[#3a3a3a] text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Headings */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-wide uppercase mb-4">
          {data.sabotage_title}
        </h2>

        <h3 className="text-center text-2xl md:text-3xl font-extrabold uppercase mb-12">
          {data.sabotage_secondary_title}
        </h3>

        {/* Content */}
        <div
          className="sabotage-content max-w-4xl mx-auto text-gray-200"
          dangerouslySetInnerHTML={{
            __html: data.sabotage_description,
          }}
        />
      </div>
    </section>
  );
}
