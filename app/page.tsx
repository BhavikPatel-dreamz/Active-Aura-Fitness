import { getPageBySlug, getQuizList } from '../lib/api';
import { PAGE_SLUGS, QuizSlug} from '@/lib/constants/pageSlugs';
import type { Metadata } from 'next';
import Hero from '../components/landing/Hero';
import Goals from '../components/landing/Goal';
import CTA from '../components/landing/CTA';
import SiteHeader from '@/components/layouts/SiteHeader';


export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(PAGE_SLUGS.LANDING);
  const seo = page.yoast_seo;

  return {
    title: seo?.title || page.title || 'Active Aura Fitness',

    description:
      seo?.description ||
      page.excerpt?.replace(/<[^>]*>/g, '') ||
      'Personalized fitness & weight loss programs',

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
        seo?.open_graph?.description ||
        seo?.description,
      images: seo?.open_graph?.image
        ? [{ url: seo.open_graph.image }]
        : [],
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: seo?.twitter?.title || seo?.title,
      description:
        seo?.twitter?.description ||
        seo?.description,
      images: seo?.twitter?.image
        ? [seo.twitter.image]
        : [],
    },
  };
}

export default async function HomePage() {
  const landingData = await getPageBySlug(PAGE_SLUGS.LANDING);
  const quizListRes = await getQuizList();

  type QuizListItem = {
  title: string;
  slug: QuizSlug;
};

const quizMap: Record<string, QuizSlug> = {};

quizListRes.quizzes.forEach((quiz: QuizListItem) => {
  quizMap[
    quiz.title.toLowerCase().replace(/\s+/g, '_')
  ] = quiz.slug;
});



  return (
    <main className="bg-[#DB3706] text-white relative overflow-hidden">
      <SiteHeader />

      <Hero
        heroTitle={landingData.hero_title}
        heroSubtitle={landingData.hero_subtitle}
        heroDescription={landingData.hero_description}
        benefits={landingData.benefits}
      />

      {landingData.cta_button_text && (
  <CTA
    text={landingData.cta_button_text}
    href={`/${PAGE_SLUGS.RESERVATION}`}
  />
)}

      <Goals
        goals={landingData.goal_options}
        quizMap={quizMap}
      />

     
    </main>
  );
}
