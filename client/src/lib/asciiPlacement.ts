import { ASCII_SLOT_IDS, type AsciiArt, type AsciiSlotId } from '../data/ascii/types';

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/** Pair shuffled arts with shuffled slots — new layout every page load. */
export function buildAsciiPlacement(arts: AsciiArt[]): Map<AsciiSlotId, AsciiArt> {
  const slots = shuffle([...ASCII_SLOT_IDS]);
  const pool = shuffle([...arts]);
  const count = Math.min(slots.length, pool.length);
  const placement = new Map<AsciiSlotId, AsciiArt>();

  for (let i = 0; i < count; i += 1) {
    placement.set(slots[i], pool[i]);
  }

  return placement;
}
