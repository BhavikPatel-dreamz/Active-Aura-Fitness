import { getLandingPage, getQuizList } from '../lib/api';
import Hero from '../components/landing/Hero';
import Goals from '../components/landing/Goal';
import CTA from '../components/landing/CTA';
import SiteHeader from '@/components/layouts/SiteHeader';
import TopHeader from '@/components/book/TopHeader';

export default async function HomePage() {
  const data = await getLandingPage();
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
        heroTitle={data.hero_title}
        heroSubtitle={data.hero_subtitle}
        heroDescription={data.hero_description}
        benefits={data.benefits}
      />

      <CTA 
        text={data.cta_button_text}
        href = "/reservation"
       />

      <Goals
        goals={data.goal_options}
        quizMap={quizMap}   
      />
    </main>
  );
}
