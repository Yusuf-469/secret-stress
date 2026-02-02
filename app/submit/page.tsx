"use client";

/**
 * Submit Page - Secret Stress
 *
 * Page for submitting anonymous stories about academic stress.
 * Features the SubmissionForm component with crisis detection,
 * privacy reminders, and success navigation options.
 */

import { useState, useCallback } from "react";
import { ProtectedRoute } from "@/components/secret-stress/ProtectedRoute";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/secret-stress/Navigation";
import { Footer } from "@/components/secret-stress/Footer";
import { SubmissionForm } from "@/components/secret-stress/SubmissionForm";
import { CrisisModal } from "@/components/secret-stress/CrisisModal";
import { PageTransition } from "@/components/ui/page-transition";
import { saveSubmission } from "@/lib/secret-stress/storage";
import { SubmissionTag, CrisisAssessment } from "@/types/secret-stress";

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

export default function SubmitPage() {
  const shouldReduceMotion = useReducedMotion();
  const [showSuccessOptions, setShowSuccessOptions] = useState(false);
  const [crisisAssessment, setCrisisAssessment] = useState<CrisisAssessment | null>(null);
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const handleSubmit = useCallback(
    async (data: {
      content: string;
      mood: number;
      tags: SubmissionTag[];
      crisisAssessment?: CrisisAssessment;
    }) => {
      try {
        // Save submission to localStorage
        saveSubmission({
          content: data.content,
          mood: data.mood as 1 | 2 | 3 | 4 | 5,
          tags: data.tags,
          crisisAssessment: data.crisisAssessment,
        });

        // If crisis was detected, show the modal
        if (data.crisisAssessment && data.crisisAssessment.severity !== "none") {
          setCrisisAssessment(data.crisisAssessment);
          if (data.crisisAssessment.severity === "critical" || data.crisisAssessment.severity === "high") {
            setShowCrisisModal(true);
          }
        }

        // Show success options
        setShowSuccessOptions(true);
      } catch (error) {
        console.error("Failed to save submission:", error);
      }
    },
    []
  );

  return (
    <ProtectedRoute>
      <PageTransition>
      <div className="flex min-h-screen flex-col">
        <Navigation />

        <main className="flex-1 bg-gradient-to-b from-background to-muted/20 px-4 py-8 md:py-12">
          <div className="container mx-auto max-w-3xl">
            {/* Back Link */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </motion.div>

            {!showSuccessOptions ? (
              <motion.div
                variants={shouldReduceMotion ? {} : containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Header */}
                <motion.div variants={itemVariants} className="mb-8 text-center">
                  <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
                    Release what's weighing on you
                  </h1>
                  <p className="mx-auto max-w-xl text-muted-foreground">
                    This is a safe space to share what you're going through. 
                    Your words matter, and there are people here who understand.
                  </p>
                </motion.div>

                {/* Privacy Reminder Box */}
                <motion.div
                  variants={itemVariants}
                  className="mb-8 rounded-xl border border-sage/20 bg-sage/5 p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/20">
                        <Shield className="h-5 w-5 text-sage-dark" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          Your privacy is protected
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          No personal data is collected. Your submission is completely anonymous.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground sm:shrink-0">
                      <Clock className="h-4 w-4" />
                      <span>Auto-deletes in 30 days</span>
                    </div>
                  </div>
                </motion.div>

                {/* Submission Form */}
                <motion.div variants={itemVariants}>
                  <SubmissionForm onSubmit={handleSubmit} />
                </motion.div>

                {/* Additional Support Info */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8 text-center"
                >
                  <p className="text-sm text-muted-foreground">
                    Need immediate help?{" "}
                    <Link
                      href="/crisis-resources"
                      className="font-medium text-sage-dark hover:underline"
                    >
                      View crisis resources
                    </Link>
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              /* Success State with Options */
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-sage/30 bg-card p-8 text-center md:p-12"
              >
                <motion.div
                  initial={shouldReduceMotion ? {} : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage/20"
                >
                  <svg
                    className="h-10 w-10 text-sage"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>

                <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
                  Thank you for sharing
                </h2>
                <p className="mx-auto mb-8 max-w-md text-muted-foreground">
                  Your story has been shared anonymously. Taking this step shows
                  strength, and you're helping others feel less alone.
                </p>

                {/* Crisis Warning if applicable */}
                {crisisAssessment && crisisAssessment.severity !== "none" && (
                  <div
                    className={`mb-8 rounded-lg border p-4 text-left ${
                      crisisAssessment.severity === "critical" || crisisAssessment.severity === "high"
                        ? "border-rose/30 bg-rose/10"
                        : "border-sand/30 bg-sand/10"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        crisisAssessment.severity === "critical" || crisisAssessment.severity === "high"
                          ? "text-rose-dark"
                          : "text-sand-dark"
                      }`}
                    >
                      {crisisAssessment.responseMessage}
                    </p>
                    {(crisisAssessment.severity === "critical" || crisisAssessment.severity === "high") && (
                      <Button
                        onClick={() => setShowCrisisModal(true)}
                        variant="link"
                        className="mt-2 h-auto p-0 text-sm font-medium"
                      >
                        View crisis resources →
                      </Button>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link href="/community">
                    <Button
                      size="lg"
                      className="group w-full bg-sage hover:bg-sage-dark sm:w-auto"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Go to Community
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-sage hover:bg-sage/10 sm:w-auto"
                    onClick={() => setShowSuccessOptions(false)}
                  >
                    Share another story
                  </Button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <Link
                    href="/toolkit"
                    className="transition-colors hover:text-sage-dark"
                  >
                    Try a breathing exercise
                  </Link>
                  <span className="text-border">|</span>
                  <Link
                    href="/crisis-resources"
                    className="transition-colors hover:text-sage-dark"
                  >
                    Crisis resources
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </main>

        <Footer />

        {/* Crisis Modal */}
        <CrisisModal
          isOpen={showCrisisModal}
          onClose={() => setShowCrisisModal(false)}
          assessment={crisisAssessment}
        />
      </div>
    </PageTransition>
    </ProtectedRoute>
  );
}
