import { CellType, MAZE_WIDTH, MAZE_HEIGHT } from './types';

// Maze encoding: 0=empty, 1=wall, 2=dot, 3=powerPellet, 4=ghostHouseDoor, 5=ghostHouse, 6=fruitSpawn, 7=tunnel
const MAZE_LAYOUT: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,1,1,1,4,4,1,1,1,0,1,1,2,1,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,1,5,5,5,5,5,5,1,0,1,1,2,1,1,1,1,1,1],
  [7,0,0,0,0,0,2,0,0,0,1,5,5,5,5,5,5,1,0,0,0,2,0,0,0,0,0,7],
  [1,1,1,1,1,1,2,1,1,0,1,5,5,5,5,5,5,1,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,3,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

export function getMaze(): CellType[][] {
  const maze: CellType[][] = [];
  for (let y = 0; y < MAZE_HEIGHT; y++) {
    const row: CellType[] = [];
    for (let x = 0; x < MAZE_WIDTH; x++) {
      const cell = MAZE_LAYOUT[y][x];
      switch (cell) {
        case 0: row.push('empty'); break;
        case 1: row.push('wall'); break;
        case 2: row.push('dot'); break;
        case 3: row.push('powerPellet'); break;
        case 4: row.push('ghostHouseDoor'); break;
        case 5: row.push('ghostHouse'); break;
        case 6: row.push('fruitSpawn'); break;
        case 7: row.push('tunnel'); break;
        default: row.push('empty');
      }
    }
    maze.push(row);
  }
  return maze;
}

export function countDots(maze: CellType[][]): { dots: number; powerPellets: number } {
  let dots = 0;
  let powerPellets = 0;
  for (let y = 0; y < MAZE_HEIGHT; y++) {
    for (let x = 0; x < MAZE_WIDTH; x++) {
      if (maze[y][x] === 'dot') dots++;
      if (maze[y][x] === 'powerPellet') powerPellets++;
    }
  }
  return { dots, powerPellets };
}

export function isWall(maze: CellType[][], x: number, y: number): boolean {
  if (x < 0 || x >= MAZE_WIDTH || y < 0 || y >= MAZE_HEIGHT) return true;
  const cell = maze[y][x];
  return cell === 'wall' || cell === 'ghostHouseDoor';
}

export function isGhostHouse(maze: CellType[][], x: number, y: number): boolean {
  if (x < 0 || x >= MAZE_WIDTH || y < 0 || y >= MAZE_HEIGHT) return false;
  return maze[y][x] === 'ghostHouse';
}

export function isValidMove(maze: CellType[][], x: number, y: number, isGhost: boolean = false): boolean {
  if (y < 0 || y >= MAZE_HEIGHT) return false;
  if (x < 0) return maze[y][MAZE_WIDTH - 1] !== 'wall';
  if (x >= MAZE_WIDTH) return maze[y][0] !== 'wall';
  const cell = maze[y][x];
  if (cell === 'wall') return false;
  if (cell === 'ghostHouseDoor' && !isGhost) return false;
  return true;
}

export function getFruitSpawnPosition(): { x: number; y: number } {
  return { x: 13, y: 23 };
}

export function getGhostHousePosition(): { x: number; y: number } {
  return { x: 13, y: 14 };
}

export function getGhostStartPositions(): Record<string, { x: number; y: number }> {
  return {
    blinky: { x: 13, y: 11 },
    pinky: { x: 13, y: 14 },
    inky: { x: 11, y: 14 },
    clyde: { x: 15, y: 14 },
  };
}

export function getPacManStartPosition(): { x: number; y: number } {
  return { x: 13, y: 23 };
}
