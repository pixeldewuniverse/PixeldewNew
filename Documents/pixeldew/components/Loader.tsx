"use client";
import { useEffect, useState, useRef } from "react";

export default function Loader() {
  const [done, setDone]     = useState(false);
  const [hidden, setHidden] = useState(false);
  const videoRef            = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Sound ON
    video.muted  = false;
    video.volume = 0.8;

    const onEnded = () => {
      setDone(true);
      setTimeout(() => setHidden(true), 700);
    };

    const fallback = setTimeout(() => {
      setDone(true);
      setTimeout(() => setHidden(true), 700);
    }, 8000);

    video.addEventListener("ended", onEnded);

    // Autoplay dengan sound butuh user gesture — coba play dulu
    video.play().catch(() => {
      // Kalau blocked, mute dan coba lagi
      video.muted = true;
      video.play().catch(() => {
        setDone(true);
        setTimeout(() => setHidden(true), 400);
      });
    });

    return () => {
      video.removeEventListener("ended", onEnded);
      clearTimeout(fallback);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#080012",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: done ? 0 : 1,
        transition: "opacity 0.65s cubic-bezier(0.215,0.61,0.355,1)",
        pointerEvents: done ? "none" : "all",
      }}
    >
      {/* Video proporsional — tidak stretch */}
      <video
        ref={videoRef}
        src="/loader.mp4"
        playsInline
        autoPlay
        preload="auto"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
}
