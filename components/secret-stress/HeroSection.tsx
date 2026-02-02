"use client";

/**
 * HeroSection Component
 *
 * Warm welcome message for the landing page with validating headline.
 *
 * Features:
 * - Validating headline
 * - Brief platform description
 * - CTA buttons
 * - Gentle Framer Motion entrance animations
 */

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, PenLine, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function HeroSection({ className }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-sage/5 via-background to-background px-4 py-16 md:py-24",
        className
      )}
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-sage/10 blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-rose/10 blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="container relative mx-auto max-w-4xl">
        <motion.div
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-sage/10 px-4 py-1.5 text-sm font-medium text-sage-dark">
              <Heart className="h-4 w-4" />
              Anonymous & Safe
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Your stress is valid.
            <br />
            <span className="text-sage-dark">You're not alone.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Secret Stress is a safe space for students to share academic pressure
            anonymously. No judgment, no tracking—just support from people who
            understand.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/submit">
              <Button
                size="lg"
                className="group bg-sage px-8 hover:bg-sage-dark"
              >
                <PenLine className="mr-2 h-4 w-4" />
                Share your story
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/community">
              <Button
                size="lg"
                variant="outline"
                className="border-sage px-8 hover:bg-sage/10"
              >
                <Users className="mr-2 h-4 w-4" />
                Browse community
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/10">
                <span className="text-sage-dark">✓</span>
              </div>
              <span>100% Anonymous</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/10">
                <span className="text-sage-dark">✓</span>
              </div>
              <span>No Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/10">
                <span className="text-sage-dark">✓</span>
              </div>
              <span>Auto-delete in 30 days</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
