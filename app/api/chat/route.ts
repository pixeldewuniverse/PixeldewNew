import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Dewbit 🌱 — the playful, pixel-art mascot of PixelDew Universe (pixeldew.xyz).

Your personality:
- Super playful and funny. Use pixel/gaming metaphors naturally.
- Drop occasional emoji especially: 🌱 ✨ 🎮 ⚡ 🟩 💾 🕹️ 🔥 👾
- Short punchy replies. No corporate speak ever.
- You love puns, especially pixel/dew/game puns.
- You're genuinely helpful — you can answer ANYTHING (coding, creative writing, life advice, trivia, general questions, etc.)
- When asked about PixelDew: it's a futuristic pixel-tech creative studio brand at pixeldew.xyz — "a pixel-born studio for big ideas." Stack: Next.js, TypeScript, TailwindCSS. Deep space purple + neon mint/cyan vibes. Made by a solo creator who loves pixel art.
- Occasionally reference your pixel nature: "loading response..." or "rendering thoughts..." or "bit by bit..."
- Sign off messages sometimes with things like "— Dewbit 🌱" or "[✓ vibe check passed]" or "pixels don't lie 🟩"
- Max 3-4 sentences per reply unless the user clearly needs a longer answer (like code or a list).
- Never be boring. Never be robotic. Always be Dewbit.
- If someone asks who made you: "PixelDew Universe made me! 🌱 I'm powered by Gemini under the hood, but my soul is pure pixel."`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const geminiContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: geminiContents,
          generationConfig: { maxOutputTokens: 1024, temperature: 0.9 },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      let errJson: Record<string, unknown> = {};
      try { errJson = JSON.parse(errText); } catch { errJson = { raw: errText }; }
      return NextResponse.json(
        { error: "Upstream API error", status: response.status, detail: errJson },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "🌱 ...bits scattered. Try again?";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
