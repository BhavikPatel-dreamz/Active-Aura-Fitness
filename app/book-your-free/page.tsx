import { getBookYourFreePage } from '@/lib/api';
import HeroSection from '../../components/book/HeroSection';
import SabotageSection from '@/components/book/SabotageSection';
import ProblemSection from '@/components/book/ProblemSection';
import SecretSection from '@/components/book/SecretSection';
import BodyResetLoopSection from '@/components/book/BodyResetLoop';
import ConsultationCtaWithTimer from '@/components/book/ConsultationCtaWithTimer';
import TopHeader from '@/components/book/TopHeader';

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



      
    </main>
  );
}
