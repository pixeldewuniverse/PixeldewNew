"use client";
import { useState } from "react";
import Link from "next/link";

export default function GeneratorBanner() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/generate"
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 12, padding: "10px 20px",
        background: hovered ? "rgba(44,255,143,0.1)" : "rgba(44,255,143,0.05)",
        borderBottom: "1px solid rgba(44,255,143,0.15)",
        textDecoration: "none", position: "relative", zIndex: 5,
        transition: "background 0.2s",
        flexWrap: "wrap",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="font-pixel" style={{
        fontSize: 8, padding: "2px 8px",
        background: "rgba(44,255,143,0.15)",
        border: "1px solid rgba(44,255,143,0.4)",
        color: "#2CFF8F", letterSpacing: "0.1em",
        whiteSpace: "nowrap",
      }}>NEW</span>
      <span style={{ fontSize: 12, color: "rgba(232,224,255,0.65)", textAlign: "center" }}>
        ✦ AI Website Generator — describe your site, get full HTML instantly
      </span>
      <span style={{ fontSize: 12, color: "#2CFF8F", whiteSpace: "nowrap", fontWeight: 500 }}>
        Try it →
      </span>
    </Link>
  );
}
