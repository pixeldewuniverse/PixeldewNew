"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroZoneRef = useRef<HTMLDivElement>(null);
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [heroUIOpacity, setHeroUIOpacity] = useState(1);
  const [sceneOpacity, setSceneOpacity] = useState(1);

  useEffect(() => {
    // Check mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Scroll handler
    const handleScroll = () => {
      const heroZone = heroZoneRef.current;
      if (!heroZone) return;

      const rect = heroZone.getBoundingClientRect();
      const heroHeight = heroZone.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Progress from 0 to 1 as user scrolls through hero zone
      const progress = Math.max(
        0,
        Math.min(1, (heroHeight + rect.top) / (heroHeight + viewportHeight))
      );
      setScrollProgress(progress);

      // Flash opacity: ramp up at 0.82, ramp down at 0.88
      let flash = 0;
      if (progress > 0.82 && progress < 0.88) {
        const p = (progress - 0.82) / 0.06;
        flash = p > 0.5 ? (1 - p) * 2 : p * 2;
        flash = Math.min(0.8, flash);
      }
      setFlashOpacity(flash);

      // Fade out hero UI content
      if (progress > 0.3) {
        setHeroUIOpacity(Math.max(0, 1 - (progress - 0.3) / 0.3));
      }

      // Fade out scene at end
      if (progress > 0.9) {
        setSceneOpacity(Math.max(0, 1 - (progress - 0.9) / 0.1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={heroZoneRef}
      className="hero-scroll-zone"
      style={{
        height: isMobile ? "100vh" : "300vh",
        position: "relative",
      }}
    >
      {/* Sticky viewport */}
      <div
        className="hero-sticky"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Three.js Scene */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: sceneOpacity,
            transition: "opacity 0.5s ease",
          }}
        >
          <HeroScene scrollProgress={scrollProgress} isMobile={isMobile} />
        </div>

        {/* Flash overlay */}
        <div
          className="hero-flash"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #1ddd78, #0ecfdf)",
            opacity: flashOpacity,
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        {/* Hero UI (logo, text, buttons) */}
        {!isMobile && (
          <div
            className="hero-ui"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: "48px",
              pointerEvents: scrollProgress > 0.7 ? "none" : "auto",
              zIndex: 5,
              opacity: heroUIOpacity,
              transition: "opacity 0.3s ease",
            }}
          >
            {/* Logo */}
            <div
              style={{
                marginBottom: "32px",
                textAlign: "center",
                opacity: scrollProgress > 0.5 ? 0.3 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              <div className="t-label" style={{ color: "var(--mint)", marginBottom: "8px" }}>
                PixelDew
              </div>
              <p
                className="t-body-lg"
                style={{
                  color: "var(--text-muted)",
                  maxWidth: "300px",
                }}
              >
                Scroll to enter the cube
              </p>
            </div>

            {/* Scroll hint */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                opacity: scrollProgress > 0.5 ? 0 : 0.4,
                transition: "opacity 0.3s ease",
              }}
            >
              <span className="t-label" style={{ color: "var(--text)", fontSize: "6px" }}>
                scroll
              </span>
              <span style={{ color: "var(--mint)", fontSize: "13px", animation: "heroFloat 2.2s ease-in-out infinite" }}>
                ↓
              </span>
            </div>
          </div>
        )}

        {/* Mobile fallback */}
        {isMobile && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
            }}
          >
            <h1 className="t-display glow-mint" style={{ color: "var(--mint)", marginBottom: "24px" }}>
              PixelDew
            </h1>
            <p className="t-body-lg" style={{ color: "var(--text-muted)", textAlign: "center", maxWidth: "280px" }}>
              Membangun pengalaman digital yang terasa hidup
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
