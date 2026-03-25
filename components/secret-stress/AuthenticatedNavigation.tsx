"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ResponsiveNavigation } from "./ResponsiveNavigation";

export function AuthenticatedNavigation({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  // While checking auth state, show children without navigation to avoid flicker
  if (isLoading) {
    return <>{children}</>;
  }

  // If not authenticated, just show children (no navigation)
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // If authenticated, show the responsive navigation
  return (
    <>
      <ResponsiveNavigation />
      {children}
    </>
  );
}