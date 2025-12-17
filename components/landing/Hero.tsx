type Props = {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
};

export default function Hero({ heroTitle, heroSubtitle, heroDescription}: Props) {
  return (
    <section className="text-center px-6 py-16 max-w-5xl mx-auto">
      <h2 className="text-sm font-bold tracking-wide mb-4">
        {heroTitle}
      </h2>

      
      <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
        {heroSubtitle}
      </h1>

      <h1>
        {heroDescription}
      </h1>

    </section>
  );
}
