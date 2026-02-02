"use client";

/**
 * Navigation Component
 *
 * Mobile-first responsive navigation for Secret Stress.
 * Includes emergency exit button and accessible navigation.
 *
 * Features:
 * - Mobile-first responsive design
 * - Links: Home, Submit, Community, Toolkit, Crisis Resources, About
 * - Active state indicator
 * - Emergency exit button integrated
 * - Accessible with aria-current
 * - Collapses to hamburger on mobile
 */

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  PenLine,
  Users,
  Heart,
  Phone,
  Info,
  LogIn,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/submit", label: "Submit", icon: PenLine },
  { href: "/community", label: "Community", icon: Users },
  { href: "/toolkit", label: "Toolkit", icon: Heart },
  { href: "/crisis-resources", label: "Crisis Resources", icon: Phone },
  { href: "/about", label: "About", icon: Info },
  { href: "/login", label: "Login", icon: LogIn },
];

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleEmergencyExit = useCallback(() => {
    // Clear sensitive data before redirecting
    if (typeof window !== "undefined") {
      const forms = document.querySelectorAll("form");
      forms.forEach((form) => form.reset());
      window.location.href = "https://www.google.com/search?q=weather";
    }
  }, []);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/";
      }
      return pathname.startsWith(href);
    },
    [pathname]
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-foreground transition-colors hover:text-sage-dark"
        >
          <Heart className="h-5 w-5 text-sage" />
          <span>Secret Stress</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-sage-dark"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-md bg-sage/10"
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Emergency Exit */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            onClick={handleEmergencyExit}
            variant="destructive"
            size="sm"
            className="gap-1.5"
          >
            <LogOut className="h-4 w-4" />
            Exit
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Emergency Exit */}
          <Button
            onClick={handleEmergencyExit}
            variant="destructive"
            size="icon"
            className="h-9 w-9"
            aria-label="Emergency exit"
          >
            <LogOut className="h-4 w-4" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-full flex-col">
                {/* Mobile Nav Header */}
                <div className="flex items-center justify-between border-b pb-4">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    <Heart className="h-5 w-5 text-sage" />
                    <span>Secret Stress</span>
                  </Link>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex-1 py-4" aria-label="Mobile navigation">
                  <ul className="space-y-1">
                    {NAV_LINKS.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.href);

                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors",
                              active
                                ? "bg-sage/10 text-sage-dark"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                            aria-current={active ? "page" : undefined}
                          >
                            <Icon className="h-5 w-5" />
                            <span>{link.label}</span>
                            {active && (
                              <motion.div
                                layoutId="mobileActiveNav"
                                className="ml-auto h-2 w-2 rounded-full bg-sage"
                                transition={
                                  shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }
                                }
                              />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Mobile Nav Footer */}
                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground">
                    You're not alone. Help is always available.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
