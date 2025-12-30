import { getPageBySlug, getLogos } from "../../lib/api";
import { PAGE_SLUGS } from "@/lib/constants/pageSlugs";
import type { Metadata } from "next";
import HeroSection from "../../components/book/HeroSection";
import SabotageSection from "@/components/book/SabotageSection";
import ProblemSection from "@/components/book/ProblemSection";
import SecretSection from "@/components/book/SecretSection";
import BodyResetLoopSection from "@/components/book/BodyResetLoop";
import ConsultationCtaWithTimer from "@/components/book/ConsultationCtaWithTimer";
import TopHeader from "@/components/book/TopHeader";
import WhyItWorksSection from "@/components/book/WhyItWorksSection";
import LaunchPriceSection from "@/components/book/LaunchPriceSection";
import ShockingStatisticSection from "@/components/book/ShockingStatisticSection";
import ConsultationSection from "@/components/book/ConsultationSection";
import TestimonialSection from "@/components/book/TestimonialSection";
import FaqSection from "@/components/book/FaqSection";

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(PAGE_SLUGS.BOOK_FREE);
  const seo = page.yoast_head_json;

  return {
    title: seo?.title || page.title,

    description:
      seo?.description ||
      stripHtml(page.excerpt) ||
      "Book your free consultation",

    alternates: {
      canonical: seo?.og_url,
    },

    robots: {
      index: seo?.robots?.index !== "noindex",
      follow: seo?.robots?.follow !== "nofollow",
    },

    openGraph: {
      title: seo?.og_title,
      description: seo?.og_description,
      url: seo?.og_url,
      siteName: seo?.og_site_name,
      type: seo?.og_type || "website",
      images: seo?.og_image?.map((img: any) => ({
        url: img.url,
        width: img.width,
        height: img.height,
        type: img.type,
      })),
    },

    twitter: {
      card: seo?.twitter_card || "summary_large_image",
      title: seo?.og_title,
      description: seo?.og_description,
      images: seo?.og_image?.[0]?.url ? [seo.og_image[0].url] : [],
    },
  };
}

export default async function BookYourFreePage() {
  const pageData = await getPageBySlug(PAGE_SLUGS.BOOK_FREE);

  // ✅ SERVER-SIDE SAFETY GUARD
  if (!pageData) {
    return (
      <main className="bg-[#2f2f2f] text-white p-20 text-center">
        <p>Page data not available</p>
      </main>
    );
  }

  // const acf = pageData.acf_fields;
  const acf = pageData;

  return (
    <main className="bg-[#2f2f2f] text-white">
      <TopHeader />

      {/* HERO */}
      <HeroSection data={acf.hero_section} />

      <ConsultationCtaWithTimer />

      {/* SABOTAGE */}
      <SabotageSection data={acf.sabotage_section} />

     {/* PROBLEM SECTIONS */}
    <section className="image-with-text-wrapper py-12 md:py-20 space-y-12 md:space-y-20">
      {acf.problem_section?.problems?.map(
        (problem: any, index: number) => (
          <ProblemSection key={index} data={problem} />
        )
      )}
    </section>

      {acf.problem_section?.problem_overall_description && (
        <section className="bg-[#3a3a3a] text-white pb-24">
          <div className="max-w-5xl mx-auto px-6">
            <div
              className="text-gray-300 text-[15px] leading-relaxed space-y-5"
              dangerouslySetInnerHTML={{
                __html: acf.problem_section.problem_overall_description,
              }}
            />
          </div>
        </section>
      )}

      <SecretSection data={acf.secret_section} />

      <BodyResetLoopSection data={acf.body_reset_loop} />

      <WhyItWorksSection data={acf.why_it_works_section} />

      <LaunchPriceSection data={acf.launch_price_section} />

      <ShockingStatisticSection data={acf.shocking_statistic_section} />

      <ConsultationSection data={acf.consultation_outline_section} />

      <TestimonialSection data={acf.testimonial_section} />

      <FaqSection data={acf.faq_section} />
    </main>
  );
}
