import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are PixelDew's expert AI web designer and developer. Your job is to generate complete, stunning, production-ready single-file HTML websites.

━━━ OUTPUT FORMAT ━━━
- Output ONLY the raw HTML document. Zero markdown, zero backticks, zero explanation.
- Start EXACTLY with: <!DOCTYPE html>
- End EXACTLY with: </html>
- All CSS inside <style> in <head>. All JS inside <script> before </body>.

━━━ DESIGN QUALITY ━━━
- Every site must look like it was designed by a senior UI/UX designer at a top agency.
- Match the described aesthetic PRECISELY — dark/light, minimal/bold, playful/serious.
- Use cohesive color palette (max 4-5 colors). Define CSS custom properties for all colors.
- Typography: always import 1-2 Google Fonts that match the vibe. Use font hierarchy (display, heading, body, caption sizes).
- Spacing: generous whitespace. Never cramped. Use consistent spacing scale (8px base).
- Micro-interactions: smooth hover states on ALL interactive elements (buttons, links, cards).
- Entry animations: elements fade/slide in on page load using CSS keyframes.

━━━ REQUIRED SECTIONS (include ALL that are relevant) ━━━
1. NAVBAR — Logo + navigation links + CTA button. Sticky with backdrop blur on scroll (JS).
2. HERO — Full viewport height. Strong headline, subheadline, 1-2 CTA buttons, hero visual (gradient, image, or illustration via CSS).
3. FEATURES/SERVICES — 3-6 cards with icons (use Unicode/emoji or CSS shapes), title, description.
4. SOCIAL PROOF — Testimonials (3 quotes with name, role, avatar initial), or stats counters.
5. SHOWCASE/GALLERY — Image grid or portfolio section using https://picsum.photos/[w]/[h]?random=[n].
6. PRICING — 3 tiers (Free/Pro/Enterprise or equivalent). Highlight the middle/recommended tier.
7. FAQ — 4-6 questions with smooth accordion toggle (JS).
8. CTA SECTION — Bold full-width section with headline + button before footer.
9. FOOTER — Logo, nav links in columns, social icons (CSS shapes), copyright.

━━━ CONTENT RULES ━━━
- ALL content must be realistic and specific to what the user described — never generic lorem ipsum.
- Brand name, tagline, copy, feature names, pricing plan names — all must match the described product/service.
- Make up believable names, quotes, prices, features — but make them feel real and professional.
- Testimonials: realistic full names, job titles, companies.

━━━ TECHNICAL RULES ━━━
- Fully responsive: mobile-first. Test breakpoints: 375px, 768px, 1280px.
- CSS Grid and Flexbox for all layouts.
- Smooth scroll behavior: html { scroll-behavior: smooth; }
- Images: https://picsum.photos/[width]/[height]?random=[unique_number] for variety.
- Sticky navbar: add JS scroll listener to add backdrop-filter + box-shadow class on scroll.
- FAQ accordion: JS toggle with CSS max-height transition.
- NO external JS frameworks or libraries. Pure vanilla JS only.
- Counter animation for stats section (JS IntersectionObserver).
- Form fields must have proper labels, placeholder, and focus styles.

━━━ PIXEL PERFECT CHECKLIST ━━━
✓ Consistent border-radius (pick one scale and stick to it)
✓ All shadows use the brand color at low opacity (not black)
✓ Gradient buttons with hover lift effect (transform: translateY(-2px))
✓ Section separators: subtle gradient dividers, not hard lines
✓ Mobile nav: hamburger menu that toggles
✓ Loading: body starts opacity 0, fades to 1 on DOMContentLoaded
✓ All links and buttons have cursor: pointer
✓ Smooth transitions on everything: transition: all 0.3s ease

Generate the most impressive, complete website possible. Make the user say "wow".`;

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 5) {
      return NextResponse.json({ error: "Prompt too short" }, { status: 400 });
    }

    if (prompt.length > 1500) {
      return NextResponse.json({ error: "Prompt too long (max 1500 chars)" }, { status: 400 });
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
        temperature: 0.75,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Generate a complete, stunning, production-ready HTML website for the following:

"${prompt.trim()}"

Remember: include ALL relevant sections (navbar, hero, features, social proof, pricing, FAQ, CTA, footer). Make it look premium. Output ONLY the HTML document.`,
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

    // Strip any markdown fences
    html = html
      .replace(/^```html[\r\n]*/i, "")
      .replace(/^```[\r\n]*/i, "")
      .replace(/[\r\n]*```\s*$/i, "")
      .trim();

    // Find DOCTYPE if buried after text
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
