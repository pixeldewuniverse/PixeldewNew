"use client";
import { useState, useCallback, useRef, useEffect } from 'react';
import {
  GameState, Direction, SoundEvent,
  MODE_TIMES, FRIGHTENED_DURATION, PACMAN_DIE_DURATION,
  READY_DURATION, LEVEL_COMPLETE_DURATION, FRUIT_DATA,
  MAZE_WIDTH, MAZE_HEIGHT,
} from './types';
import { getMaze, countDots, isValidMove, getPacManStartPosition, getGhostStartPositions } from './maze';
import { updateGhostAI, createGhost } from './ghostAI';

const GHOST_EATEN_PAUSE = 500;
let soundIdCounter = 0;

function createInitialState(highScore = 0): GameState {
  const maze = getMaze();
  const { dots, powerPellets } = countDots(maze);
  const pacStart = getPacManStartPosition();
  const ghostStarts = getGhostStartPositions();

  return {
    pacman: {
      x: pacStart.x, y: pacStart.y,
      direction: 'left', nextDirection: 'left',
      speed: 0.11,
      mouthAngle: 0.3, mouthSpeed: 0.15, mouthOpen: true,
      dying: false, dyingTimer: 0, dyingFrame: 0,
    },
    ghosts: [
      createGhost('blinky', ghostStarts.blinky.x, ghostStarts.blinky.y),
      createGhost('pinky', ghostStarts.pinky.x, ghostStarts.pinky.y),
      createGhost('inky', ghostStarts.inky.x, ghostStarts.inky.y),
      createGhost('clyde', ghostStarts.clyde.x, ghostStarts.clyde.y),
    ],
    maze,
    dotsRemaining: dots,
    powerPelletsRemaining: powerPellets,
    score: 0, highScore,
    lives: 3, level: 1,
    fruit: null, fruitSpawned: false, fruitSpawnCount: 0,
    nextExtraLifeScore: 10000,
    gameMode: 'start',
    modeTimer: MODE_TIMES[0].duration,
    globalMode: 'scatter', globalModeIndex: 0,
    frightenedTimer: 0, ghostsEatenInFrightened: 0,
    soundEvents: [],
    freezeTimer: 0, readyTimer: READY_DURATION,
  };
}

function addSoundEvent(state: GameState, type: SoundEvent['type'], x: number, y: number, value?: number): GameState {
  return {
    ...state,
    soundEvents: [...state.soundEvents, { id: soundIdCounter++, type, x, y, timer: 600, value }],
  };
}

export function useGameEngine() {
  const [gameState, setGameState] = useState<GameState>(() => createInitialState());
  const gameStateRef = useRef(gameState);
  const keysPressed = useRef<Set<string>>(new Set());
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  gameStateRef.current = gameState;

  const resetLevel = useCallback((state: GameState, keepScore = true): GameState => {
    const maze = getMaze();
    const { dots, powerPellets } = countDots(maze);
    const pacStart = getPacManStartPosition();
    const ghostStarts = getGhostStartPositions();
    return {
      ...state,
      pacman: {
        x: pacStart.x, y: pacStart.y,
        direction: 'left', nextDirection: 'left',
        speed: 0.11,
        mouthAngle: 0.3, mouthSpeed: 0.15, mouthOpen: true,
        dying: false, dyingTimer: 0, dyingFrame: 0,
      },
      ghosts: [
        createGhost('blinky', ghostStarts.blinky.x, ghostStarts.blinky.y),
        createGhost('pinky', ghostStarts.pinky.x, ghostStarts.pinky.y),
        createGhost('inky', ghostStarts.inky.x, ghostStarts.inky.y),
        createGhost('clyde', ghostStarts.clyde.x, ghostStarts.clyde.y),
      ],
      maze, dotsRemaining: dots, powerPelletsRemaining: powerPellets,
      score: keepScore ? state.score : 0,
      highScore: keepScore ? state.highScore : 0,
      lives: keepScore ? state.lives : 3,
      level: keepScore ? state.level : 1,
      fruit: null, fruitSpawned: false, fruitSpawnCount: 0,
      nextExtraLifeScore: keepScore ? state.nextExtraLifeScore : 10000,
      gameMode: 'start',
      modeTimer: MODE_TIMES[0].duration,
      globalMode: 'scatter', globalModeIndex: 0,
      frightenedTimer: 0, ghostsEatenInFrightened: 0,
      soundEvents: [], freezeTimer: 0, readyTimer: READY_DURATION,
    };
  }, []);

  const nextLevel = useCallback((state: GameState): GameState => {
    const newState = resetLevel(state, true);
    return { ...newState, level: state.level + 1, score: state.score, highScore: Math.max(state.score, state.highScore), lives: state.lives, nextExtraLifeScore: state.nextExtraLifeScore, gameMode: 'start', readyTimer: READY_DURATION };
  }, [resetLevel]);

  const updateGame = useCallback((deltaTime: number) => {
    setGameState(prev => {
      let state = { ...prev };

      state.soundEvents = state.soundEvents.map(e => ({ ...e, timer: e.timer - deltaTime })).filter(e => e.timer > 0);

      if (state.freezeTimer > 0) { state.freezeTimer -= deltaTime; return state; }

      if (state.gameMode === 'start') {
        state.readyTimer -= deltaTime;
        if (state.readyTimer <= 0) state.gameMode = 'playing';
        return state;
      }

      if (state.gameMode === 'dying') {
        state.pacman.dyingTimer -= deltaTime;
        state.pacman.dyingFrame += deltaTime / 100;
        if (state.pacman.dyingTimer <= 0) {
          if (state.lives > 1) {
            const ghostStarts = getGhostStartPositions();
            const pacStart = getPacManStartPosition();
            state = { ...state, pacman: { x: pacStart.x, y: pacStart.y, direction: 'left', nextDirection: 'left', speed: 0.11, mouthAngle: 0.3, mouthSpeed: 0.15, mouthOpen: true, dying: false, dyingTimer: 0, dyingFrame: 0 }, ghosts: [createGhost('blinky', ghostStarts.blinky.x, ghostStarts.blinky.y), createGhost('pinky', ghostStarts.pinky.x, ghostStarts.pinky.y), createGhost('inky', ghostStarts.inky.x, ghostStarts.inky.y), createGhost('clyde', ghostStarts.clyde.x, ghostStarts.clyde.y)], lives: state.lives - 1, gameMode: 'start', readyTimer: READY_DURATION, modeTimer: MODE_TIMES[0].duration, globalMode: 'scatter', globalModeIndex: 0, frightenedTimer: 0, ghostsEatenInFrightened: 0, fruit: null, fruitSpawned: false };
          } else {
            state.gameMode = 'gameOver';
            state.highScore = Math.max(state.score, state.highScore);
          }
        }
        return state;
      }

      if (state.gameMode === 'levelComplete') {
        state.modeTimer -= deltaTime;
        if (state.modeTimer <= 0) state = nextLevel(state);
        return state;
      }

      if (state.gameMode === 'gameOver') return state;

      // === PLAYING ===
      state.modeTimer -= deltaTime;
      if (state.modeTimer <= 0 && state.globalModeIndex < MODE_TIMES.length - 1) {
        state.globalModeIndex++;
        const nextMode = MODE_TIMES[state.globalModeIndex];
        state.globalMode = nextMode.mode;
        state.modeTimer = nextMode.duration > 0 ? nextMode.duration : Infinity;
      }

      if (state.frightenedTimer > 0) {
        state.frightenedTimer -= deltaTime;
        if (state.frightenedTimer <= 0) state.ghostsEatenInFrightened = 0;
      }

      if (state.fruit) {
        state.fruit.timer -= deltaTime;
        if (state.fruit.timer <= 0) state.fruit = null;
      }

      const totalDots = state.dotsRemaining + state.powerPelletsRemaining;
      const initialCounts = countDots(getMaze());
      const initialDots = initialCounts.dots + initialCounts.powerPellets;
      const dotsEaten = initialDots - totalDots;
      const fruitThresholds = [70, 170];
      const nextThreshold = fruitThresholds[state.fruitSpawnCount];
      if (nextThreshold !== undefined && !state.fruit && dotsEaten >= nextThreshold) {
        const fruitData = FRUIT_DATA[Math.min(state.level, 8)];
        state.fruit = { x: 13, y: 23, type: fruitData.type, timer: 10000, visible: true, points: fruitData.points };
        state.fruitSpawnCount++;
      }

      const keys = keysPressed.current;
      let desiredDir: Direction = state.pacman.nextDirection;
      if (keys.has('ArrowUp') || keys.has('w')) desiredDir = 'up';
      else if (keys.has('ArrowDown') || keys.has('s')) desiredDir = 'down';
      else if (keys.has('ArrowLeft') || keys.has('a')) desiredDir = 'left';
      else if (keys.has('ArrowRight') || keys.has('d')) desiredDir = 'right';
      state.pacman.nextDirection = desiredDir;

      const pacTileX = Math.round(state.pacman.x);
      const pacTileY = Math.round(state.pacman.y);
      const atCenter = Math.abs(state.pacman.x - pacTileX) < 0.15 && Math.abs(state.pacman.y - pacTileY) < 0.15;

      if (atCenter && desiredDir !== state.pacman.direction && desiredDir !== 'none') {
        let testX = pacTileX; let testY = pacTileY;
        switch (desiredDir) {
          case 'up': testY--; break;
          case 'down': testY++; break;
          case 'left': testX--; break;
          case 'right': testX++; break;
        }
        if (isValidMove(state.maze, testX, testY)) {
          state.pacman.direction = desiredDir;
          state.pacman.x = pacTileX;
          state.pacman.y = pacTileY;
        }
      }

      let newPacX = state.pacman.x; let newPacY = state.pacman.y;
      switch (state.pacman.direction) {
        case 'up': newPacY -= state.pacman.speed; break;
        case 'down': newPacY += state.pacman.speed; break;
        case 'left': newPacX -= state.pacman.speed; break;
        case 'right': newPacX += state.pacman.speed; break;
      }

      if (!isValidMove(state.maze, Math.round(newPacX), Math.round(newPacY))) {
        newPacX = pacTileX; newPacY = pacTileY;
      }
      if (newPacX < -0.5) newPacX = MAZE_WIDTH - 0.5;
      if (newPacX > MAZE_WIDTH - 0.5) newPacX = -0.5;
      state.pacman.x = newPacX; state.pacman.y = newPacY;

      if (state.pacman.mouthOpen) {
        state.pacman.mouthAngle += state.pacman.mouthSpeed;
        if (state.pacman.mouthAngle >= 0.45) state.pacman.mouthOpen = false;
      } else {
        state.pacman.mouthAngle -= state.pacman.mouthSpeed;
        if (state.pacman.mouthAngle <= 0.05) state.pacman.mouthOpen = true;
      }

      const eatX = Math.round(state.pacman.x); const eatY = Math.round(state.pacman.y);
      if (eatX >= 0 && eatX < MAZE_WIDTH && eatY >= 0 && eatY < MAZE_HEIGHT) {
        const cell = state.maze[eatY][eatX];
        if (cell === 'dot') {
          state.maze[eatY][eatX] = 'empty'; state.dotsRemaining--; state.score += 10;
          if (state.score >= state.nextExtraLifeScore) { state.lives = Math.min(state.lives + 1, 5); state.nextExtraLifeScore += 10000; state = addSoundEvent(state, 'extraLife', eatX, eatY); }
          state = addSoundEvent(state, 'waka', eatX, eatY);
        } else if (cell === 'powerPellet') {
          state.maze[eatY][eatX] = 'empty'; state.powerPelletsRemaining--; state.score += 50;
          if (state.score >= state.nextExtraLifeScore) { state.lives = Math.min(state.lives + 1, 5); state.nextExtraLifeScore += 10000; state = addSoundEvent(state, 'extraLife', eatX, eatY); }
          state.frightenedTimer = FRIGHTENED_DURATION; state.ghostsEatenInFrightened = 0;
          state = addSoundEvent(state, 'powerPellet', eatX, eatY);
        }
      }

      const fruit = state.fruit;
      if (fruit) {
        const dist = Math.sqrt((state.pacman.x - fruit.x) ** 2 + (state.pacman.y - fruit.y) ** 2);
        if (dist < 0.8) {
          state.score += fruit.points;
          if (state.score >= state.nextExtraLifeScore) { state.lives = Math.min(state.lives + 1, 5); state.nextExtraLifeScore += 10000; state = addSoundEvent(state, 'extraLife', fruit.x, fruit.y); }
          state = addSoundEvent(state, 'eatFruit', fruit.x, fruit.y); state.fruit = null;
        }
      }

      const blinkyPos = { x: state.ghosts[0].x, y: state.ghosts[0].y };
      state.ghosts = state.ghosts.map(ghost => updateGhostAI(ghost, state.pacman, blinkyPos, state.maze, state.globalMode, state.frightenedTimer));

      for (let i = 0; i < state.ghosts.length; i++) {
        const ghost = state.ghosts[i];
        const dist = Math.sqrt((state.pacman.x - ghost.x) ** 2 + (state.pacman.y - ghost.y) ** 2);
        if (dist < 0.8) {
          if (ghost.mode === 'frightened') {
            const points = [200, 400, 800, 1600][state.ghostsEatenInFrightened] || 1600;
            state.score += points; state.ghostsEatenInFrightened++;
            state.ghosts[i] = { ...ghost, mode: 'eaten', eatenTimer: GHOST_EATEN_PAUSE };
            state.freezeTimer = GHOST_EATEN_PAUSE;
            state = addSoundEvent(state, 'eatGhost', ghost.x, ghost.y, points);
          } else if (ghost.mode !== 'eaten' && ghost.mode !== 'house') {
            state.pacman.dying = true; state.pacman.dyingTimer = PACMAN_DIE_DURATION;
            state.gameMode = 'dying';
            state = addSoundEvent(state, 'die', state.pacman.x, state.pacman.y);
            return state;
          }
        }
      }

      if (state.dotsRemaining === 0 && state.powerPelletsRemaining === 0) {
        state.gameMode = 'levelComplete'; state.modeTimer = LEVEL_COMPLETE_DURATION;
        state = addSoundEvent(state, 'intermission', 14, 15);
      }

      return state;
    });
  }, [nextLevel]);

  // Game loop
  useEffect(() => {
    const gameLoop = (timestamp: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
      const deltaTime = Math.min(timestamp - lastTimeRef.current, 50);
      lastTimeRef.current = timestamp;
      updateGame(deltaTime);
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [updateGame]);

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key);
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
    };
    const handleKeyUp = (e: KeyboardEvent) => keysPressed.current.delete(e.key);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const pressKey = useCallback((key: string) => {
    keysPressed.current.add(key);
    setTimeout(() => keysPressed.current.delete(key), 100);
  }, []);

  const startGame = useCallback(() => {
    setGameState(createInitialState(gameStateRef.current.highScore));
  }, []);

  const restartGame = useCallback(() => {
    setGameState(createInitialState(0));
  }, []);

  return { gameState, startGame, restartGame, pressKey };
}
