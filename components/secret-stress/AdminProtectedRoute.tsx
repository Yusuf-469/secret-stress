"use client";

/**
 * Admin Protected Route Component
 *
 * Wraps admin-only pages and redirects to admin login if not authenticated as admin.
 * Uses Firebase custom claims to verify admin role server-side.
 */

import { useEffect, ReactNode } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { useRouter } from "next/navigation";

export function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const { isAdminAuthenticated, isAdminLoading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!isAdminLoading && !isAdminAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAdminAuthenticated, isAdminLoading, router]);

  if (isAdminLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-blue-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return null;
  }

  return <>{children}</>;
}