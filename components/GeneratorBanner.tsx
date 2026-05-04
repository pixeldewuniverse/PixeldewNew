"use client";
import { useState } from "react";
import Link from "next/link";

export default function GeneratorBanner() {
  const [hovered, setHovered] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <>
      {/* Fixed banner tepat di bawah navbar (navbar ~64px tingginya) */}
      <div
        style={{
          position: "fixed",
          top: 64,
          left: 0,
          right: 0,
          zIndex: 49,
          background: hovered ? "rgba(44,255,143,0.1)" : "rgba(10,0,25,0.95)",
          borderBottom: "1px solid rgba(44,255,143,0.2)",
          backdropFilter: "blur(8px)",
          transition: "background 0.2s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link
          href="/generate"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 10, padding: "8px 20px",
            textDecoration: "none",
            flexWrap: "wrap",
          }}
        >
          <span className="font-pixel" style={{
            fontSize: 7, padding: "2px 7px",
            background: "rgba(44,255,143,0.15)",
            border: "1px solid rgba(44,255,143,0.4)",
            color: "#2CFF8F", letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}>NEW</span>
          <span style={{ fontSize: 12, color: "rgba(232,224,255,0.65)" }}>
            ✦ AI Website Generator — describe your site, get full HTML instantly
          </span>
          <span style={{ fontSize: 12, color: "#2CFF8F", whiteSpace: "nowrap" }}>
            Try it →
          </span>
        </Link>

        {/* Dismiss button */}
        <button
          onClick={(e) => { e.preventDefault(); setDismissed(true); }}
          style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            background: "transparent", border: "none",
            color: "rgba(255,255,255,0.25)", cursor: "pointer",
            fontSize: 14, lineHeight: 1, padding: "4px 6px",
          }}
          aria-label="Dismiss banner"
        >
          ×
        </button>
      </div>

      {/* Spacer so content doesn't go under banner */}
      <div style={{ height: 36 }} />
    </>
  );
}
