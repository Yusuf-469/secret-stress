"use client";

/**
 * MoodSlider Component
 *
 * A 1-10 scale slider for mood rating with visual indicators.
 * Uses warm, validating colors:
 * - 1-3: Rose/dusty colors (struggling)
 * - 4-6: Sand/warm colors (coping)
 * - 7-10: Sage/green colors (doing okay)
 *
 * Fully accessible with ARIA attributes and supports reduced motion.
 */

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MoodSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

const MOOD_LABELS: Record<number, string> = {
  1: "Having a rough time",
  2: "Really struggling",
  3: "Difficult day",
  4: "Holding on",
  5: "Getting by",
  6: "Coping okay",
  7: "Doing alright",
  8: "Feeling good",
  9: "Pretty balanced",
  10: "Feeling balanced",
};

const getMoodColor = (value: number): string => {
  if (value <= 3) return "var(--rose)";
  if (value <= 6) return "var(--sand)";
  return "var(--sage)";
};

const getMoodBgColor = (value: number): string => {
  if (value <= 3) return "bg-rose";
  if (value <= 6) return "bg-sand";
  return "bg-sage";
};

const getMoodTextColor = (value: number): string => {
  if (value <= 3) return "text-rose-dark";
  if (value <= 6) return "text-sand-dark";
  return "text-sage-dark";
};

export function MoodSlider({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled = false,
  className,
}: MoodSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const displayValue = hoverValue ?? value;
  const currentColor = getMoodColor(displayValue);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Label and Value Display */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          How are you feeling right now?
        </span>
        <motion.span
          className={cn(
            "text-sm font-medium transition-colors duration-200",
            getMoodTextColor(displayValue)
          )}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: isDragging ? 1.1 : 1,
                }
          }
          transition={{ duration: 0.15 }}
        >
          {MOOD_LABELS[displayValue]}
        </motion.span>
      </div>

      {/* Slider Container */}
      <div className="relative pt-1">
        {/* Track Background */}
        <div className="relative h-3 w-full rounded-full bg-muted">
          {/* Filled Track */}
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full transition-colors duration-200"
            style={{
              width: `${percentage}%`,
              backgroundColor: currentColor,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    backgroundColor: currentColor,
                  }
            }
            transition={{ duration: 0.2 }}
          />

          {/* Tick Marks */}
          <div className="absolute inset-0 flex justify-between px-[6px]">
            {Array.from({ length: max - min + 1 }, (_, i) => min + i).map(
              (num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => !disabled && onChange(num)}
                  onMouseEnter={() => setHoverValue(num)}
                  onMouseLeave={() => setHoverValue(null)}
                  className={cn(
                    "relative h-full w-3 -translate-x-1/2 cursor-pointer rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    num <= value ? "opacity-0" : "opacity-100 hover:bg-muted-foreground/30"
                  )}
                  aria-label={`Select mood level ${num}`}
                  disabled={disabled}
                >
                  <span className="sr-only">{MOOD_LABELS[num]}</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Range Input (invisible but accessible) */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          disabled={disabled}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={MOOD_LABELS[value]}
          aria-label="Mood rating from 1 to 10"
        />

        {/* Thumb Indicator */}
        <motion.div
          className="pointer-events-none absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
          style={{
            left: `calc(${percentage}% - 12px)`,
            backgroundColor: currentColor,
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: isDragging ? 1.2 : 1,
                  backgroundColor: currentColor,
                }
          }
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      {/* Visual Mood Indicator */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <motion.div
          className={cn("h-2 w-2 rounded-full", getMoodBgColor(displayValue))}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <span className="text-xs text-muted-foreground">
          {displayValue <= 3
            ? "It's okay to not be okay"
            : displayValue <= 6
            ? "You're doing your best"
            : "You're taking care of yourself"}
        </span>
      </div>
    </div>
  );
}

export default MoodSlider;
