type Props = {
  data: {
    title: string;
    faqs: { question: string; answer: string }[];
  };
};

export default function FAQ({ data }: Props) {
  return (
    <section className="py-24 bg-[#3a3a3a]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          {data.title}
        </h2>

        <div className="space-y-6">
          {data.faqs.map((faq, i) => (
            <div key={i}>
              <h4 className="font-semibold">
                {faq.question}
              </h4>
              <p className="opacity-80 mt-1">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
