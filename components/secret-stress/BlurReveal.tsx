"use client";

/**
 * BlurReveal Component
 *
 * Wraps community post content with privacy-first blur effect.
 * Content is initially blurred and revealed on hover or focus.
 *
 * Features:
 * - Initial blur state (filter: blur(8px))
 * - Reveals on hover or focus
 * - "Click to read" / "Hover to reveal" indicator
 * - Respects reduced motion preferences
 * - Privacy-first design
 */

import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  blurAmount?: number;
  revealOn?: "hover" | "click" | "both";
  showIndicator?: boolean;
  indicatorText?: {
    hidden: string;
    revealed: string;
  };
}

export function BlurReveal({
  children,
  className,
  blurAmount = 8,
  revealOn = "both",
  showIndicator = true,
  indicatorText = {
    hidden: "Hover or click to reveal",
    revealed: "Content visible",
  },
}: BlurRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseEnter = useCallback(() => {
    if (revealOn === "hover" || revealOn === "both") {
      setIsRevealed(true);
    }
  }, [revealOn]);

  const handleMouseLeave = useCallback(() => {
    if (revealOn === "hover" || revealOn === "both") {
      setIsRevealed(false);
    }
  }, [revealOn]);

  const handleClick = useCallback(() => {
    if (revealOn === "click" || revealOn === "both") {
      setIsRevealed((prev) => !prev);
    }
  }, [revealOn]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (revealOn === "hover" || revealOn === "both") {
      setIsRevealed(true);
    }
  }, [revealOn]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (revealOn === "hover" || revealOn === "both") {
      setIsRevealed(false);
    }
  }, [revealOn]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  const isActive = isRevealed || isFocused;

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isRevealed}
      aria-label={isRevealed ? "Content revealed" : "Content hidden, click to reveal"}
    >
      {/* Content with blur effect */}
      <motion.div
        className="transition-all will-change-[filter]"
        animate={{
          filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
          opacity: isActive ? 1 : 0.7,
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }
        }
      >
        {children}
      </motion.div>

      {/* Indicator overlay */}
      {showIndicator && !isActive && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 shadow-lg backdrop-blur-sm">
            <EyeOff className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {indicatorText.hidden}
            </span>
          </div>
        </motion.div>
      )}

      {/* Revealed indicator */}
      {showIndicator && isActive && (
        <motion.div
          className="pointer-events-none absolute right-2 top-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-1.5 rounded-full bg-sage/20 px-3 py-1">
            <Eye className="h-3 w-3 text-sage-dark" />
            <span className="text-xs font-medium text-sage-dark">
              {indicatorText.revealed}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

interface BlurRevealCardProps extends Omit<BlurRevealProps, "children"> {
  content: string;
  maxLength?: number;
}

export function BlurRevealCard({
  content,
  maxLength,
  className,
  ...props
}: BlurRevealCardProps) {
  const displayContent =
    maxLength && content.length > maxLength
      ? `${content.slice(0, maxLength)}...`
      : content;

  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-card p-4 transition-colors hover:border-sage/30",
        className
      )}
    >
      <BlurReveal {...props}>
        <p className="text-foreground leading-relaxed">{displayContent}</p>
      </BlurReveal>
    </div>
  );
}

export default BlurReveal;
