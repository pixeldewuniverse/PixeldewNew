"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a"
];

const SECRET_LINES = [
  "> CHEAT CODE DETECTED",
  "> UNLOCKING SECRET VAULT...",
  "> ACCESS GRANTED 🟩",
  "> WELCOME TO THE HIDDEN ZONE",
];

const SECRETS = [
  {
    icon: "🌱",
    title: "Dewbit's First Sketch",
    desc: "The very first doodle of Dewbit was drawn on a napkin at 2AM. The napkin is framed. In the metaverse.",
  },
  {
    icon: "💾",
    title: "Stack Origin",
    desc: "PixelDew was almost called 'ByteMoss'. Someone stopped the creator just in time.",
  },
  {
    icon: "⚡",
    title: "First Deploy",
    desc: "The first PixelDew deploy crashed immediately. Pixa laughed. Dewbit cried. Both were proud.",
  },
  {
    icon: "🎮",
    title: "Hidden Game Mode",
    desc: "There's a Pong game hidden somewhere in this site. Or is there? 👀",
  },
  {
    icon: "🔥",
    title: "Pixel Count",
    desc: "This site is made of exactly 4,194,304 conceptual pixels. None of them are wasted.",
  },
  {
    icon: "👾",
    title: "Dewbit's Mood",
    desc: "Dewbit is always happy. Except when the build fails. Then Dewbit is still happy, just faster.",
  },
];

export default function KonamiEasterEgg() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"boot"|"reveal">("boot");
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [fadeOut, setFadeOut] = useState(false);
  const [hint, setHint] = useState(false);
  const inputRef = useRef<string[]>([]);

  // Show hint after 5s idle
  useEffect(() => {
    const t = setTimeout(() => setHint(true), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      inputRef.current = [...inputRef.current, e.key].slice(-10);
      const seq = inputRef.current;
      let matchLen = 0;
      for (let i = 0; i < seq.length; i++) {
        if (seq[i] === KONAMI[matchLen]) matchLen++;
      }
      setProgress(matchLen);
      if (matchLen === KONAMI.length) {
        setActive(true);
        setHint(false);
        inputRef.current = [];
        setProgress(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Boot sequence when activated
  useEffect(() => {
    if (!active) return;
    setPhase("boot");
    setBootLines([]);
    let i = 0;
    const addLine = () => {
      if (i < SECRET_LINES.length) {
        setBootLines(prev => [...prev, SECRET_LINES[i]]);
        i++;
        setTimeout(addLine, 350);
      } else {
        setTimeout(() => setPhase("reveal"), 300);
      }
    };
    setTimeout(addLine, 200);
  }, [active]);

  const close = () => {
    setFadeOut(true);
    setTimeout(() => {
      setActive(false);
      setFadeOut(false);
      setBootLines([]);
    }, 400);
  };

  return (
    <>
      {/* Konami progress indicator (subtle) */}
      {progress > 0 && progress < KONAMI.length && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          zIndex: 9999, display: "flex", gap: 4, pointerEvents: "none",
        }}>
          {KONAMI.map((_, i) => (
            <div key={i} style={{
              width: 6, height: 6,
              background: i < progress ? "#2CFF8F" : "rgba(255,255,255,0.15)",
              boxShadow: i < progress ? "0 0 6px #2CFF8F" : "none",
              transition: "all 0.15s",
            }} />
          ))}
        </div>
      )}

      {/* Hint */}
      {hint && !active && (
        <div
          className="font-pixel"
          style={{
            position: "fixed", bottom: 20, right: 20, zIndex: 9000,
            fontSize: "7px", color: "rgba(44,255,143,0.35)",
            animation: "hintPulse 2s ease-in-out infinite",
            letterSpacing: "0.1em", cursor: "default",
          }}
          onClick={() => setHint(false)}
        >
          ↑↑↓↓←→←→BA ?
        </div>
      )}

      {/* Secret overlay */}
      {active && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99990,
          background: "rgba(4,0,20,0.97)",
          opacity: fadeOut ? 0 : 1,
          transition: "opacity 0.4s ease",
          overflow: "auto",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          {/* Scanlines */}
          <div style={{
            position: "fixed", inset: 0, pointerEvents: "none",
            background: "repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)",
          }} />

          {/* Close button */}
          <button
            onClick={close}
            className="font-pixel"
            style={{
              position: "fixed", top: 16, right: 16,
              background: "transparent", border: "1px solid rgba(255,59,212,0.4)",
              color: "#FF3BD4", fontSize: "8px", padding: "6px 12px",
              cursor: "pointer", zIndex: 2, letterSpacing: "0.1em",
            }}
          >
            [ESC] EXIT
          </button>

          <div style={{ width: "min(640px, 92vw)", padding: "48px 0 80px", position: "relative", zIndex: 1 }}>

            {/* Boot phase */}
            {phase === "boot" && (
              <div style={{ fontFamily: "monospace" }}>
                {bootLines.map((line, i) => (
                  <div key={i} style={{
                    fontSize: "11px", marginBottom: 8,
                    color: i === bootLines.length - 1 ? "#2CFF8F" : "rgba(44,255,143,0.5)",
                    animation: "fadeInLine 0.2s ease",
                  }}>
                    {line}{i === bootLines.length - 1 && <span style={{ color: "#2CFF8F" }}>_</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Reveal phase */}
            {phase === "reveal" && (
              <>
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="font-pixel mb-2" style={{
                    fontSize: "clamp(10px, 2.5vw, 16px)", color: "#2CFF8F",
                    textShadow: "0 0 30px #2CFF8F, 0 0 60px #2CFF8F55",
                    letterSpacing: "0.25em",
                  }}>
                    ★ SECRET ZONE ★
                  </div>
                  <div className="font-pixel" style={{ fontSize: "8px", color: "rgba(255,59,212,0.6)", letterSpacing: "0.15em" }}>
                    you found it. respect. 🫡
                  </div>
                </div>

                {/* Mascots */}
                <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 40 }}>
                  <div style={{
                    width: 80, height: 80, position: "relative",
                    animation: "dewbitFloat 3s ease-in-out infinite",
                    filter: "drop-shadow(0 0 20px rgba(44,255,143,0.6))",
                  }}>
                    <Image src="/dewbit.png" alt="Dewbit" fill style={{ objectFit: "contain" }} />
                  </div>
                  <div style={{
                    width: 80, height: 80, position: "relative",
                    animation: "pixaFloat 3.5s ease-in-out infinite", animationDelay: "0.5s",
                    filter: "drop-shadow(0 0 20px rgba(255,59,212,0.6))",
                  }}>
                    <Image src="/pixa.png" alt="Pixa" fill style={{ objectFit: "contain" }} />
                  </div>
                </div>

                {/* Secret cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                  {SECRETS.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(44,255,143,0.12)",
                        padding: 16,
                        animation: `fadeInLine 0.3s ease both`,
                        animationDelay: `${i * 100}ms`,
                        transition: "border-color 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(44,255,143,0.4)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(44,255,143,0.08)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(44,255,143,0.12)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      }}
                    >
                      <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
                      <div className="font-pixel mb-2" style={{ fontSize: "8px", color: "#2CFF8F", lineHeight: 1.6 }}>
                        {s.title}
                      </div>
                      <div style={{ fontSize: "10px", color: "rgba(232,224,255,0.45)", lineHeight: 1.6 }}>
                        {s.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="font-pixel text-center mt-10" style={{ fontSize: "7px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>
                  this page doesn&apos;t exist. you didn&apos;t see anything. 👾
                </div>
              </>
            )}
          </div>

          <style>{`
            @keyframes fadeInLine { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }
            @keyframes dewbitFloat { 0%,100% { transform:translateY(0) rotate(-1deg); } 50% { transform:translateY(-10px) rotate(1deg); } }
            @keyframes pixaFloat { 0%,100% { transform:translateY(0) rotate(1deg); } 50% { transform:translateY(-13px) rotate(-1deg); } }
            @keyframes hintPulse { 0%,100% { opacity:0.35; } 50% { opacity:0.7; } }
          `}</style>
        </div>
      )}
    </>
  );
}
