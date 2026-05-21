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

      {/* Big CTA heading */}
      <div style={{ marginBottom: "56px" }}>
        <h2 className={`t-heading reveal ${vis ? "in" : ""}`} style={{ color: "var(--text)", lineHeight: 1.05, marginBottom: "8px" }}>
          Punya project?
        </h2>
        <h2 className={`t-heading shimmer reveal d1 ${vis ? "in" : ""}`}>
          Aku siap.
        </h2>
      </div>

      <p className={`t-body reveal d2 ${vis ? "in" : ""}`} style={{ color: "var(--text-muted)", maxWidth: "420px", marginBottom: "52px" }}>
        Atau tanya langsung ke{" "}
        <span style={{ color: "var(--mint)" }}>Dewbit</span> di pojok kanan bawah —
        dia tahu semua tentang PixelDew dan bisa bantu kamu mulai.
      </p>

      {/* Links */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {LINKS.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`reveal d${i + 1} ${vis ? "in" : ""}`}
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: l.color,
              padding: "12px 24px",
              border: `1px solid ${l.hex}28`,
              letterSpacing: "0.02em",
              transition: "all 0.22s",
              display: "inline-block",
              cursor: "none",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = `${l.hex}08`;
              el.style.boxShadow = `0 0 20px ${l.hex}22`;
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "transparent";
              el.style.boxShadow = "none";
              el.style.transform = "translateY(0)";
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </section>
  );
}
