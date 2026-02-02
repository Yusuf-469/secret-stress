"use client";

/**
 * FeatureCard Component
 *
 * Reusable card for showcasing features on the landing page.
 *
 * Features:
 * - Icon, title, description
 * - Hover animations
 * - Warm, supportive design
 * - Accessible focus states
 */

import { motion, useReducedMotion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  variant?: "default" | "sage" | "sand" | "rose";
}

const variantStyles = {
  default: {
    iconBg: "bg-muted",
    iconColor: "text-foreground",
    hoverBorder: "hover:border-sage/30",
  },
  sage: {
    iconBg: "bg-sage/10",
    iconColor: "text-sage-dark",
    hoverBorder: "hover:border-sage/50",
  },
  sand: {
    iconBg: "bg-sand/30",
    iconColor: "text-sand-dark",
    hoverBorder: "hover:border-sand/50",
  },
  rose: {
    iconBg: "bg-rose/10",
    iconColor: "text-rose-dark",
    hoverBorder: "hover:border-rose/50",
  },
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  variant = "default",
}: FeatureCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -4,
              transition: { duration: 0.2 },
            }
      }
      className={cn(
        "group relative rounded-xl border border-border bg-card p-6 transition-all duration-300",
        "hover:shadow-lg",
        styles.hoverBorder,
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-300",
          styles.iconBg
        )}
      >
        <Icon className={cn("h-6 w-6", styles.iconColor)} />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Hover indicator */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-1 w-0 rounded-b-xl transition-all duration-300 group-hover:w-full",
          variant === "sage" && "bg-sage",
          variant === "sand" && "bg-sand",
          variant === "rose" && "bg-rose",
          variant === "default" && "bg-sage"
        )}
      />
    </motion.div>
  );
}

interface FeatureGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function FeatureGrid({
  children,
  className,
  columns = 3,
}: FeatureGridProps) {
  const columnClasses = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={cn(
        "grid gap-6",
        columnClasses[columns],
        className
      )}
    >
      {children}
    </div>
  );
}

export default FeatureCard;
