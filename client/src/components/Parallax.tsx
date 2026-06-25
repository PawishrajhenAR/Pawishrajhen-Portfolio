import { useScroll, useTransform, motion } from 'framer-motion';

type ParallaxProps = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

/** Moves children slower/faster than scroll for depth */
export function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * speed);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
