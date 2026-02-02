"use client";

/**
 * SubmissionForm Component
 *
 * Anonymous text area for sharing stress and academic pressure.
 * Integrates MoodSlider and real-time crisis detection.
 *
 * Features:
 * - Anonymous text area
 * - MoodSlider integration
 * - Optional tags for categorization
 * - Real-time crisis detection
 * - Character limit with gentle indicator
 * - Success state with warm confirmation
 * - Accessible with proper labels and ARIA
 */

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, CheckCircle, AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MoodSlider } from "./MoodSlider";
import { CrisisModal } from "./CrisisModal";
import { detectCrisis } from "@/lib/secret-stress/crisis-detection";
import { SubmissionTag, SUBMISSION_TAGS, CrisisAssessment } from "@/types/secret-stress";

interface SubmissionFormProps {
  onSubmit?: (data: {
    content: string;
    mood: number;
    tags: SubmissionTag[];
    crisisAssessment?: CrisisAssessment;
  }) => void;
  className?: string;
}

const MAX_CHARS = 1000;

export function SubmissionForm({ onSubmit, className }: SubmissionFormProps) {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState(5);
  const [selectedTags, setSelectedTags] = useState<SubmissionTag[]>([]);
  const [crisisAssessment, setCrisisAssessment] = useState<CrisisAssessment | null>(null);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const charCount = content.length;
  const isNearLimit = charCount > MAX_CHARS * 0.9;
  const isOverLimit = charCount > MAX_CHARS;

  // Real-time crisis detection
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (content.trim()) {
        const assessment = detectCrisis(content);
        setCrisisAssessment(assessment);

        // Auto-show crisis modal for high/critical severity
        if (assessment.severity === "critical" || assessment.severity === "high") {
          setShowCrisisModal(true);
        }
      } else {
        setCrisisAssessment(null);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [content]);

  const handleTagToggle = useCallback((tag: SubmissionTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!content.trim() || isOverLimit) return;

      setIsSubmitting(true);

      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmit?.({
        content: content.trim(),
        mood,
        tags: selectedTags,
        crisisAssessment: crisisAssessment || undefined,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    },
    [content, mood, selectedTags, crisisAssessment, isOverLimit, onSubmit]
  );

  const handleReset = useCallback(() => {
    setContent("");
    setMood(5);
    setSelectedTags([]);
    setCrisisAssessment(null);
    setIsSuccess(false);
  }, []);

  // Get character count color
  const getCharCountColor = () => {
    if (isOverLimit) return "text-destructive";
    if (isNearLimit) return "text-amber-500";
    return "text-muted-foreground";
  };

  // Get submit button text based on state
  const getSubmitButtonText = () => {
    if (isSubmitting) return "Sharing...";
    if (crisisAssessment?.severity === "critical" || crisisAssessment?.severity === "high") {
      return "Release this weight";
    }
    return "Share your story";
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border border-sage/30 bg-sage/5 p-8 text-center",
          className
        )}
      >
        <motion.div
          initial={shouldReduceMotion ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage/20"
        >
          <CheckCircle className="h-8 w-8 text-sage" />
        </motion.div>
        <h3 className="mb-2 text-xl font-medium text-foreground">
          Thank you for sharing
        </h3>
        <p className="mb-6 max-w-sm text-muted-foreground">
          Your story has been shared anonymously. Remember, you're not alone in this.
        </p>
        <Button onClick={handleReset} variant="outline" className="border-sage hover:bg-sage/10">
          <Sparkles className="mr-2 h-4 w-4" />
          Share another story
        </Button>
      </motion.div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "space-y-6 rounded-xl border border-border bg-card p-6",
          className
        )}
      >
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-xl font-medium">Share your story</h2>
          <p className="text-sm text-muted-foreground">
            This is a safe, anonymous space. Your words matter.
          </p>
        </div>

        {/* Crisis Warning */}
        <AnimatePresence>
          {crisisAssessment && crisisAssessment.severity !== "none" && (
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={cn(
                "rounded-lg border p-4",
                crisisAssessment.severity === "critical"
                  ? "border-rose/30 bg-rose/10"
                  : crisisAssessment.severity === "high"
                  ? "border-amber-500/30 bg-amber-500/10"
                  : "border-sand/30 bg-sand/10"
              )}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className={cn(
                    "mt-0.5 h-5 w-5 shrink-0",
                    crisisAssessment.severity === "critical"
                      ? "text-rose-dark"
                      : crisisAssessment.severity === "high"
                      ? "text-amber-600"
                      : "text-sand-dark"
                  )}
                />
                <div className="flex-1">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      crisisAssessment.severity === "critical"
                        ? "text-rose-dark"
                        : crisisAssessment.severity === "high"
                        ? "text-amber-700"
                        : "text-sand-dark"
                    )}
                  >
                    {crisisAssessment.responseMessage}
                  </p>
                  {(crisisAssessment.severity === "critical" ||
                    crisisAssessment.severity === "high") && (
                    <Button
                      type="button"
                      variant="link"
                      className="mt-2 h-auto p-0 text-sm font-medium"
                      onClick={() => setShowCrisisModal(true)}
                    >
                      View crisis resources →
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Area */}
        <div className="space-y-2">
          <label htmlFor="submission-content" className="text-sm font-medium">
            What's on your mind?
          </label>
          <Textarea
            id="submission-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share what you're going through. There's no judgment here..."
            className={cn(
              "min-h-[150px] resize-none",
              isOverLimit && "border-destructive focus-visible:ring-destructive"
            )}
            aria-describedby="char-count"
          />
          <div className="flex items-center justify-between">
            <span
              id="char-count"
              className={cn("text-xs transition-colors", getCharCountColor())}
            >
              {charCount}/{MAX_CHARS} characters
            </span>
            {isNearLimit && !isOverLimit && (
              <span className="text-xs text-amber-500">
                Getting close to the limit
              </span>
            )}
            {isOverLimit && (
              <span className="text-xs text-destructive">
                Please shorten your message
              </span>
            )}
          </div>
        </div>

        {/* Mood Slider */}
        <div className="space-y-3">
          <MoodSlider value={mood} onChange={setMood} />
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <label className="text-sm font-medium">
            What does this relate to? (optional)
          </label>
          <div className="flex flex-wrap gap-2">
            {SUBMISSION_TAGS.map((tag) => (
              <button
                key={tag.value}
                type="button"
                onClick={() => handleTagToggle(tag.value)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-all",
                  selectedTags.includes(tag.value)
                    ? "bg-sage text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!content.trim() || isOverLimit || isSubmitting}
          className="w-full bg-sage hover:bg-sage-dark"
          size="lg"
        >
          {isSubmitting ? (
            <motion.div
              className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
            />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          {getSubmitButtonText()}
        </Button>

        {/* Privacy Note */}
        <p className="text-center text-xs text-muted-foreground">
          Your submission is completely anonymous. No personal data is collected.
        </p>
      </form>

      {/* Crisis Modal */}
      <CrisisModal
        isOpen={showCrisisModal}
        onClose={() => setShowCrisisModal(false)}
        assessment={crisisAssessment}
      />
    </>
  );
}

export default SubmissionForm;
