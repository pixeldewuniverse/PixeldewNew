"use client";
import { GameState } from './types';
import { useEffect, useRef } from 'react';

interface SoundVisualizerProps {
  gameState: GameState;
}

export function SoundVisualizer({ gameState }: SoundVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(gameState);

  stateRef.current = gameState;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const draw = () => {
      const state = stateRef.current;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barCount = 28;
      const barWidth = canvas.width / barCount;
      const time = Date.now();

      let activity = 0.3;
      if (state.frightenedTimer > 0) activity = 0.8;
      if (state.gameMode === 'dying') activity = 0.1;
      if (state.soundEvents.length > 0) activity = 0.9;

      for (let i = 0; i < barCount; i++) {
        const noise = Math.sin(time * 0.01 + i * 0.5) * 0.5 + 0.5;
        const height = noise * activity * canvas.height * 0.8 + canvas.height * 0.1;

        let hue = 145; // mint-ish default
        if (state.frightenedTimer > 0) hue = 240 + Math.sin(time * 0.005) * 60;
        else if (state.soundEvents.some(e => e.type === 'eatGhost')) hue = 120;
        else if (state.soundEvents.some(e => e.type === 'powerPellet')) hue = 145;
        else hue = 145 + i * 2;

        const gradient = ctx.createLinearGradient(0, canvas.height - height, 0, canvas.height);
        gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.9)`);
        gradient.addColorStop(1, `hsla(${hue}, 80%, 35%, 0.3)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(i * barWidth + 1, canvas.height - height, barWidth - 2, height);
        ctx.fillStyle = `hsla(${hue}, 80%, 70%, 0.6)`;
        ctx.fillRect(i * barWidth + 1, canvas.height - height, barWidth - 2, 2);
      }

      ctx.strokeStyle = state.frightenedTimer > 0 ? '#4a7aff' : '#1ddd78';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.1 + time * 0.01) * activity * 12;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={48}
      style={{ borderRadius: '3px', border: '1px solid rgba(29,221,120,0.15)', display: 'block' }}
    />
  );
}
