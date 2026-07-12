import { motion } from 'framer-motion';
import { stats } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { blurUp, staggerContainer, viewport } from '../lib/motion';
import { CountUp } from './CountUp';

export function Stats() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section className="border-y border-border bg-surface/70">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center px-4 py-12 text-center sm:py-16"
            >
              <p className="font-display text-4xl font-medium text-ink sm:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-border bg-surface/70">
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border sm:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer(0.15)}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={blurUp}
            className="flex flex-col items-center justify-center px-4 py-12 text-center sm:py-16"
          >
            <p className="font-display text-4xl font-medium text-ink sm:text-5xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
