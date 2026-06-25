import { useEffect, useState } from 'react';
import PixelBlast from './PixelBlast';

const BLAST_BLACK = '#121110';
const BLAST_CREAM = '#e8dfd0';

export function Background() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{ background: `linear-gradient(160deg, ${BLAST_BLACK} 0%, #1c1916 50%, #2a2620 100%)` }}
        aria-hidden
      />
    );
  }

  return (
    <div className="fixed inset-0 -z-10" style={{ backgroundColor: BLAST_BLACK }} aria-hidden>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 45%, rgb(232 223 208 / 0.07) 0%, transparent 70%)',
        }}
      />
      <PixelBlast
        variant="circle"
        pixelSize={5}
        color={BLAST_CREAM}
        patternScale={2.6}
        patternDensity={0.95}
        pixelSizeJitter={0.35}
        enableRipples
        rippleSpeed={0.35}
        rippleThickness={0.14}
        rippleIntensityScale={1.8}
        liquid
        liquidStrength={0.1}
        liquidRadius={1.1}
        liquidWobbleSpeed={4.5}
        speed={0.45}
        edgeFade={0.12}
        transparent
      />
    </div>
  );
}
