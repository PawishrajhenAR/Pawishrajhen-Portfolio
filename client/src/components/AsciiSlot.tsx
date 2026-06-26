import { useLayoutEffect, useRef } from 'react';
import { asciiSlotSizes, type AsciiArtSize, type AsciiSlotId } from '../data/ascii/types';
import { useAsciiArt } from '../context/AsciiPlacementContext';

type AsciiSlotProps = {
  slot: AsciiSlotId;
  className?: string;
  /** Scale art down to fit the slot container (hero sidebar). */
  fit?: boolean;
};

function resolveSize(artSize: AsciiArtSize | undefined, slot: AsciiSlotId): AsciiArtSize {
  return artSize ?? asciiSlotSizes[slot];
}

export function AsciiSlot({ slot, className = '', fit = false }: AsciiSlotProps) {
  const art = useAsciiArt(slot);
  const slotRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useLayoutEffect(() => {
    if (!fit) return;

    const slotEl = slotRef.current;
    const preEl = preRef.current;
    if (!slotEl || !preEl) return;

    const fitArt = () => {
      preEl.style.transform = 'none';
      preEl.style.marginBottom = '0';

      const styles = getComputedStyle(slotEl);
      const maxH =
        parseFloat(styles.height) ||
        parseFloat(styles.maxHeight) ||
        slotEl.clientHeight;
      const maxW = slotEl.clientWidth;
      if (maxH <= 0 || maxW <= 0) return;

      const scale = Math.min(1, maxH / preEl.scrollHeight, maxW / preEl.scrollWidth);
      preEl.style.transform = `scale(${scale})`;
      preEl.style.transformOrigin = 'top center';
      preEl.style.marginBottom = `${preEl.scrollHeight * (scale - 1)}px`;
    };

    fitArt();
    const observer = new ResizeObserver(fitArt);
    observer.observe(slotEl);
    return () => observer.disconnect();
  }, [fit, art?.content]);

  if (!art) return null;

  const size = resolveSize(art.size, slot);

  return (
    <div
      ref={slotRef}
      className={`ascii-slot overflow-hidden ${fit ? 'ascii-slot--fit' : ''} ${className}`.trim()}
    >
      <pre ref={preRef} className={`ascii-art ascii-art--${size}`} aria-hidden>
        {art.content}
      </pre>
    </div>
  );
}
