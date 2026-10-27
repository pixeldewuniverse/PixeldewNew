"use client";
import { useEffect, useState } from "react";

export default function MascotAnimation() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in on mount
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="w-full flex justify-center items-center py-12 md:py-20 relative"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
        minHeight: "400px",
      }}
    >
      {/* Motion Logo Video */}
      <div
        className="relative"
        style={{
          width: "clamp(280px, 50vw, 400px)",
          aspectRatio: "9/16",
          overflow: "hidden",
          borderRadius: "24px",
          boxShadow: "0 0 40px rgba(29,221,120,0.2), 0 0 80px rgba(14,207,223,0.1)",
          border: "1px solid rgba(29,221,120,0.1)",
          background: "rgba(8,0,18,0.8)",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        >
          <source src="/pixeldew-logo-reveal.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Glow effect overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(29,221,120,0.1) 0%, transparent 50%, rgba(14,207,223,0.1) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Ambient glow behind video */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "clamp(300px, 60vw, 450px)",
          height: "clamp(400px, 70vh, 600px)",
          background: "radial-gradient(ellipse at center, rgba(29,221,120,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: -1,
        }}
      />
    </div>
  );
}
