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
    <section className="bg-[#3a3a3a] text-white py-12.5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Headings */}
        <h2 className="text-center text-[30px] md:text-[56px] leading-[62px] font-normal uppercase mb-3 font-bebas">
          {data.sabotage_title}
        </h2>

        <h3 className="text-center text-[30px] md:text-[56px] font-normal leading-[62px] uppercase mb-5.5 font-bebas">
          {data.sabotage_secondary_title}
        </h3>

        {/* Content */}
        <div
          className="sabotage-content max-w-[1064px] mx-auto text-[#FFFFFFCC]"
          dangerouslySetInnerHTML={{
            __html: data.sabotage_description,
          }}
        />
      </div>
    </section>
  );
}
