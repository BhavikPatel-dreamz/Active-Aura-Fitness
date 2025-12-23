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
    <section className="bg-[#2f2f2f] text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            {data.testimonial_title}
          </h2>

          {/* Arrows */}
          <div className="flex gap-4">
            <button
              onClick={() => canGoPrev && setIndex(index - 1)}
              disabled={!canGoPrev}
              className="text-2xl px-3 py-1 rounded-full border border-white/30
                         hover:bg-white hover:text-black
                         disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ‹
            </button>

            <button
              onClick={() => canGoNext && setIndex(index + 1)}
              disabled={!canGoNext}
              className="text-2xl px-3 py-1 rounded-full border border-white/30
                         hover:bg-white hover:text-black
                         disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {visibleTestimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[#4a4a4a] rounded-xl p-6
                         border border-white/10
                         flex flex-col justify-between"
            >
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 mb-3">
                {Array.from({ length: Number(t.rating) }).map(
                  (_, i) => (
                    <span key={i}>★</span>
                  )
                )}
              </div>

              {/* Title */}
              <h3 className="font-bold mb-3">
                {t.title}
              </h3>

              {/* Comment */}
              <div
                className="text-sm text-gray-200 leading-relaxed mb-6"
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
