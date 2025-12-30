'use client';

import { useState } from 'react';
import CTAButton from '@/components/common/CTAButton';
import { PAGE_SLUGS } from '@/lib/constants/pageSlugs';

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
    <section className="faq-section bg-[#303030] text-white py-20 px-4">
      {/* Heading */}
      <div className="text-center mb-5">
        <h2 className="max-w-5xl mx-auto text-center text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] mb-3 font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
          {data.main_heading}
        </h2>
        <p className="text-white text-base text-medium capitalize">
          {data.tag_line}
        </p>
      </div>

     {/* FAQ List */}
<div className="max-w-5xl mx-auto divide-y divide-white/20">
  {data.faqs.map((faq, index) => {
    const isOpen = openIndex === index;

    return (
      <div key={index} className="faq-items">
        {/* FAQ item */}
        <div className="py-5">
          <button
            onClick={() =>
              setOpenIndex(isOpen ? null : index)
            }
            className="w-full flex justify-between items-center text-left"
          >
            <h3 className="text-[45px] font-normal leading-15.5 uppercase font-bebas">
              {faq.title}
            </h3>

            <span className="text-4xl font-normal">
              {isOpen ? '−' : '+'}
            </span>
          </button>

          {isOpen && (
            <p className="mt-2 text-[#FFFFFFCC] text-base leading-8 font-medium max-w-4xl">
              {faq.answer}
            </p>
          )}
        </div>

        {/* 🔥 CTA after 3rd FAQ */}
        {index === 2 && (
          <div className='faq-cta border-t border-white/20'>
            <div className="my-10 bg-[#3a3a3a] rounded-xl py-14 text-center">
              <h3 className="text-3xl font-extrabold uppercase mb-8">
                {data.faq_cta_heading}
              </h3>

              <CTAButton
                text={data.faq_cta_button.title.replace(/&nbsp;/g, '').trim()}
                href={
                  data.faq_cta_button.url &&
                  data.faq_cta_button.url !== '#'
                    ? data.faq_cta_button.url
                    : `/${PAGE_SLUGS.RESERVATION}`
                }
                target={
                  data.faq_cta_button.target === '_blank'
                    ? '_blank'
                    : '_self'
                }
              />
            </div>
          </div>
        )}
      </div>
    );
  })}
</div>

    </section>
  );
}
