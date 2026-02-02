"use client";

/**
 * CommunityCard Component
 *
 * Displays a single community post with privacy protection.
 * Uses BlurReveal for content and shows mood indicators.
 *
 * Features:
 * - BlurReveal for privacy
 * - Mood indicator (colored dot)
 * - Relative time display
 * - Tags as small pills
 * - Warm, supportive card design
 */

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BlurReveal } from "./BlurReveal";
import { Submission } from "@/types/secret-stress";

interface CommunityCardProps {
  submission: Submission;
  className?: string;
  onSupport?: (id: string) => void;
}

// Get mood color based on mood rating
const getMoodColor = (mood: number): string => {
  if (mood <= 3) return "bg-rose";
  if (mood <= 6) return "bg-sand";
  return "bg-sage";
};

const getMoodLabel = (mood: number): string => {
  if (mood <= 2) return "Struggling";
  if (mood <= 4) return "Difficult";
  if (mood <= 6) return "Coping";
  if (mood <= 8) return "Okay";
  return "Good";
};

// Format relative time
const formatRelativeTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
};

// Tag display names
const TAG_DISPLAY_NAMES: Record<string, string> = {
  exams: "Exams",
  deadlines: "Deadlines",
  grades: "Grades",
  social: "Social",
  family: "Family",
  future: "Future",
  burnout: "Burnout",
  isolation: "Isolation",
  sleep: "Sleep",
  other: "Other",
};

export function CommunityCard({
  submission,
  className,
  onSupport,
}: CommunityCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const relativeTime = useMemo(
    () => formatRelativeTime(submission.timestamp),
    [submission.timestamp]
  );

  const moodColor = getMoodColor(submission.mood);
  const moodLabel = getMoodLabel(submission.mood);

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-md",
          className
        )}
      >
        <CardContent className="p-5">
          {/* Header with mood and time */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Mood indicator */}
              <div className="flex items-center gap-1.5">
                <motion.div
                  className={cn("h-3 w-3 rounded-full", moodColor)}
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
                <span className="text-xs text-muted-foreground">{moodLabel}</span>
              </div>
            </div>

            {/* Relative time */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{relativeTime}</span>
            </div>
          </div>

          {/* Content with BlurReveal */}
          <BlurReveal
            blurAmount={6}
            revealOn="both"
            className="min-h-[60px]"
            indicatorText={{
              hidden: "Hover or click to read",
              revealed: "Reading",
            }}
          >
            <p className="text-foreground leading-relaxed">{submission.content}</p>
          </BlurReveal>

          {/* Tags */}
          {submission.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {submission.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-sand/30 text-sand-dark hover:bg-sand/50 text-xs"
                >
                  {TAG_DISPLAY_NAMES[tag] || tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        {/* Footer with support action */}
        <CardFooter className="border-t bg-muted/30 px-5 py-3">
          <div className="flex w-full items-center justify-between">
            <button
              onClick={() => onSupport?.(submission.id)}
              className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-rose-dark"
              aria-label="Send support"
            >
              <Heart className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>Send support</span>
            </button>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageCircle className="h-3 w-3" />
              <span>Anonymous</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default CommunityCard;
