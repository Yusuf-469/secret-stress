"use client";

/**
 * Footer Component
 *
 * Warm, reassuring footer with privacy reminders and quick links.
 *
 * Features:
 * - Privacy reminder
 * - Auto-delete notice
 * - Quick links to Crisis Resources
 * - Warm, reassuring tone
 */

import Link from "next/link";
import { Heart, Shield, Clock, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t bg-muted/30",
        className
      )}
    >
      <div className="container px-4 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold text-foreground"
            >
              <Heart className="h-5 w-5 text-sage" />
              <span>Secret Stress</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A safe, anonymous space for students to share academic pressure
              and find support. You're not alone.
            </p>
          </div>

          {/* Privacy & Safety */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Privacy & Safety
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                <span className="text-sm text-muted-foreground">
                  No tracking. Your data stays on your device.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sand-dark" />
                <span className="text-sm text-muted-foreground">
                  Stories automatically delete after 30 days.
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Need Help?
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/crisis-resources"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-sage-dark"
                >
                  <Phone className="h-4 w-4" />
                  Crisis Resources
                </Link>
              </li>
              <li>
                <a
                  href="https://988lifeline.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-sage-dark"
                >
                  988 Suicide & Crisis Lifeline
                </a>
              </li>
              <li>
                <a
                  href="https://www.crisistextline.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-sage-dark"
                >
                  Crisis Text Line: Text HOME to 741741
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-xs text-muted-foreground">
            {currentYear} Secret Stress. Made with care for students everywhere.
          </p>
          <p className="text-xs text-muted-foreground">
            If you're in immediate danger, please call{" "}
            <a
              href="tel:911"
              className="font-medium text-sage-dark hover:underline"
            >
              911
            </a>{" "}
            or go to your nearest emergency room.
          </p>
        </div>

        {/* Warm Message */}
        <div className="mt-8 text-center">
          <p className="text-sm italic text-sage-dark">
            &ldquo;Your feelings are valid. Your story matters. You are not alone.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
