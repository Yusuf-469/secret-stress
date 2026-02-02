"use client";

/**
 * Crisis Resources Page - Secret Stress
 *
 * Provides immediate access to crisis support resources.
 * Features prominent emergency contacts, validating messaging,
 * and information about what to expect when seeking help.
 */

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Heart,
  Clock,
  ExternalLink,
  AlertCircle,
  Shield,
  Users,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Navigation } from "@/components/secret-stress/Navigation";
import { Footer } from "@/components/secret-stress/Footer";
import { PageTransition } from "@/components/ui/page-transition";
import { CRISIS_RESOURCES } from "@/lib/secret-stress/crisis-detection";

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

// Additional resources beyond the crisis detection defaults
const ADDITIONAL_RESOURCES = [
  {
    name: "The Trevor Project",
    contact: "1-866-488-7386",
    description: "Crisis intervention and suicide prevention for LGBTQ+ youth",
    available24x7: true,
    website: "https://www.thetrevorproject.org",
    category: "LGBTQ+",
  },
  {
    name: "SAMHSA National Helpline",
    contact: "1-800-662-4357",
    description: "Treatment referral and information for mental health and substance use",
    available24x7: true,
    website: "https://www.samhsa.gov/find-help",
    category: "Mental Health & Substance Use",
  },
  {
    name: "National Sexual Assault Hotline",
    contact: "1-800-656-4673",
    description: "Support for survivors of sexual assault",
    available24x7: true,
    website: "https://www.rainn.org",
    category: "Sexual Assault",
  },
];

const ALL_RESOURCES = [...CRISIS_RESOURCES, ...ADDITIONAL_RESOURCES];

export default function CrisisResourcesPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <Navigation />

        <main className="flex-1 bg-gradient-to-b from-rose/5 via-background to-background px-4 py-8 md:py-12">
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
              {/* Urgent Header */}
              <motion.div variants={itemVariants} className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose/10 px-4 py-1.5 text-sm font-medium text-rose-dark">
                  <Heart className="h-4 w-4" />
                  You matter
                </div>
                <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
                  You deserve support right now
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  Whatever you're going through, you don't have to face it alone.
                  These resources are here to help, 24/7.
                </p>
              </motion.div>

              {/* Immediate Help Section */}
              <motion.div
                variants={itemVariants}
                className="mb-8 rounded-2xl border border-rose/20 bg-rose/5 p-6 md:p-8"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose/20">
                    <AlertCircle className="h-6 w-6 text-rose-dark" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      Immediate Help
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Available 24 hours, 7 days a week
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* 988 Lifeline */}
                  <a
                    href="tel:988"
                    className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-rose/30 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose/10">
                      <Phone className="h-5 w-5 text-rose-dark" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        988 Suicide & Crisis Lifeline
                      </h3>
                      <p className="text-lg font-bold text-rose-dark">988</p>
                      <p className="text-xs text-muted-foreground">
                        Call or text for immediate support
                      </p>
                    </div>
                  </a>

                  {/* Crisis Text Line */}
                  <a
                    href="sms:741741?body=HOME"
                    className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-rose/30 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage/10">
                      <MessageSquare className="h-5 w-5 text-sage-dark" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        Crisis Text Line
                      </h3>
                      <p className="text-lg font-bold text-sage-dark">
                        Text HOME to 741741
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Free, confidential text support
                      </p>
                    </div>
                  </a>
                </div>

                <div className="mt-6 rounded-lg bg-card p-4">
                  <p className="text-center text-sm text-muted-foreground">
                    If you're in immediate danger, please call{" "}
                    <a
                      href="tel:911"
                      className="font-bold text-rose-dark hover:underline"
                    >
                      911
                    </a>{" "}
                    or go to your nearest emergency room.
                  </p>
                </div>
              </motion.div>

              {/* All Resources Grid */}
              <motion.div variants={itemVariants}>
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  More Support Resources
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {ALL_RESOURCES.map((resource, index) => (
                    <Card
                      key={resource.name}
                      className="transition-all hover:border-sage/30 hover:shadow-md"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                resource.contact.includes("Text")
                                  ? "bg-sage/10"
                                  : "bg-sand/20"
                              }`}
                            >
                              {resource.contact.includes("Text") ? (
                                <MessageSquare className="h-5 w-5 text-sage-dark" />
                              ) : (
                                <Phone className="h-5 w-5 text-sand-dark" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {resource.name}
                              </h3>
                              <p className="text-sm font-bold text-sage-dark">
                                {resource.contact}
                              </p>
                            </div>
                          </div>
                          {resource.available24x7 && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-sand/30 px-2 py-0.5 text-xs text-sand-dark">
                              <Clock className="h-3 w-3" />
                              24/7
                            </span>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-3 text-sm text-muted-foreground">
                          {resource.description}
                        </p>
                        {resource.website && (
                          <a
                            href={resource.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-sage-dark hover:underline"
                          >
                            Visit website
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* What to Expect Section */}
              <motion.div variants={itemVariants} className="mt-12">
                <Card className="border-sage/20 bg-sage/5">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/20">
                        <Sparkles className="h-5 w-5 text-sage-dark" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">
                        What to expect when you reach out
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/20 text-xs font-bold text-sage-dark">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Someone will listen without judgment
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Crisis counselors are trained to provide compassionate, non-judgmental support.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/20 text-xs font-bold text-sage-dark">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Your conversation is confidential
                          </p>
                          <p className="text-sm text-muted-foreground">
                            What you share stays private, with few exceptions for immediate safety concerns.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/20 text-xs font-bold text-sage-dark">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            You'll get help creating a safety plan
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Counselors can help you develop strategies to stay safe and cope with difficult feelings.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/20 text-xs font-bold text-sage-dark">
                          4
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            You can end the call anytime
                          </p>
                          <p className="text-sm text-muted-foreground">
                            You're in control. Stay on as long as you need, and call back whenever you want.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Safety Planning Section */}
              <motion.div variants={itemVariants} className="mt-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand/30">
                        <Shield className="h-5 w-5 text-sand-dark" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">
                        Safety Planning
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">
                      A safety plan is a personalized list of strategies and resources to use when you're in crisis. Consider including:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg bg-muted p-4">
                        <p className="font-medium text-foreground">Warning signs</p>
                        <p className="text-sm text-muted-foreground">
                          Recognize when you're starting to struggle
                        </p>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <p className="font-medium text-foreground">Coping strategies</p>
                        <p className="text-sm text-muted-foreground">
                          Activities that help you feel better
                        </p>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <p className="font-medium text-foreground">People you trust</p>
                        <p className="text-sm text-muted-foreground">
                          Contacts who can support you
                        </p>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <p className="font-medium text-foreground">Safe places</p>
                        <p className="text-sm text-muted-foreground">
                          Locations where you feel secure
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Encouraging Message */}
              <motion.div
                variants={itemVariants}
                className="mt-12 text-center"
              >
                <div className="rounded-2xl border border-sage/20 bg-sage/5 p-8">
                  <Users className="mx-auto mb-4 h-10 w-10 text-sage" />
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Seeking help is brave
                  </h3>
                  <p className="mx-auto max-w-xl text-muted-foreground">
                    Reaching out takes courage. Whether you call a hotline, text a crisis line,
                    or talk to someone you trust, you're taking an important step toward feeling better.
                    You don't have to go through this alone.
                  </p>
                </div>
              </motion.div>

              {/* Back to Toolkit */}
              <motion.div variants={itemVariants} className="mt-8 text-center">
                <p className="mb-4 text-muted-foreground">
                  Looking for self-care tools?
                </p>
                <Link href="/toolkit">
                  <Button variant="outline" className="border-sage hover:bg-sage/10">
                    <Heart className="mr-2 h-4 w-4" />
                    Visit the Toolkit
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
