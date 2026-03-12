"use client";

/**
 * Providers Wrapper
 *
 * Client-side providers for the SILENT STRESS application.
 */

import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </AdminProvider>
  );
}

