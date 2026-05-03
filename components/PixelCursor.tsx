"use client";
import { useEffect, useRef, useState } from "react";

export default function PixelCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<{ x: number; y: number; id: number }[]>([]);
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const idRef = useRef(0);

  useEffect(() => {
    // Hide default cursor
    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });

      // Add trail particle
      const id = idRef.current++;
      trailRef.current = [...trailRef.current.slice(-8), { x, y, id }];
      setTrails([...trailRef.current]);
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    const onHoverIn = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches("a, button, [role=button], input, textarea, select")) {
        setHovered(true);
      }
    };
    const onHoverOut = () => setHovered(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onHoverIn);
    window.addEventListener("mouseout", onHoverOut);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onHoverIn);
      window.removeEventListener("mouseout", onHoverOut);
    };
  }, []);

  return (
    <>
      {/* Trail pixels */}
      {trails.map((t, i) => (
        <div
          key={t.id}
          style={{
            position: "fixed",
            left: t.x - 2,
            top: t.y - 2,
            width: 4,
            height: 4,
            background: i % 2 === 0 ? "#2CFF8F" : "#FF3BD4",
            opacity: (i + 1) / trails.length * 0.5,
            pointerEvents: "none",
            zIndex: 99998,
            transition: "opacity 0.3s",
            imageRendering: "pixelated",
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "transform 0.05s",
        }}
      >
        {hovered ? (
          /* Hover state: pixel hand / expand */
          <svg width="24" height="24" viewBox="0 0 24 24" style={{ imageRendering: "pixelated" }}>
            <rect x="10" y="0" width="4" height="4" fill="#2CFF8F" />
            <rect x="10" y="4" width="4" height="4" fill="#2CFF8F" />
            <rect x="6" y="4" width="4" height="4" fill="#2CFF8F" />
            <rect x="14" y="4" width="4" height="4" fill="#2CFF8F" />
            <rect x="6" y="8" width="12" height="4" fill="#2CFF8F" />
            <rect x="4" y="12" width="16" height="4" fill="#2CFF8F" />
            <rect x="4" y="16" width="16" height="4" fill="#2CFF8F" />
            <rect x="6" y="20" width="12" height="4" fill="#2CFF8F" />
          </svg>
        ) : clicked ? (
          /* Click state: burst */
          <svg width="20" height="20" viewBox="0 0 20 20" style={{ imageRendering: "pixelated" }}>
            <rect x="8" y="0" width="4" height="4" fill="#FF3BD4" />
            <rect x="16" y="8" width="4" height="4" fill="#FF3BD4" />
            <rect x="8" y="16" width="4" height="4" fill="#FF3BD4" />
            <rect x="0" y="8" width="4" height="4" fill="#FF3BD4" />
            <rect x="7" y="7" width="6" height="6" fill="#FF3BD4" />
          </svg>
        ) : (
          /* Default: pixel crosshair */
          <svg width="20" height="20" viewBox="0 0 20 20" style={{ imageRendering: "pixelated" }}>
            {/* Vertical bar */}
            <rect x="9" y="0" width="2" height="6" fill="#2CFF8F" />
            <rect x="9" y="14" width="2" height="6" fill="#2CFF8F" />
            {/* Horizontal bar */}
            <rect x="0" y="9" width="6" height="2" fill="#2CFF8F" />
            <rect x="14" y="9" width="6" height="2" fill="#2CFF8F" />
            {/* Center dot */}
            <rect x="8" y="8" width="4" height="4" fill="#2CFF8F" />
            {/* Glow center */}
            <rect x="9" y="9" width="2" height="2" fill="#fff" opacity="0.8" />
          </svg>
        )}
      </div>
    </>
  );
}
