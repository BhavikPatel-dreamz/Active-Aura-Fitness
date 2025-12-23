type LaunchPriceSectionProps = {
  data: {
    lp_title: string;
    lp_description: string; // HTML
  };
};

export default function LaunchPriceSection({
  data,
}: LaunchPriceSectionProps) {
  if (!data) return null;

  return (
    <section className="bg-[#3a3a3a] py-20 px-4">
      <div className="max-w-5xl mx-auto text-white">
        {/* 🔹 Title */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold uppercase leading-tight mb-10">
          {data.lp_title}
        </h2>

        {/* 🔹 Description */}
        <div
          className="text-gray-300 text-[15px] leading-relaxed space-y-5"
          dangerouslySetInnerHTML={{
            __html: data.lp_description,
          }}
        />
      </div>
    </section>
  );
}
