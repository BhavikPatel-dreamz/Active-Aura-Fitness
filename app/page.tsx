import { getLandingPage } from '../lib/api';
import Hero from '../components/landing/Hero';
import Benefits from '../components/landing/Benefits';
import Goals from '../components/landing/Goal';
import CTA from '../components/landing/CTA';
import SiteHeader from '@/components/layouts/SiteHeader';

export default async function HomePage() {
  const data = await getLandingPage();

  return (
    <main className="bg-[#E5391C] text-white relative overflow-hidden">
  <section className="relative">
    <SiteHeader />
  
    {/* <Hero
      heroTitle={data.hero_title}
      heroSubtitle={data.hero_subtitle}
      heroDescription={data.hero_description}
    />
    <Benefits benefits={data.benefits} /> */}
    <Hero
  heroTitle={data.hero_title}
  heroSubtitle={data.hero_subtitle}
  heroDescription={data.hero_description}
  benefits={data.benefits}
/>

  </section>

  <CTA text={data.cta_button_text} />
  <Goals goals={data.goal_options} />
</main>
  );
}
