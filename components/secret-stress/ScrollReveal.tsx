"use client";

/**
 * ScrollReveal Component
 *
 * A reusable wrapper that adds scroll-triggered animations
 * using Framer Motion. Elements animate in when they enter
 * the viewport.
 */

import { motion, useReducedMotion, MotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  delay?: number;
  stagger?: number;
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: "some" | "all" | number;
  };
  fade?: boolean;
  scale?: boolean;
}

const directionOffsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: { y: 0, x: 0 },
};

export function ScrollReveal({
  children,
  className,
  direction = "up",
  duration = 0.6,
  delay = 0,
  stagger = 0,
  viewport = { once: true, margin: "-50px" },
  fade = true,
  scale = false,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const initial = {
    ...directionOffsets[direction],
    opacity: fade ? 0 : 1,
    scale: scale ? 0.95 : 1,
  };

  const animate = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  };

  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduceMotion ? {} : initial}
      whileInView={shouldReduceMotion ? {} : animate}
      viewport={viewport}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer Component
 *
 * A wrapper for staggered animations on multiple children.
 */

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  viewport?: {
    once?: boolean;
    margin?: string;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function StaggerContainer({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  viewport = { once: true, margin: "-50px" },
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={shouldReduceMotion ? {} : containerVariants}
      initial="hidden"
      whileInView={shouldReduceMotion ? {} : "visible"}
      viewport={viewport}
      transition={{
        delayChildren: delay,
        staggerChildren: stagger,
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  duration = 0.5,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={shouldReduceMotion ? {} : itemVariants}
      transition={{ duration: shouldReduceMotion ? 0 : duration }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
