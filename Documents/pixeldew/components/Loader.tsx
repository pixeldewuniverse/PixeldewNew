"use client";
import { useEffect, useState, useRef } from "react";

// ── 8-bit melody generator via Web Audio API ──
function play8BitBGM(ctx: AudioContext): () => void {
  const master = ctx.createGain();
  master.gain.value = 0.18;
  master.connect(ctx.destination);

  // Simple melody notes (freq, duration)
  const NOTES = [
    [523, 0.12], [659, 0.12], [784, 0.12], [1047, 0.18],
    [880, 0.12], [784, 0.12], [659, 0.18], [523, 0.12],
    [587, 0.12], [740, 0.12], [880, 0.18], [740, 0.12],
    [659, 0.12], [587, 0.12], [523, 0.25],
  ] as [number, number][];

  // Bass line
  const BASS = [
    [130, 0.25], [130, 0.25], [165, 0.25], [147, 0.25],
    [130, 0.25], [110, 0.25], [130, 0.5],
  ] as [number, number][];

  // Drum pattern (kick + hihat)
  const KICK_PATTERN  = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5];
  const HIHAT_PATTERN = [0.25, 0.75, 1.25, 1.75, 2.25, 2.75, 3.25, 3.75];

  let stopped = false;
  let loopTimeout: ReturnType<typeof setTimeout>;

  function playSquare(freq: number, startTime: number, duration: number, vol = 0.15) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    gain.connect(master);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.01);
  }

  function playTriangle(freq: number, startTime: number, duration: number, vol = 0.1) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    gain.connect(master);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.01);
  }

  function playNoise(startTime: number, duration: number, vol = 0.04) {
    const bufSize = ctx.sampleRate * duration;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    const gain = ctx.createGain();
    // High-pass filter for hi-hat sound
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 8000;
    src.buffer = buf;
    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    src.start(startTime);
    src.stop(startTime + duration + 0.01);
  }

  function playKick(startTime: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, startTime);
    osc.frequency.exponentialRampToValueAtTime(0.001, startTime + 0.18);
    gain.gain.setValueAtTime(0.5, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
    osc.connect(gain);
    gain.connect(master);
    osc.start(startTime);
    osc.stop(startTime + 0.2);
  }

  function scheduleLoop(startTime: number) {
    if (stopped) return;

    const loopDuration = 4.0; // 4 seconds per loop

    // Melody
    let t = startTime;
    NOTES.forEach(([freq, dur]) => {
      playSquare(freq, t, dur * 0.9, 0.12);
      t += dur;
    });

    // Bass (triangle wave, lower volume)
    let tb = startTime;
    BASS.forEach(([freq, dur]) => {
      playTriangle(freq, tb, dur * 0.85, 0.08);
      tb += dur;
    });

    // Kicks
    KICK_PATTERN.forEach((beat) => {
      playKick(startTime + beat);
    });

    // Hi-hats
    HIHAT_PATTERN.forEach((beat) => {
      playNoise(startTime + beat, 0.05, 0.035);
    });

    // Schedule next loop
    loopTimeout = setTimeout(() => {
      scheduleLoop(ctx.currentTime);
    }, (loopDuration - 0.1) * 1000);
  }

  scheduleLoop(ctx.currentTime + 0.05);

  return () => {
    stopped = true;
    clearTimeout(loopTimeout);
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
  };
}

export default function Loader() {
  const [done, setDone]         = useState(false);
  const [hidden, setHidden]     = useState(false);
  const [started, setStarted]   = useState(false);
  const videoRef                = useRef<HTMLVideoElement>(null);
  const audioCtxRef             = useRef<AudioContext | null>(null);
  const stopBgmRef              = useRef<(() => void) | null>(null);

  function startExperience() {
    if (started) return;
    setStarted(true);

    // Start audio context on user gesture
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    audioCtxRef.current = ctx;
    stopBgmRef.current = play8BitBGM(ctx);

    // Play video
    const video = videoRef.current;
    if (video) {
      video.muted  = false;
      video.volume = 0.7;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }

  useEffect(() => {
    return () => {
      stopBgmRef.current?.();
      audioCtxRef.current?.close();
    };
  }, []);

  function onVideoEnded() {
    stopBgmRef.current?.();
    setDone(true);
    setTimeout(() => setHidden(true), 700);
  }

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        cursor: "default",
        background: "#080012",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: done ? 0 : 1,
        transition: "opacity 0.65s cubic-bezier(0.215,0.61,0.355,1)",
        pointerEvents: done ? "none" : "all",
      }}
      id="loader-wrap"
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/loader.mp4"
        playsInline
        preload="auto"
        muted
        onEnded={onVideoEnded}
        style={{
          maxWidth: "50%",
          maxHeight: "50%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          display: started ? "block" : "none",
        }}
      />

      {/* Tap to enter — shown before user gesture */}
      {!started && (
        <button
          onClick={startExperience}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
            padding: "0",
          }}
        >
          {/* Logo */}
          <svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M50 8 C 50 8, 78 44, 86 66 A 36 36 0 1 1 14 66 C 22 44, 50 8, 50 8 Z"
              fill="#1ddd78"
              style={{ filter: "drop-shadow(0 0 12px rgba(29,221,120,0.6))" }}
            />
            <rect x="60" y="22" width="16" height="16" fill="#080012" />
            <rect x="76" y="10" width="9" height="9" fill="#1ddd78" />
          </svg>

          <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "11px", color: "#1ddd78", textShadow: "0 0 16px rgba(29,221,120,0.5)", letterSpacing: "0.06em" }}>
            PixelDew
          </div>

          {/* Tap prompt */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", animation: "tapPulse 2s ease-in-out infinite" }}>
            <div style={{ width: "40px", height: "40px", border: "2px solid rgba(29,221,120,0.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "18px" }}>▶</span>
            </div>
            <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "7px", color: "rgba(29,221,120,0.5)", letterSpacing: "0.2em" }}>
              tap to enter
            </span>
          </div>
        </button>
      )}

      <style>{`
        #loader-wrap { cursor: default !important; }
        #loader-wrap button { cursor: pointer !important; }
        body:has(#loader-wrap) #cursor-dot, body:has(#loader-wrap) #cursor-ring { display: none !important; }
        @keyframes tapPulse {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
}
