/**
 * Reusable Auth Error Display Component
 *
 * Shows authentication errors in a consistent, styled way across all login forms.
 */

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface AuthErrorDisplayProps {
  error: string;
  className?: string;
}

export function AuthErrorDisplay({ error, className = "" }: AuthErrorDisplayProps) {
  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-center gap-2 rounded-lg bg-red-50 border border-red-100 p-3 text-sm text-red-600 ${className}`}
    >
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{error}</span>
    </motion.div>
  );
}

/**
 * Reusable Auth Loading Button
 *
 * Shows loading state with proper text for different auth operations.
 */

import { Button } from "@/components/ui/button";
import { getAuthLoadingText } from "@/lib/auth-errors";

interface AuthLoadingButtonProps {
  isLoading: boolean;
  operation: "login" | "signup" | "reset";
  provider?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function AuthLoadingButton({
  isLoading,
  operation,
  provider,
  children,
  className = "",
  disabled = false,
  ...props
}: AuthLoadingButtonProps & React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={className}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? getAuthLoadingText(operation, provider) : children}
    </Button>
  );
}