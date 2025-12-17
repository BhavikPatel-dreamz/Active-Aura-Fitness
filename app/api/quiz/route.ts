import { NextResponse } from 'next/server';
import { getQuizQuestions } from '@/lib/api';

export async function GET() {
  try {
    const data = await getQuizQuestions();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';
// import { getQuizQuestions } from '@/lib/api';

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const quizId = searchParams.get('quiz_id');

//   if (!quizId) {
//     return NextResponse.json(
//       { error: 'quiz_id missing' },
//       { status: 400 }
//     );
//   }

//   const data = await getQuizQuestions(Number(quizId));
//   return NextResponse.json(data);
// }
