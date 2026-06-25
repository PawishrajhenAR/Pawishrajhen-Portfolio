import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { asciiArts } from '../data/ascii';
import type { AsciiArt, AsciiSlotId } from '../data/ascii/types';
import { buildAsciiPlacement } from '../lib/asciiPlacement';

const AsciiPlacementContext = createContext<Map<AsciiSlotId, AsciiArt> | null>(null);

export function AsciiPlacementProvider({ children }: { children: ReactNode }) {
  const placement = useMemo(() => buildAsciiPlacement(asciiArts), []);

  return (
    <AsciiPlacementContext.Provider value={placement}>{children}</AsciiPlacementContext.Provider>
  );
}

export function useAsciiArt(slot: AsciiSlotId): AsciiArt | undefined {
  const placement = useContext(AsciiPlacementContext);
  if (!placement) return undefined;
  return placement.get(slot);
}
