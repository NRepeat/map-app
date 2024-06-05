import { Variants } from "framer-motion";

export const itemVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 19,
      bounce: 0,
      duration: 0.4,
    },
    display: "block",
  },
  closed: {
    opacity: 1,
    x: -500,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0,
    },
    transitionEnd: {
      display: "none",
    },
  },
};
export const buttonVariants: Variants = {
  open: {
    opacity: 1,
    x: 495,
    y: 1,
    transition: {
      type: "spring",
      damping: 19,
      bounce: 0,
      duration: 0.4,
    },
  },
  closed: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
};
