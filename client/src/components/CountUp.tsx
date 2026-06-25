import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { viewport } from '../lib/motion';

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function CountUp({ value, suffix = '', duration = 1.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, viewport);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);

      if (current !== start) {
        start = current;
        setCount(current);
      }

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
