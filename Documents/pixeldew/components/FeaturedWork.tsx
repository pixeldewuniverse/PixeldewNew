"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FEATURED, Project } from "@/lib/projects";

// ── Mini animation: Dashboard bars (CRM) ──
function AnimBars({ color }: { color: string }) {
  const bars = [65, 82, 48, 91, 73, 55, 88];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "flex-end", padding: "16px" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        {["12.4K", "84%", "↑23%"].map((v, i) => (
          <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${color}18`, padding: "8px", borderRadius: "4px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color, marginBottom: "2px" }}>{v}</div>
            <div style={{ fontSize: "9px", color: "rgba(240,234,255,0.3)", fontFamily: "ui-monospace, monospace" }}>
              {["Users", "Rate", "Growth"][i]}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "60px" }}>
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background: i === 3
                ? `linear-gradient(to top, ${color}, ${color}88)`
                : `rgba(255,255,255,0.08)`,
              borderRadius: "2px 2px 0 0",
              transition: `height 1s cubic-bezier(0.4,0,0.2,1) ${i * 0.07}s`,
              boxShadow: i === 3 ? `0 0 8px ${color}55` : "none",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        {["M","T","W","T","F","S","S"].map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: "8px", color: "rgba(240,234,255,0.2)", fontFamily: "ui-monospace, monospace" }}>{d}</div>
        ))}
      </div>
    </div>
  );
}

// ── Mini animation: Menu cards (Restaurant) ──
function AnimCards({ color }: { color: string }) {
  const [active, setActive] = useState(0);
  const items = ["Bruschetta", "Pasta", "Tiramisu", "Cocktail"];

  useEffect(() => {
    const t = setInterval(() => setActive((n) => (n + 1) % items.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "8px", padding: "16px", justifyContent: "center" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "8px", color, letterSpacing: "0.1em" }}>MENU</div>
        <div style={{ fontSize: "9px", color: "rgba(240,234,255,0.3)", fontFamily: "ui-monospace, monospace" }}>The Gripiz</div>
      </div>
      {items.map((item, i) => (
        <div
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            background: i === active ? `${color}12` : "rgba(255,255,255,0.03)",
            border: `1px solid ${i === active ? color + "35" : "rgba(240,234,255,0.06)"}`,
            borderRadius: "3px",
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: i === active ? color : "rgba(240,234,255,0.15)", flexShrink: 0, boxShadow: i === active ? `0 0 6px ${color}` : "none", transition: "all 0.4s" }} />
          <span style={{ fontSize: "12px", color: i === active ? "var(--text, #f0eaff)" : "rgba(240,234,255,0.4)", fontWeight: i === active ? 500 : 400, transition: "color 0.4s, font-weight 0.4s" }}>{item}</span>
          {i === active && (
            <span style={{ marginLeft: "auto", fontSize: "11px", color: `${color}88` }}>→</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Mini animation: Agency services (Digital Agency) ──
function AnimAgency({ color }: { color: string }) {
  const [active, setActive] = useState(0);
  const services = ["Brand Identity", "Web Design", "Digital Strategy"];

  useEffect(() => {
    const t = setInterval(() => setActive((n) => (n + 1) % services.length), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Nav bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 14px", borderBottom: `1px solid ${color}15`, background: "rgba(0,0,0,0.18)", flexShrink: 0 }}>
        <div style={{ width: "24px", height: "5px", background: color, borderRadius: "2px", boxShadow: `0 0 6px ${color}88` }} />
        <div style={{ flex: 1, height: "5px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }} />
        {[22, 30, 22].map((w, i) => (
          <div key={i} style={{ width: `${w}px`, height: "5px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }} />
        ))}
      </div>
      {/* Heading shimmer */}
      <div style={{ padding: "12px 14px 8px", flexShrink: 0 }}>
        <div style={{ height: "9px", width: "58%", background: `linear-gradient(90deg, ${color}18, ${color}50, ${color}18)`, backgroundSize: "200% 100%", borderRadius: "2px", animation: "agencyShimmer 1.8s ease-in-out infinite", marginBottom: "5px" }} />
        <div style={{ height: "5px", width: "36%", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }} />
      </div>
      {/* Service cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "2px 14px 14px", flex: 1, justifyContent: "flex-end" }}>
        {services.map((service, i) => (
          <div
            key={service}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 11px",
              background: i === active ? `${color}10` : "rgba(255,255,255,0.025)",
              border: `1px solid ${i === active ? color + "40" : "rgba(255,255,255,0.06)"}`,
              borderRadius: "3px",
              transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div style={{ width: "5px", height: "5px", background: i === active ? color : "rgba(255,255,255,0.12)", borderRadius: "50%", flexShrink: 0, boxShadow: i === active ? `0 0 5px ${color}` : "none", transition: "all 0.4s" }} />
            <span style={{ fontSize: "11px", color: i === active ? "rgba(240,234,255,0.9)" : "rgba(255,255,255,0.3)", fontWeight: i === active ? 500 : 400, transition: "all 0.4s", flex: 1 }}>{service}</span>
            {i === active && <span style={{ fontSize: "10px", color: `${color}80` }}>→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Mini animation: Property listings ──
function AnimProperty({ color }: { color: string }) {
  const [activeFilter, setActiveFilter] = useState(0);
  const [tick, setTick] = useState(0);
  const filters = ["All", "Villa", "Apt"];

  useEffect(() => {
    const t = setInterval(() => {
      setTick((n) => n + 1);
      setActiveFilter((n) => (n + 1) % filters.length);
    }, 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "14px", gap: "9px" }}>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
        {filters.map((f, i) => (
          <div
            key={f}
            style={{
              padding: "3px 10px",
              background: i === activeFilter ? `${color}18` : "rgba(255,255,255,0.04)",
              border: `1px solid ${i === activeFilter ? color + "50" : "rgba(255,255,255,0.08)"}`,
              borderRadius: "20px",
              fontSize: "9px",
              color: i === activeFilter ? color : "rgba(255,255,255,0.3)",
              transition: "all 0.4s",
              fontWeight: i === activeFilter ? 600 : 400,
              boxShadow: i === activeFilter ? `0 0 8px ${color}30` : "none",
            }}
          >
            {f}
          </div>
        ))}
      </div>
      {/* Hero image shimmer */}
      <div
        style={{
          flex: 1,
          background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, ${color}10 100%)`,
          borderRadius: "4px",
          border: `1px solid ${color}18`,
          position: "relative",
          overflow: "hidden",
          minHeight: "50px",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent, ${color}15, transparent)`, animation: "propSweep 2s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "7px", left: "9px", display: "flex", gap: "4px", alignItems: "center" }}>
          <div style={{ width: "5px", height: "5px", background: color, borderRadius: "50%", boxShadow: `0 0 4px ${color}` }} />
          <div style={{ height: "4px", width: "44px", background: `${color}30`, borderRadius: "2px" }} />
        </div>
      </div>
      {/* Thumbnails */}
      <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "32px",
              background: (i + tick) % 3 === 0 ? `${color}18` : "rgba(255,255,255,0.04)",
              border: `1px solid ${(i + tick) % 3 === 0 ? color + "40" : "rgba(255,255,255,0.06)"}`,
              borderRadius: "3px",
              transition: "all 0.5s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Project Card ──
function ProjectCard({ project, index, visible }: { project: Project; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`reveal d${index + 1} ${visible ? "in" : ""}`}
      style={{ display: "flex", flexDirection: "column", gap: "0" }}
    >
      {/* Animation preview window */}
      <div
        style={{
          height: "200px",
          background: `linear-gradient(135deg, rgba(255,255,255,0.025) 0%, ${project.glow} 100%)`,
          border: `1px solid ${hovered ? project.color + "44" : project.color + "22"}`,
          borderBottom: "none",
          position: "relative" as const,
          overflow: "hidden" as const,
          transition: "border-color 0.3s",
          borderTopLeftRadius: "2px",
          borderTopRightRadius: "2px",
        }}
      >
        {/* Window chrome */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 14px", borderBottom: `1px solid rgba(240,234,255,0.06)`, background: "rgba(0,0,0,0.2)" }}>
          {["#ff5f57","#febc2e","#28c840"].map((c) => (
            <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
          <div style={{ marginLeft: "8px", flex: 1, height: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }} />
        </div>
        {/* Animation */}
        {project.animation === "bars"     && <AnimBars     color={project.color} />}
        {project.animation === "cards"    && <AnimCards    color={project.color} />}
        {project.animation === "agency"   && <AnimAgency   color={project.color} />}
        {project.animation === "property" && <AnimProperty color={project.color} />}
        {/* Corner glow */}
        <div aria-hidden="true" style={{ position: "absolute", top: "-30px", right: "-30px", width: "100px", height: "100px", borderRadius: "50%", background: `radial-gradient(circle, ${project.color}10 0%, transparent 70%)`, pointerEvents: "none" }} />
      </div>

      {/* Card info */}
      <a
        href={project.url && project.url !== "#" ? project.url : undefined}
        target={project.url && project.url !== "#" ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          padding: "28px 32px",
          background: `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, ${project.glow} 100%)`,
          border: `1px solid ${hovered ? project.color + "40" : project.color + "18"}`,
          cursor: project.url && project.url !== "#" ? "none" : "default",
          textDecoration: "none",
          boxShadow: hovered ? `0 0 40px ${project.glow}, 0 16px 32px rgba(0,0,0,0.4)` : "none",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          borderBottomLeftRadius: "2px",
          borderBottomRightRadius: "2px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <div>
            <div className="t-label" style={{ color: `${project.color}44`, marginBottom: "8px" }}>
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 style={{ fontSize: "clamp(15px, 2vw, 20px)", fontWeight: 600, letterSpacing: "-0.02em", color: project.color, textShadow: `0 0 14px ${project.color}38`, lineHeight: 1.2 }}>
              {project.title}
            </h3>
          </div>
          <span style={{ fontSize: "16px", color: `${project.color}50`, transition: "transform 0.2s", transform: hovered ? "translate(3px,-3px)" : "translate(0,0)" }}>↗</span>
        </div>

        <div className="t-label" style={{ color: "var(--text-muted)", marginBottom: "14px" }}>
          {project.subtitle}
        </div>

        <p className="t-small" style={{ color: "var(--text-dim)", marginBottom: "20px" }}>
          {project.description}
        </p>

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {project.tags.map((t) => (
            <span key={t} style={{ fontSize: "10px", fontWeight: 500, color: `${project.color}88`, padding: "3px 9px", border: `1px solid ${project.color}18`, background: `${project.color}06`, letterSpacing: "0.01em" }}>
              {t}
            </span>
          ))}
        </div>
      </a>
    </div>
  );
}

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
      <style>{`
        @keyframes agencyShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes propSweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>

      <div className={`sec-label reveal ${vis ? "in" : ""}`}>
        <span className="t-label" style={{ color: "rgba(224,44,184,0.4)" }}>03 — Work</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px", flexWrap: "wrap", gap: "16px" }}>
        <h2 className={`t-heading reveal ${vis ? "in" : ""}`} style={{ color: "var(--text)" }}>
          Selected<br />
          <span style={{ color: "var(--magenta)", textShadow: "0 0 22px rgba(224,44,184,0.4)" }}>Projects.</span>
        </h2>
        <Link
          href="/work"
          className={`reveal d1 ${vis ? "in" : ""}`}
          style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-muted)", borderBottom: "1px solid rgba(240,234,255,0.1)", paddingBottom: "3px", transition: "color 0.2s, border-color 0.2s", cursor: "none" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--cyan)"; el.style.borderColor = "rgba(14,207,223,0.3)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--text-muted)"; el.style.borderColor = "rgba(240,234,255,0.1)"; }}
        >
          All work →
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "24px", maxWidth: "1000px" }}>
        {FEATURED.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} visible={vis} />
        ))}
      </div>
    </section>
  );
}
