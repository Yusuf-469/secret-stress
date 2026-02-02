"use client";

/**
 * Providers Wrapper
 *
 * Client-side providers for the Secret Stress application.
 */

import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
