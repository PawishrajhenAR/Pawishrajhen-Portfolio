import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, (v) => v);

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[1px] origin-left bg-rust/70 will-change-transform"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
