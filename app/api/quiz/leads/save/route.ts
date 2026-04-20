import { NextResponse } from "next/server";

const LEAD_SAVE_URL =
  "https://dddemo.net/wordpress/2025/aura-fitness/wp-json/aura-quiz/v1/leads/save";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const res = await fetch(LEAD_SAVE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const rawBody = await res.text();
    let responseBody: any = null;

    try {
      responseBody = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      responseBody = { message: rawBody || "Lead save failed" };
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          error: responseBody?.message || "Lead save failed",
          details: responseBody,
        },
        { status: res.status },
      );
    }

    return NextResponse.json(responseBody ?? { success: true });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Lead save failed",
      },
      { status: 500 },
    );
  }
}
