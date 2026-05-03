"use client";
import { useState } from "react";

type Project = {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  desc: string;
  stack: string[];
  color: string;
  glowColor: string;
  ascii: string;
  link: string;
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "PixelDew OS",
    tag: "WEB APP",
    tagColor: "#2CFF8F",
    desc: "A browser-based pixel OS experience. Drag windows, open apps, feel the retro-futuristic vibes.",
    stack: ["Next.js", "TypeScript", "Canvas API"],
    color: "#2CFF8F",
    glowColor: "rgba(44,255,143,0.15)",
    ascii: "█▀█ █▀",
    link: "#",
  },
  {
    id: "p2",
    title: "Dewbit AI",
    tag: "AI TOOL",
    tagColor: "#18E6FF",
    desc: "Claude-powered creative assistant that writes, codes, and vibes in full pixel persona mode.",
    stack: ["Claude API", "React", "Tailwind"],
    color: "#18E6FF",
    glowColor: "rgba(24,230,255,0.15)",
    ascii: "▀█▀ █▄",
    link: "#",
  },
  {
    id: "p3",
    title: "PixelForge",
    tag: "TOOL",
    tagColor: "#FF3BD4",
    desc: "Pixel art generator + exporter. Drop a prompt, get a 16x16 sprite. Ships to PNG in one click.",
    stack: ["Python", "FastAPI", "React"],
    color: "#FF3BD4",
    glowColor: "rgba(255,59,212,0.15)",
    ascii: "█▀▀ █▀",
    link: "#",
  },
  {
    id: "p4",
    title: "NeonGrid",
    tag: "UI KIT",
    tagColor: "#5B8CFF",
    desc: "Component library built for dark, neon-heavy interfaces. 40+ components, zero bloat.",
    stack: ["React", "CSS Vars", "Storybook"],
    color: "#5B8CFF",
    glowColor: "rgba(91,140,255,0.15)",
    ascii: "█▄█ █▀",
    link: "#",
  },
  {
    id: "p5",
    title: "BitStream",
    tag: "BACKEND",
    tagColor: "#FFD166",
    desc: "Real-time data pipeline visualizer. Watch your bits flow like a river of neon light.",
    stack: ["Node.js", "WebSockets", "D3.js"],
    color: "#FFD166",
    glowColor: "rgba(255,209,102,0.15)",
    ascii: "▀▀█ ▄▀",
    link: "#",
  },
  {
    id: "p6",
    title: "DewDrop CMS",
    tag: "FULLSTACK",
    tagColor: "#7B2FFF",
    desc: "Headless CMS with a pixel-art admin panel. Because content editors deserve to feel like hackers.",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    color: "#7B2FFF",
    glowColor: "rgba(123,47,255,0.15)",
    ascii: "█▀▄ █▄",
    link: "#",
  },
];

export default function PortfolioSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  const tags = ["ALL", "WEB APP", "AI TOOL", "TOOL", "UI KIT", "BACKEND", "FULLSTACK"];
  const filtered = filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);

  return (
    <section id="work" className="px-4 md:px-10 py-20 relative">
      {/* Section header */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-pixel text-xs" style={{ color: "rgba(44,255,143,0.5)", letterSpacing: "0.3em" }}>
            02 //
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(44,255,143,0.15)" }} />
        </div>
        <h2
          className="font-pixel glow-mint mb-2"
          style={{ fontSize: "clamp(14px, 2.5vw, 20px)", color: "#2CFF8F" }}
        >
          Selected Work
        </h2>
        <p className="opacity-50 text-sm" style={{ color: "rgba(232,224,255,0.7)" }}>
          Things built in the pixel lab — real projects, real bits, real vibes.
        </p>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className="font-pixel transition-all duration-200"
              style={{
                fontSize: "7px",
                padding: "6px 12px",
                border: `1px solid ${filter === tag ? "#2CFF8F" : "rgba(44,255,143,0.2)"}`,
                color: filter === tag ? "#2CFF8F" : "rgba(232,224,255,0.4)",
                background: filter === tag ? "rgba(44,255,143,0.08)" : "transparent",
                cursor: "pointer",
                letterSpacing: "0.15em",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project, i) => (
          <a
            key={project.id}
            href={project.link}
            className="group block relative overflow-hidden transition-all duration-300"
            style={{
              background: hovered === project.id ? project.glowColor : "rgba(255,255,255,0.02)",
              border: `1px solid ${hovered === project.id ? project.color + "55" : "rgba(255,255,255,0.06)"}`,
              boxShadow: hovered === project.id ? `0 0 30px ${project.glowColor}, 0 0 60px ${project.glowColor}` : "none",
              transform: hovered === project.id ? "translateY(-4px)" : "translateY(0)",
              animationDelay: `${i * 80}ms`,
            }}
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Top bar */}
            <div
              className="h-0.5 w-full transition-all duration-500"
              style={{
                background: `linear-gradient(to right, transparent, ${project.color}, transparent)`,
                opacity: hovered === project.id ? 1 : 0,
              }}
            />

            <div className="p-6">
              {/* ASCII decoration */}
              <div
                className="font-pixel mb-4 opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ fontSize: "10px", color: project.color, letterSpacing: "0.2em" }}
              >
                {project.ascii}
              </div>

              {/* Tag */}
              <span
                className="font-pixel inline-block mb-3"
                style={{
                  fontSize: "7px",
                  color: project.tagColor,
                  border: `1px solid ${project.tagColor}44`,
                  padding: "3px 8px",
                  letterSpacing: "0.15em",
                }}
              >
                {project.tag}
              </span>

              {/* Title */}
              <h3
                className="font-pixel mb-3 transition-colors duration-200"
                style={{
                  fontSize: "11px",
                  color: hovered === project.id ? project.color : "#e8e0ff",
                  lineHeight: 1.6,
                }}
              >
                {project.title}
              </h3>

              {/* Desc */}
              <p
                className="text-xs mb-5 leading-relaxed"
                style={{ color: "rgba(232,224,255,0.5)", fontSize: "11px" }}
              >
                {project.desc}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="font-pixel"
                    style={{
                      fontSize: "6px",
                      color: "rgba(232,224,255,0.35)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "2px 6px",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div
                className="mt-5 font-pixel text-xs transition-all duration-200 flex items-center gap-2"
                style={{
                  color: project.color,
                  opacity: hovered === project.id ? 1 : 0,
                  transform: hovered === project.id ? "translateX(0)" : "translateX(-8px)",
                  fontSize: "8px",
                }}
              >
                View Project →
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
