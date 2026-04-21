import { NextResponse } from "next/server";

// const LEAD_SAVE_URL =
//   "https://dddemo.net/wordpress/2026/aura-fitness/wp-json/aura-quiz/v1/leads/save";

const BASE_URL = process.env.AURA_API_BASE!;
const API_KEY = process.env.AURA_API_KEY;

export async function POST(req: Request) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "Server misconfiguration: missing AURA_API_KEY",
        },
        { status: 500 },
      );
    }

    const payload = await req.json();
    const normalizedPayload = {
      ...payload,
      results: Array.isArray(payload?.results) ? payload.results : [],
    };

    const res = await fetch(`${BASE_URL}/leads/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(normalizedPayload),
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
