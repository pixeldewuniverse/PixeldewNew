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
        padding: "0 clamp(24px, 6vw, 64px)",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.4s, border-color 0.4s",
        background: scrolled ? "rgba(8,0,18,0.88)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(240,234,255,0.06)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ cursor: "none", display: "flex", alignItems: "center" }}>
        <PixelDewLogo size={36} showText={true} />
      </Link>

      {/* Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          padding: "6px 14px",
          border: "1px solid rgba(29,221,120,0.2)",
          background: "rgba(29,221,120,0.04)",
        }}
      >
        <span
          style={{
            width: "6px", height: "6px",
            background: "var(--mint)",
            borderRadius: "50%",
            boxShadow: "0 0 7px var(--mint)",
            flexShrink: 0,
            animation: "dotPulse 2.2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "7px",
            color: "rgba(29,221,120,0.65)",
            letterSpacing: "0.14em",
          }}
        >
          open to work
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
