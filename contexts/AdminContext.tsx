"use client";

/**
 * Admin Context
 *
 * Manages admin authentication state for the SILENT STRESS application.
 * Uses Firebase Auth + custom claims for secure admin access.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { checkAdminRole } from "@/lib/admin";

interface AdminContextType {
  isAdminAuthenticated: boolean;
  isAdminLoading: boolean;
  admin: Admin | null;
  isRegularUser: boolean; // User is logged in but not admin
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
  refreshAdminStatus: () => Promise<void>;
}

interface Admin {
  id: string;
  email: string;
  role: string;
  uid: string;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isRegularUser, setIsRegularUser] = useState(false);

  // Check admin role for current user
  const checkAndSetAdminStatus = async (user: User | null) => {
    if (!user) {
      setIsAdminAuthenticated(false);
      setAdmin(null);
      setIsRegularUser(false);
      setIsAdminLoading(false);
      return;
    }

    setCurrentUser(user);

    try {
      const isAdmin = await checkAdminRole();
      if (isAdmin) {
        const adminData: Admin = {
          id: user.uid,
          email: user.email || "",
          role: "admin",
          uid: user.uid,
        };

        setAdmin(adminData);
        setIsAdminAuthenticated(true);
        setIsRegularUser(false);
      } else {
        setIsAdminAuthenticated(false);
        setAdmin(null);
        setIsRegularUser(true); // User is logged in but not admin
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdminAuthenticated(false);
      setAdmin(null);
      setIsRegularUser(false);
    }

    setIsAdminLoading(false);
  };

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      checkAndSetAdminStatus(user);
    });

    return () => unsubscribe();
  }, []);

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setIsAdminLoading(true);

    try {
      // Note: This function now expects Firebase authentication
      // The actual login should happen through Firebase Auth
      // This is a placeholder - real login happens in the component
      setIsAdminLoading(false);
      return false;
    } catch (error) {
      console.error("Admin login error:", error);
      setIsAdminLoading(false);
      return false;
    }
  };

  const adminLogout = async () => {
    try {
      await auth.signOut();
      setAdmin(null);
      setIsAdminAuthenticated(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Admin logout error:", error);
    }
  };

  const refreshAdminStatus = async () => {
    if (currentUser) {
      await checkAndSetAdminStatus(currentUser);
    }
  };

  return (
    <AdminContext.Provider
      value={{ isAdminAuthenticated, isAdminLoading, admin, isRegularUser, adminLogin, adminLogout, refreshAdminStatus }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
