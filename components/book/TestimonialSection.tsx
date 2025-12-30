'use client';

import { useState } from 'react';

type Testimonial = {
  rating: string;
  title: string;
  comment: string; // HTML
  author: string;
  author_city: string;
};

type Props = {
  data: {
    testimonial_title: string;
    testimonials: Testimonial[];
  };
};

export default function TestimonialSection({ data }: Props) {
  const [index, setIndex] = useState(0);

  if (!data || !data.testimonials?.length) return null;

  const visibleTestimonials = data.testimonials.slice(index, index + 3);

  const canGoPrev = index > 0;
  const canGoNext =
    index + 3 < data.testimonials.length;

  return (
    <section className="testimonial-section bg-[#FFFFFF0D] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto sm:px-6 px-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
            {data.testimonial_title}
          </h2>

          {/* Arrows */}
          <div className="flex gap-4">
            <button
              onClick={() => canGoPrev && setIndex(index - 1)}
              disabled={!canGoPrev}
              className="group w-10 h-10 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-200">
                <path className="fill-white group-hover:fill-[#FFFFFF99]" d="M1.46208 15.2013L9.11208 22.8513C9.42435 23.1617 9.84677 23.3359 10.2871 23.3359C10.7274 23.3359 11.1498 23.1617 11.4621 22.8513C11.6183 22.6963 11.7423 22.512 11.8269 22.3089C11.9115 22.1058 11.9551 21.888 11.9551 21.6679C11.9551 21.4479 11.9115 21.2301 11.8269 21.027C11.7423 20.8239 11.6183 20.6396 11.4621 20.4846L3.79541 12.8513C3.6392 12.6963 3.51521 12.512 3.4306 12.3089C3.34598 12.1058 3.30242 11.888 3.30242 11.6679C3.30242 11.4479 3.34598 11.2301 3.4306 11.027C3.51521 10.8239 3.6392 10.6396 3.79541 10.4846L11.4621 2.85128C11.7759 2.53965 11.9531 2.11612 11.9547 1.67384C11.9562 1.23157 11.782 0.806789 11.4704 0.492949C11.1588 0.17911 10.7352 0.00191689 10.293 0.000354767C9.8507 -0.00120926 9.42592 0.172987 9.11208 0.484617L1.46208 8.13462C0.525744 9.07212 -0.000187874 10.3429 -0.000187874 11.6679C-0.000187874 12.993 0.525744 14.2638 1.46208 15.2013Z" fill="white"/>
              </svg>
            </button>

            <button
              onClick={() => canGoNext && setIndex(index + 1)}
              disabled={!canGoNext}
              className="group w-10 h-10 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-200">
                <path className="fill-white group-hover:fill-[#FFFFFF99]" d="M10.493 8.13465L2.843 0.484654C2.53073 0.174236 2.10831 0 1.668 0C1.22769 0 0.805268 0.174236 0.492997 0.484654C0.336783 0.639592 0.212793 0.823927 0.128179 1.02703C0.0435641 1.23012 0 1.44797 0 1.66799C0 1.88801 0.0435641 2.10585 0.128179 2.30895C0.212793 2.51205 0.336783 2.69638 0.492997 2.85132L8.15966 10.4847C8.31588 10.6396 8.43987 10.8239 8.52448 11.027C8.6091 11.2301 8.65266 11.448 8.65266 11.668C8.65266 11.888 8.6091 12.1059 8.52448 12.3089C8.43987 12.512 8.31588 12.6964 8.15966 12.8513L0.492997 20.4847C0.179158 20.7963 0.00196653 21.2198 0.000403722 21.6621C-0.00115908 22.1044 0.173036 22.5291 0.484665 22.843C0.796295 23.1568 1.21983 23.334 1.6621 23.3356C2.10438 23.3371 2.52916 23.163 2.843 22.8513L10.493 15.2013C11.4293 14.2638 11.9553 12.993 11.9553 11.668C11.9553 10.343 11.4293 9.07216 10.493 8.13465Z" fill="white"/>
              </svg>

            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8.5">
          {visibleTestimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[#4a4a4a] rounded-[5px] p-6 border-t-0 border-r-4 border-b-4 border-l-0 border-white/20 flex flex-col justify-between transition-colors duration-300 ease-out hover:bg-[#555555] hover:border-white/30">
              {/* Stars */}
              <div className="flex gap-1 text-[#FEE106] mb-2 text-2xl">
                {Array.from({ length: Number(t.rating) }).map(
                  (_, i) => (
                    <span key={i}>★</span>
                  )
                )}
              </div>

              {/* Title */}
              <h3 className="font-semibold mb-2.5 text-lg">
                {t.title}
              </h3>

              {/* Comment */}
              <div
                className="text-lg text-[#FFFFFFCC] leading-relaxed mb-3 text-normal"
                dangerouslySetInnerHTML={{
                  __html: t.comment,
                }}
              />

              {/* Author */}
              <div>
                <p className="font-semibold">
                  {t.author}
                </p>
                <p className="text-sm text-gray-300">
                  {t.author_city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
