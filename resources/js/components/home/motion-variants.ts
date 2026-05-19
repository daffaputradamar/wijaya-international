import type { Variants } from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1] as const;
export const SPRING = { type: 'spring', stiffness: 120, damping: 14 } as const;

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 90, rotate: -1.5 },
    visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: { duration: 1.1, ease: EASE },
    },
};

export const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -80, skewX: -4 },
    visible: {
        opacity: 1,
        x: 0,
        skewX: 0,
        transition: { duration: 0.9, ease: EASE },
    },
};

export const fadeRight: Variants = {
    hidden: { opacity: 0, x: 80, skewX: 4 },
    visible: {
        opacity: 1,
        x: 0,
        skewX: 0,
        transition: { duration: 0.9, ease: EASE },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.6, rotate: -3, y: 40 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: 0,
        transition: { ...SPRING, duration: 1 },
    },
};

export const popIn: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: -8 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { type: 'spring', stiffness: 260, damping: 18 },
    },
};

export const clipReveal: Variants = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    visible: {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        transition: { duration: 0.9, ease: EASE },
    },
};

export const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

export const staggerFast: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const staggerSlow: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.25, delayChildren: 0.2 } },
};
