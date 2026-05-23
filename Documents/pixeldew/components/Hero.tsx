"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const zoneRef = useRef<HTMLDivElement>(null);

  // Derived display values (computed in scroll handler, stored in state for render)
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [uiOpacity, setUiOpacity] = useState(1);
  const [sceneOpacity, setSceneOpacity] = useState(1);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const zone = zoneRef.current;
      if (!zone) return;

      const scrollZoneHeight = window.innerHeight * 3; // 300vh
      const progress = Math.max(0, Math.min(1, window.scrollY / (scrollZoneHeight - window.innerHeight)));
      setScrollProgress(progress);

      // UI text fades out quickly as user starts scrolling
      setUiOpacity(Math.max(0, 1 - progress * 3));

      // Flash: ramp up 0.80→0.86, ramp down 0.86→0.92
      let flash = 0;
      if (progress >= 0.80 && progress < 0.86) {
        flash = lerp(0, 0.85, (progress - 0.80) / 0.06);
      } else if (progress >= 0.86 && progress < 0.92) {
        flash = lerp(0.85, 0, (progress - 0.86) / 0.06);
      }
      setFlashOpacity(flash);

      // Scene canvas fades after break-in
      setSceneOpacity(progress > 0.92 ? Math.max(0, 1 - (progress - 0.92) / 0.08) : 1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isMobile) {
    return (
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px clamp(24px, 8vw, 96px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ textAlign: "center", zIndex: 1 }}>
          <div className="t-label" style={{ color: "rgba(29,221,120,0.5)", marginBottom: "24px" }}>
            Portfolio 2025
          </div>
          <h1 className="t-display glow-mint" style={{ color: "var(--mint)", marginBottom: "16px" }}>
            PixelDew
          </h1>
          <p className="t-body-lg" style={{ color: "var(--text-muted)", maxWidth: "280px", margin: "0 auto 40px" }}>
            Membangun pengalaman digital yang terasa hidup.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#work" className="btn btn-primary" style={{ cursor: "none" }}>Lihat Karya →</a>
            <a href="#contact" className="btn btn-border" style={{ cursor: "none" }}>Hubungi</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    // 300vh scroll zone
    <div ref={zoneRef} style={{ height: "300vh", position: "relative" }}>
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Three.js canvas */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: sceneOpacity,
            transition: "opacity 0.3s ease",
          }}
        >
          <HeroScene scrollProgress={scrollProgress} isMobile={isMobile} />
        </div>

        {/* Flash overlay */}
        <div
          className="hero-flash"
          style={{ opacity: flashOpacity }}
          aria-hidden="true"
        />

        {/* Hero UI */}
        <div
          className="hero-ui"
          style={{ opacity: uiOpacity }}
          aria-hidden={uiOpacity < 0.05}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div className="t-label" style={{ color: "rgba(29,221,120,0.6)" }}>
              PixelDew
            </div>
            <p className="t-body-lg" style={{ color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
              Scroll to explore
            </p>
            <div className="hero-scroll-hint">↓</div>
          </div>
        </div>
      </div>
    </div>
  );
}
