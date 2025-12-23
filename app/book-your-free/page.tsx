import { getBookYourFreePage, getLogos } from '@/lib/api';
import HeroSection from '../../components/book/HeroSection';
import SabotageSection from '@/components/book/SabotageSection';
import ProblemSection from '@/components/book/ProblemSection';
import SecretSection from '@/components/book/SecretSection';
import BodyResetLoopSection from '@/components/book/BodyResetLoop';
import ConsultationCtaWithTimer from '@/components/book/ConsultationCtaWithTimer';
import TopHeader from '@/components/book/TopHeader';
import WhyItWorksSection from '@/components/book/WhyItWorksSection';
import LaunchPriceSection from '@/components/book/LaunchPriceSection';
import ShockingStatisticSection from '@/components/book/ShockingStatisticSection';
import ConsultationSection from '@/components/book/ConsultationSection';
import TestimonialSection from '@/components/book/TestimonialSection';
import FaqSection from '@/components/book/FaqSection';

export default async function BookYourFreePage() {
  const pageData = await getBookYourFreePage();

  // ✅ SERVER-SIDE SAFETY GUARD 
  if (!pageData || !pageData.acf_fields) {
    return (
      <main className="bg-[#2f2f2f] text-white p-20 text-center">
        <p>Page data not available</p>
      </main>
    );
  }

  const acf = pageData.acf_fields;

  return (
    <main className="bg-[#2f2f2f] text-white">
      <TopHeader />

      {/* HERO */}
      <HeroSection data={acf.hero_section} />

      <ConsultationCtaWithTimer />

      {/* SABOTAGE */}
      <SabotageSection data={acf.sabotage_section} />

      {acf.problem_section?.problems?.map(
  (problem: any, index: number) => (
    <ProblemSection key={index} data={problem} />
  )
)}

    <SecretSection data={acf.secret_section} />

    <BodyResetLoopSection data={acf.body_reset_loop} />

    <WhyItWorksSection data={acf.why_it_works_section} />
    
    <LaunchPriceSection data={acf.launch_price_section} />

    <ShockingStatisticSection data = {acf.shocking_statistic_section} />

    <ConsultationSection data = {acf.consultation_outline_section} />

     <TestimonialSection data = {acf.testimonial_section} />

     <FaqSection
  data={acf.faq_section}
  
/>

      
    </main>
  );
}
