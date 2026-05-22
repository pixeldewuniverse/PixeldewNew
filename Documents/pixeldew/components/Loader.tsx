"use client";
import { useEffect, useState, useRef } from "react";

export default function Loader() {
  const [done, setDone]     = useState(false);
  const [hidden, setHidden] = useState(false);
  const videoRef            = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mute wajib — pastikan tidak ada suara
    video.muted  = true;
    video.volume = 0;

    const onEnded = () => {
      setDone(true);
      setTimeout(() => setHidden(true), 700);
    };

    // Fallback: hide setelah max 5s kalau video tidak play
    const fallback = setTimeout(() => {
      setDone(true);
      setTimeout(() => setHidden(true), 700);
    }, 5000);

    video.addEventListener("ended", onEnded);
    video.play().catch(() => {
      // Autoplay blocked — langsung skip loader
      setDone(true);
      setTimeout(() => setHidden(true), 400);
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
      <video
        ref={videoRef}
        src="/loader.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}
