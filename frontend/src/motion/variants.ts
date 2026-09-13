import { Variants } from 'framer-motion';

// Durations and ease curve specified in DESIGN §5
const MOTION_BASE = 0.3;
const MOTION_FAST = 0.15;
const EASE_STANDARD = [0.22, 1, 0.36, 1] as const;

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_BASE, ease: EASE_STANDARD },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: MOTION_BASE, ease: EASE_STANDARD },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const cardHover: Variants = {
  rest: {
    y: 0,
    transition: { duration: MOTION_FAST, ease: EASE_STANDARD },
  },
  hover: {
    y: -4,
    transition: { duration: MOTION_FAST, ease: EASE_STANDARD },
  },
};

export const modalTransition: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: MOTION_BASE, ease: EASE_STANDARD },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: MOTION_FAST, ease: EASE_STANDARD },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, x: 16 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: MOTION_BASE, ease: EASE_STANDARD },
  },
  exit: {
    opacity: 0,
    x: -16,
    transition: { duration: MOTION_BASE, ease: EASE_STANDARD },
  },
};

export const buttonPress = {
  scale: 0.97,
};
