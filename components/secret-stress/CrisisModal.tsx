"use client";

/**
 * CrisisModal Component
 *
 * Auto-popup modal when crisis keywords are detected.
 * Provides warm, non-clinical messaging and immediate resources.
 *
 * Features:
 * - Gentle Framer Motion animations
 * - Crisis resources display
 * - Emergency exit option
 * - Accessible with proper ARIA attributes
 */

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, MessageSquare, ExternalLink, Heart, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CrisisAssessment, CrisisResource } from "@/types/secret-stress";
import { CRISIS_RESOURCES } from "@/lib/secret-stress/crisis-detection";

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: CrisisAssessment | null;
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

function CrisisResourceCard({ resource }: { resource: CrisisResource }) {
  return (
    <motion.div
      variants={itemVariants}
      className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/20">
          {resource.contact.includes("Text") ? (
            <MessageSquare className="h-4 w-4 text-sage" />
          ) : (
            <Phone className="h-4 w-4 text-sage" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground">{resource.name}</h4>
          <p className="text-sm font-semibold text-sage-dark">{resource.contact}</p>
          <p className="mt-1 text-xs text-muted-foreground">{resource.description}</p>
          {resource.available24x7 && (
            <span className="mt-2 inline-flex items-center rounded-full bg-sand/50 px-2 py-0.5 text-xs text-sand-dark">
              Available 24/7
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function CrisisModal({ isOpen, onClose, assessment }: CrisisModalProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleSafetyRedirect = useCallback(() => {
    // Clear sensitive data before redirecting
    if (typeof window !== "undefined") {
      const forms = document.querySelectorAll("form");
      forms.forEach((form) => form.reset());
      window.location.href = "https://weather.com";
    }
  }, []);

  // Handle escape key to close modal (but still show warning)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!assessment) return null;

  const isCritical = assessment.severity === "critical";
  const isHigh = assessment.severity === "high";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-md sm:max-w-lg"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              {...(!shouldReduceMotion && { variants: containerVariants })}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              {/* Header */}
              <DialogHeader className="space-y-3">
                <motion.div
                  variants={itemVariants}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose/20"
                >
                  <Heart className="h-8 w-8 text-rose-dark" />
                </motion.div>
                <DialogTitle className="text-center text-xl">
                  {isCritical ? "We're here for you" : "You matter"}
                </DialogTitle>
                <DialogDescription className="text-center text-base">
                  {assessment.responseMessage}
                </DialogDescription>
              </DialogHeader>

              {/* Warning for critical severity */}
              {(isCritical || isHigh) && (
                <motion.div
                  variants={itemVariants}
                  className="rounded-lg border border-rose/30 bg-rose/10 p-4"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-dark" />
                    <div>
                      <p className="font-medium text-rose-dark">
                        Please reach out for help
                      </p>
                      <p className="text-sm text-rose-dark/80">
                        You don't have to go through this alone. These resources are here to support you.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Crisis Resources */}
              <motion.div variants={itemVariants} className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Immediate support resources:
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {CRISIS_RESOURCES.slice(0, 3).map((resource) => (
                    <CrisisResourceCard key={resource.name} resource={resource} />
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="space-y-3 pt-2">
                <Button
                  onClick={handleSafetyRedirect}
                  variant="default"
                  className="w-full bg-sage hover:bg-sage-dark"
                  size="lg"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Take me to safety
                </Button>

                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  I'm not in immediate danger
                </Button>
              </motion.div>

              {/* Footer message */}
              <motion.p
                variants={itemVariants}
                className="text-center text-xs text-muted-foreground"
              >
                Your wellbeing is important. If you're in immediate danger, please call 911 or go to your nearest emergency room.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

export default CrisisModal;
