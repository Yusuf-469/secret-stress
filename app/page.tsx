"use client";

/**
 * Landing Page - SILENT STRESS
 *
 * The main entry point for the SILENT STRESS application.
 * Features a beautiful scroll-interactive landing page with animations.
 * Mobile-optimized with smooth scrolling animations.
 */

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquare,
  Users,
  Phone,
  Heart,
  PenLine,
  Shield,
  Clock,
  ArrowRight,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navigation } from "@/components/secret-stress/Navigation";
import { Footer } from "@/components/secret-stress/Footer";
import { FeatureCard, FeatureGrid } from "@/components/secret-stress/FeatureCard";
import { ScrollReveal } from "@/components/secret-stress/ScrollReveal";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: MessageSquare,
    title: "Anonymous Sharing",
    description:
      "Share your thoughts without fear of judgment. Your identity stays completely private.",
    variant: "sage" as const,
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Connect with others who understand what you're going through. You're not alone.",
    variant: "sand" as const,
  },
  {
    icon: Phone,
    title: "Crisis Resources",
    description:
      "Immediate access to professional help when you need it most. 24/7 support available.",
    variant: "rose" as const,
  },
  {
    icon: Heart,
    title: "Self-Care Toolkit",
    description:
      "Breathing exercises and coping strategies to help you manage stress in the moment.",
    variant: "sage" as const,
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Write",
    description: "Express what's on your mind in a safe, anonymous space.",
  },
  {
    step: "2",
    title: "Share",
    description: "Submit your story to the community with optional tags.",
  },
  {
    step: "3",
    title: "Connect",
    description: "Read others' stories and realize you're not alone.",
  },
];

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const { login, signup, isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await signup(email, password);
    }
    router.push("/submit");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // If already authenticated, show logged in state
  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-background via-sage/5 to-background px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage/20">
                <Heart className="h-10 w-10 text-sage" />
              </div>
              <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Welcome to SILENT STRESS
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                You are now logged in. Start sharing your story or browse the community.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/submit">
                  <Button size="lg" className="bg-sage hover:bg-sage-dark">
                    <PenLine className="mr-2 h-4 w-4" />
                    Share your story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/community">
                  <Button size="lg" variant="outline" className="border-sage">
                    <Users className="mr-2 h-4 w-4" />
                    Browse Community
                  </Button>
                </Link>
              </div>
              <Button
                variant="ghost"
                className="mt-6 text-muted-foreground"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative overflow-hidden bg-gradient-to-b from-sage/10 via-background to-background px-4 py-16 md:py-24"
      >
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-sage/10 blur-3xl"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-rose/10 blur-3xl"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>

        <div className="container relative mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left - Hero Content */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              {/* Logo */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6"
              >
                <Image
                  src="/silent stress.png"
                  alt="SILENT STRESS"
                  width={200}
                  height={60}
                  className="mx-auto lg:mx-0"
                  priority
                />
              </motion.div>

              <motion.h1
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
              >
                Your stress is valid.
                <br />
                <span className="text-sage-dark">You're not alone.</span>
              </motion.h1>

              <motion.p
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground md:text-xl lg:mx-0"
              >
                SILENT STRESS is a safe space for students to share academic pressure
                anonymously. No judgment, no tracking—just support from people who
                understand.
              </motion.p>

              {/* Trust indicators */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm lg:justify-start"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/10">
                    <Shield className="h-4 w-4 text-sage-dark" />
                  </div>
                  <span className="text-muted-foreground">100% Anonymous</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/10">
                    <Clock className="h-4 w-4 text-sage-dark" />
                  </div>
                  <span className="text-muted-foreground">Auto-delete in 30 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/10">
                    <Heart className="h-4 w-4 text-sage-dark" />
                  </div>
                  <span className="text-muted-foreground">No Tracking</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Login/Signup Card */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto w-full max-w-md"
            >
              <Card className="border-sage/20 bg-card/80 backdrop-blur-sm shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </CardTitle>
                  <CardDescription>
                    {isLogin
                      ? "Sign in to continue"
                      : "Join to start sharing"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-sage/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="border-sage/30 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-sage hover:bg-sage-dark"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
                    </Button>
                  </form>

                  <div className="mt-4 text-center text-sm">
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sage-dark hover:underline"
                    >
                      {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                  </div>

                  <div className="mt-4 rounded-lg bg-sage/5 p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      <span>Your privacy is protected - optional email</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-sm text-muted-foreground"
          >
            <span>Scroll to learn more</span>
            <div className="h-6 w-6 rounded-full border-2 border-sage/30 flex items-center justify-center">
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-sage"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section with scroll animations */}
      <section className="bg-muted/30 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal direction="up" duration={0.6} className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              What we offer
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Tools and support designed specifically for students dealing with academic pressure.
            </p>
          </ScrollReveal>

          <FeatureGrid columns={4}>
            {features.map((feature, index) => (
              <ScrollReveal
                key={feature.title}
                direction="up"
                duration={0.5}
                delay={index * 0.1}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  variant={feature.variant}
                />
              </ScrollReveal>
            ))}
          </FeatureGrid>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal direction="up" duration={0.6} className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              How it works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Getting started is simple. Three steps to finding support.
            </p>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((item, index) => (
              <ScrollReveal
                key={item.step}
                direction="up"
                duration={0.5}
                delay={index * 0.15}
                className="relative text-center"
              >
                {index < howItWorks.length - 1 && (
                  <div className="absolute left-1/2 top-12 hidden h-0.5 w-full -translate-x-0 bg-border md:block" />
                )}
                <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sage/5 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal direction="up" duration={0.6}>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Ready to share your story?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              Taking the first step can be hard, but you don't have to do it alone.
              Your voice matters, and someone out there needs to hear it.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/submit">
                <Button size="lg" className="bg-sage hover:bg-sage-dark">
                  <PenLine className="mr-2 h-4 w-4" />
                  Start sharing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-sage">
                  Learn more
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

