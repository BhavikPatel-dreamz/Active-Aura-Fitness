import { LandingApiResponse } from './types';

const BASE_URL = process.env.AURA_API_BASE!;
const API_KEY = process.env.AURA_API_KEY!;

export async function getLandingPage() {
  const res = await fetch(`${BASE_URL}/landing-page`, {
    headers: {
      'x-api-key': API_KEY,
    },
    next: {
      revalidate: 60, // ISR (revalidate every 60s)
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch landing page data');
  }

  const json: LandingApiResponse = await res.json();
  return json.data;
}


export async function getQuizQuestions(quizId: number) {
  const res = await fetch(
    `${BASE_URL}/quiz/questions?quiz_id=${quizId}`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
      cache: 'no-store',
    }
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
export async function getBookYourFreePage() {
  const res = await fetch(
    `${BASE_URL}/page-acf-fields?page_id=95`,
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
  return json.data;
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


