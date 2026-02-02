"use client";

/**
 * Community Page - Secret Stress
 *
 * Displays anonymous community posts with privacy protection via BlurReveal.
 * Features filtering, empty states, and encouraging CTAs.
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  PenLine,
  Filter,
  Clock,
  Shield,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/secret-stress/Navigation";
import { Footer } from "@/components/secret-stress/Footer";
import { CommunityCard } from "@/components/secret-stress/CommunityCard";
import { PageTransition } from "@/components/ui/page-transition";
import { getSubmissions } from "@/lib/secret-stress/storage";
import { Submission, SubmissionTag, SUBMISSION_TAGS } from "@/types/secret-stress";

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

export default function CommunityPage() {
  const shouldReduceMotion = useReducedMotion();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedTag, setSelectedTag] = useState<SubmissionTag | "all">("all");
  const [isLoading, setIsLoading] = useState(true);

  // Load submissions on mount
  useEffect(() => {
    const loadSubmissions = () => {
      const data = getSubmissions();
      setSubmissions(data);
      setIsLoading(false);
    };

    loadSubmissions();

    // Refresh every 30 seconds to catch new posts
    const interval = setInterval(loadSubmissions, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter submissions by tag
  const filteredSubmissions = useMemo(() => {
    if (selectedTag === "all") return submissions;
    return submissions.filter((sub) => sub.tags.includes(selectedTag));
  }, [submissions, selectedTag]);

  // Handle support action
  const handleSupport = useCallback((id: string) => {
    // In a real app, this would track support reactions
    // For now, we'll just show a console log
    console.log(`Support sent for submission ${id}`);
  }, []);

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <Navigation />

        <main className="flex-1 bg-gradient-to-b from-background to-muted/20 px-4 py-8 md:py-12">
          <div className="container mx-auto max-w-4xl">
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

            <motion.div
              variants={shouldReduceMotion ? {} : containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sage/10 px-4 py-1.5 text-sm font-medium text-sage-dark">
                  <Users className="h-4 w-4" />
                  Community
                </div>
                <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
                  You're not alone in this
                </h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                  Read stories from others who understand what you're going through.
                  All posts are anonymous and protected—hover or click to reveal content.
                </p>
              </motion.div>

              {/* Privacy Notice */}
              <motion.div
                variants={itemVariants}
                className="mb-8 rounded-lg border border-sage/20 bg-sage/5 p-4"
              >
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/20">
                    <Shield className="h-5 w-5 text-sage-dark" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">
                      Privacy-protected content
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Content is blurred by default for privacy. Hover or click on any post to read it.
                      Posts automatically delete after 30 days.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Auto-delete: 30 days</span>
                  </div>
                </div>
              </motion.div>

              {/* Filter Section */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      Filter by topic:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedTag("all")}
                      className={`rounded-full px-3 py-1.5 text-sm transition-all ${
                        selectedTag === "all"
                          ? "bg-sage text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      All
                    </button>
                    {SUBMISSION_TAGS.map((tag) => (
                      <button
                        key={tag.value}
                        onClick={() => setSelectedTag(tag.value)}
                        className={`rounded-full px-3 py-1.5 text-sm transition-all ${
                          selectedTag === tag.value
                            ? "bg-sage text-white"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Submissions List */}
              <motion.div variants={itemVariants}>
                {isLoading ? (
                  // Loading State
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-40 animate-pulse rounded-xl bg-muted"
                      />
                    ))}
                  </div>
                ) : filteredSubmissions.length > 0 ? (
                  // Submissions List
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {filteredSubmissions.map((submission) => (
                        <CommunityCard
                          key={submission.id}
                          submission={submission}
                          onSupport={handleSupport}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Empty State
                  <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border border-dashed border-border bg-card p-12 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage/10">
                      <MessageCircle className="h-8 w-8 text-sage" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      {selectedTag === "all"
                        ? "No stories yet"
                        : "No stories in this category"}
                    </h3>
                    <p className="mx-auto mb-6 max-w-sm text-muted-foreground">
                      {selectedTag === "all"
                        ? "Be the first to share your story and help others feel less alone."
                        : "There are no stories in this category yet. Try selecting a different topic or share your own story."}
                    </p>
                    <Link href="/submit">
                      <Button className="bg-sage hover:bg-sage-dark">
                        <PenLine className="mr-2 h-4 w-4" />
                        Share your story
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </motion.div>

              {/* Share CTA */}
              {filteredSubmissions.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="mt-12 text-center"
                >
                  <div className="rounded-xl border border-border bg-card p-8">
                    <Heart className="mx-auto mb-4 h-8 w-8 text-sage" />
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      Have something to share?
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      Your story could help someone else feel less alone.
                    </p>
                    <Link href="/submit">
                      <Button className="bg-sage hover:bg-sage-dark">
                        <PenLine className="mr-2 h-4 w-4" />
                        Share your story
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
