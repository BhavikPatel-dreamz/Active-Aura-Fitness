import Image from 'next/image';
import TopHeader from '@/components/book/TopHeader';
import { getReservationPage } from '@/lib/api';

export default async function ReservationPage() {
  const data = await getReservationPage();

  const reservation =
    data?.acf_fields?.reservation_page;

  const heroHeading =
    reservation?.header_hero_area?.main_heading;

  const card =
    reservation?.reservation_card_center_white_box;

  return (
    <main className="min-h-screen bg-[#2f2f2f] text-white">
      {/* Header */}
      <TopHeader />

      {/* Hero Heading */}
      <section className="text-center px-4 pt-16 pb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase max-w-5xl mx-auto leading-tight">
          {heroHeading}
        </h1>
      </section>

      {/* Reservation Card */}
      <section className="flex justify-center px-4 pb-24">
        <div className="w-full max-w-md bg-white text-black rounded-2xl shadow-xl overflow-hidden">
          
          {/* Card Header */}
          <div className="flex justify-center py-6 border-b">
            {card?.card_logo && (
              <Image
                src={card.card_logo}
                alt="Active Aura Fitness"
                width={160}
                height={40}
                priority
              />
            )}
          </div>

          {/* Card Body */}
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              {card?.card_title}
            </h2>

            {/* Duration */}
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-6">
              <span>🕒</span>
              <span>{card?.duration_text}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-10">
              {card?.description}
            </p>

            {/* Calendar Heading */}
            <h3 className="text-lg font-semibold mb-4">
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
      </section>
    </main>
  );
}
