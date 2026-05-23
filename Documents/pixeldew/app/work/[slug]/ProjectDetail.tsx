"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

function AnimBars({ color }: { color: string }) {
  const bars = [65, 82, 48, 91, 73, 55, 88];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "flex-end", padding: "24px" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {["12.4K", "84%", "↑23%"].map((v, i) => (
          <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${color}18`, padding: "12px", borderRadius: "6px" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color, marginBottom: "3px" }}>{v}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "ui-monospace, monospace" }}>{["Users","Rate","Growth"][i]}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "100px" }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 3 ? `linear-gradient(to top, ${color}, ${color}88)` : "rgba(255,255,255,0.08)", borderRadius: "3px 3px 0 0", boxShadow: i === 3 ? `0 0 12px ${color}55` : "none" }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        {["M","T","W","T","F","S","S"].map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: "9px", color: "rgba(255,255,255,0.2)", fontFamily: "ui-monospace, monospace" }}>{d}</div>
        ))}
      </div>
    </div>
  );
}

function AnimCards({ color }: { color: string }) {
  const [active, setActive] = useState(0);
  const items = ["Bruschetta", "Pasta", "Tiramisu", "Cocktail"];
  useEffect(() => {
    const t = setInterval(() => setActive((n) => (n + 1) % items.length), 1400);
    return () => clearInterval(t);
  }, [items.length]);
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "10px", padding: "24px", justifyContent: "center" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "9px", color, letterSpacing: "0.1em" }}>MENU</div>
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "ui-monospace, monospace" }}>The Gripiz</div>
      </div>
      {items.map((item, i) => (
        <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", background: i === active ? `${color}12` : "rgba(255,255,255,0.03)", border: `1px solid ${i === active ? color + "35" : "rgba(255,255,255,0.06)"}`, borderRadius: "4px", transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: i === active ? color : "rgba(255,255,255,0.15)", flexShrink: 0, boxShadow: i === active ? `0 0 8px ${color}` : "none", transition: "all 0.4s" }} />
          <span style={{ fontSize: "14px", color: i === active ? "var(--text)" : "rgba(255,255,255,0.4)", fontWeight: i === active ? 600 : 400, transition: "all 0.4s" }}>{item}</span>
          {i === active && <span style={{ marginLeft: "auto", fontSize: "13px", color: `${color}88` }}>→</span>}
        </div>
      ))}
    </div>
  );
}

function AnimAgency({ color }: { color: string }) {
  const [active, setActive] = useState(0);
  const services = ["Brand Identity", "Web Design", "Digital Strategy"];
  useEffect(() => {
    const t = setInterval(() => setActive((n) => (n + 1) % services.length), 1200);
    return () => clearInterval(t);
  }, [services.length]);
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 16px", borderBottom: `1px solid ${color}15`, background: "rgba(0,0,0,0.18)", flexShrink: 0 }}>
        <div style={{ width: "28px", height: "6px", background: color, borderRadius: "2px", boxShadow: `0 0 8px ${color}88` }} />
        <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }} />
        {[26, 36, 26].map((w, i) => <div key={i} style={{ width: `${w}px`, height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }} />)}
      </div>
      <div style={{ padding: "16px 18px 10px", flexShrink: 0 }}>
        <div style={{ height: "11px", width: "55%", background: `linear-gradient(90deg, ${color}18, ${color}50, ${color}18)`, backgroundSize: "200% 100%", borderRadius: "3px", animation: "agencyShimmer 1.8s ease-in-out infinite", marginBottom: "6px" }} />
        <div style={{ height: "7px", width: "35%", background: "rgba(255,255,255,0.05)", borderRadius: "3px" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "4px 18px 18px", flex: 1, justifyContent: "flex-end" }}>
        {services.map((service, i) => (
          <div key={service} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", background: i === active ? `${color}10` : "rgba(255,255,255,0.025)", border: `1px solid ${i === active ? color + "40" : "rgba(255,255,255,0.06)"}`, borderRadius: "4px", transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
            <div style={{ width: "7px", height: "7px", background: i === active ? color : "rgba(255,255,255,0.12)", borderRadius: "50%", flexShrink: 0, boxShadow: i === active ? `0 0 7px ${color}` : "none", transition: "all 0.4s" }} />
            <span style={{ fontSize: "13px", color: i === active ? "rgba(240,234,255,0.9)" : "rgba(255,255,255,0.3)", fontWeight: i === active ? 500 : 400, transition: "all 0.4s", flex: 1 }}>{service}</span>
            {i === active && <span style={{ fontSize: "12px", color: `${color}80` }}>→</span>}
          </div>
        ))}
      </div>
      <style>{`@keyframes agencyShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </div>
  );
}

function AnimProperty({ color }: { color: string }) {
  const [activeFilter, setActiveFilter] = useState(0);
  const [tick, setTick] = useState(0);
  const filters = ["All", "Villa", "Apt"];
  useEffect(() => {
    const t = setInterval(() => { setTick((n) => n + 1); setActiveFilter((n) => (n + 1) % filters.length); }, 1400);
    return () => clearInterval(t);
  }, [filters.length]);
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "20px", gap: "14px" }}>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        {filters.map((f, i) => (
          <div key={f} style={{ padding: "4px 14px", background: i === activeFilter ? `${color}18` : "rgba(255,255,255,0.04)", border: `1px solid ${i === activeFilter ? color + "50" : "rgba(255,255,255,0.08)"}`, borderRadius: "20px", fontSize: "10px", color: i === activeFilter ? color : "rgba(255,255,255,0.3)", transition: "all 0.4s", fontWeight: i === activeFilter ? 600 : 400, boxShadow: i === activeFilter ? `0 0 10px ${color}30` : "none" }}>{f}</div>
        ))}
      </div>
      <div style={{ flex: 1, background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, ${color}10 100%)`, borderRadius: "6px", border: `1px solid ${color}18`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent, ${color}15, transparent)`, animation: "propSweep 2s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "12px", left: "14px", display: "flex", gap: "6px", alignItems: "center" }}>
          <div style={{ width: "7px", height: "7px", background: color, borderRadius: "50%", boxShadow: `0 0 6px ${color}` }} />
          <div style={{ height: "6px", width: "60px", background: `${color}30`, borderRadius: "3px" }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: 1, height: "50px", background: (i + tick) % 3 === 0 ? `${color}18` : "rgba(255,255,255,0.04)", border: `1px solid ${(i + tick) % 3 === 0 ? color + "40" : "rgba(255,255,255,0.06)"}`, borderRadius: "4px", transition: "all 0.5s" }} />
        ))}
      </div>
      <style>{`@keyframes propSweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }`}</style>
    </div>
  );
}

function AnimBento({ color }: { color: string }) {
  const [tick, setTick] = useState(0);
  const projects = ["Hanami Coffee", "Nusa Bank", "Sukha Yoga"];
  const progress = [82, 54, 38];
  const accent = ["#1ddd78", "#0ecfdf"];
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1600);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "10px", padding: "20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", flexShrink: 0 }}>
        {["Rp 284M", "14", "7"].map((v, i) => (
          <div key={i} style={{ background: i === tick % 3 ? `${color}14` : "rgba(255,255,255,0.03)", border: `1px solid ${i === tick % 3 ? color + "40" : "rgba(255,255,255,0.07)"}`, borderRadius: "6px", padding: "10px 12px", transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: i === tick % 3 ? color : "rgba(255,255,255,0.45)", marginBottom: "3px", transition: "color 0.5s" }}>{v}</div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", fontFamily: "ui-monospace,monospace" }}>{["Revenue","Projects","Inbox"][i]}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "6px", padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "space-around", overflow: "hidden" }}>
        {projects.map((proj, i) => {
          const c = i === 0 ? color : accent[i - 1];
          return (
            <div key={proj} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: `${c}18`, border: `1px solid ${c}25`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "2px", background: `${c}70` }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{proj}</div>
                <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress[i]}%`, background: c, borderRadius: "2px", boxShadow: `0 0 5px ${c}60`, transition: "width 1s" }} />
                </div>
              </div>
              <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", fontFamily: "ui-monospace,monospace", flexShrink: 0 }}>{progress[i]}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface Props {
  project: Project;
  nextProject: Project;
}

export default function ProjectDetail({ project, nextProject }: Props) {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt((entry.target as HTMLElement).dataset.revealIdx ?? "-1");
            if (idx >= 0) setRevealed((prev) => new Set(prev).add(idx));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const revealRef = (idx: number) => (el: HTMLElement | null) => {
    if (el) { el.dataset.revealIdx = String(idx); sectionsRef.current[idx] = el; }
  };

  const revealStyle = (idx: number, delay = 0): React.CSSProperties => ({
    opacity: revealed.has(idx) ? 1 : 0,
    transform: revealed.has(idx) ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.9s cubic-bezier(0.215,0.61,0.355,1) ${delay}s, transform 0.9s cubic-bezier(0.215,0.61,0.355,1) ${delay}s`,
  });

  const { PROJECTS } = require("@/lib/projects");
  const projectIndex = String((PROJECTS as Project[]).findIndex((p: Project) => p.id === project.id) + 1).padStart(2, "0");

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Back */}
      <div style={{ position: "fixed", top: "24px", left: "clamp(24px, 6vw, 96px)", zIndex: 100 }}>
        <Link
          href="/work"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "13px", fontWeight: 500, padding: "8px 16px", background: "rgba(8,0,18,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "var(--r-xl)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", cursor: "none", transition: "all 0.2s" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--mint)"; el.style.borderColor = "rgba(29,221,120,0.3)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--text-muted)"; el.style.borderColor = "rgba(255,255,255,0.08)"; }}
        >
          ← All Work
        </Link>
      </div>

      {/* ── 1. Hero ── */}
      <section style={{ minHeight: "100vh", padding: "clamp(100px,10vw,140px) clamp(24px,8vw,96px) clamp(64px,8vw,96px)", display: "flex", alignItems: "center" }}>
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,380px),1fr))", gap: "clamp(48px,6vw,96px)", alignItems: "center" }}>

          {/* Left col */}
          <div ref={revealRef(0)} style={revealStyle(0)}>
            <div className="t-label" style={{ color: `${project.color}44`, marginBottom: "16px" }}>{projectIndex}</div>
            <h1 className="t-h1" style={{ color: project.color, textShadow: `0 0 40px ${project.color}40`, marginBottom: "12px", lineHeight: 1 }}>
              {project.title}
            </h1>
            <div className="t-label" style={{ color: "var(--text-muted)", marginBottom: "28px" }}>{project.subtitle}</div>

            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "32px" }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{ fontSize: "10px", fontWeight: 500, color: `${project.color}88`, padding: "4px 10px", border: `1px solid ${project.color}18`, background: `${project.color}06` }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ marginBottom: "40px" }}>
              {project.longDescription.split("\n\n").map((para, i) => (
                <p key={i} className="t-body-lg" style={{ color: "var(--text-dim)", marginBottom: i < 2 ? "16px" : 0, lineHeight: 1.7 }}>{para}</p>
              ))}
            </div>

            {project.url && project.url !== "#" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: "inline-flex", cursor: "none" }}
              >
                Visit Live Site ↗
              </a>
            )}
          </div>

          {/* Right col — metadata */}
          <div ref={revealRef(1)} style={{ ...revealStyle(1, 0.15) }}>
            <div style={{ background: "rgba(15,15,25,0.75)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--r-lg)", padding: "clamp(24px,4vw,40px)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
              {[
                { label: "Year", value: project.year },
                { label: "Role", value: project.role },
                { label: "Duration", value: project.duration },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: "28px" }}>
                  <div className="t-label" style={{ color: "var(--text-muted)", marginBottom: "6px" }}>{label}</div>
                  <div className="t-body-lg" style={{ color: "var(--text)", fontWeight: 600 }}>{value}</div>
                </div>
              ))}
              <div>
                <div className="t-label" style={{ color: "var(--text-muted)", marginBottom: "10px" }}>Deliverables</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {project.deliverables.map((d) => (
                    <div key={d} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: project.color, boxShadow: `0 0 6px ${project.color}` }} />
                      <span className="t-small" style={{ color: "var(--text-dim)" }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Live Preview ── */}
      <section ref={revealRef(2) as React.RefCallback<HTMLElement>} style={{ padding: "clamp(48px,6vw,80px) clamp(24px,8vw,96px)", ...revealStyle(2) }}>
        <div className="t-label" style={{ color: "rgba(255,255,255,0.2)", marginBottom: "24px", letterSpacing: "0.3em" }}>
          LIVE PREVIEW
        </div>
        <div style={{ background: "rgba(15,15,25,0.75)", border: `1px solid ${project.color}18`, borderRadius: "var(--r-lg)", overflow: "hidden", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
          {/* Window chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)" }}>
            {["#ff5f57","#febc2e","#28c840"].map((c) => (
              <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.8 }} />
            ))}
            <div style={{ marginLeft: "12px", flex: 1, height: "14px", background: "rgba(255,255,255,0.05)", borderRadius: "3px" }} />
          </div>
          <div style={{ height: "400px" }}>
            {project.animation === "bars"     && <AnimBars     color={project.color} />}
            {project.animation === "cards"    && <AnimCards    color={project.color} />}
            {project.animation === "agency"   && <AnimAgency   color={project.color} />}
            {project.animation === "property" && <AnimProperty color={project.color} />}
            {project.animation === "bento"    && <AnimBento    color={project.color} />}
          </div>
        </div>
      </section>

      {/* ── 3. Challenge & Solution ── */}
      <section style={{ padding: "clamp(48px,6vw,80px) clamp(24px,8vw,96px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,320px),1fr))", gap: "24px" }}>
          {/* Challenge */}
          <div
            ref={revealRef(3) as React.RefCallback<HTMLElement>}
            style={{ ...revealStyle(3), background: "rgba(15,15,25,0.75)", border: "1px solid rgba(255,107,107,0.15)", borderRadius: "var(--r-lg)", padding: "clamp(24px,4vw,40px)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF6B6B", boxShadow: "0 0 8px rgba(255,107,107,0.5)" }} />
              <div className="t-label" style={{ color: "rgba(255,107,107,0.7)" }}>Challenge</div>
            </div>
            <p className="t-body-lg" style={{ color: "var(--text-dim)", lineHeight: 1.7 }}>{project.challenge}</p>
          </div>

          {/* Solution */}
          <div
            ref={revealRef(4) as React.RefCallback<HTMLElement>}
            style={{ ...revealStyle(4, 0.12), background: "rgba(15,15,25,0.75)", border: `1px solid ${project.color}18`, borderRadius: "var(--r-lg)", padding: "clamp(24px,4vw,40px)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: project.color, boxShadow: `0 0 8px ${project.color}80` }} />
              <div className="t-label" style={{ color: `${project.color}70` }}>Solution</div>
            </div>
            <p className="t-body-lg" style={{ color: "var(--text-dim)", lineHeight: 1.7 }}>{project.solution}</p>
          </div>
        </div>
      </section>

      {/* ── 4. Results ── */}
      <section
        ref={revealRef(5) as React.RefCallback<HTMLElement>}
        style={{ padding: "clamp(48px,6vw,80px) clamp(24px,8vw,96px)", ...revealStyle(5) }}
      >
        <div className="t-label" style={{ color: "var(--text-muted)", marginBottom: "32px" }}>Results</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,240px),1fr))", gap: "16px" }}>
          {project.results.map((result, i) => (
            <div
              key={i}
              style={{
                background: "rgba(15,15,25,0.75)",
                border: `1px solid ${project.color}18`,
                borderRadius: "var(--r-md)",
                padding: "clamp(20px,3vw,32px)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                opacity: revealed.has(5) ? 1 : 0,
                transform: revealed.has(5) ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s cubic-bezier(0.215,0.61,0.355,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.215,0.61,0.355,1) ${i * 0.1}s`,
              }}
            >
              <div style={{ width: "24px", height: "2px", background: project.color, marginBottom: "16px", boxShadow: `0 0 8px ${project.color}80` }} />
              <p className="t-body-lg" style={{ color: "var(--text)", fontWeight: 600, lineHeight: 1.4 }}>{result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Next Project ── */}
      <section style={{ padding: "clamp(64px,8vw,96px) clamp(24px,8vw,96px)", textAlign: "center" }}>
        <div className="t-label" style={{ color: "var(--text-muted)", marginBottom: "32px" }}>Next Project</div>
        <Link
          href={`/work/${nextProject.slug}`}
          style={{ display: "inline-block", cursor: "none", textDecoration: "none" }}
        >
          <h2 className="t-h1" style={{ color: nextProject.color, textShadow: `0 0 40px ${nextProject.color}30`, marginBottom: "16px", transition: "text-shadow 0.3s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLHeadingElement).style.textShadow = `0 0 60px ${nextProject.color}60`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLHeadingElement).style.textShadow = `0 0 40px ${nextProject.color}30`; }}
          >
            {nextProject.title}
          </h2>
          <div className="t-label" style={{ color: "var(--text-muted)" }}>{nextProject.subtitle} →</div>
        </Link>
      </section>
    </main>
  );
}
