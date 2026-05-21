"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PixelCube = dynamic(() => import("./Pixelcube"), { ssr: false });

const ROLES = ["UI/UX Designer", "Frontend Developer", "Brand Creator", "Web Craftsman"];

const BITS = [
  { ch: "01", x: "6%",  y: "18%", cls: "float-1", color: "rgba(29,221,120,0.22)",  size: "8px"  },
  { ch: "◈",  x: "12%", y: "70%", cls: "float-2", color: "rgba(14,207,223,0.18)",  size: "12px" },
  { ch: "px", x: "84%", y: "16%", cls: "float-3", color: "rgba(74,122,255,0.28)",   size: "7px"  },
  { ch: "∆",  x: "90%", y: "64%", cls: "float-4", color: "rgba(224,44,184,0.22)",   size: "13px" },
];

export default function Hero() {
  const [roleIdx, setRoleIdx]     = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [visible, setVisible]     = useState(false);
  const ease = "cubic-bezier(0.215,0.61,0.355,1)";

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const target = ROLES[roleIdx];
    let i = 0, deleting = false;
    let t: ReturnType<typeof setTimeout>;
    function tick() {
      if (!deleting) {
        setDisplayed(target.slice(0, i + 1));
        i++;
        if (i === target.length) { deleting = true; t = setTimeout(tick, 1800); return; }
      } else {
        setDisplayed(target.slice(0, i - 1));
        i--;
        if (i === 0) { deleting = false; setRoleIdx((n) => (n + 1) % ROLES.length); return; }
      }
      t = setTimeout(tick, deleting ? 32 : 60);
    }
    t = setTimeout(tick, 80);
    return () => clearTimeout(t);
  }, [roleIdx]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px clamp(24px, 8vw, 160px)",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 100% 80% at 50% 10%, rgba(74,122,255,0.08) 0%, transparent 60%)," +
          "radial-gradient(ellipse 60% 50% at 10% 70%, rgba(29,221,120,0.05) 0%, transparent 55%)," +
          "radial-gradient(ellipse 50% 50% at 90% 80%, rgba(224,44,184,0.04) 0%, transparent 55%)",
      }}
    >
      {/* Floating bits */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {BITS.map((b, i) => (
          <span key={i} className={`${b.cls} font-pixel`} style={{ position: "absolute", left: b.x, top: b.y, fontSize: b.size, color: b.color, userSelect: "none" }}>
            {b.ch}
          </span>
        ))}
      </div>

      {/* Two-column */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 6vw, 80px)",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Left — text */}
        <div>
          <div
            className="t-label"
            style={{
              color: "rgba(29,221,120,0.45)",
              marginBottom: "48px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 0.7s ${ease}, transform 0.7s ${ease}`,
            }}
          >
            00 — Portfolio
          </div>

          <div style={{ overflow: "hidden", marginBottom: "20px" }}>
            <h1
              className="t-display glow-mint"
              style={{
                color: "var(--mint)",
                display: "block",
                transform: visible ? "translateY(0)" : "translateY(105%)",
                transition: `transform 1s ${ease} 0.12s`,
              }}
            >
              PixelDew
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              marginBottom: "40px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.7s ${ease} 0.3s, transform 0.7s ${ease} 0.3s`,
            }}
          >
            <div style={{ width: "44px", height: "1px", background: "var(--cyan)", flexShrink: 0 }} />
            <span className="t-label" style={{ color: "var(--cyan)" }}>Web Creator</span>
          </div>

          <div
            style={{
              marginBottom: "32px",
              minHeight: "1.6em",
              opacity: visible ? 1 : 0,
              transition: `opacity 0.7s ${ease} 0.42s`,
            }}
          >
            <span className="t-sub" style={{ color: "var(--text-dim)" }}>
              {displayed}
              <span style={{ color: "var(--mint)", animation: "tw-blink 1s step-end infinite" }}>|</span>
            </span>
          </div>

          <p
            className="t-body"
            style={{
              color: "var(--text-muted)",
              maxWidth: "400px",
              marginBottom: "52px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.7s ${ease} 0.52s, transform 0.7s ${ease} 0.52s`,
            }}
          >
            Membangun pengalaman digital yang terasa hidup —
            dari piksel pertama sampai interaksi terakhir.
          </p>

          {/* Scroll hint inline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              opacity: visible ? 0.35 : 0,
              transition: `opacity 0.7s ${ease} 0.8s`,
            }}
          >
            <span style={{ color: "var(--mint)", fontSize: "12px", animation: "heroFloat 2.2s ease-in-out infinite" }}>↓</span>
            <span className="t-label" style={{ color: "var(--text-muted)", fontSize: "6px" }}>scroll to explore</span>
          </div>
        </div>

        {/* Right — 3D cube */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.92)",
            transition: `opacity 1s ${ease} 0.4s, transform 1s ${ease} 0.4s`,
            position: "relative",
          }}
        >
          {/* Glow backdrop */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(29,221,120,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <PixelCube />
        </div>
      </div>

      <style>{`
        @keyframes tw-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes heroFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>
    </section>
  );
}