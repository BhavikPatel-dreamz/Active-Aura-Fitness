import Image from "next/image";

import { getPageBySlug } from "../../lib/api";
import { PAGE_SLUGS } from "@/lib/constants/pageSlugs";
import type { Metadata } from "next";
import SiteHeader from "@/components/layouts/SiteHeader";
import CalendlyLazyLoad from "@/components/reservation/CalendlyLazyLoad";

const stripHtml = (text = "") => text.replace(/<[^>]*>/g, "").trim();




export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(PAGE_SLUGS.RESERVATION);
  
  const seo = page.yoast_seo;

  return {
    title: seo?.title || page.title,

    description:
      seo?.description ||
      stripHtml(page.excerpt) ||
      "Book your free consultation",

    alternates: {
      canonical: seo?.canonical || undefined,
    },

    robots: {
      index: !seo?.robots?.noindex,
      follow: !seo?.robots?.nofollow,
    },

    openGraph: {
      title: seo?.open_graph?.title || seo?.title,
      description: seo?.open_graph?.description || seo?.description,
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
      type: "website",
    },

    twitter: {
      card: seo?.twitter?.image ? "summary_large_image" : "summary",
      title: seo?.twitter?.title || seo?.open_graph?.title || seo?.title,
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

  const heroHeading = reservation?.header_hero_area?.main_heading;

  const card = reservation?.reservation_card_center_white_box;

  return (
    <main className="min-h-screen bg-[#ECECEB] text-black">
      <SiteHeader />

      {/* Hero Heading */}
      <section className="text-center px-4 sm:pt-8.5 pt-8 sm:pb-10 pb-5">
        <h1 className="text-[28px] sm:text-[32px] md:text-[56px] font-bold uppercase leading-tight md:leading-[62px] font-bebas text-shadow-[0px_2px_4px_0px_#FFFFFF33]">
          {heroHeading}
        </h1>
      </section>

      {/* Reservation Card */}
      <section className="flex justify-center px-4 pb-24 w-full">
        
          

         <CalendlyLazyLoad />
          
        
      </section>
    </main>
  );
}
