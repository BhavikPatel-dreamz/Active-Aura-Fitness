import { getPageBySlug, getQuizList } from '../lib/api';
import { PAGE_SLUGS } from '@/lib/constants/pageSlugs';
import type { Metadata } from 'next';
import Hero from '../components/landing/Hero';
import Goals from '../components/landing/Goal';
import CTA from '../components/landing/CTA';
import SiteHeader from '@/components/layouts/SiteHeader';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug(PAGE_SLUGS.LANDING);

  return {
    title: 'Active Aura Fitness',
    description:
      'Personalized fitness & weight loss solutions',
  };
}

export default async function HomePage() {
  const landingData = await getPageBySlug(PAGE_SLUGS.LANDING);
  const quizListRes = await getQuizList();

  const quizMap: Record<string, number> = {};
  quizListRes.quizzes.forEach((quiz: any) => {
    quizMap[
      quiz.title.toLowerCase().replace(/\s+/g, '_')
    ] = quiz.id;
  });

  return (
    <main className="bg-[#E5391C] text-white relative overflow-hidden">
      <SiteHeader />

      <Hero
        heroTitle={landingData.hero_title}
        heroSubtitle={landingData.hero_subtitle}
        heroDescription={landingData.hero_description}
        benefits={landingData.benefits}
      />

      <CTA
        text={landingData.cta_button_text}
        href="/reservation"
      />

      <Goals
        goals={landingData.goal_options}
        quizMap={quizMap}
      />
    </main>
  );
}
