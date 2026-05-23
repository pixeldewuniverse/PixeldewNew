"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROJECTS, PLACEHOLDERS } from "@/lib/projects";

function AnimBars({ color }: { color: string }) {
  const bars = [65, 82, 48, 91, 73, 55, 88];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "flex-end", padding: "16px" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        {["12.4K", "84%", "↑23%"].map((v, i) => (
          <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${color}18`, padding: "8px", borderRadius: "4px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color, marginBottom: "2px" }}>{v}</div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: "ui-monospace, monospace" }}>
              {["Users", "Rate", "Growth"][i]}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "60px" }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 3 ? `linear-gradient(to top, ${color}, ${color}88)` : "rgba(255,255,255,0.08)", borderRadius: "2px 2px 0 0", boxShadow: i === 3 ? `0 0 8px ${color}55` : "none" }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        {["M","T","W","T","F","S","S"].map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: "8px", color: "rgba(255,255,255,0.2)", fontFamily: "ui-monospace, monospace" }}>{d}</div>
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
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "8px", padding: "16px", justifyContent: "center" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "8px", color, letterSpacing: "0.1em" }}>MENU</div>
        <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: "ui-monospace, monospace" }}>The Gripiz</div>
      </div>
      {items.map((item, i) => (
        <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: i === active ? `${color}12` : "rgba(255,255,255,0.03)", border: `1px solid ${i === active ? color + "35" : "rgba(255,255,255,0.06)"}`, borderRadius: "3px", transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: i === active ? color : "rgba(255,255,255,0.15)", flexShrink: 0, boxShadow: i === active ? `0 0 6px ${color}` : "none", transition: "all 0.4s" }} />
          <span style={{ fontSize: "12px", color: i === active ? "var(--text)" : "rgba(255,255,255,0.4)", fontWeight: i === active ? 500 : 400, transition: "all 0.4s" }}>{item}</span>
          {i === active && <span style={{ marginLeft: "auto", fontSize: "11px", color: `${color}88` }}>→</span>}
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
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 14px", borderBottom: `1px solid ${color}15`, background: "rgba(0,0,0,0.18)", flexShrink: 0 }}>
        <div style={{ width: "24px", height: "5px", background: color, borderRadius: "2px", boxShadow: `0 0 6px ${color}88` }} />
        <div style={{ flex: 1, height: "5px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }} />
        {[22, 30, 22].map((w, i) => (
          <div key={i} style={{ width: `${w}px`, height: "5px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }} />
        ))}
      </div>
      <div style={{ padding: "12px 14px 8px", flexShrink: 0 }}>
        <div style={{ height: "9px", width: "58%", background: `linear-gradient(90deg, ${color}18, ${color}50, ${color}18)`, backgroundSize: "200% 100%", borderRadius: "2px", animation: "agencyShimmer 1.8s ease-in-out infinite", marginBottom: "5px" }} />
        <div style={{ height: "5px", width: "36%", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "2px 14px 14px", flex: 1, justifyContent: "flex-end" }}>
        {services.map((service, i) => (
          <div key={service} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 11px", background: i === active ? `${color}10` : "rgba(255,255,255,0.025)", border: `1px solid ${i === active ? color + "40" : "rgba(255,255,255,0.06)"}`, borderRadius: "3px", transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
            <div style={{ width: "5px", height: "5px", background: i === active ? color : "rgba(255,255,255,0.12)", borderRadius: "50%", flexShrink: 0, boxShadow: i === active ? `0 0 5px ${color}` : "none", transition: "all 0.4s" }} />
            <span style={{ fontSize: "11px", color: i === active ? "rgba(240,234,255,0.9)" : "rgba(255,255,255,0.3)", fontWeight: i === active ? 500 : 400, transition: "all 0.4s", flex: 1 }}>{service}</span>
            {i === active && <span style={{ fontSize: "10px", color: `${color}80` }}>→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

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
  }, [filters.length]);
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "14px", gap: "9px" }}>
      <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
        {filters.map((f, i) => (
          <div key={f} style={{ padding: "3px 10px", background: i === activeFilter ? `${color}18` : "rgba(255,255,255,0.04)", border: `1px solid ${i === activeFilter ? color + "50" : "rgba(255,255,255,0.08)"}`, borderRadius: "20px", fontSize: "9px", color: i === activeFilter ? color : "rgba(255,255,255,0.3)", transition: "all 0.4s", fontWeight: i === activeFilter ? 600 : 400, boxShadow: i === activeFilter ? `0 0 8px ${color}30` : "none" }}>{f}</div>
        ))}
      </div>
      <div style={{ flex: 1, background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, ${color}10 100%)`, borderRadius: "4px", border: `1px solid ${color}18`, position: "relative", overflow: "hidden", minHeight: "50px" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent, ${color}15, transparent)`, animation: "propSweep 2s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "7px", left: "9px", display: "flex", gap: "4px", alignItems: "center" }}>
          <div style={{ width: "5px", height: "5px", background: color, borderRadius: "50%", boxShadow: `0 0 4px ${color}` }} />
          <div style={{ height: "4px", width: "44px", background: `${color}30`, borderRadius: "2px" }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: 1, height: "32px", background: (i + tick) % 3 === 0 ? `${color}18` : "rgba(255,255,255,0.04)", border: `1px solid ${(i + tick) % 3 === 0 ? color + "40" : "rgba(255,255,255,0.06)"}`, borderRadius: "3px", transition: "all 0.5s" }} />
        ))}
      </div>
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
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "7px", padding: "14px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5px", flexShrink: 0 }}>
        {["Rp 284M", "14", "7"].map((v, i) => (
          <div key={i} style={{ background: i === tick % 3 ? `${color}14` : "rgba(255,255,255,0.03)", border: `1px solid ${i === tick % 3 ? color + "40" : "rgba(255,255,255,0.07)"}`, borderRadius: "4px", padding: "7px 8px", transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: i === tick % 3 ? color : "rgba(255,255,255,0.45)", marginBottom: "2px", transition: "color 0.5s" }}>{v}</div>
            <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.2)", fontFamily: "ui-monospace,monospace" }}>{["Revenue","Projects","Inbox"][i]}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "4px", padding: "9px 10px", display: "flex", flexDirection: "column", justifyContent: "space-around", overflow: "hidden" }}>
        {projects.map((proj, i) => {
          const c = i === 0 ? color : accent[i - 1];
          return (
            <div key={proj} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: `${c}18`, border: `1px solid ${c}25`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "1px", background: `${c}70` }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.55)", marginBottom: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{proj}</div>
                <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress[i]}%`, background: c, borderRadius: "2px", boxShadow: `0 0 4px ${c}60`, transition: "width 1s" }} />
                </div>
              </div>
              <span style={{ fontSize: "7px", color: "rgba(255,255,255,0.25)", fontFamily: "ui-monospace,monospace", flexShrink: 0 }}>{progress[i]}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function WorkPage() {
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.id;
            if (id) setVisible((prev) => new Set(prev).add(id));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <style>{`
        @keyframes agencyShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes propSweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>

      <section style={{ padding: "clamp(80px, 10vw, 120px) clamp(24px, 8vw, 96px) clamp(64px, 8vw, 96px)" }}>
        {/* Back */}
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "13px", fontWeight: 500, marginBottom: "64px", cursor: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--mint)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; }}
        >
          ← Home
        </Link>

        {/* Header */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <h1 className="t-h1" style={{ color: "var(--text)" }}>Work</h1>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", background: "rgba(29,221,120,0.08)", border: "1px solid rgba(29,221,120,0.2)", borderRadius: "50%", fontSize: "12px", fontWeight: 600, color: "var(--mint)" }}>
              {PROJECTS.length}
            </span>
          </div>
          <p className="t-body-lg" style={{ color: "var(--text-dim)", maxWidth: "480px" }}>
            Selected projects spanning CRM platforms, restaurant branding, digital agency websites, and property listing experiences.
          </p>
        </div>

        {/* Projects grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", maxWidth: "1200px" }}>
          {PROJECTS.map((p, idx) => {
            const isVisible = visible.has(p.id);
            return (
              <div
                key={p.id}
                data-id={p.id}
                ref={(el) => { if (el) cardRefs.current.set(p.id, el); }}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) ${idx * 0.12}s, transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) ${idx * 0.12}s`,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Preview window */}
                <div style={{ height: "220px", background: `linear-gradient(135deg, rgba(255,255,255,0.025) 0%, ${p.glow} 100%)`, border: `1px solid ${p.color}22`, borderBottom: "none", overflow: "hidden", position: "relative", borderTopLeftRadius: "var(--r-sm)", borderTopRightRadius: "var(--r-sm)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
                    {["#ff5f57","#febc2e","#28c840"].map((c) => (
                      <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, opacity: 0.7 }} />
                    ))}
                    <div style={{ marginLeft: "8px", flex: 1, height: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }} />
                  </div>
                  {p.thumbnail ? (
                    <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.thumbnail} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", display: "block" }} />
                      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 60%, ${p.glow})` }} />
                    </div>
                  ) : (
                    <>
                      {p.animation === "bars"     && <AnimBars     color={p.color} />}
                      {p.animation === "cards"    && <AnimCards    color={p.color} />}
                      {p.animation === "agency"   && <AnimAgency   color={p.color} />}
                      {p.animation === "property" && <AnimProperty color={p.color} />}
                      {(p.animation === "bento" || p.animation === "ios") && <AnimBento color={p.color} />}
                    </>
                  )}
                </div>

                {/* Info card */}
                <Link
                  href={`/work/${p.slug}`}
                  style={{ display: "block", padding: "28px 32px", background: `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, ${p.glow} 100%)`, border: `1px solid ${p.color}18`, borderBottomLeftRadius: "var(--r-sm)", borderBottomRightRadius: "var(--r-sm)", textDecoration: "none", cursor: "none", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)" }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = `${p.color}40`; el.style.transform = "translateY(-3px)"; el.style.boxShadow = `0 16px 40px rgba(0,0,0,0.4), 0 0 30px ${p.glow}`; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = `${p.color}18`; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <div className="t-label" style={{ color: `${p.color}44`, marginBottom: "8px" }}>{String(idx + 1).padStart(2, "0")}</div>
                      <h3 style={{ fontSize: "clamp(15px, 2vw, 20px)", fontWeight: 600, letterSpacing: "-0.02em", color: p.color, textShadow: `0 0 14px ${p.color}38` }}>
                        {p.title}
                      </h3>
                    </div>
                    <span style={{ fontSize: "16px", color: `${p.color}50` }}>↗</span>
                  </div>
                  <div className="t-label" style={{ color: "var(--text-muted)", marginBottom: "12px" }}>{p.subtitle}</div>
                  <p className="t-small" style={{ color: "var(--text-dim)", marginBottom: "20px" }}>{p.description}</p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {p.tags.map((tag) => (
                      <span key={tag} style={{ fontSize: "10px", fontWeight: 500, color: `${p.color}88`, padding: "3px 9px", border: `1px solid ${p.color}18`, background: `${p.color}06` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </div>
            );
          })}

          {/* Placeholder cards */}
          {PLACEHOLDERS.map((ph, idx) => {
            const placeholderIsVisible = visible.has(ph.id);
            return (
              <div
                key={ph.id}
                data-id={ph.id}
                ref={(el) => { if (el) cardRefs.current.set(ph.id, el); }}
                style={{
                  opacity: placeholderIsVisible ? 1 : 0,
                  transform: placeholderIsVisible ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) ${(PROJECTS.length + idx) * 0.12}s, transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) ${(PROJECTS.length + idx) * 0.12}s`,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minHeight: "360px",
                    border: "1px dashed rgba(240,234,255,0.12)",
                    borderRadius: "var(--r-sm)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    background: ph.color,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Status badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      padding: "4px 10px",
                      background: "rgba(240,234,255,0.04)",
                      border: "1px solid rgba(240,234,255,0.1)",
                      borderRadius: "20px",
                      fontSize: "9px",
                      fontWeight: 500,
                      color: "rgba(240,234,255,0.3)",
                      letterSpacing: "0.05em",
                      fontFamily: "ui-monospace, monospace",
                    }}
                  >
                    {ph.status}
                  </div>

                  {/* Lock icon */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      border: "1px dashed rgba(240,234,255,0.15)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      color: "rgba(240,234,255,0.15)",
                    }}
                  >
                    ?
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "13px", fontWeight: 500, color: "rgba(240,234,255,0.2)", marginBottom: "6px" }}>
                      {ph.title}
                    </div>
                    <div className="t-label" style={{ color: "rgba(240,234,255,0.12)" }}>
                      {ph.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
