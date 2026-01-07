import Image from 'next/image';
import TopHeader from '@/components/book/TopHeader';
import { getPageBySlug } from '../../lib/api';
import { PAGE_SLUGS } from '@/lib/constants/pageSlugs';
import type { Metadata } from 'next';


const stripHtml = (text = '') =>
  text.replace(/<[^>]*>/g, '').trim();

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(PAGE_SLUGS.RESERVATION);
  const seo = page.yoast_seo;

  return {
    title: seo?.title || page.title,

    description:
      seo?.description ||
      stripHtml(page.excerpt) ||
      'Book your free consultation',

    alternates: {
      canonical: seo?.canonical || undefined,
    },

    robots: {
      index: !seo?.robots?.noindex,
      follow: !seo?.robots?.nofollow,
    },

    openGraph: {
      title: seo?.open_graph?.title || seo?.title,
      description:
        seo?.open_graph?.description || seo?.description,
      images: seo?.open_graph?.image
        ? [
            {
              url: seo.open_graph.image,
              width: 1200,
              height: 630,
              alt: seo?.open_graph?.title || seo?.title,
            },
          ]
        : [],
      type: 'website',
    },

    twitter: {
      card: seo?.twitter?.image
        ? 'summary_large_image'
        : 'summary',
      title:
        seo?.twitter?.title ||
        seo?.open_graph?.title ||
        seo?.title,
      description:
        seo?.twitter?.description ||
        seo?.open_graph?.description ||
        seo?.description,
      images: seo?.twitter?.image
        ? [seo.twitter.image]
        : seo?.open_graph?.image
        ? [seo.open_graph.image]
        : [],
    },
  };
}


export default async function ReservationPage() {
  const data = await getPageBySlug(PAGE_SLUGS.RESERVATION);

  // ✅ SAFETY GUARD
  if (!data || !data.reservation_page) {
    return (
      <main className="min-h-screen bg-[#303030] text-white flex items-center justify-center">
        <p>Reservation page data not available</p>
      </main>
    );
  }

  const reservation = data.reservation_page;

  const heroHeading =
    reservation?.header_hero_area?.main_heading;

  const card =
    reservation?.reservation_card_center_white_box;

  return (
    <main className="min-h-screen bg-[#303030] text-white">
      <TopHeader />

      {/* Hero Heading */}
      <section className="text-center px-4 sm:pt-8.5 pt-8 sm:pb-10 pb-5">
        <h1 className="text-[28px] sm:text-[32px] md:text-[56px] font-normal uppercase leading-tight md:leading-[62px] font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
          {heroHeading}
        </h1>
      </section>

      {/* Reservation Card */}
      <section className="flex justify-center px-4 pb-24">
        <div className="w-full max-w-[729px] bg-white text-black rounded-xl box-shadow-[0px_4px_4px_0px_#0000001A] border border-[#0000001A] overflow-hidden">
          
          {/* Card Header */}
          <div className="flex justify-center sm:py-6 py-3 border-b border-[#0000001A]">
            {card?.card_logo && (
              <Image
                src={card.card_logo}
                alt="Active Aura Fitness"
                width={160}
                height={40}
                priority
                className='max-h-[60px] max-w-[150px]'
              />
            )}
          </div>

          {/* Card Body */}
          <div className="sm:py-10 py-5 text-center">
            <div className='max-w-[428px] mx-auto px-4'>
              <h2 className="text-3xl font-normal mb-3 font-bebas">
                {card?.card_title}
              </h2>

              {/* Duration */}
              <div className="flex items-center justify-center gap-2 text-[#30303099] text-lg text-semibold mb-6">
                <span className='text-[#30303099]'>🕒</span>
                <span>{card?.duration_text}</span>
              </div>

              {/* Description */}
              <p className="text-[#303030] text-base leading-relaxed sm:mb-10 mb-4 text-normal">
                {card?.description}
              </p>
          </div>
          <div className='sm:py-10 py-5 border-t border-[#0000001A]'>
            <div className='max-w-[428px] mx-auto px-4'>
                {/* Calendar Heading */}
                <h3 className="text-[22.65px] font-normal font-bebas sm:mb-7.5 mb-4 text-left">
                  Select a Date &amp; Time
                </h3>

                {/* Calendar Placeholder */}
                <div className="border border-dashed rounded-lg p-10 text-gray-400 text-sm">
                  Calendar widget will be embedded here
                  <br />
                  (Calendly / custom scheduler)
                </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </main>
  );
}
