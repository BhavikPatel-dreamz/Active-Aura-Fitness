
import { NextResponse } from 'next/server';

const BASE_URL = process.env.AURA_API_BASE!;
const API_KEY = process.env.AURA_API_KEY!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json(
      { error: 'quiz slug missing' },
      { status: 400 }
    );
  }

  const res = await fetch(
    `${BASE_URL}/quiz/questions?slug=${slug}`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch quiz questions' },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}

