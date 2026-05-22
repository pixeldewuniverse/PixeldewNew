"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);
  const [hidden, setHidden]     = useState(false);

  useEffect(() => {
    // Fast progress to 80, then slow to 100
    const intervals: ReturnType<typeof setTimeout>[] = [];

    let p = 0;
    const fast = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 82) { p = 82; clearInterval(fast); }
      setProgress(Math.min(p, 82));
    }, 120);

    const slow = setTimeout(() => {
      const crawl = setInterval(() => {
        p += Math.random() * 4;
        if (p >= 100) {
          p = 100;
          clearInterval(crawl);
          setProgress(100);
          setTimeout(() => setDone(true), 300);
          setTimeout(() => setHidden(true), 900);
        }
        setProgress(Math.min(p, 100));
      }, 180);
      intervals.push(crawl as unknown as ReturnType<typeof setTimeout>);
    }, 800);

    intervals.push(slow);
    return () => { clearInterval(fast); intervals.forEach(clearTimeout); };
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "var(--bg, #080012)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        opacity: done ? 0 : 1,
        transform: done ? "translateY(-8px)" : "translateY(0)",
        transition: "opacity 0.55s cubic-bezier(0.215,0.61,0.355,1), transform 0.55s cubic-bezier(0.215,0.61,0.355,1)",
        pointerEvents: done ? "none" : "all",
      }}
    >
      {/* Logo mark */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <svg width="56" height="56" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M50 8 C 50 8, 78 44, 86 66 A 36 36 0 1 1 14 66 C 22 44, 50 8, 50 8 Z"
            fill="#1ddd78"
            style={{
              filter: `drop-shadow(0 0 ${8 + progress * 0.12}px rgba(29,221,120,${0.4 + progress * 0.004}))`,
              transition: "filter 0.3s",
            }}
          />
          <rect x="60" y="22" width="16" height="16" fill="#080012" />
          <rect x="76" y="10" width="9" height="9" fill="#1ddd78" />
        </svg>

        <div
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "13px",
            color: "var(--mint, #1ddd78)",
            letterSpacing: "0.06em",
            textShadow: "0 0 20px rgba(29,221,120,0.5)",
          }}
        >
          PixelDew
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: "200px", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
        <div
          style={{
            width: "100%",
            height: "2px",
            background: "rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(to right, #1ddd78, #0ecfdf)",
              boxShadow: "0 0 8px rgba(29,221,120,0.6)",
              transition: "width 0.2s ease",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "7px",
            color: "rgba(29,221,120,0.45)",
            letterSpacing: "0.2em",
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>

      {/* Floating bits */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {["01","px","◈","∆","{}"].map((ch, i) => (
          <span
            key={i}
            className={`float-${(i % 5) + 1} font-pixel`}
            style={{
              position: "absolute",
              left: `${[8, 85, 15, 88, 50][i]}%`,
              top:  `${[20, 15, 75, 70, 10][i]}%`,
              fontSize: "8px",
              color: ["rgba(29,221,120,0.2)", "rgba(74,122,255,0.2)", "rgba(14,207,223,0.18)", "rgba(224,44,184,0.18)", "rgba(29,221,120,0.15)"][i],
              userSelect: "none",
            }}
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}
