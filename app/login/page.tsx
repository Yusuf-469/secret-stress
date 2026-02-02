"use client";

/**
 * Login/Signup Page - Secret Stress
 *
 * Authentication page with login and signup options.
 * This is the entry point - users must authenticate to access the site.
 */

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Shield,
  Lock,
  User,
  ArrowRight,
  Heart,
  CheckCircle,
  Zap,
  Users,
  Clock,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollReveal } from "@/components/secret-stress/ScrollReveal";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: Shield,
    title: "Complete Anonymity",
    description: "No account required. No tracking. No personal data collected.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Your identity stays hidden. Your secrets remain safe.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with others who understand your struggles.",
  },
  {
    icon: Clock,
    title: "Auto-Delete",
    description: "All content is automatically removed after 30 days.",
  },
];

const privacyBenefits = [
  "No email or phone number required",
  "No cookies or tracking scripts",
  "No IP address logging",
  "No third-party data sharing",
  "Local storage only",
  "Random ID generation for posts",
];

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push("/submit");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await signup(email, password);
    }
    router.push("/submit");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gradient-to-b from-background via-sage/5 to-background">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Login/Signup Form */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto w-full max-w-md"
            >
              <Card className="border-sage/20 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/10">
                    <User className="h-6 w-6 text-sage-dark" />
                  </div>
                  <CardTitle className="text-2xl">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </CardTitle>
                  <CardDescription>
                    {isLogin
                      ? "Sign in to access your anonymous dashboard"
                      : "Join to start sharing your story"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com (optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-sage/30"
                      />
                      <p className="text-xs text-muted-foreground">
                        Email is optional - we respect your privacy
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="border-sage/30 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-sage hover:bg-sage-dark"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <Zap className="h-4 w-4 animate-pulse" />
                          {isLogin ? "Signing in..." : "Creating account..."}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          {isLogin ? "Sign In" : "Create Account"}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                      <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sage-dark hover:underline"
                      >
                        {isLogin ? "Sign up" : "Sign in"}
                      </button>
                    </p>
                  </div>

                  {/* Privacy notice */}
                  <div className="mt-6 rounded-lg bg-sage/5 p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage-dark" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Your privacy is protected
                        </p>
                        <p className="text-xs text-muted-foreground">
                          This platform is designed to be anonymous. Even if you
                          create an account, we don't collect or store personal
                          data that could identify you.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - About & Features */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* About Section */}
              <ScrollReveal direction="up" duration={0.6}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sage/10 px-4 py-1.5 text-sm font-medium text-sage-dark">
                  <Heart className="h-4 w-4" />
                  About Secret Stress
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" duration={0.6} delay={0.1}>
                <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                  A safe space for students
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" duration={0.6} delay={0.2}>
                <p className="text-lg text-muted-foreground">
                  Secret Stress was created with one simple goal: to give students
                  a place to share their struggles without fear of judgment or
                  exposure. We believe every student deserves support—without
                  having to reveal their identity.
                </p>
              </ScrollReveal>

              {/* Features Grid */}
              <div>
                <ScrollReveal direction="up" duration={0.6} delay={0.3}>
                  <h2 className="mb-6 text-2xl font-bold text-foreground">
                    Our Features
                  </h2>
                </ScrollReveal>
                <div className="grid gap-4 sm:grid-cols-2">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <ScrollReveal
                        key={feature.title}
                        direction="up"
                        duration={0.5}
                        delay={0.4 + index * 0.1}
                        className="rounded-lg border border-sage/20 bg-card p-4 transition-all hover:border-sage/40 hover:bg-sage/5"
                      >
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-sage/10">
                          <Icon className="h-5 w-5 text-sage-dark" />
                        </div>
                        <h3 className="mb-1 font-semibold text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>

              {/* Anonymity Benefits */}
              <Card className="border-sand/30 bg-sand/10">
                <CardContent className="p-6">
                  <ScrollReveal direction="up" duration={0.5} delay={0.5}>
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="h-6 w-6 text-sand-dark" />
                      <h3 className="text-lg font-bold text-foreground">
                        Anonymity Guaranteed
                      </h3>
                    </div>
                  </ScrollReveal>
                  <ul className="space-y-2">
                    {privacyBenefits.map((benefit, index) => (
                      <ScrollReveal
                        key={benefit}
                        direction="left"
                        duration={0.3}
                        delay={0.6 + index * 0.05}
                      >
                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 flex-shrink-0 text-sage" />
                          {benefit}
                        </li>
                      </ScrollReveal>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
