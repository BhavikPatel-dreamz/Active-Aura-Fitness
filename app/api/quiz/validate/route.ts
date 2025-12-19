import { NextResponse } from 'next/server';
import { validateQuiz } from '@/lib/api';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await validateQuiz(body);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
