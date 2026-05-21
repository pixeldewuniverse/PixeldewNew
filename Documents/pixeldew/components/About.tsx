"use client";
import { useEffect, useRef, useState } from "react";

const FACTS = [
  { label: "Based in",  value: "Indonesia",    color: "var(--mint)"    },
  { label: "Focus",     value: "Web & UI/UX",  color: "var(--cyan)"    },
  { label: "Approach",  value: "Pixel perfect", color: "var(--blue)"   },
  { label: "Status",    value: "Open to work", color: "var(--magenta)" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref}>
      <div className={`sec-label reveal ${vis ? "in" : ""}`}>
        <span className="t-label" style={{ color: "rgba(29,221,120,0.4)" }}>01 — About</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "clamp(40px, 8vw, 120px)", alignItems: "start", maxWidth: "1000px" }}>

        {/* Left */}
        <div>
          <h2
            className={`t-heading reveal ${vis ? "in" : ""}`}
            style={{ color: "var(--text)", marginBottom: "32px" }}
          >
            Crafting digital<br />
            <span className="shimmer">experiences.</span>
          </h2>

          <p className={`t-body reveal d1 ${vis ? "in" : ""}`} style={{ color: "var(--text-dim)", marginBottom: "20px" }}>
            Web creator dari Indonesia yang membangun produk digital dari nol — identitas visual, desain antarmuka, sampai implementasi frontend production-ready.
          </p>

          <p className={`t-body reveal d2 ${vis ? "in" : ""}`} style={{ color: "var(--text-muted)" }}>
            Setiap project adalah puzzle kreatif. Desain yang{" "}
            <span style={{ color: "var(--mint)" }}>baik</span> bukan hanya indah —
            tapi mulus, intuitif, dan terasa{" "}
            <span style={{ color: "var(--cyan)" }}>hidup</span>.
          </p>
        </div>

        {/* Right: facts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {FACTS.map((f, i) => (
            <div
              key={f.label}
              className={`card reveal d${i + 1} ${vis ? "in" : ""}`}
              style={{ padding: "24px 20px" }}
            >
              <div className="t-label" style={{ color: "var(--text-muted)", marginBottom: "12px" }}>
                {f.label}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: f.color,
                  textShadow: `0 0 10px ${f.color}44`,
                  letterSpacing: "-0.01em",
                }}
              >
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
