import { asciiSlotSizes, type AsciiArtSize, type AsciiSlotId } from '../data/ascii/types';
import { useAsciiArt } from '../context/AsciiPlacementContext';

type AsciiSlotProps = {
  slot: AsciiSlotId;
  className?: string;
};

function resolveSize(artSize: AsciiArtSize | undefined, slot: AsciiSlotId): AsciiArtSize {
  return artSize ?? asciiSlotSizes[slot];
}

export function AsciiSlot({ slot, className = '' }: AsciiSlotProps) {
  const art = useAsciiArt(slot);
  if (!art) return null;

  const size = resolveSize(art.size, slot);

  return (
    <div className={`ascii-slot overflow-hidden ${className}`.trim()}>
      <pre className={`ascii-art ascii-art--${size}`} aria-hidden>
        {art.content}
      </pre>
    </div>
  );
}
