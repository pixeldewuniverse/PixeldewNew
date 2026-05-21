"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FEATURED } from "@/lib/projects";

export default function FeaturedWork() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" ref={ref}>
      <div className={`sec-label reveal ${vis ? "in" : ""}`}>
        <span className="t-label" style={{ color: "rgba(224,44,184,0.4)" }}>03 — Work</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px", flexWrap: "wrap", gap: "16px" }}>
        <h2 className={`t-heading reveal ${vis ? "in" : ""}`} style={{ color: "var(--text)" }}>
          Selected<br />
          <span style={{ color: "var(--magenta)", textShadow: "0 0 22px rgba(224,44,184,0.45)" }}>Projects.</span>
        </h2>
        <Link
          href="/work"
          className={`reveal d1 ${vis ? "in" : ""}`}
          style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-muted)", borderBottom: "1px solid rgba(240,234,255,0.12)", paddingBottom: "3px", transition: "color 0.2s, border-color 0.2s", cursor: "none" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--cyan)"; el.style.borderColor = "rgba(14,207,223,0.35)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--text-muted)"; el.style.borderColor = "rgba(240,234,255,0.12)"; }}
        >
          All work →
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: "20px", maxWidth: "1000px" }}>
        {FEATURED.map((p, i) => (
          <a
            key={p.id}
            href={p.url ?? "#"}
            target={p.url && p.url !== "#" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`card reveal d${i + 1} ${vis ? "in" : ""}`}
            style={{
              display: "block",
              padding: "44px 40px",
              background: `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, ${p.glow} 100%)`,
              border: `1px solid ${p.color}18`,
              cursor: "none",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = `0 0 50px ${p.glow}, 0 20px 40px rgba(0,0,0,0.5)`;
              el.style.borderColor = `${p.color}35`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = "none";
              el.style.borderColor = `${p.color}18`;
            }}
          >
            {/* Index */}
            <div className="t-label" style={{ color: `${p.color}38`, marginBottom: "28px" }}>
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: "clamp(16px, 2vw, 22px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: p.color,
                textShadow: `0 0 16px ${p.color}38`,
                marginBottom: "8px",
                lineHeight: 1.2,
              }}
            >
              {p.title}
            </h3>

            {/* Subtitle */}
            <div className="t-label" style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
              {p.subtitle}
            </div>

            {/* Desc */}
            <p className="t-small" style={{ color: "var(--text-dim)", marginBottom: "28px" }}>
              {p.description}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
              {p.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    color: `${p.color}99`,
                    padding: "3px 10px",
                    border: `1px solid ${p.color}18`,
                    background: `${p.color}06`,
                    letterSpacing: "0.01em",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <div style={{ textAlign: "right", fontSize: "16px", color: `${p.color}44`, fontWeight: 300 }}>→</div>

            {/* Corner glow */}
            <div aria-hidden="true" style={{ position: "absolute", top: "-40px", right: "-40px", width: "120px", height: "120px", borderRadius: "50%", background: `radial-gradient(circle, ${p.color}0e 0%, transparent 70%)`, pointerEvents: "none" }} />
          </a>
        ))}
      </div>
    </section>
  );
}
