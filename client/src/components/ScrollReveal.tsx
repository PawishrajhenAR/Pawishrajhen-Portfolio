import { motion, type HTMLMotionProps } from 'framer-motion';
import { revealVariants, type RevealVariant, viewport } from '../lib/motion';

type ScrollRevealProps = HTMLMotionProps<'div'> & {
  variant?: RevealVariant;
  delay?: number;
  eager?: boolean;
};

export function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  eager = false,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={eager ? { once: true, amount: 0.05 } : viewport}
      variants={revealVariants[variant]}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStagger({
  children,
  stagger = 0.1,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Reveal each word in a line — great for headings */
export function TextReveal({
  text,
  className,
  as: Tag = 'span',
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  stagger?: number;
}) {
  const words = text.split(' ');

  return (
    <Tag className={className}>
      <motion.span
        className="inline-flex flex-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger } },
        }}
        aria-label={text}
      >
        {words.map((word, i) => (
          <span key={i} className="mr-[0.28em] inline-block overflow-hidden pb-1">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '110%', opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              aria-hidden
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

// Backwards-compatible alias
export { ScrollReveal as Reveal };
