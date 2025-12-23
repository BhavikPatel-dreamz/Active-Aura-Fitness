import TopHeader from '@/components/book/TopHeader';
import Image from 'next/image';
import { getBookYourFreePage } from '@/lib/api';

export default async function BookYourFreePage() {

  const apiResponse = await getBookYourFreePage();


  const heroTitle =
    apiResponse?.acf_fields?.hero_section?.hero_title ;

  return (
    <main className="min-h-screen bg-[#2f2f2f] text-white">
      {/* 🔹 Top Header */}
      <TopHeader />

      {/* 🔹 Page Heading */}
      <section className="text-center px-4 mb-12">
        <h1 className="text-4xl font-bold leading-tight max-w-5xl mx-auto">
          {heroTitle}
        </h1>
      </section>

      {/* 🔹 Booking Card */}
      <section className="flex justify-center px-4 pb-20">
        <div className="w-full max-w-md bg-white text-black rounded-xl shadow-lg overflow-hidden">
          {/* Card Header */}
          <div className="flex flex-col items-center py-6 border-b">
            <Image
              src="/active-aura-black-logo.png"
              alt="Active Aura Fitness"
              width={140}
              height={40}
            />
          </div>

          {/* Card Body */}
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold mb-3">
              Reservation Page
            </h2>

            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-4">
              <span>🕒</span>
              <span>30 min</span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              This is an example of a meeting you would have with a potential
              customer to demonstrate your product.
            </p>

            <h3 className="text-lg font-semibold mb-4">
              Select a Date & Time
            </h3>

            {/* 🔹 Placeholder for Calendar */}
            <div className="border rounded-lg p-6 text-gray-400 text-sm">
              Calendar integration goes here
              <br />
              (Calendly / custom scheduler)
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
