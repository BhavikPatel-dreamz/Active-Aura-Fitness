'use client';

import { useState } from 'react';
import CTAButton from '@/components/common/CTAButton';

type FaqItem = {
  title: string;
  answer: string;
};

type Props = {
  data: {
    main_heading: string;
    tag_line: string;
    faqs: FaqItem[];
    faq_cta_heading: string;
    faq_cta_button: {
      title: string;
      url: string;
      target: string;
    };
  };
};

export default function FaqSection({ data }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#2f2f2f] text-white py-20 px-4">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold uppercase mb-3">
          {data.main_heading}
        </h2>
        <p className="text-gray-300">
          {data.tag_line}
        </p>
      </div>

     {/* FAQ List */}
<div className="max-w-5xl mx-auto divide-y divide-white/20">
  {data.faqs.map((faq, index) => {
    const isOpen = openIndex === index;

    return (
      <div key={index}>
        {/* FAQ item */}
        <div className="py-6">
          <button
            onClick={() =>
              setOpenIndex(isOpen ? null : index)
            }
            className="w-full flex justify-between items-center text-left"
          >
            <h3 className="text-xl font-bold uppercase">
              {faq.title}
            </h3>

            <span className="text-3xl font-light">
              {isOpen ? '−' : '+'}
            </span>
          </button>

          {isOpen && (
            <p className="mt-4 text-gray-300 max-w-4xl">
              {faq.answer}
            </p>
          )}
        </div>

        {/* 🔥 CTA after 3rd FAQ */}
        {index === 2 && (
          <div className="my-14 bg-[#3a3a3a] rounded-xl py-14 text-center">
            <h3 className="text-3xl font-extrabold uppercase mb-8">
              {data.faq_cta_heading}
            </h3>

            <CTAButton
              text={data.faq_cta_button.title.replace(/&nbsp;/g, '').trim()}
              href={
                data.faq_cta_button.url &&
                data.faq_cta_button.url !== '#'
                  ? data.faq_cta_button.url
                  : '/reservation'
              }
              target={
                data.faq_cta_button.target === '_blank'
                  ? '_blank'
                  : '_self'
              }
            />
          </div>
        )}
      </div>
    );
  })}
</div>

    </section>
  );
}
