"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

type Stage = "idle" | "generating" | "preview" | "error";

const EXAMPLES = [
  "A dark neon landing page for a crypto startup called MoonVault with a hero section, features, and CTA",
  "Minimal portfolio for a photographer named Aria, white background, elegant typography, gallery grid",
  "Cute kawaii bakery website called SugarBit with pastel colors, menu section, and contact form",
  "Brutalist agency site for BLOK studio, black and yellow, big bold text, raw grid layout",
  "SaaS dashboard landing page for a tool called Flowtrack, dark mode, pricing table, testimonials",
];

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");
  const [tokens, setTokens] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const generate = useCallback(async () => {
    if (!prompt.trim() || stage === "generating") return;
    setStage("generating");
    setError("");
    setHtml("");
    setTokens(0);
    setElapsed(0);

    const start = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 100) / 10);
    }, 100);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setHtml(data.html);
      setTokens(data.tokens || 0);
      setStage("preview");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setStage("error");
    } finally {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [prompt, stage]);

  const downloadHtml = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pixeldew-generated.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setStage("idle");
    setHtml("");
    setError("");
    setPrompt("");
  };

  return (
    <main style={{ minHeight: "100vh", background: "#080018", color: "#e8e0ff" }}>

      {/* Scanlines overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
      }} />

      {/* Nav */}
      <nav style={{
        position: "relative", zIndex: 10,
        borderBottom: "1px solid rgba(44,255,143,0.1)",
        padding: "12px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, position: "relative" }}>
            <Image src="/dewbit.png" alt="Dewbit" fill style={{ objectFit: "contain" }} />
          </div>
          <span className="font-pixel" style={{ fontSize: "9px", color: "#2CFF8F", letterSpacing: "0.15em" }}>
            PIXELDEW
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="font-pixel" style={{ fontSize: "7px", color: "rgba(44,255,143,0.4)", letterSpacing: "0.1em" }}>
            /generate
          </span>
          <span style={{
            fontSize: "7px", padding: "3px 8px",
            background: "rgba(44,255,143,0.08)",
            border: "1px solid rgba(44,255,143,0.25)",
            color: "#2CFF8F",
          }} className="font-pixel">
            BETA
          </span>
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="font-pixel" style={{
            fontSize: "clamp(11px, 2.5vw, 18px)", color: "#2CFF8F",
            textShadow: "0 0 30px #2CFF8F55", letterSpacing: "0.15em", marginBottom: 10,
          }}>
            AI Website Generator
          </div>
          <p style={{ fontSize: 13, color: "rgba(232,224,255,0.45)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Describe your dream site. Dewbit generates the full HTML in seconds.
          </p>
        </div>

        {/* Input area */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(44,255,143,0.15)",
          marginBottom: 16,
        }}>
          {/* Top bar */}
          <div style={{
            borderBottom: "1px solid rgba(44,255,143,0.08)",
            padding: "8px 16px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{ width: 6, height: 6, background: "#FF3BD4", boxShadow: "0 0 6px #FF3BD4" }} />
            <div style={{ width: 6, height: 6, background: "#FFD166" }} />
            <div style={{ width: 6, height: 6, background: "#2CFF8F", boxShadow: "0 0 6px #2CFF8F" }} />
            <span className="font-pixel" style={{ fontSize: "7px", color: "rgba(44,255,143,0.3)", marginLeft: 8, letterSpacing: "0.1em" }}>
              DESCRIBE YOUR SITE
            </span>
          </div>

          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) generate(); }}
            placeholder="e.g. A dark landing page for a music producer called HEXDROP, with hero, track list, and booking form..."
            disabled={stage === "generating"}
            style={{
              width: "100%", minHeight: 110, background: "transparent",
              border: "none", outline: "none", padding: "16px",
              color: "#e8e0ff", fontSize: 13, lineHeight: 1.7,
              resize: "vertical", fontFamily: "inherit",
            }}
          />

          {/* Bottom bar */}
          <div style={{
            borderTop: "1px solid rgba(44,255,143,0.08)",
            padding: "10px 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
              {prompt.length} chars · ⌘+Enter to generate
            </span>
            <button
              onClick={generate}
              disabled={!prompt.trim() || stage === "generating"}
              className="font-pixel"
              style={{
                background: prompt.trim() && stage !== "generating" ? "rgba(44,255,143,0.1)" : "transparent",
                border: `1px solid ${prompt.trim() && stage !== "generating" ? "#2CFF8F" : "rgba(255,255,255,0.1)"}`,
                color: prompt.trim() && stage !== "generating" ? "#2CFF8F" : "rgba(255,255,255,0.2)",
                fontSize: "8px", padding: "8px 20px", cursor: prompt.trim() ? "pointer" : "default",
                letterSpacing: "0.1em",
                transition: "all 0.2s",
                boxShadow: prompt.trim() && stage !== "generating" ? "0 0 20px rgba(44,255,143,0.15)" : "none",
              }}
            >
              {stage === "generating" ? "GENERATING..." : "GENERATE →"}
            </button>
          </div>
        </div>

        {/* Example prompts */}
        {stage === "idle" && (
          <div style={{ marginBottom: 32 }}>
            <div className="font-pixel" style={{ fontSize: "7px", color: "rgba(255,255,255,0.2)", marginBottom: 10, letterSpacing: "0.1em" }}>
              EXAMPLES — click to use:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(ex)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(232,224,255,0.4)",
                    fontSize: 11, padding: "6px 12px",
                    cursor: "pointer", textAlign: "left",
                    transition: "all 0.2s",
                    maxWidth: "100%",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(44,255,143,0.3)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(232,224,255,0.7)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(232,224,255,0.4)";
                  }}
                >
                  {ex.length > 60 ? ex.slice(0, 60) + "…" : ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Generating state */}
        {stage === "generating" && (
          <div style={{
            border: "1px solid rgba(44,255,143,0.15)",
            background: "rgba(44,255,143,0.03)",
            padding: 32, textAlign: "center",
          }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 4, marginBottom: 20 }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{
                  width: 6, background: "#2CFF8F",
                  animation: `barBounce 0.8s ease-in-out infinite`,
                  animationDelay: `${i * 0.12}s`,
                  boxShadow: "0 0 8px #2CFF8F",
                }} />
              ))}
            </div>
            <div className="font-pixel" style={{ fontSize: "9px", color: "#2CFF8F", marginBottom: 8, letterSpacing: "0.15em" }}>
              Dewbit is building your site...
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
              {elapsed}s elapsed
            </div>
            <div style={{
              marginTop: 20, fontSize: 11, color: "rgba(232,224,255,0.3)",
              fontStyle: "italic",
            }}>
              pixel by pixel... 🌱
            </div>
          </div>
        )}

        {/* Error state */}
        {stage === "error" && (
          <div style={{
            border: "1px solid rgba(255,59,212,0.3)",
            background: "rgba(255,59,212,0.05)",
            padding: 20, marginBottom: 16,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontSize: 12, color: "#FF3BD4" }}>💾 {error}</span>
            <button onClick={reset} className="font-pixel" style={{
              background: "transparent", border: "1px solid rgba(255,59,212,0.4)",
              color: "#FF3BD4", fontSize: "7px", padding: "6px 12px", cursor: "pointer",
            }}>RETRY</button>
          </div>
        )}

        {/* Preview */}
        {stage === "preview" && html && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            {/* Preview toolbar */}
            <div style={{
              border: "1px solid rgba(44,255,143,0.15)",
              borderBottom: "none",
              background: "rgba(0,0,0,0.4)",
              padding: "10px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="font-pixel" style={{ fontSize: "7px", color: "#2CFF8F", letterSpacing: "0.1em" }}>
                  ✓ GENERATED
                </div>
                {tokens > 0 && (
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
                    ~{tokens} tokens
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={downloadHtml}
                  className="font-pixel"
                  style={{
                    background: "rgba(44,255,143,0.08)",
                    border: "1px solid rgba(44,255,143,0.3)",
                    color: "#2CFF8F", fontSize: "7px", padding: "6px 14px",
                    cursor: "pointer", letterSpacing: "0.1em",
                  }}
                >
                  ↓ DOWNLOAD HTML
                </button>
                <button
                  onClick={reset}
                  className="font-pixel"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.4)", fontSize: "7px", padding: "6px 14px",
                    cursor: "pointer", letterSpacing: "0.1em",
                  }}
                >
                  NEW SITE
                </button>
              </div>
            </div>

            {/* iframe preview */}
            <div style={{ border: "1px solid rgba(44,255,143,0.15)", position: "relative" }}>
              <iframe
                ref={iframeRef}
                srcDoc={html}
                style={{
                  width: "100%", height: 600, border: "none",
                  background: "#fff",
                }}
                sandbox="allow-scripts allow-same-origin"
                title="Generated website preview"
              />
            </div>

            {/* Prompt echo */}
            <div style={{
              marginTop: 12, padding: "10px 14px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              fontSize: 11, color: "rgba(232,224,255,0.35)",
              fontStyle: "italic",
            }}>
              &quot;{prompt}&quot;
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes barBounce {
          0%, 100% { height: 8px; }
          50% { height: 32px; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
