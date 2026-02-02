"use client";

/**
 * BreathingWidget Component
 *
 * 4-7-8 breathing technique visualization with animated circle.
 * Helps users practice guided breathing for stress relief.
 *
 * Features:
 * - 4-7-8 breathing pattern (4s inhale, 7s hold, 8s exhale)
 * - Animated circle visualization
 * - Text prompts for each phase
 * - Start/pause controls
 * - Session timer
 * - Accessible with aria-live announcements
 * - Respects reduced motion preferences
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BreathingPhase = "idle" | "inhale" | "hold" | "exhale";

const PHASE_CONFIG: Record<
  BreathingPhase,
  { duration: number; text: string; subtext: string }
> = {
  idle: { duration: 0, text: "Ready to breathe?", subtext: "Press start when you're ready" },
  inhale: { duration: 4, text: "Breathe in...", subtext: "Fill your lungs slowly" },
  hold: { duration: 7, text: "Hold...", subtext: "Keep the air gently" },
  exhale: { duration: 8, text: "Breathe out...", subtext: "Release slowly" },
};

interface BreathingWidgetProps {
  className?: string;
  onSessionComplete?: (duration: number) => void;
}

export function BreathingWidget({
  className,
  onSessionComplete,
}: BreathingWidgetProps) {
  const [phase, setPhase] = useState<BreathingPhase>("idle");
  const [isActive, setIsActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear all timers
  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (phaseTimeoutRef.current) {
      clearTimeout(phaseTimeoutRef.current);
      phaseTimeoutRef.current = null;
    }
  }, []);

  // Start breathing session
  const startSession = useCallback(() => {
    setIsActive(true);
    setPhase("inhale");
    setAnnouncement("Starting breathing exercise. Breathe in for 4 seconds.");
  }, []);

  // Pause breathing session
  const pauseSession = useCallback(() => {
    setIsActive(false);
    clearTimers();
    setPhase("idle");
    setAnnouncement("Breathing exercise paused.");
  }, [clearTimers]);

  // Reset breathing session
  const resetSession = useCallback(() => {
    clearTimers();
    setIsActive(false);
    setPhase("idle");
    setSessionTime(0);
    setCycleCount(0);
    setAnnouncement("Breathing exercise reset.");
  }, [clearTimers]);

  // Handle phase transitions
  useEffect(() => {
    if (!isActive || phase === "idle") return;

    const currentConfig = PHASE_CONFIG[phase];

    // Announce phase for screen readers
    setAnnouncement(currentConfig.text);

    // Schedule next phase
    phaseTimeoutRef.current = setTimeout(() => {
      if (phase === "inhale") {
        setPhase("hold");
      } else if (phase === "hold") {
        setPhase("exhale");
      } else if (phase === "exhale") {
        setPhase("inhale");
        setCycleCount((prev) => prev + 1);
      }
    }, currentConfig.duration * 1000);

    return () => {
      if (phaseTimeoutRef.current) {
        clearTimeout(phaseTimeoutRef.current);
      }
    };
  }, [isActive, phase]);

  // Session timer
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Get circle animation based on phase
  const getCircleAnimation = () => {
    if (shouldReduceMotion) {
      return {
        scale: 1,
        opacity: 1,
      };
    }

    switch (phase) {
      case "inhale":
        return {
          scale: 1.5,
          opacity: 1,
          transition: { duration: 4, ease: "easeInOut" as const },
        };
      case "hold":
        return {
          scale: 1.5,
          opacity: 1,
          transition: { duration: 0.3 },
        };
      case "exhale":
        return {
          scale: 1,
          opacity: 0.8,
          transition: { duration: 8, ease: "easeInOut" as const },
        };
      default:
        return {
          scale: 1,
          opacity: 0.8,
          transition: { duration: 0.5 },
        };
    }
  };

  // Get circle color based on phase
  const getCircleColor = () => {
    switch (phase) {
      case "inhale":
        return "bg-sage";
      case "hold":
        return "bg-sand";
      case "exhale":
        return "bg-rose";
      default:
        return "bg-muted";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl border border-border bg-card p-6",
        className
      )}
    >
      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <Wind className="h-5 w-5 text-sage" />
        <h3 className="text-lg font-medium">4-7-8 Breathing</h3>
      </div>

      {/* Breathing Circle Visualization */}
      <div className="relative mb-8 flex h-48 w-48 items-center justify-center">
        {/* Outer rings */}
        <motion.div
          className="absolute inset-0 rounded-full bg-sage/10"
          animate={getCircleAnimation()}
        />
        <motion.div
          className="absolute inset-4 rounded-full bg-sage/20"
          animate={getCircleAnimation()}
          style={{ transitionDelay: "0.1s" }}
        />

        {/* Main breathing circle */}
        <motion.div
          className={cn(
            "relative flex h-32 w-32 items-center justify-center rounded-full shadow-lg transition-colors duration-500",
            getCircleColor()
          )}
          animate={getCircleAnimation()}
        >
          {/* Phase text inside circle */}
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-sm font-medium text-white">
                {PHASE_CONFIG[phase].text}
              </p>
              {phase !== "idle" && (
                <p className="mt-1 text-xs text-white/80">
                  {PHASE_CONFIG[phase].duration}s
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Phase instruction */}
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-6 text-center text-sm text-muted-foreground"
        >
          {PHASE_CONFIG[phase].subtext}
        </motion.p>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {!isActive ? (
          <Button
            onClick={startSession}
            className="bg-sage hover:bg-sage-dark"
            size="lg"
          >
            <Play className="mr-2 h-4 w-4" />
            Start
          </Button>
        ) : (
          <Button onClick={pauseSession} variant="outline" size="lg">
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </Button>
        )}

        <Button
          onClick={resetSession}
          variant="ghost"
          size="icon"
          aria-label="Reset breathing exercise"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Session Stats */}
      <div className="mt-6 flex w-full justify-center gap-8 text-center">
        <div>
          <p className="text-2xl font-semibold text-sage-dark">{cycleCount}</p>
          <p className="text-xs text-muted-foreground">Cycles</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-sand-dark">
            {formatTime(sessionTime)}
          </p>
          <p className="text-xs text-muted-foreground">Session Time</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">How it works:</p>
        <ol className="mt-2 list-inside list-decimal space-y-1">
          <li>Inhale through your nose for 4 seconds</li>
          <li>Hold your breath for 7 seconds</li>
          <li>Exhale through your mouth for 8 seconds</li>
          <li>Repeat the cycle</li>
        </ol>
      </div>
    </div>
  );
}

export default BreathingWidget;
