import { Position, Direction, Ghost, GhostName, PacMan } from './types';
import { MAZE_WIDTH, MAZE_HEIGHT } from './types';
import { isValidMove, getGhostHousePosition } from './maze';
import type { CellType } from './types';

const DIRECTIONS: Direction[] = ['up', 'down', 'left', 'right'];
const OPPOSITE: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
  none: 'none',
};

function getManhattanDistance(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function getTargetForScatter(ghostName: GhostName): Position {
  switch (ghostName) {
    case 'blinky': return { x: MAZE_WIDTH - 2, y: 0 };
    case 'pinky': return { x: 1, y: 0 };
    case 'inky': return { x: MAZE_WIDTH - 2, y: MAZE_HEIGHT - 2 };
    case 'clyde': return { x: 1, y: MAZE_HEIGHT - 2 };
  }
}

function getTargetForChase(
  ghostName: GhostName,
  pacman: PacMan,
  blinkyPos: Position,
  ghostPos: Position
): Position {
  const pacTile = { x: Math.round(pacman.x), y: Math.round(pacman.y) };

  switch (ghostName) {
    case 'blinky':
      return pacTile;

    case 'pinky': {
      let targetX = pacTile.x;
      let targetY = pacTile.y;
      switch (pacman.direction) {
        case 'up': targetY -= 4; targetX -= 4; break;
        case 'down': targetY += 4; break;
        case 'left': targetX -= 4; break;
        case 'right': targetX += 4; break;
      }
      return { x: Math.max(0, Math.min(MAZE_WIDTH - 1, targetX)), y: Math.max(0, Math.min(MAZE_HEIGHT - 1, targetY)) };
    }

    case 'inky': {
      let pivotX = pacTile.x;
      let pivotY = pacTile.y;
      switch (pacman.direction) {
        case 'up': pivotY -= 2; pivotX -= 2; break;
        case 'down': pivotY += 2; break;
        case 'left': pivotX -= 2; break;
        case 'right': pivotX += 2; break;
      }
      const targetX = pivotX + (pivotX - blinkyPos.x);
      const targetY = pivotY + (pivotY - blinkyPos.y);
      return { x: Math.max(0, Math.min(MAZE_WIDTH - 1, targetX)), y: Math.max(0, Math.min(MAZE_HEIGHT - 1, targetY)) };
    }

    case 'clyde': {
      const dist = Math.sqrt((pacTile.x - ghostPos.x) ** 2 + (pacTile.y - ghostPos.y) ** 2);
      if (dist > 8) {
        return pacTile;
      } else {
        return getTargetForScatter('clyde');
      }
    }
  }
}

function getValidDirections(
  ghost: Ghost,
  maze: CellType[][]
): Direction[] {
  const gx = Math.round(ghost.x);
  const gy = Math.round(ghost.y);
  const valid: Direction[] = [];

  for (const dir of DIRECTIONS) {
    if (dir === OPPOSITE[ghost.direction]) continue;

    let nx = gx;
    let ny = gy;
    switch (dir) {
      case 'up': ny--; break;
      case 'down': ny++; break;
      case 'left': nx--; break;
      case 'right': nx++; break;
    }

    if (nx < 0) nx = MAZE_WIDTH - 1;
    if (nx >= MAZE_WIDTH) nx = 0;

    if (isValidMove(maze, nx, ny, true)) {
      const cell = maze[ny]?.[nx];
      if (ghost.mode === 'eaten' && cell === 'ghostHouseDoor') {
        valid.push(dir);
      } else if (ghost.mode !== 'eaten' && cell === 'ghostHouseDoor') {
        continue;
      } else {
        valid.push(dir);
      }
    }
  }

  if (valid.length === 0) {
    valid.push(OPPOSITE[ghost.direction]);
  }

  return valid;
}

function chooseDirection(
  ghost: Ghost,
  target: Position,
  maze: CellType[][]
): Direction {
  const validDirs = getValidDirections(ghost, maze);
  if (validDirs.length === 1) return validDirs[0];

  let bestDir: Direction = validDirs[0];
  let bestDist = Infinity;

  for (const dir of validDirs) {
    let nx = Math.round(ghost.x);
    let ny = Math.round(ghost.y);
    switch (dir) {
      case 'up': ny--; break;
      case 'down': ny++; break;
      case 'left': nx--; break;
      case 'right': nx++; break;
    }

    if (nx < 0) nx = MAZE_WIDTH - 1;
    if (nx >= MAZE_WIDTH) nx = 0;

    const dist = getManhattanDistance({ x: nx, y: ny }, target);

    if (ghost.mode === 'frightened') {
      const randDist = Math.random() * 100;
      if (randDist < bestDist) {
        bestDist = randDist;
        bestDir = dir;
      }
    } else {
      if (dist < bestDist) {
        bestDist = dist;
        bestDir = dir;
      }
    }
  }

  return bestDir;
}

export function updateGhostAI(
  ghost: Ghost,
  pacman: PacMan,
  blinkyPos: Position,
  maze: CellType[][],
  globalMode: 'scatter' | 'chase',
  frightenedTimer: number
): Ghost {
  const newGhost = { ...ghost };
  const currentMode = ghost.mode;

  // Update mode based on conditions
  if (currentMode === 'eaten') {
    const housePos = getGhostHousePosition();
    if (Math.abs(newGhost.x - housePos.x) < 0.5 && Math.abs(newGhost.y - housePos.y) < 0.5) {
      newGhost.mode = 'house';
      newGhost.houseTimer = 2000;
    }
  } else if (currentMode === 'house') {
    newGhost.houseTimer -= 16;
    if (newGhost.houseTimer <= 0) {
      newGhost.mode = globalMode;
      newGhost.x = 13;
      newGhost.y = 11;
    }
  } else {
    // scatter/chase/frightened modes
    if (frightenedTimer > 0) {
      newGhost.mode = 'frightened';
    } else {
      newGhost.mode = globalMode;
    }
  }

  // Compute tile position after mode updates (teleport may have occurred)
  const gx = Math.round(newGhost.x);
  const gy = Math.round(newGhost.y);

  // Handle tunnel slowdown
  const inTunnel = maze[gy]?.[gx] === 'tunnel';
  const baseSpeed = inTunnel ? newGhost.speed * 0.5 : newGhost.speed;

  // Determine target
  let target: Position;
  if (newGhost.mode === 'scatter') {
    target = getTargetForScatter(newGhost.name);
  } else if (newGhost.mode === 'chase') {
    target = getTargetForChase(newGhost.name, pacman, blinkyPos, { x: newGhost.x, y: newGhost.y });
  } else if (newGhost.mode === 'frightened') {
    target = { x: Math.floor(Math.random() * MAZE_WIDTH), y: Math.floor(Math.random() * MAZE_HEIGHT) };
  } else if (newGhost.mode === 'eaten') {
    target = getGhostHousePosition();
  } else {
    target = getTargetForScatter(newGhost.name);
  }

  newGhost.targetTile = target;

  // Check if at intersection (center of tile)
  const atCenter = Math.abs(newGhost.x - gx) < 0.1 && Math.abs(newGhost.y - gy) < 0.1;

  if (atCenter) {
    const newDir = chooseDirection(newGhost, target, maze);
    newGhost.direction = newDir;
  }

  // Move ghost
  let moveSpeed = baseSpeed;
  if (newGhost.mode === 'frightened') moveSpeed *= 0.5;
  if (newGhost.mode === 'eaten') moveSpeed *= 1.5;

  let newX = newGhost.x;
  let newY = newGhost.y;

  switch (newGhost.direction) {
    case 'up': newY -= moveSpeed; break;
    case 'down': newY += moveSpeed; break;
    case 'left': newX -= moveSpeed; break;
    case 'right': newX += moveSpeed; break;
  }

  // Tunnel wrap
  if (newX < -0.5) newX = MAZE_WIDTH - 0.5;
  if (newX > MAZE_WIDTH - 0.5) newX = -0.5;

  newGhost.x = newX;
  newGhost.y = newY;

  return newGhost;
}

export function createGhost(name: GhostName, x: number, y: number): Ghost {
  const colors: Record<GhostName, string> = {
    blinky: '#FF0000',
    pinky: '#FFB8FF',
    inky: '#00FFFF',
    clyde: '#FFB852',
  };

  const scatterTargets: Record<GhostName, Position> = {
    blinky: { x: MAZE_WIDTH - 2, y: 0 },
    pinky: { x: 1, y: 0 },
    inky: { x: MAZE_WIDTH - 2, y: MAZE_HEIGHT - 2 },
    clyde: { x: 1, y: MAZE_HEIGHT - 2 },
  };

  return {
    name,
    x,
    y,
    direction: 'up',
    nextDirection: 'up',
    speed: 0.075,
    mode: name === 'blinky' ? 'scatter' : 'house',
    modeTimer: 0,
    frightenedTimer: 0,
    eatenTimer: 0,
    houseTimer: name === 'blinky' ? 0 : name === 'pinky' ? 1000 : name === 'inky' ? 3000 : 5000,
    targetTile: scatterTargets[name],
    scatterTarget: scatterTargets[name],
    color: colors[name],
    eyesColor: '#FFFFFF',
    dotCounter: 0,
    releaseDotLimit: 0,
  };
}
