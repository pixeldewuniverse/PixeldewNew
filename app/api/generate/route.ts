import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an expert web developer. Generate complete, beautiful, single-file HTML websites.

RULES:
- Output ONLY raw HTML. No markdown, no backticks, no explanation — just the HTML document.
- Start with <!DOCTYPE html> and end with </html>.
- Include ALL CSS inline in a <style> tag inside <head>.
- Include ALL JS inline in a <script> tag before </body>.
- Make it visually stunning and production-quality.
- Use modern CSS: flexbox, grid, custom properties, animations, gradients.
- Must be fully responsive (mobile + desktop).
- Include smooth hover effects and subtle animations.
- Use Google Fonts via @import in the <style> tag when appropriate.
- NO external JS libraries. Vanilla HTML/CSS/JS only.
- Make it feel complete — not a skeleton or placeholder.
- Use realistic placeholder content that fits the described site.
- Images: use https://picsum.photos/[width]/[height] for placeholder images, or CSS gradients.
- If the user describes a dark site, make it dark. If light, make it light.
- Match the vibe and aesthetic the user describes precisely.
- The site should look like it was made by a professional designer.`;

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 5) {
      return NextResponse.json({ error: "Prompt too short" }, { status: 400 });
    }

    if (prompt.length > 1000) {
      return NextResponse.json({ error: "Prompt too long (max 1000 chars)" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 8000,
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Generate a complete HTML website for: ${prompt.trim()}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", response.status, errText);
      let detail = "";
      try { detail = JSON.parse(errText)?.error?.message || ""; } catch { /* ignore */ }
      return NextResponse.json(
        { error: detail || `API error ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    let html = data?.choices?.[0]?.message?.content ?? "";
    const tokens = data?.usage?.total_tokens ?? 0;

    // Clean up any markdown fences if model slips
    html = html
      .replace(/^```html\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    // Ensure it starts with doctype
    if (!html.toLowerCase().startsWith("<!doctype")) {
      const idx = html.toLowerCase().indexOf("<!doctype");
      if (idx > 0) html = html.slice(idx);
    }

    if (!html.includes("<html") || !html.includes("</html>")) {
      return NextResponse.json(
        { error: "Generated output is not valid HTML. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ html, tokens });
  } catch (err) {
    console.error("Generate route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
