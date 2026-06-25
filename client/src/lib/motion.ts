import type { Variants } from 'framer-motion';

export const ease = [0.22, 1, 0.36, 1] as const;
export const easeOut = [0.16, 1, 0.3, 1] as const;

export const viewport = { once: true, amount: 0.2 as const };
export const viewportEager = { once: true, amount: 0.05 as const };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease },
  },
};

export const blurUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: easeOut },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease },
  },
};

export const clipUp: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 1, ease: easeOut },
  },
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -4, y: 24 },
  visible: {
    opacity: 1,
    rotate: 0,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export const lineGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1, ease },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '110%', rotate: 2 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export type RevealVariant =
  | 'fadeUp'
  | 'blurUp'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'clip'
  | 'rotate'
  | 'fadeIn';

export const revealVariants: Record<RevealVariant, Variants> = {
  fadeUp,
  blurUp,
  slideLeft: slideInLeft,
  slideRight: slideInRight,
  scale: scaleIn,
  clip: clipUp,
  rotate: rotateIn,
  fadeIn,
};
