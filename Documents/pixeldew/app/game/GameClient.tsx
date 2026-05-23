"use client";
import { useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useGameEngine } from '@/components/game/useGameEngine';
import { ScoreBoard } from '@/components/game/ScoreBoard';
import { SoundVisualizer } from '@/components/game/SoundVisualizer';

const GameCanvas = dynamic(
  () => import('@/components/game/GameCanvas').then(m => ({ default: m.GameCanvas })),
  { ssr: false }
);

const GHOST_INFO = [
  { name: 'Blinky', color: '#FF0000', desc: 'Direct Chase' },
  { name: 'Pinky',  color: '#FFB8FF', desc: 'Ambush' },
  { name: 'Inky',   color: '#00FFFF', desc: 'Flank' },
  { name: 'Clyde',  color: '#FFB852', desc: 'Random' },
];

export default function GameClient() {
  const { gameState, startGame, restartGame, pressKey } = useGameEngine();

  const handleDpad = useCallback((dir: 'up' | 'down' | 'left' | 'right') => {
    const map = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight' };
    pressKey(map[dir]);
  }, [pressKey]);

  const isOver = gameState.gameMode === 'gameOver';
  const isStart = gameState.gameMode === 'start' && gameState.score === 0 && gameState.lives === 3;

  return (
    <main style={{ background: 'var(--bg, #080012)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '80px', paddingBottom: '80px' }}>

      {/* Back button */}
      <div style={{ width: '100%', maxWidth: '600px', padding: '0 16px', marginBottom: '32px' }}>
        <Link
          href="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: 500, cursor: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--mint)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'; }}
        >
          ← Back to Portfolio
        </Link>
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="t-label" style={{ color: 'rgba(29,221,120,0.4)', marginBottom: '12px' }}>PixelDew Game</div>
        <h1 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 'clamp(20px,4vw,32px)', color: 'var(--mint)', textShadow: '0 0 24px rgba(29,221,120,0.5)', letterSpacing: '0.05em', marginBottom: '4px' }}>
          PIXEL<span style={{ color: '#0ecfdf' }}>PAC</span>
        </h1>
        <p className="t-small" style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Pac-Man clone — TypeScript + Canvas
        </p>
      </div>

      {/* Game container */}
      <div style={{ width: '100%', maxWidth: '600px', padding: '0 16px' }}>

        {/* ScoreBoard */}
        <div style={{ background: 'rgba(8,0,18,0.95)', border: '1px solid rgba(29,221,120,0.15)', borderRadius: '8px 8px 0 0', overflow: 'hidden', marginBottom: 0 }}>
          <ScoreBoard gameState={gameState} />
        </div>

        {/* Canvas */}
        <div style={{ position: 'relative', background: '#000', border: '1px solid rgba(29,221,120,0.15)', borderTop: 'none', borderBottom: 'none', display: 'flex', justifyContent: 'center' }}>
          <GameCanvas gameState={gameState} />

          {/* Overlay: start screen */}
          {isStart && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(8,0,18,0.85)', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '20px', color: 'var(--mint)', textShadow: '0 0 20px rgba(29,221,120,0.6)', marginBottom: '8px' }}>PIXELPAC</div>
                <div className="t-small" style={{ color: 'var(--text-muted)' }}>Classic Arcade • Ghost AI • Power Pellets</div>
              </div>
              <button
                onClick={startGame}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px', background: 'linear-gradient(135deg, var(--mint), var(--cyan))', color: '#050010', fontFamily: '"Press Start 2P", monospace', fontSize: '10px', fontWeight: 700, border: 'none', borderRadius: '6px', cursor: 'none', boxShadow: '0 0 24px rgba(29,221,120,0.3)', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(29,221,120,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 24px rgba(29,221,120,0.3)'; }}
              >
                ▶ START
              </button>
              <div className="t-small" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: '"Press Start 2P", monospace', fontSize: '7px', animation: 'tw-blink 1.2s step-end infinite' }}>
                INSERT COIN
              </div>
            </div>
          )}

          {/* Overlay: game over */}
          {isOver && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(8,0,18,0.88)', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '18px', color: '#e02cb8', textShadow: '0 0 20px rgba(224,44,184,0.5)', marginBottom: '16px' }}>GAME OVER</div>
                <div className="t-small" style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Score: <span style={{ color: 'var(--mint)' }}>{gameState.score}</span></div>
                <div className="t-small" style={{ color: 'var(--text-muted)' }}>High Score: <span style={{ color: '#0ecfdf' }}>{gameState.highScore}</span></div>
              </div>
              <button
                onClick={restartGame}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px', background: 'linear-gradient(135deg, #e02cb8, var(--cyan))', color: '#050010', fontFamily: '"Press Start 2P", monospace', fontSize: '10px', fontWeight: 700, border: 'none', borderRadius: '6px', cursor: 'none' }}
              >
                ↺ PLAY AGAIN
              </button>
            </div>
          )}
        </div>

        {/* Sound visualizer */}
        <div style={{ background: 'rgba(8,0,18,0.95)', border: '1px solid rgba(29,221,120,0.15)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '6px', color: 'rgba(29,221,120,0.35)', letterSpacing: '0.2em', flexShrink: 0 }}>SFX</span>
          <SoundVisualizer gameState={gameState} />
        </div>
      </div>

      {/* Mobile D-Pad */}
      <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <div className="t-label" style={{ color: 'rgba(29,221,120,0.3)', marginBottom: '12px', fontSize: '7px' }}>TOUCH CONTROLS</div>
        <button onClick={() => handleDpad('up')} style={dpadBtn}>▲</button>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button onClick={() => handleDpad('left')} style={dpadBtn}>◄</button>
          <div style={{ width: '52px', height: '52px', background: 'rgba(29,221,120,0.05)', border: '1px solid rgba(29,221,120,0.1)', borderRadius: '6px' }} />
          <button onClick={() => handleDpad('right')} style={dpadBtn}>►</button>
        </div>
        <button onClick={() => handleDpad('down')} style={dpadBtn}>▼</button>
      </div>

      {/* Controls info */}
      <div style={{ marginTop: '32px', textAlign: 'center', maxWidth: '560px', padding: '0 16px' }}>
        <div className="t-small" style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Keyboard: <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '3px', color: 'var(--text-dim)' }}>WASD</code> or <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '3px', color: 'var(--text-dim)' }}>Arrow Keys</code>
        </div>

        {/* Ghost AI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {GHOST_INFO.map((g) => (
            <div key={g.name} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: g.color, boxShadow: `0 0 8px ${g.color}66` }} />
              <div className="t-label" style={{ color: g.color, fontSize: '6px' }}>{g.name}</div>
              <div className="t-small" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{g.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const dpadBtn: React.CSSProperties = {
  width: '52px',
  height: '52px',
  background: 'rgba(29,221,120,0.06)',
  border: '1px solid rgba(29,221,120,0.2)',
  borderRadius: '6px',
  color: 'var(--mint)',
  fontSize: '18px',
  cursor: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  transition: 'background 0.1s, box-shadow 0.1s',
  fontFamily: 'monospace',
};
