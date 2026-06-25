import { motion } from 'framer-motion';
import { blurUp, fadeIn, lineGrow, staggerContainer, viewport, type RevealVariant, revealVariants } from '../lib/motion';

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  index?: string;
  titleVariant?: RevealVariant;
};

export function SectionHeader({
  label,
  title,
  description,
  index,
  titleVariant = 'clip',
}: SectionHeaderProps) {
  return (
    <motion.div
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.12)}
    >
      {index && (
        <motion.span
          variants={fadeIn}
          className="absolute -left-2 -top-8 hidden font-display text-8xl font-light text-cream-deep lg:block"
          aria-hidden
        >
          {index}
        </motion.span>
      )}
      <motion.p variants={blurUp} className="section-label">
        {label}
      </motion.p>
      <motion.h2 variants={revealVariants[titleVariant]} className="section-title">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={blurUp} className="mt-6 max-w-xl text-ink-soft">
          {description}
        </motion.p>
      )}
      <motion.div variants={lineGrow} className="mt-8 h-px w-24 origin-left bg-accent" />
    </motion.div>
  );
}
