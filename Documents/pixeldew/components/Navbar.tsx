"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PixelDewLogo from "./PixelDewLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 500,
        padding: "0 clamp(24px, 6vw, 96px)",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        background: scrolled ? "rgba(8,0,18,0.82)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
      }}
    >
      <Link href="/" style={{ cursor: "none", display: "flex", alignItems: "center" }}>
        <PixelDewLogo size={32} showText />
      </Link>

      {/* Available badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          background: "rgba(29,221,120,0.05)",
          border: "1px solid rgba(29,221,120,0.18)",
          borderRadius: "var(--r-xl)",
          minHeight: "44px",
        }}
      >
        <span style={{ width: "6px", height: "6px", background: "var(--mint)", borderRadius: "50%", boxShadow: "0 0 7px var(--mint)", flexShrink: 0, animation: "dotPulse 2.2s ease-in-out infinite" }} />
        <span className="t-small" style={{ color: "rgba(29,221,120,0.7)" }}>
          Available for projects
        </span>
      </div>

      <style>{`
        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 5px var(--mint); }
          50%      { box-shadow: 0 0 12px var(--mint), 0 0 22px rgba(29,221,120,0.25); }
        }
      `}</style>
    </header>
  );
}
