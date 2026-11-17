// Groq retired llama-3.3-70b-versatile on 2026-08-16.
// Default to its recommended replacement; override with GROQ_MODEL in Vercel if needed.
export const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

// gpt-oss models spend tokens on reasoning first; keep it short so replies stay fast.
export function groqModelOptions(): { model: string; reasoning_effort?: "low" } {
  return GROQ_MODEL.startsWith("openai/gpt-oss")
    ? { model: GROQ_MODEL, reasoning_effort: "low" }
    : { model: GROQ_MODEL };
}
