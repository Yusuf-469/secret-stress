"use client";

/**
 * Toolkit Page - Secret Stress
 *
 * Provides self-care tools and coping strategies for managing stress.
 * Features the BreathingWidget prominently, plus additional coping
 * strategies with expandable details.
 */

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Wind,
  Footprints,
  Moon,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Navigation } from "@/components/secret-stress/Navigation";
import { Footer } from "@/components/secret-stress/Footer";
import { BreathingWidget } from "@/components/secret-stress/BreathingWidget";
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

interface CopingStrategy {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  duration: string;
  steps: string[];
  whenToUse: string;
  color: string;
}

const copingStrategies: CopingStrategy[] = [
  {
    id: "grounding",
    title: "5-4-3-2-1 Grounding Technique",
    description:
      "A simple exercise to bring you back to the present moment when feeling overwhelmed or anxious.",
    icon: Footprints,
    duration: "2-5 minutes",
    steps: [
      "5: Look around and name 5 things you can SEE",
      "4: Name 4 things you can TOUCH or feel",
      "3: Listen for 3 things you can HEAR",
      "2: Identify 2 things you can SMELL",
      "1: Notice 1 thing you can TASTE",
    ],
    whenToUse:
      "When you're feeling anxious, dissociated, or overwhelmed by racing thoughts.",
    color: "sage",
  },
  {
    id: "pmr",
    title: "Progressive Muscle Relaxation",
    description:
      "Systematically tense and release muscle groups to reduce physical tension and promote relaxation.",
    icon: Sparkles,
    duration: "10-15 minutes",
    steps: [
      "Find a comfortable position, sitting or lying down",
      "Start with your toes - tense for 5 seconds, then release",
      "Move to your calves - tense for 5 seconds, then release",
      "Continue upward: thighs, stomach, chest, hands, arms, shoulders",
      "Finish with your face - scrunch up, then release",
      "Notice the difference between tension and relaxation",
    ],
    whenToUse:
      "When you're experiencing physical tension, trouble sleeping, or general anxiety.",
    color: "sand",
  },
  {
    id: "journaling",
    title: "Journaling Prompts",
    description:
      "Writing can help process emotions and gain clarity during stressful times.",
    icon: BookOpen,
    duration: "10-20 minutes",
    steps: [
      "What's weighing on me right now?",
      "What would I tell a friend going through this?",
      "What's one small thing I can do to take care of myself today?",
      "What am I grateful for, even in this difficult moment?",
      "What would my future self want me to remember?",
    ],
    whenToUse:
      "When you need to process emotions, gain perspective, or clear your mind.",
    color: "rose",
  },
  {
    id: "sleep",
    title: "Sleep Hygiene Tips",
    description:
      "Improve your sleep quality with these evidence-based practices.",
    icon: Moon,
    duration: "Ongoing practice",
    steps: [
      "Keep a consistent sleep schedule, even on weekends",
      "Create a relaxing bedtime routine (reading, warm bath, gentle stretching)",
      "Keep your bedroom cool, dark, and quiet",
      "Avoid screens 1 hour before bed (blue light affects melatonin)",
      "Limit caffeine after 2 PM and heavy meals before bedtime",
      "If you can't sleep after 20 minutes, get up and do something calming",
    ],
    whenToUse:
      "When you're having trouble falling asleep, staying asleep, or feeling rested.",
    color: "sage",
  },
];

function StrategyCard({ strategy }: { strategy: CopingStrategy }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const Icon = strategy.icon;

  const colorClasses = {
    sage: {
      bg: "bg-sage/10",
      text: "text-sage-dark",
      border: "border-sage/20",
      hover: "hover:border-sage/30",
    },
    sand: {
      bg: "bg-sand/20",
      text: "text-sand-dark",
      border: "border-sand/30",
      hover: "hover:border-sand/40",
    },
    rose: {
      bg: "bg-rose/10",
      text: "text-rose-dark",
      border: "border-rose/20",
      hover: "hover:border-rose/30",
    },
  };

  const colors = colorClasses[strategy.color as keyof typeof colorClasses];

  return (
    <Card
      className={`transition-all ${colors.hover} ${isExpanded ? colors.border : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colors.bg}`}>
              <Icon className={`h-5 w-5 ${colors.text}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{strategy.title}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{strategy.duration}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="shrink-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-sm text-muted-foreground">
          {strategy.description}
        </p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t pt-4">
                <p className={`mb-3 text-sm font-medium ${colors.text}`}>
                  When to use this:
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  {strategy.whenToUse}
                </p>

                <p className={`mb-3 text-sm font-medium ${colors.text}`}>
                  Steps:
                </p>
                <ol className="space-y-2">
                  {strategy.steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${colors.bg} text-xs font-medium ${colors.text}`}
                      >
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isExpanded && (
          <Button
            variant="link"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className={`h-auto p-0 ${colors.text}`}
          >
            Show steps
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function ToolkitPage() {
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
              <motion.div variants={itemVariants} className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sage/10 px-4 py-1.5 text-sm font-medium text-sage-dark">
                  <Heart className="h-4 w-4" />
                  Self-Care Toolkit
                </div>
                <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
                  Tools for your wellbeing
                </h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                  These exercises and techniques can help you manage stress in the moment
                  and build resilience over time. Take what works for you.
                </p>
              </motion.div>

              {/* Breathing Widget - Prominent */}
              <motion.div variants={itemVariants} className="mb-12">
                <div className="rounded-2xl border border-sage/20 bg-gradient-to-b from-sage/5 to-background p-6 md:p-8">
                  <div className="mb-6 text-center">
                    <div className="mb-3 inline-flex items-center gap-2">
                      <Wind className="h-5 w-5 text-sage" />
                      <span className="text-sm font-medium text-sage-dark">
                        Featured Tool
                      </span>
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-foreground">
                      Take a moment to breathe
                    </h2>
                    <p className="text-muted-foreground">
                      The 4-7-8 breathing technique can help calm your nervous system
                      and reduce anxiety in just a few minutes.
                    </p>
                  </div>
                  <div className="mx-auto max-w-md">
                    <BreathingWidget />
                  </div>
                </div>
              </motion.div>

              {/* Coping Strategies Grid */}
              <motion.div variants={itemVariants}>
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  Additional coping strategies
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {copingStrategies.map((strategy) => (
                    <StrategyCard key={strategy.id} strategy={strategy} />
                  ))}
                </div>
              </motion.div>

              {/* Encouragement Section */}
              <motion.div
                variants={itemVariants}
                className="mt-12 rounded-2xl border border-sand/30 bg-sand/10 p-8 text-center"
              >
                <Sparkles className="mx-auto mb-4 h-10 w-10 text-sand-dark" />
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  Be gentle with yourself
                </h3>
                <p className="mx-auto max-w-xl text-muted-foreground">
                  These tools are here to support you, but they're not a replacement for
                  professional help when you need it. If you're struggling, reaching out
                  to a counselor, therapist, or crisis line is a sign of strength.
                </p>
              </motion.div>

              {/* Crisis Resources CTA */}
              <motion.div variants={itemVariants} className="mt-8 text-center">
                <p className="mb-4 text-muted-foreground">
                  Need immediate support?
                </p>
                <Link href="/crisis-resources">
                  <Button variant="outline" className="border-rose/30 text-rose-dark hover:bg-rose/10">
                    <Phone className="mr-2 h-4 w-4" />
                    View Crisis Resources
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
