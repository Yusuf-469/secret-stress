"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ResponsiveNavigation } from "./ResponsiveNavigation";

export function AuthenticatedNavigation({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If not authenticated, just show children (no navigation)
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