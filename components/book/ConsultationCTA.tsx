type Props = {
  data: {
    title: string;
    subtitle: string;
    description: string;
    image: {
      url: string;
      alt: string;
    };
  };
};

export default function HeroSection({ data }: Props) {
  return (
    <section className="py-24 text-center max-w-6xl mx-auto sm:px-6 px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
        {data.title}
      </h1>

      <p className="text-lg opacity-80 mb-10">
        {data.subtitle}
      </p>

      <div className="rounded-2xl overflow-hidden">
        <img
          src={data.image.url}
          alt={data.image.alt}
          className="w-full object-cover"
        />
      </div>
    </section>
  );
}
