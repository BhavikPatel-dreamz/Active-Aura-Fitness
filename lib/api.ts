
const BASE_URL = process.env.AURA_API_BASE!;
const API_KEY = process.env.AURA_API_KEY!;

export async function getPageBySlug(slug: string) {
  const res = await fetch(
    `${process.env.AURA_API_PAGE}/pages?slug=${slug}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch page: ${slug}`);
  }

  const pages = await res.json();

  // WordPress always returns an array
  if (!Array.isArray(pages) || pages.length === 0) {
    throw new Error(`Page not found: ${slug}`);
  }

  const page = pages[0];

  // If you're using ACF
  return {
    ...page.acf,
    title: page.title?.rendered,
    content: page.content?.rendered,
    yoast_seo: page.yoast_seo,
    yoast_head_json: page.yoast_head_json,
  };
}


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
  const res = await fetch(
    `${BASE_URL}/logo?source=site`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch page data');
  }

  const json = await res.json();
  return json.logo;
}

export async function getFavicon() {
  const res = await fetch(`${BASE_URL}/favicon`, {
    headers: {
      'x-api-key': API_KEY,
    },
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Favicon API failed:', text);
    throw new Error('Failed to fetch favicon');
  }

  const json = await res.json();
  return json.favicon;
}







