"use client";
import { useRef, useEffect } from 'react';
import { GameState, CELL_SIZE, MAZE_WIDTH, MAZE_HEIGHT, FRUIT_DATA } from './types';

interface GameCanvasProps {
  gameState: GameState;
}

const CANVAS_WIDTH = MAZE_WIDTH * CELL_SIZE;
const CANVAS_HEIGHT = MAZE_HEIGHT * CELL_SIZE;

function drawMazeWalls(ctx: CanvasRenderingContext2D, maze: GameState['maze']) {
  for (let y = 0; y < MAZE_HEIGHT; y++) {
    for (let x = 0; x < MAZE_WIDTH; x++) {
      const cell = maze[y][x];
      const px = x * CELL_SIZE;
      const py = y * CELL_SIZE;

      if (cell === 'wall') {
        ctx.fillStyle = '#000080';
        ctx.fillRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        ctx.strokeStyle = '#2121DE';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        const hasUp = y > 0 && maze[y - 1][x] === 'wall';
        if (!hasUp) {
          ctx.strokeStyle = '#4D4DFF';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px + 2, py + 2);
          ctx.lineTo(px + CELL_SIZE - 2, py + 2);
          ctx.stroke();
        }
      } else if (cell === 'ghostHouseDoor') {
        ctx.strokeStyle = '#FFB8FF';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(px + 2, py + CELL_SIZE / 2 - 2);
        ctx.lineTo(px + CELL_SIZE - 2, py + CELL_SIZE / 2 - 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  }
}

function drawDots(ctx: CanvasRenderingContext2D, maze: GameState['maze'], time: number) {
  for (let y = 0; y < MAZE_HEIGHT; y++) {
    for (let x = 0; x < MAZE_WIDTH; x++) {
      const cell = maze[y][x];
      const cx = x * CELL_SIZE + CELL_SIZE / 2;
      const cy = y * CELL_SIZE + CELL_SIZE / 2;
      if (cell === 'dot') {
        ctx.fillStyle = '#FFB897';
        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (cell === 'powerPellet') {
        ctx.fillStyle = '#FFB897';
        const pulse = Math.sin(time / 200) * 2 + 6;
        ctx.beginPath();
        ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

function drawPacMan(ctx: CanvasRenderingContext2D, pacman: GameState['pacman']) {
  const cx = pacman.x * CELL_SIZE + CELL_SIZE / 2;
  const cy = pacman.y * CELL_SIZE + CELL_SIZE / 2;
  const radius = CELL_SIZE * 0.4;

  if (pacman.dying) {
    const progress = Math.min(pacman.dyingFrame / 20, 1);
    const mouthAngle = progress * Math.PI;
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, mouthAngle, Math.PI * 2 - mouthAngle);
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.fill();
    return;
  }

  let baseAngle = 0;
  switch (pacman.direction) {
    case 'right': baseAngle = 0; break;
    case 'down': baseAngle = Math.PI / 2; break;
    case 'left': baseAngle = Math.PI; break;
    case 'up': baseAngle = -Math.PI / 2; break;
  }

  ctx.fillStyle = '#FFFF00';
  ctx.beginPath();
  ctx.arc(cx, cy, radius, baseAngle + pacman.mouthAngle, baseAngle + Math.PI * 2 - pacman.mouthAngle);
  ctx.lineTo(cx, cy);
  ctx.closePath();
  ctx.fill();
}

function drawGhost(ctx: CanvasRenderingContext2D, ghost: GameState['ghosts'][0], time: number) {
  const cx = ghost.x * CELL_SIZE + CELL_SIZE / 2;
  const cy = ghost.y * CELL_SIZE + CELL_SIZE / 2;
  const size = CELL_SIZE * 0.4;

  let bodyColor = ghost.color;
  let eyeColor = ghost.eyesColor;

  if (ghost.mode === 'frightened') {
    const flash = time % 1000 < 500 || ghost.frightenedTimer > 2000;
    bodyColor = flash ? '#2121DE' : '#FFFFFF';
    eyeColor = flash ? '#FFFFFF' : '#FF0000';
  } else if (ghost.mode === 'eaten') {
    bodyColor = 'transparent';
    eyeColor = '#FFFFFF';
  }

  if (ghost.mode !== 'eaten') {
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(cx, cy - size * 0.2, size, Math.PI, 0);
    ctx.lineTo(cx + size, cy + size * 0.6);
    for (let i = 0; i < 3; i++) {
      const waveX = cx + size - (i + 1) * (size * 2 / 3);
      const waveY = cy + size * 0.6 + (i % 2 === 0 ? 3 : -3);
      ctx.lineTo(waveX + size / 3, waveY);
    }
    ctx.lineTo(cx - size, cy + size * 0.6);
    ctx.closePath();
    ctx.fill();
  }

  const eyeOffsetX = size * 0.25;
  const eyeOffsetY = -size * 0.15;
  const eyeRadius = size * 0.22;
  const pupilRadius = size * 0.1;

  ctx.fillStyle = eyeColor;
  ctx.beginPath(); ctx.arc(cx - eyeOffsetX, cy + eyeOffsetY, eyeRadius, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx + eyeOffsetX, cy + eyeOffsetY, eyeRadius, 0, Math.PI * 2); ctx.fill();

  let pupilOffsetX = 0, pupilOffsetY = 0;
  switch (ghost.direction) {
    case 'up': pupilOffsetY = -2; break;
    case 'down': pupilOffsetY = 2; break;
    case 'left': pupilOffsetX = -2; break;
    case 'right': pupilOffsetX = 2; break;
  }

  ctx.fillStyle = '#0000FF';
  ctx.beginPath(); ctx.arc(cx - eyeOffsetX + pupilOffsetX, cy + eyeOffsetY + pupilOffsetY, pupilRadius, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx + eyeOffsetX + pupilOffsetX, cy + eyeOffsetY + pupilOffsetY, pupilRadius, 0, Math.PI * 2); ctx.fill();
}

function drawFruit(ctx: CanvasRenderingContext2D, fruit: NonNullable<GameState['fruit']>) {
  const cx = fruit.x * CELL_SIZE + CELL_SIZE / 2;
  const cy = fruit.y * CELL_SIZE + CELL_SIZE / 2;
  let data = FRUIT_DATA[1];
  for (let i = 1; i <= 8; i++) { if (FRUIT_DATA[i].type === fruit.type) { data = FRUIT_DATA[i]; break; } }
  ctx.fillStyle = data.color;
  ctx.beginPath(); ctx.arc(cx - 3, cy + 2, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx + 3, cy + 2, 5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#00AA00'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx, cy - 2); ctx.lineTo(cx - 2, cy - 6); ctx.stroke();
}

function drawSoundEvents(ctx: CanvasRenderingContext2D, soundEvents: GameState['soundEvents']) {
  for (const event of soundEvents) {
    const cx = event.x * CELL_SIZE + CELL_SIZE / 2;
    const cy = event.y * CELL_SIZE + CELL_SIZE / 2;
    const progress = 1 - event.timer / 600;
    const alpha = 1 - progress;
    const size = progress * 40;
    ctx.save();
    ctx.globalAlpha = alpha;

    if (event.type === 'eatGhost') {
      const ghostPoints = event.value || 200;
      ctx.fillStyle = '#00FF00';
      ctx.font = `${Math.floor(size)}px monospace`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(ghostPoints.toString(), cx, cy - size * 0.3);
    } else if (event.type === 'eatFruit') {
      ctx.fillStyle = '#FF00FF';
      ctx.font = `${Math.floor(size)}px monospace`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('100', cx, cy - size * 0.3);
    } else if (event.type === 'die') {
      ctx.strokeStyle = '#FFFF00'; ctx.lineWidth = 2;
      for (let i = 0; i < 12; i++) {
        const angle = i * Math.PI / 6;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(angle) * size * 0.8, cy + Math.sin(angle) * size * 0.8); ctx.stroke();
      }
    } else if (event.type === 'extraLife') {
      ctx.fillStyle = '#00FF00';
      ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('1UP', cx, cy);
    }

    ctx.restore();
  }
}

export function GameCanvas({ gameState }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef(gameState);
  const animFrameRef = useRef<number>(0);

  gameStateRef.current = gameState;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const state = gameStateRef.current;
      const time = Date.now();

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawMazeWalls(ctx, state.maze);
      drawDots(ctx, state.maze, time);
      if (state.fruit) drawFruit(ctx, state.fruit);
      if (state.gameMode !== 'gameOver') drawPacMan(ctx, state.pacman);
      for (const ghost of state.ghosts) drawGhost(ctx, ghost, time);
      drawSoundEvents(ctx, state.soundEvents);

      if (state.gameMode === 'start') {
        const textY = 18 * CELL_SIZE + CELL_SIZE / 2;
        ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(CANVAS_WIDTH / 2 - 60, textY - 18, 120, 36);
        ctx.fillStyle = '#FFFF00'; ctx.font = 'bold 20px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('READY!', CANVAS_WIDTH / 2, textY);
      }
      if (state.gameMode === 'gameOver') {
        const textY = 18 * CELL_SIZE + CELL_SIZE / 2;
        ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(CANVAS_WIDTH / 2 - 80, textY - 22, 160, 44);
        ctx.fillStyle = '#FF0000'; ctx.font = 'bold 24px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, textY);
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{
        border: '3px solid rgba(29,221,120,0.25)',
        borderRadius: '4px',
        display: 'block',
        imageRendering: 'pixelated',
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}
