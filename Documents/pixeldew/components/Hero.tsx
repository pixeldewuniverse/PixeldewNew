"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PixelCube = dynamic(() => import("./PixelCube"), { ssr: false });

const ROLES = ["UI/UX Designer", "Frontend Developer", "Brand Creator", "Web Craftsman"];

const BITS = [
  { ch: "01", x: "6%",  y: "18%", cls: "float-1", color: "rgba(29,221,120,0.18)",  size: "8px"  },
  { ch: "◈",  x: "12%", y: "70%", cls: "float-2", color: "rgba(14,207,223,0.14)",  size: "11px" },
  { ch: "px", x: "84%", y: "16%", cls: "float-3", color: "rgba(74,122,255,0.22)",   size: "7px"  },
  { ch: "∆",  x: "90%", y: "64%", cls: "float-4", color: "rgba(224,44,184,0.18)",   size: "12px" },
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
        padding: "80px clamp(24px, 8vw, 96px)",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(74,122,255,0.07) 0%, transparent 60%)," +
          "radial-gradient(ellipse 50% 60% at 0% 70%, rgba(29,221,120,0.04) 0%, transparent 55%)," +
          "radial-gradient(ellipse 50% 50% at 100% 80%, rgba(224,44,184,0.03) 0%, transparent 55%)",
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

      <div
        style={{
          position: "relative", zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "clamp(48px, 6vw, 96px)",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Left */}
        <div>
          {/* Label */}
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "8px 16px",
              background: "rgba(29,221,120,0.05)",
              border: "1px solid rgba(29,221,120,0.15)",
              borderRadius: "var(--r-xl)",
              marginBottom: "40px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 0.7s ${ease}, transform 0.7s ${ease}`,
            }}
          >
            <span style={{ width: "5px", height: "5px", background: "var(--mint)", borderRadius: "50%", boxShadow: "0 0 6px var(--mint)" }} />
            <span className="t-label" style={{ color: "rgba(29,221,120,0.6)", fontSize: "7px" }}>Portfolio 2025</span>
          </div>

          {/* Display name */}
          <div style={{ overflow: "hidden", marginBottom: "24px" }}>
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

          {/* Divider line */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: "16px",
              marginBottom: "32px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.7s ${ease} 0.3s, transform 0.7s ${ease} 0.3s`,
            }}
          >
            <div style={{ width: "40px", height: "1px", background: "var(--cyan)", flexShrink: 0 }} />
            <span className="t-label" style={{ color: "var(--cyan)", fontSize: "7px" }}>Web Creator</span>
          </div>

          {/* Typewriter */}
          <div style={{ marginBottom: "28px", minHeight: "1.6em", opacity: visible ? 1 : 0, transition: `opacity 0.7s ${ease} 0.42s` }}>
            <span className="t-h4" style={{ color: "var(--text-dim)", fontWeight: 500 }}>
              {displayed}
              <span style={{ color: "var(--mint)", animation: "tw-blink 1s step-end infinite" }}>|</span>
            </span>
          </div>

          {/* Bio */}
          <p
            className="t-body-lg"
            style={{
              color: "var(--text-muted)",
              maxWidth: "440px",
              marginBottom: "52px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.7s ${ease} 0.52s, transform 0.7s ${ease} 0.52s`,
            }}
          >
            Membangun pengalaman digital yang terasa hidup —
            dari piksel pertama sampai interaksi terakhir.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex", gap: "12px", flexWrap: "wrap",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.7s ${ease} 0.62s, transform 0.7s ${ease} 0.62s`,
            }}
          >
            <a href="#work" className="btn btn-primary">Lihat Karya →</a>
            <a href="#contact" className="btn btn-border">Hubungi</a>
          </div>
        </div>

        {/* Right — 3D Cube */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.92)",
            transition: `opacity 1s ${ease} 0.4s, transform 1s ${ease} 0.4s`,
            position: "relative", minHeight: "400px",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(29,221,120,0.05) 0%, transparent 70%)",
              borderRadius: "var(--r-lg)",
              pointerEvents: "none", zIndex: 0,
            }}
          />
          <PixelCube />
        </div>
      </div>

      {/* Scroll hint */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.22 }}>
        <span className="t-label" style={{ color: "var(--text)", fontSize: "6px" }}>scroll</span>
        <span style={{ color: "var(--mint)", fontSize: "13px", animation: "heroFloat 2.2s ease-in-out infinite" }}>↓</span>
      </div>
    </section>
  );
}
