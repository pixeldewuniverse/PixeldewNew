export type CellType =
  | 'empty'
  | 'wall'
  | 'dot'
  | 'powerPellet'
  | 'ghostHouseDoor'
  | 'ghostHouse'
  | 'fruitSpawn'
  | 'tunnel';

export interface Position {
  x: number;
  y: number;
}

export interface Entity {
  x: number;
  y: number;
  direction: Direction;
  nextDirection: Direction;
  speed: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

export type GhostMode = 'scatter' | 'chase' | 'frightened' | 'eaten' | 'house';

export type GhostName = 'blinky' | 'pinky' | 'inky' | 'clyde';

export interface Ghost extends Entity {
  name: GhostName;
  mode: GhostMode;
  modeTimer: number;
  frightenedTimer: number;
  eatenTimer: number;
  houseTimer: number;
  targetTile: Position;
  scatterTarget: Position;
  color: string;
  eyesColor: string;
  dotCounter: number;
  releaseDotLimit: number;
}

export interface PacMan extends Entity {
  mouthAngle: number;
  mouthSpeed: number;
  mouthOpen: boolean;
  dying: boolean;
  dyingTimer: number;
  dyingFrame: number;
}

export type FruitType = 'cherry' | 'strawberry' | 'orange' | 'apple' | 'melon' | 'galaxian' | 'bell' | 'key';

export interface Fruit {
  x: number;
  y: number;
  type: FruitType;
  timer: number;
  visible: boolean;
  points: number;
}

export interface GameState {
  pacman: PacMan;
  ghosts: Ghost[];
  maze: CellType[][];
  dotsRemaining: number;
  powerPelletsRemaining: number;
  score: number;
  highScore: number;
  lives: number;
  level: number;
  fruit: Fruit | null;
  fruitSpawned: boolean;
  fruitSpawnCount: number;
  nextExtraLifeScore: number;
  gameMode: 'start' | 'playing' | 'dying' | 'levelComplete' | 'gameOver';
  modeTimer: number;
  globalMode: 'scatter' | 'chase';
  globalModeIndex: number;
  frightenedTimer: number;
  ghostsEatenInFrightened: number;
  soundEvents: SoundEvent[];
  freezeTimer: number;
  readyTimer: number;
}

export interface SoundEvent {
  id: number;
  type: 'waka' | 'eatGhost' | 'eatFruit' | 'powerPellet' | 'die' | 'extraLife' | 'intermission';
  x: number;
  y: number;
  timer: number;
  value?: number;
}

export const CELL_SIZE = 20;
export const MAZE_WIDTH = 28;
export const MAZE_HEIGHT = 31;

export const GHOST_COLORS: Record<GhostName, string> = {
  blinky: '#FF0000',
  pinky: '#FFB8FF',
  inky: '#00FFFF',
  clyde: '#FFB852',
};

export const GHOST_EYE_COLORS: Record<GhostName, string> = {
  blinky: '#FFFFFF',
  pinky: '#FFFFFF',
  inky: '#FFFFFF',
  clyde: '#FFFFFF',
};

export const FRUIT_DATA: Record<number, { type: FruitType; points: number; color: string }> = {
  1: { type: 'cherry', points: 100, color: '#FF0000' },
  2: { type: 'strawberry', points: 300, color: '#FF6B6B' },
  3: { type: 'orange', points: 500, color: '#FFA500' },
  4: { type: 'apple', points: 700, color: '#FF0000' },
  5: { type: 'melon', points: 1000, color: '#00FF00' },
  6: { type: 'galaxian', points: 2000, color: '#0000FF' },
  7: { type: 'bell', points: 3000, color: '#FFD700' },
  8: { type: 'key', points: 5000, color: '#00FFFF' },
};

export const MODE_TIMES = [
  { mode: 'scatter' as const, duration: 7000 },
  { mode: 'chase' as const, duration: 20000 },
  { mode: 'scatter' as const, duration: 7000 },
  { mode: 'chase' as const, duration: 20000 },
  { mode: 'scatter' as const, duration: 5000 },
  { mode: 'chase' as const, duration: 20000 },
  { mode: 'scatter' as const, duration: 5000 },
  { mode: 'chase' as const, duration: -1 },
];

export const FRIGHTENED_DURATION = 6000;
export const GHOST_EATEN_PAUSE = 500;
export const PACMAN_DIE_DURATION = 2000;
export const READY_DURATION = 2000;
export const LEVEL_COMPLETE_DURATION = 2000;
