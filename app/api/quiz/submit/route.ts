import { NextResponse } from 'next/server';
import { submitQuiz } from '@/lib/api';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await submitQuiz(body);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
