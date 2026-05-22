"use client";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { label: "Email",     href: "mailto:hello@pixeldew.xyz", color: "var(--mint)",    hex: "#1ddd78" },
  { label: "GitHub",    href: "https://github.com/pixeldewuniverse", color: "var(--cyan)", hex: "#0ecfdf" },
  { label: "Instagram", href: "#", color: "var(--magenta)", hex: "#e02cb8" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref}>
      <div className={`sec-label reveal ${vis ? "in" : ""}`}>
        <span className="t-label" style={{ color: "rgba(74,122,255,0.4)" }}>04 — Contact</span>
      </div>

      {/* Glass card CTA */}
      <div
        className={`glass-card-elevated reveal ${vis ? "in" : ""}`}
        style={{
          padding: "clamp(40px, 6vw, 80px)",
          maxWidth: "800px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* BG glow */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(74,122,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <p className={`t-label reveal d1 ${vis ? "in" : ""}`} style={{ color: "rgba(29,221,120,0.45)", marginBottom: "24px", fontSize: "7px" }}>
          Let&apos;s build something
        </p>

        <h2 className={`t-h1 reveal d1 ${vis ? "in" : ""}`} style={{ color: "var(--text)", marginBottom: "12px" }}>
          Punya project?
        </h2>
        <h2 className={`t-h1 shimmer reveal d2 ${vis ? "in" : ""}`} style={{ marginBottom: "32px" }}>
          Aku siap.
        </h2>

        <p className={`t-body-lg reveal d2 ${vis ? "in" : ""}`} style={{ color: "var(--text-muted)", maxWidth: "400px", marginBottom: "48px" }}>
          Atau tanya langsung ke{" "}
          <span style={{ color: "var(--mint)" }}>Dewbit</span> di pojok kanan bawah.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`btn btn-border reveal d${i + 2} ${vis ? "in" : ""}`}
              style={{ color: l.color, borderColor: `${l.hex}28`, cursor: "none" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = `${l.hex}55`; el.style.background = `${l.hex}08`; el.style.boxShadow = `0 0 16px ${l.hex}18`; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = `${l.hex}28`; el.style.background = "transparent"; el.style.boxShadow = "none"; }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
