// import { NextResponse } from 'next/server';
// import { submitQuiz } from '@/lib/api';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const data = await submitQuiz(body);
//     return NextResponse.json(data);
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import { submitQuiz } from '@/lib/api';

export async function POST(req: Request) {
  const payload = await req.json();

  try {
    const data = await submitQuiz(payload);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Submit failed' },
      { status: 500 }
    );
  }
}
