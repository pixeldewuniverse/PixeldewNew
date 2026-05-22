"use client";
import { useEffect, useRef, useState } from "react";

function createBGM(ctx: AudioContext): () => void {
  const master = ctx.createGain();
  master.gain.value = 0.08;
  master.connect(ctx.destination);

  // Reverb-like delay for ambience
  const delay = ctx.createDelay(0.3);
  delay.delayTime.value = 0.28;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.25;
  const delayGain = ctx.createGain();
  delayGain.gain.value = 0.18;
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(delayGain);
  delayGain.connect(master);

  // Melody — chill 8bit ambient loop
  const MELODY: [number, number][] = [
    [392, 0.2], [494, 0.2], [587, 0.2], [659, 0.35],
    [587, 0.2], [523, 0.2], [494, 0.35],
    [440, 0.2], [494, 0.2], [587, 0.2], [523, 0.35],
    [494, 0.2], [440, 0.2], [392, 0.5],
  ];

  // Pad chords (lower octave, soft)
  const CHORDS: [number[], number][] = [
    [[196, 247, 294], 1.0],
    [[196, 247, 294], 0.8],
    [[165, 220, 262], 1.0],
    [[174, 220, 261], 1.0],
  ];

  // Bass walk
  const BASS: [number, number][] = [
    [98,  0.4], [98,  0.4], [110, 0.4], [98, 0.4],
    [87,  0.4], [87,  0.8], [98, 0.4],
  ];

  let stopped = false;
  let loopTimer: ReturnType<typeof setTimeout>;

  function playOsc(
    type: OscillatorType,
    freq: number,
    start: number,
    dur: number,
    vol: number,
    target: AudioNode
  ) {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(vol, start + 0.02);
    gain.gain.setValueAtTime(vol, start + dur * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
    osc.connect(gain);
    gain.connect(target);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  }

  function playNoise(start: number, dur: number, vol: number) {
    const buf  = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src    = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain   = ctx.createGain();
    filter.type = "highpass";
    filter.frequency.value = 7000;
    gain.gain.setValueAtTime(vol, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
    src.buffer = buf;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    src.start(start);
    src.stop(start + dur + 0.02);
  }

  function scheduleLoop(startTime: number) {
    if (stopped) return;

    const loopLen = 4.0;

    // Melody (square)
    let t = startTime;
    MELODY.forEach(([f, d]) => {
      playOsc("square", f, t, d * 0.88, 0.09, master);
      playOsc("square", f, t, d * 0.88, 0.04, delay); // send to delay
      t += d;
    });

    // Chords (triangle, soft pads)
    let tc = startTime;
    CHORDS.forEach(([freqs, dur]) => {
      freqs.forEach((f) => {
        playOsc("triangle", f, tc, dur * 0.9, 0.025, master);
      });
      tc += dur;
    });

    // Bass (sine)
    let tb = startTime;
    BASS.forEach(([f, d]) => {
      playOsc("sine", f, tb, d * 0.85, 0.1, master);
      tb += d;
    });

    // Subtle hi-hats
    [0.25, 0.75, 1.25, 1.75, 2.25, 2.75, 3.25, 3.75].forEach((beat) => {
      playNoise(startTime + beat, 0.04, 0.025);
    });

    // Kick (subtle)
    [0, 1.0, 2.0, 3.0].forEach((beat) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const s = startTime + beat;
      osc.frequency.setValueAtTime(100, s);
      osc.frequency.exponentialRampToValueAtTime(0.001, s + 0.15);
      gain.gain.setValueAtTime(0.25, s);
      gain.gain.exponentialRampToValueAtTime(0.001, s + 0.15);
      osc.connect(gain);
      gain.connect(master);
      osc.start(s);
      osc.stop(s + 0.16);
    });

    loopTimer = setTimeout(() => scheduleLoop(ctx.currentTime), (loopLen - 0.05) * 1000);
  }

  scheduleLoop(ctx.currentTime + 0.05);

  return () => {
    stopped = true;
    clearTimeout(loopTimer);
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
  };
}

export default function BackgroundMusic() {
  const [playing, setPlaying]   = useState(false);
  const [visible, setVisible]   = useState(false);
  const ctxRef  = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  // Show button after 1.5s (after loader gone)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  function toggle() {
    if (!playing) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      ctxRef.current = ctx;
      stopRef.current = createBGM(ctx);
      setPlaying(true);
    } else {
      stopRef.current?.();
      ctxRef.current?.close();
      ctxRef.current  = null;
      stopRef.current = null;
      setPlaying(false);
    }
  }

  useEffect(() => {
    return () => {
      stopRef.current?.();
      ctxRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggle}
      title={playing ? "Mute music" : "Play 8-bit music"}
      style={{
        position: "fixed",
        bottom: "88px",
        right: "20px",
        zIndex: 9000,
        width: "40px",
        height: "40px",
        background: playing
          ? "rgba(29,221,120,0.12)"
          : "rgba(255,255,255,0.05)",
        border: `1px solid ${playing ? "rgba(29,221,120,0.4)" : "rgba(240,234,255,0.12)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "none",
        transition: "all 0.25s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        boxShadow: playing ? "0 0 16px rgba(29,221,120,0.2)" : "none",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = "rgba(29,221,120,0.5)";
        el.style.background  = "rgba(29,221,120,0.1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = playing ? "rgba(29,221,120,0.4)" : "rgba(240,234,255,0.12)";
        el.style.background  = playing ? "rgba(29,221,120,0.12)" : "rgba(255,255,255,0.05)";
      }}
    >
      {/* Music note icon */}
      {playing ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          {/* Equalizer bars — animated */}
          <rect x="2" y="6" width="2.5" height="8" fill="#1ddd78" rx="1" style={{ animation: "eq1 0.6s ease-in-out infinite alternate" }} />
          <rect x="6" y="3" width="2.5" height="11" fill="#1ddd78" rx="1" style={{ animation: "eq2 0.5s ease-in-out infinite alternate" }} />
          <rect x="10" y="5" width="2.5" height="9" fill="#1ddd78" rx="1" style={{ animation: "eq3 0.7s ease-in-out infinite alternate" }} />
          <style>{`
            @keyframes eq1 { from{height:4px;y:10px} to{height:8px;y:6px} }
            @keyframes eq2 { from{height:6px;y:8px}  to{height:11px;y:3px} }
            @keyframes eq3 { from{height:3px;y:11px} to{height:9px;y:5px} }
          `}</style>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 3L6 11M6 11C6 12.1 5.1 13 4 13C2.9 13 2 12.1 2 11C2 9.9 2.9 9 4 9C4.7 9 5.3 9.4 5.7 9.9M6 3L14 1L14 9M14 9C14 10.1 13.1 11 12 11C10.9 11 10 10.1 10 9C10 7.9 10.9 7 12 7C12.7 7 13.3 7.4 13.7 7.9" stroke="rgba(240,234,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
