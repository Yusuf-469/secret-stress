"use client";

/**
 * Auth Context
 *
 * Manages authentication state for the SILENT STRESS application.
 * Uses Firebase Auth for secure user authentication.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { userOps } from "@/lib/database";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: number;
  submissionCount: number;
  status: 'active' | 'flagged' | 'banned';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Convert Firebase user to our User type
  const convertFirebaseUser = async (firebaseUser: FirebaseUser): Promise<User> => {
    // Try to get user profile from database
    let dbUser: any;
    try {
      dbUser = await userOps.getById(firebaseUser.uid);
    } catch (error) {
      console.warn("Could not read user from database:", error);
    }

    if (!dbUser) {
      // Create new user profile
      dbUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || undefined,
        createdAt: Date.now(),
        submissionCount: 0,
        status: 'active' as const,
      };

      // Try to save to database (don't fail if it doesn't work)
      try {
        await userOps.upsert(dbUser as Omit<User, 'id'> & { id: string });
      } catch (error) {
        console.warn("Could not save user to database:", error);
      }
    }

    return {
      id: dbUser.id,
      email: dbUser.email || '',
      displayName: dbUser.displayName,
      createdAt: dbUser.createdAt,
      submissionCount: dbUser.submissionCount || 0,
      status: (dbUser.status as User['status']) || 'active',
    };
  };

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is authenticated with Firebase
        setIsAuthenticated(true);

        // Try to load additional user data from database (don't fail auth if this fails)
        try {
          const userData = await convertFirebaseUser(firebaseUser);
          setUser(userData);
        } catch (error) {
          console.warn("Error loading user data from database:", error);
          // Still set basic user data from Firebase
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || undefined,
            createdAt: Date.now(),
            submissionCount: 0,
            status: 'active' as const,
          });
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User state will be updated by the onAuthStateChanged listener
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.message || "Login failed");
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // User state will be updated by the onAuthStateChanged listener
    } catch (error: any) {
      console.error("Signup error:", error);
      throw new Error(error.message || "Signup failed");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // User state will be updated by the onAuthStateChanged listener
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

