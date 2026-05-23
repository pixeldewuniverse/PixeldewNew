import type { Metadata } from 'next';
import GameClient from './GameClient';

export const metadata: Metadata = {
  title: 'PixelPac — Game',
  description: 'A Pac-Man clone built with TypeScript & Canvas, embedded in the PixelDew portfolio.',
};

export default function GamePage() {
  return <GameClient />;
}
