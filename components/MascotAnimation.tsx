"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function MascotAnimation() {
  const [visible, setVisible] = useState(false);
  const [dewbitTalk, setDewbitTalk] = useState(false);
  const [pixaTalk, setPixaTalk] = useState(false);
  const [dewbitMsg, setDewbitMsg] = useState("");
  const [pixaMsg, setPixaMsg] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const DEWBIT_LINES = [
    "pixel by pixel 🌱",
    "bits loading... ⚡",
    "hello world! 👾",
    "deploy incoming 🚀",
    "stay curious ✨",
  ];

  const PIXA_LINES = [
    "let's build! 💾",
    "code is art 🎨",
    "ship it! 🟩",
    "vibe check ✅",
    "ideas = pixels 🔥",
  ];

  useEffect(() => {
    // Fade in on mount
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Random speech bubbles alternating
    const loop = () => {
      const isDewbit = Math.random() > 0.5;
      const delay = 2500 + Math.random() * 2000;

      timerRef.current = setTimeout(() => {
        if (isDewbit) {
          setDewbitMsg(DEWBIT_LINES[Math.floor(Math.random() * DEWBIT_LINES.length)]);
          setDewbitTalk(true);
          setTimeout(() => setDewbitTalk(false), 2000);
        } else {
          setPixaMsg(PIXA_LINES[Math.floor(Math.random() * PIXA_LINES.length)]);
          setPixaTalk(true);
          setTimeout(() => setPixaTalk(false), 2000);
        }
        loop();
      }, delay);
    };
    loop();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="w-full flex justify-center items-end gap-6 md:gap-12 py-8 md:py-12 relative"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      {/* Dewbit (green) */}
      <div className="relative flex flex-col items-center" style={{ animationFillMode: "both" }}>
        {/* Speech bubble */}
        <div
          className="absolute font-pixel text-center whitespace-nowrap pointer-events-none"
          style={{
            bottom: "calc(100% + 12px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(10,0,30,0.92)",
            border: "1px solid rgba(44,255,143,0.5)",
            color: "#2CFF8F",
            fontSize: "7px",
            padding: "6px 10px",
            borderRadius: "2px",
            boxShadow: "0 0 12px rgba(44,255,143,0.2)",
            opacity: dewbitTalk ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 10,
            letterSpacing: "0.05em",
            minWidth: "90px",
          }}
        >
          {dewbitMsg}
          {/* Bubble tail */}
          <span
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "6px solid rgba(44,255,143,0.5)",
            }}
          />
        </div>

        {/* Dewbit image */}
        <div
          className="relative cursor-pointer select-none"
          style={{
            animation: "dewbitFloat 4s ease-in-out infinite",
            filter: "drop-shadow(0 0 20px rgba(44,255,143,0.4))",
            width: "clamp(80px, 14vw, 130px)",
            height: "clamp(80px, 14vw, 130px)",
          }}
          onClick={() => {
            setDewbitMsg(DEWBIT_LINES[Math.floor(Math.random() * DEWBIT_LINES.length)]);
            setDewbitTalk(true);
            setTimeout(() => setDewbitTalk(false), 2000);
          }}
        >
          <Image
            src="/dewbit.png"
            alt="Dewbit mascot"
            fill
            style={{ objectFit: "contain", objectPosition: "left center" }}
            priority
          />
        </div>

        {/* Name tag */}
        <span
          className="font-pixel mt-2"
          style={{ fontSize: "7px", color: "rgba(44,255,143,0.6)", letterSpacing: "0.2em" }}
        >
          DEWBIT
        </span>
      </div>

      {/* Center glow / pixel sparks */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-none"
            style={{
              width: 3,
              height: 3,
              background: i % 2 === 0 ? "#2CFF8F" : "#FF3BD4",
              animation: `spark${(i % 3) + 1} ${2 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.35}s`,
              top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 25}px`,
              left: `${Math.cos(i * 60 * Math.PI / 180) * 30}px`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Pixa (pink) */}
      <div className="relative flex flex-col items-center">
        {/* Speech bubble */}
        <div
          className="absolute font-pixel text-center whitespace-nowrap pointer-events-none"
          style={{
            bottom: "calc(100% + 12px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(10,0,30,0.92)",
            border: "1px solid rgba(255,59,212,0.5)",
            color: "#FF3BD4",
            fontSize: "7px",
            padding: "6px 10px",
            borderRadius: "2px",
            boxShadow: "0 0 12px rgba(255,59,212,0.2)",
            opacity: pixaTalk ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 10,
            letterSpacing: "0.05em",
            minWidth: "90px",
          }}
        >
          {pixaMsg}
          <span
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "6px solid rgba(255,59,212,0.5)",
            }}
          />
        </div>

        {/* Pixa image */}
        <div
          className="relative cursor-pointer select-none"
          style={{
            animation: "pixaFloat 4.5s ease-in-out infinite",
            animationDelay: "0.8s",
            filter: "drop-shadow(0 0 20px rgba(255,59,212,0.4))",
            width: "clamp(80px, 14vw, 130px)",
            height: "clamp(80px, 14vw, 130px)",
          }}
          onClick={() => {
            setPixaMsg(PIXA_LINES[Math.floor(Math.random() * PIXA_LINES.length)]);
            setPixaTalk(true);
            setTimeout(() => setPixaTalk(false), 2000);
          }}
        >
          <Image
            src="/dewbit.png"
            alt="Pixa mascot"
            fill
            style={{
              objectFit: "contain",
              objectPosition: "right center",
              filter: "hue-rotate(300deg) saturate(1.3)",
            }}
            priority
          />
        </div>

        {/* Name tag */}
        <span
          className="font-pixel mt-2"
          style={{ fontSize: "7px", color: "rgba(255,59,212,0.6)", letterSpacing: "0.2em" }}
        >
          PIXA
        </span>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes dewbitFloat {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-14px) rotate(1deg); }
        }
        @keyframes pixaFloat {
          0%, 100% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-18px) rotate(-1deg); }
        }
        @keyframes spark1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          50% { transform: translate(5px, -10px) scale(1.5); opacity: 0.3; }
        }
        @keyframes spark2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(-8px, -8px) scale(0.5); opacity: 1; }
        }
        @keyframes spark3 {
          0%, 100% { transform: translate(0, 0); opacity: 0.6; }
          50% { transform: translate(10px, -5px); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
