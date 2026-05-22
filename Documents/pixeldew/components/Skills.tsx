"use client";
import { useEffect, useRef, useState } from "react";

const GROUPS = [
  {
    label: "Design", color: "var(--mint)", hex: "#1ddd78",
    skills: [
      { name: "UI/UX Design",   pct: 90 },
      { name: "Figma",          pct: 88 },
      { name: "Branding",       pct: 80 },
      { name: "Motion / Micro", pct: 72 },
    ],
  },
  {
    label: "Frontend", color: "var(--cyan)", hex: "#0ecfdf",
    skills: [
      { name: "React / Next.js", pct: 85 },
      { name: "TypeScript",      pct: 78 },
      { name: "Tailwind CSS",    pct: 92 },
      { name: "Animation",       pct: 75 },
    ],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref}>
      <div className={`sec-label reveal ${vis ? "in" : ""}`}>
        <span className="t-label" style={{ color: "rgba(14,207,223,0.4)" }}>02 — Skills</span>
      </div>

      <h2 className={`t-h2 reveal ${vis ? "in" : ""}`} style={{ color: "var(--text)", marginBottom: "64px" }}>
        What I <span className="shimmer">do best.</span>
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "20px" }}>
        {GROUPS.map((g, gi) => (
          <div
            key={g.label}
            className={`glass-card reveal d${gi + 1} ${vis ? "in" : ""}`}
            style={{ padding: "36px 32px" }}
          >
            <div
              className="t-body-lg"
              style={{ color: g.color, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "32px", textShadow: `0 0 10px ${g.hex}44` }}
            >
              {g.label}
            </div>
            {g.skills.map((s) => (
              <div key={s.name} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span className="t-body" style={{ color: "var(--text-dim)" }}>{s.name}</span>
                  <span className="t-body" style={{ color: g.color, fontWeight: 600 }}>{s.pct}</span>
                </div>
                <div className="skill-track">
                  <div className={`skill-fill ${vis ? "go" : ""}`} style={{ width: `${s.pct}%`, background: `linear-gradient(to right, ${g.hex}66, ${g.hex})`, boxShadow: `0 0 6px ${g.hex}55` }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
