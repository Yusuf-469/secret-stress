"use client";

/**
 * Admin Context
 *
 * Manages admin authentication state for the SILENT STRESS application.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  isAdminAuthenticated: boolean;
  isAdminLoading: boolean;
  admin: Admin | null;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
}

interface Admin {
  id: string;
  username: string;
  role: string;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Default admin credentials (in production, this should be server-side)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "silentstress2024"
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    // Check for existing admin session
    const savedAdmin = localStorage.getItem("silentStressAdmin");
    if (savedAdmin) {
      try {
        const parsedAdmin = JSON.parse(savedAdmin);
        setAdmin(parsedAdmin);
        setIsAdminAuthenticated(true);
      } catch {
        localStorage.removeItem("silentStressAdmin");
      }
    }
    setIsAdminLoading(false);
  }, []);

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    setIsAdminLoading(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const newAdmin: Admin = {
        id: "1",
        username: username,
        role: "admin",
      };
      
      setAdmin(newAdmin);
      setIsAdminAuthenticated(true);
      localStorage.setItem("silentStressAdmin", JSON.stringify(newAdmin));
      setIsAdminLoading(false);
      return true;
    }
    
    setIsAdminLoading(false);
    return false;
  };

  const adminLogout = () => {
    setAdmin(null);
    setIsAdminAuthenticated(false);
    localStorage.removeItem("silentStressAdmin");
  };

  return (
    <AdminContext.Provider
      value={{ isAdminAuthenticated, isAdminLoading, admin, adminLogin, adminLogout }}
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
