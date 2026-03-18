import { cache } from "react";

const BASE_URL = process.env.AURA_API_BASE!;
const API_KEY = process.env.AURA_API_KEY!;


export const getPageBySlug = cache(async function (slug: string) {
  const res = await fetch(
    `${process.env.AURA_API_PAGE}/pages?slug=${slug}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error(`Failed to fetch page: ${slug}`);

  const pages = await res.json();
  const page = pages[0];

  return {
    ...page.acf,
    title: page.title?.rendered,
    content: page.content?.rendered,
    yoast_seo: page.yoast_seo,
    yoast_head_json: page.yoast_head_json,
  };
});


export async function getQuizQuestions(slug: string) {
  const res = await fetch(
    `/api/quiz?slug=${slug}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch quiz questions');
  }

  return res.json();
}


export async function submitQuiz(payload: any) {
  const res = await fetch(
    `${BASE_URL}/quiz/submit`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();

}


export async function getQuizList() {
  const res = await fetch(
    `${BASE_URL}/quiz/list`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch quiz list');
  }

  return res.json();
}


export async function validateQuiz(payload: {
  quiz_id: number;
  answers: Record<string, string>;
}) {
  const res = await fetch(
    `${BASE_URL}/quiz/validate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error('Quiz validation failed');
  }

  return res.json();
}


export async function getLogos() {
  try {
    const res = await fetch(`${BASE_URL}/logo?source=site`, {
      headers: {
        "x-api-key": API_KEY,
      },
      next: { revalidate: 3600 }, // cache for 1 hour
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error("Logo API failed:", res.status);
      return null;
    }

    const json = await res.json();
    return json?.logo || null;
  } catch (error) {
    console.error("Logo fetch error:", error);
    return null;
  }
}

export async function getFavicon() {
  try {
    const res = await fetch(`${BASE_URL}/favicon`, {
      headers: {
        "x-api-key": API_KEY,
      },
      next: { revalidate: 3600 }, // cache for 1 hour
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Favicon API failed:", text);
      return null;
    }

    const json = await res.json();
    return json?.favicon || null;
  } catch (error) {
    console.error("Favicon fetch error:", error);
    return null;
  }
}







