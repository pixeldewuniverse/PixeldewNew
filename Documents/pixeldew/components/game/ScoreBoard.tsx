"use client";
import { GameState, FRUIT_DATA } from './types';

interface ScoreBoardProps {
  gameState: GameState;
}

export function ScoreBoard({ gameState }: ScoreBoardProps) {
  const fruitData = FRUIT_DATA[Math.min(gameState.level, 8)];
  const isFrightened = gameState.frightenedTimer > 0;
  const modeText = isFrightened ? 'FRIGHTENED' : gameState.globalMode.toUpperCase();
  const modeColor = isFrightened ? '#4a7aff' : gameState.globalMode === 'chase' ? '#e02cb8' : '#1ddd78';

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 16px', background: 'rgba(8,0,18,0.95)', borderBottom: '1px solid rgba(29,221,120,0.15)' }}>
      {/* Scores */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: '#1ddd78', letterSpacing: '0.15em' }}>1UP</span>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '16px', color: '#fff', fontWeight: 700 }}>{gameState.score.toString().padStart(6, '0')}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: '#e02cb8', letterSpacing: '0.15em' }}>HIGH</span>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '16px', color: '#fff', fontWeight: 700 }}>{gameState.highScore.toString().padStart(6, '0')}</span>
        </div>
      </div>

      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Mode badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '3px 8px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${modeColor}30`, borderRadius: '4px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: modeColor, boxShadow: `0 0 5px ${modeColor}` }} />
          <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '6px', color: modeColor }}>{modeText}</span>
        </div>

        {/* Level */}
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
          L<span style={{ color: '#1ddd78' }}>{gameState.level}</span>
        </span>

        {/* Lives */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          {Array.from({ length: gameState.lives }).map((_, i) => (
            <span key={i} style={{ display: 'inline-block', width: '10px', height: '10px', background: '#FFFF00', borderRadius: '50%', boxShadow: '0 0 4px rgba(255,255,0,0.5)' }} />
          ))}
        </div>

        {/* Fruit */}
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: fruitData.color, boxShadow: `0 0 6px ${fruitData.color}` }} />
      </div>
    </div>
  );
}
