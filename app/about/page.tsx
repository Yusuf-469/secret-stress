"use client";

/**
 * About Page - Secret Stress
 *
 * Provides information about the mission, privacy commitments,
 * how anonymity works, and clarifications about the service.
 */

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Shield,
  Clock,
  Users,
  Lock,
  Mail,
  AlertCircle,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Navigation } from "@/components/secret-stress/Navigation";
import { Footer } from "@/components/secret-stress/Footer";
import { PageTransition } from "@/components/ui/page-transition";

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

const privacyCommitments = [
  {
    icon: Lock,
    title: "No Account Required",
    description:
      "You don't need to sign up, log in, or provide any personal information to use Secret Stress.",
  },
  {
    icon: Shield,
    title: "No Tracking",
    description:
      "We don't use cookies, analytics, or any tracking technologies. Your visit leaves no digital footprint.",
  },
  {
    icon: Clock,
    title: "Auto-Delete",
    description:
      "All submissions are automatically deleted after 30 days. We don't keep logs or backups.",
  },
  {
    icon: Users,
    title: "Local Storage Only",
    description:
      "Your data is stored only on your device using localStorage. Nothing is sent to any server.",
  },
];

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

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
              <motion.div variants={itemVariants} className="mb-12 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sage/10 px-4 py-1.5 text-sm font-medium text-sage-dark">
                  <Heart className="h-4 w-4" />
                  About Us
                </div>
                <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                  A safe space for students
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  Secret Stress was created with one simple goal: to give students a place
                  to share their struggles without fear of judgment or exposure.
                </p>
              </motion.div>

              {/* Mission Statement */}
              <motion.div variants={itemVariants} className="mb-12">
                <Card className="border-sage/20 bg-sage/5">
                  <CardContent className="p-8 text-center">
                    <Sparkles className="mx-auto mb-4 h-10 w-10 text-sage" />
                    <h2 className="mb-4 text-2xl font-bold text-foreground">
                      Our Mission
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                      We believe that every student deserves a safe place to express their
                      struggles with academic pressure. In a world of constant comparison,
                      social media perfection, and high expectations, it's easy to feel
                      like you're the only one struggling. You're not. Secret Stress
                      exists to remind you that your feelings are valid, your stress is real,
                      and you deserve support—without having to reveal your identity.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Why We Built This */}
              <motion.div variants={itemVariants} className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  Why we built this
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Academic pressure is real, and it affects millions of students every day.
                    The stress of exams, deadlines, grades, and future expectations can feel
                    overwhelming. Yet many students suffer in silence, afraid to admit they're
                    struggling because of stigma or fear of judgment.
                  </p>
                  <p>
                    We created Secret Stress because we believe that sharing your story—even
                    anonymously—can be incredibly powerful. It helps you process your feelings,
                    and it helps others realize they're not alone in their struggles.
                  </p>
                  <p>
                    This platform is designed to be the opposite of social media. No likes,
                    no followers, no algorithm. Just real stories from real people who understand
                    what you're going through.
                  </p>
                </div>
              </motion.div>

              {/* Privacy Commitments */}
              <motion.div variants={itemVariants} className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  Our Privacy Commitments
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {privacyCommitments.map((commitment) => {
                    const Icon = commitment.icon;
                    return (
                      <Card
                        key={commitment.title}
                        className="transition-all hover:border-sage/30"
                      >
                        <CardContent className="p-6">
                          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-sage/10">
                            <Icon className="h-5 w-5 text-sage-dark" />
                          </div>
                          <h3 className="mb-2 font-semibold text-foreground">
                            {commitment.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {commitment.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </motion.div>

              {/* How Anonymity Works */}
              <motion.div variants={itemVariants} className="mb-12">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand/30">
                        <Shield className="h-5 w-5 text-sand-dark" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">
                        How Anonymity Works
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        When you submit a story on Secret Stress, here's what happens:
                      </p>
                      <ol className="list-inside list-decimal space-y-2">
                        <li>
                          <strong className="text-foreground">No personal data collected:</strong>{" "}
                          We don't ask for your name, email, school, or any identifying information.
                        </li>
                        <li>
                          <strong className="text-foreground">Stored locally:</strong>{" "}
                          Your submission is saved only in your browser's localStorage—not on any server.
                        </li>
                        <li>
                          <strong className="text-foreground">Random ID:</strong>{" "}
                          Each post gets a random, unique ID that can't be traced back to you.
                        </li>
                        <li>
                          <strong className="text-foreground">Blur protection:</strong>{" "}
                          Content is blurred by default so others can't read over your shoulder.
                        </li>
                        <li>
                          <strong className="text-foreground">Auto-deletion:</strong>{" "}
                          After 30 days, your post is permanently deleted with no way to recover it.
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 30-Day Auto-Delete Explanation */}
              <motion.div variants={itemVariants} className="mb-12">
                <Card className="border-sand/30 bg-sand/10">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand/30">
                        <Clock className="h-5 w-5 text-sand-dark" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">
                        Why 30 Days?
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We chose a 30-day auto-delete period for a few reasons. First, it gives
                      enough time for your story to reach others who might benefit from reading it.
                      Second, it ensures that old posts don't accumulate and potentially identify
                      patterns that could compromise anonymity. Third, it reflects our belief that
                      sharing is about the present moment—processing what you're feeling now and
                      connecting with others in the same space. After 30 days, we believe it's
                      healthy to let go and move forward.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Is This Therapy? */}
              <motion.div variants={itemVariants} className="mb-12">
                <Card className="border-rose/20 bg-rose/5">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose/20">
                        <AlertCircle className="h-5 w-5 text-rose-dark" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">
                        Is this therapy?
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        <strong className="text-foreground">No.</strong> Secret Stress is not a replacement
                        for professional mental health treatment. We are a peer support platform,
                        not a therapy service.
                      </p>
                      <p>
                        While sharing your story and reading others' experiences can be therapeutic,
                        it's not the same as working with a trained mental health professional.
                        If you're experiencing severe distress, suicidal thoughts, or mental health
                        symptoms that interfere with your daily life, please reach out to a:
                      </p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>Mental health counselor or therapist</li>
                        <li>School counseling center</li>
                        <li>Crisis helpline (988 Suicide & Crisis Lifeline)</li>
                        <li>Your doctor or healthcare provider</li>
                      </ul>
                      <p>
                        Think of Secret Stress as a complement to professional care, not a substitute.
                        We're here to help you feel less alone, but we can't provide the personalized
                        treatment that mental health professionals offer.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact / Feedback */}
              <motion.div variants={itemVariants} className="mb-12">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10">
                        <MessageCircle className="h-5 w-5 text-sage-dark" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">
                        Feedback & Contact
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">
                      We're always looking to improve Secret Stress. If you have suggestions,
                      found a bug, or just want to share how the platform has helped you,
                      we'd love to hear from you.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <a
                        href="mailto:feedback@secretstress.app"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-sage px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sage-dark"
                      >
                        <Mail className="h-4 w-4" />
                        Send Feedback
                      </a>
                      <Link href="/crisis-resources">
                        <Button variant="outline" className="w-full border-sage hover:bg-sage/10">
                          View Crisis Resources
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Team / Acknowledgment */}
              <motion.div
                variants={itemVariants}
                className="rounded-2xl border border-sage/20 bg-sage/5 p-8 text-center"
              >
                <Heart className="mx-auto mb-4 h-10 w-10 text-sage" />
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  Made with care
                </h3>
                <p className="mx-auto max-w-xl text-muted-foreground">
                  Secret Stress was built by people who understand academic pressure firsthand.
                  We've been there—the late nights, the self-doubt, the feeling that everyone
                  else has it figured out. We made this because we needed it, and we hope it
                  helps you too.
                </p>
                <p className="mt-4 text-sm text-sage-dark">
                  With care, for students everywhere.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
