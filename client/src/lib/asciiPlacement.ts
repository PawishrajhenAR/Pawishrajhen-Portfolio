import { ASCII_SLOT_IDS, type AsciiArt, type AsciiSlotId } from '../data/ascii/types';

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/** Pair shuffled arts with shuffled slots — one piece per slot, new layout every page load. */
export function buildAsciiPlacement(arts: AsciiArt[]): Map<AsciiSlotId, AsciiArt> {
  if (arts.length === 0) return new Map();

  const slots = shuffle([...ASCII_SLOT_IDS]);
  const pool = shuffle([...arts]);
  const placement = new Map<AsciiSlotId, AsciiArt>();

  for (let i = 0; i < slots.length; i += 1) {
    placement.set(slots[i], pool[i % pool.length]);
  }

  return placement;
}
