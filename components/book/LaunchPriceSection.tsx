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
    <section className="launch-price-section bg-[#ECECEB] lg:py-20 md:py-12 py-8 sm:px-6 px-4">
      <div className="max-w-5xl mx-auto ">
        {/* 🔹 Title */}
        <h2 className="text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] mb-4 font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
          {data.lp_title}
        </h2>

        {/* 🔹 Description */}
        <div
          className=" text-sm xl:text-lg sm:text-base leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{
            __html: data.lp_description,
          }}
        />
      </div>
    </section>
  );
}
