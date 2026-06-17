import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { description: string };
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              'Kamu adalah analis proyek web development profesional. Analisis kebutuhan berikut dan return ONLY valid JSON tanpa penjelasan apapun, tanpa markdown, tanpa backtick: { "category": string (one of: Company Profile, E-Commerce, Landing Page, Web App / SaaS, Portfolio, Custom), "features": string[] (max 6), "price_min": number (IDR integer), "price_max": number (IDR integer), "duration_weeks": number, "complexity": string (one of: low, medium, high), "reasoning": string (1 kalimat Bahasa Indonesia) }',
          },
          { role: "user", content: body.description },
        ],
      }),
    });

    const raw = await response.json();
    const content = raw?.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Analisis gagal" }, { status: 500 });
  }
}
