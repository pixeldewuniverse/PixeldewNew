"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const BOOT_LINES = [
  "PIXELDEW OS v2.0.4",
  "initializing pixel engine...",
  "loading assets............. OK",
  "spawning Dewbit............. OK",
  "waking up Pixa.............. OK",
  "connecting to the dew cloud.",
  "calibrating neon levels..... OK",
  "mounting imagination........ OK",
  "system ready. welcome. 🌱",
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "mascots" | "done">("boot");
  const [fadeOut, setFadeOut] = useState(false);
  const [mascotIn, setMascotIn] = useState(false);
  const [dewbitTalk, setDewbitTalk] = useState(false);
  const [pixaTalk, setPixaTalk] = useState(false);

  useEffect(() => {
    let lineIdx = 0;
    const addLine = () => {
      if (lineIdx < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[lineIdx]]);
        setProgress(Math.round(((lineIdx + 1) / BOOT_LINES.length) * 100));
        lineIdx++;
        setTimeout(addLine, 180 + Math.random() * 200);
      } else {
        // Boot done — show mascots
        setTimeout(() => {
          setPhase("mascots");
          setTimeout(() => setMascotIn(true), 100);
          setTimeout(() => setDewbitTalk(true), 600);
          setTimeout(() => { setDewbitTalk(false); setPixaTalk(true); }, 1800);
          setTimeout(() => {
            setPixaTalk(false);
            setFadeOut(true);
            setTimeout(onDone, 600);
          }, 3200);
        }, 400);
      }
    };
    const t = setTimeout(addLine, 300);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#080018",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease",
        overflow: "hidden",
      }}
    >
      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        zIndex: 1,
      }} />

      {/* Corner decorations */}
      {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
        <div key={i} className={`absolute ${pos}`} style={{ zIndex: 2 }}>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <rect x={i % 2 === 0 ? 0 : 14} y="0" width="6" height="2" fill="rgba(44,255,143,0.4)" />
            <rect x={i % 2 === 0 ? 0 : 18} y="0" width="2" height="6" fill="rgba(44,255,143,0.4)" />
          </svg>
        </div>
      ))}

      {/* Boot phase */}
      {phase === "boot" && (
        <div style={{ zIndex: 2, width: "min(480px, 90vw)", padding: "0 16px" }}>
          {/* Logo */}
          <div
            className="font-pixel mb-6 text-center"
            style={{ fontSize: "clamp(10px, 2vw, 14px)", color: "#2CFF8F", letterSpacing: "0.2em",
              textShadow: "0 0 20px #2CFF8F, 0 0 40px #2CFF8F55" }}
          >
            PIXELDEW
          </div>

          {/* Terminal lines */}
          <div
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(44,255,143,0.2)",
              padding: "16px",
              minHeight: "220px",
              fontFamily: "monospace",
            }}
          >
            <div className="font-pixel mb-3" style={{ fontSize: "8px", color: "rgba(44,255,143,0.4)", letterSpacing: "0.15em" }}>
              BOOT LOG //
            </div>
            {lines.map((line, i) => (
              <div
                key={i}
                style={{
                  fontSize: "10px",
                  color: i === lines.length - 1 ? "#2CFF8F" : "rgba(232,224,255,0.5)",
                  marginBottom: "4px",
                  fontFamily: "monospace",
                  animation: "fadeInLine 0.15s ease",
                }}
              >
                {i === lines.length - 1 ? (
                  <span style={{ color: "rgba(44,255,143,0.5)" }}>{">"} </span>
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>{">"} </span>
                )}
                {line}
                {i === lines.length - 1 && (
                  <span className="cursor-blink" style={{ color: "#2CFF8F" }}>_</span>
                )}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: "12px", background: "rgba(255,255,255,0.06)", height: "4px" }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(to right, #2CFF8F, #18E6FF)",
                transition: "width 0.2s ease",
                boxShadow: "0 0 8px #2CFF8F",
              }}
            />
          </div>
          <div className="font-pixel mt-2 text-right" style={{ fontSize: "7px", color: "rgba(44,255,143,0.4)" }}>
            {progress}%
          </div>
        </div>
      )}

      {/* Mascot phase */}
      {phase === "mascots" && (
        <div
          style={{
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            opacity: mascotIn ? 1 : 0,
            transform: mascotIn ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease",
          }}
        >
          <div className="font-pixel mb-4" style={{ fontSize: "clamp(10px, 2vw, 14px)", color: "#2CFF8F",
            textShadow: "0 0 20px #2CFF8F", letterSpacing: "0.2em" }}>
            SYSTEM READY
          </div>

          <div style={{ display: "flex", gap: "32px", alignItems: "flex-end" }}>
            {/* Dewbit */}
            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Bubble */}
              <div style={{
                position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(10,0,30,0.95)", border: "1px solid rgba(44,255,143,0.6)",
                color: "#2CFF8F", fontSize: "8px", padding: "6px 10px", whiteSpace: "nowrap",
                fontFamily: "monospace", opacity: dewbitTalk ? 1 : 0, transition: "opacity 0.3s",
                boxShadow: "0 0 12px rgba(44,255,143,0.3)",
              }}>
                hey! ready to build? 🌱
                <span style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
                  borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
                  borderTop: "6px solid rgba(44,255,143,0.6)" }} />
              </div>
              <div style={{ width: 100, height: 100, position: "relative",
                animation: "dewbitFloat 3s ease-in-out infinite",
                filter: "drop-shadow(0 0 16px rgba(44,255,143,0.5))" }}>
                <Image src="/dewbit.png" alt="Dewbit" fill style={{ objectFit: "contain" }} />
              </div>
              <span className="font-pixel mt-1" style={{ fontSize: "7px", color: "rgba(44,255,143,0.6)", letterSpacing: "0.2em" }}>DEWBIT</span>
            </div>

            {/* Pixa */}
            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(10,0,30,0.95)", border: "1px solid rgba(255,59,212,0.6)",
                color: "#FF3BD4", fontSize: "8px", padding: "6px 10px", whiteSpace: "nowrap",
                fontFamily: "monospace", opacity: pixaTalk ? 1 : 0, transition: "opacity 0.3s",
                boxShadow: "0 0 12px rgba(255,59,212,0.3)",
              }}>
                let&apos;s go! pixels incoming 💾
                <span style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
                  borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
                  borderTop: "6px solid rgba(255,59,212,0.6)" }} />
              </div>
              <div style={{ width: 100, height: 100, position: "relative",
                animation: "pixaFloat 3.5s ease-in-out infinite", animationDelay: "0.5s",
                filter: "drop-shadow(0 0 16px rgba(255,59,212,0.5))" }}>
                <Image src="/pixa.png" alt="Pixa" fill style={{ objectFit: "contain" }} />
              </div>
              <span className="font-pixel mt-1" style={{ fontSize: "7px", color: "rgba(255,59,212,0.6)", letterSpacing: "0.2em" }}>PIXA</span>
            </div>
          </div>

          {/* Enter hint */}
          <div className="font-pixel mt-6 cursor-blink" style={{ fontSize: "8px", color: "rgba(232,224,255,0.3)", letterSpacing: "0.2em" }}>
            entering pixeldew universe...
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInLine { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes dewbitFloat { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-10px) rotate(1deg); } }
        @keyframes pixaFloat { 0%,100% { transform: translateY(0) rotate(1deg); } 50% { transform: translateY(-13px) rotate(-1deg); } }
      `}</style>
    </div>
  );
}
