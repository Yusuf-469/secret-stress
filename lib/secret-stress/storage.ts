"use client";

/**
 * Storage utilities for Secret Stress
 * Client-side only localStorage management with privacy-first design
 * 
 * IMPORTANT: All data is stored locally and automatically expires after 30 days.
 * No data is ever sent to any server.
 */

import {
  Submission,
  STORAGE_KEYS,
  DATA_RETENTION_DAYS,
  AppSettings,
  BreathingSession,
} from "@/types/secret-stress";

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Check if code is running on client side
 */
const isClient = (): boolean => {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
};

/**
 * Generate a unique ID
 */
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Get current ISO timestamp
 */
const getTimestamp = (): string => {
  return new Date().toISOString();
};

/**
 * Check if a date is older than the retention period
 */
const isExpired = (timestamp: string): boolean => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > DATA_RETENTION_DAYS;
};

// ============================================================================
// Submissions Storage
// ============================================================================

/**
 * Save a submission to localStorage
 * Automatically removes expired entries before saving
 */
export const saveSubmission = (submission: Omit<Submission, "id" | "timestamp">): Submission => {
  if (!isClient()) {
    throw new Error("Storage operations can only be performed on the client side");
  }

  // Clean up expired entries first
  deleteExpiredSubmissions();

  const newSubmission: Submission = {
    ...submission,
    id: generateId(),
    timestamp: getTimestamp(),
  };

  try {
    const existingData = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    const submissions: Submission[] = existingData ? JSON.parse(existingData) : [];
    submissions.push(newSubmission);
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    return newSubmission;
  } catch (error) {
    console.error("Failed to save submission:", error);
    throw new Error("Unable to save your message. Please try again.");
  }
};

/**
 * Get all non-expired submissions from localStorage
 * Returns submissions sorted by timestamp (newest first)
 */
export const getSubmissions = (): Submission[] => {
  if (!isClient()) {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!data) return [];

    const submissions: Submission[] = JSON.parse(data);
    
    // Filter out expired entries
    const validSubmissions = submissions.filter(
      (sub) => !isExpired(sub.timestamp)
    );

    // Save cleaned list back if we removed any
    if (validSubmissions.length !== submissions.length) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(validSubmissions));
    }

    // Sort by timestamp descending (newest first)
    return validSubmissions.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error("Failed to retrieve submissions:", error);
    return [];
  }
};

/**
 * Delete a specific submission by ID
 */
export const deleteSubmission = (id: string): boolean => {
  if (!isClient()) {
    return false;
  }

  try {
    const existingData = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!existingData) return false;

    const submissions: Submission[] = JSON.parse(existingData);
    const filtered = submissions.filter((sub) => sub.id !== id);
    
    if (filtered.length === submissions.length) {
      return false; // No submission was removed
    }

    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Failed to delete submission:", error);
    return false;
  }
};

/**
 * Delete all expired submissions (older than 30 days)
 * Returns count of deleted entries
 */
export const deleteExpiredSubmissions = (): number => {
  if (!isClient()) {
    return 0;
  }

  try {
    const data = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!data) return 0;

    const submissions: Submission[] = JSON.parse(data);
    const validSubmissions = submissions.filter(
      (sub) => !isExpired(sub.timestamp)
    );

    const deletedCount = submissions.length - validSubmissions.length;
    
    if (deletedCount > 0) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(validSubmissions));
    }

    return deletedCount;
  } catch (error) {
    console.error("Failed to delete expired submissions:", error);
    return 0;
  }
};

// ============================================================================
// Emergency Data Wipe
// ============================================================================

/**
 * Clear ALL Secret Stress data from localStorage
 * Use this for emergency situations or user request
 * Returns true if successful
 */
export const clearAllData = (): boolean => {
  if (!isClient()) {
    return false;
  }

  try {
    // Remove all Secret Stress related keys
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });

    return true;
  } catch (error) {
    console.error("Failed to clear all data:", error);
    return false;
  }
};

// ============================================================================
// Settings Storage
// ============================================================================

/**
 * Default app settings
 */
const DEFAULT_SETTINGS: AppSettings = {
  theme: "system",
  blurEnabled: false,
  defaultBreathingTechnique: "4-7-8",
  showCrisisResources: true,
  notifications: {
    breathingReminders: false,
    reminderFrequency: 4,
    crisisCheckIns: false,
  },
  accessibility: {
    reduceMotion: false,
    highContrast: false,
    largeText: false,
    screenReaderOptimized: false,
  },
};

/**
 * Save app settings to localStorage
 */
export const saveSettings = (settings: Partial<AppSettings>): AppSettings => {
  if (!isClient()) {
    throw new Error("Storage operations can only be performed on the client side");
  }

  try {
    const existingData = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const currentSettings: AppSettings = existingData
      ? { ...DEFAULT_SETTINGS, ...JSON.parse(existingData) }
      : DEFAULT_SETTINGS;
    
    const newSettings = { ...currentSettings, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
    return newSettings;
  } catch (error) {
    console.error("Failed to save settings:", error);
    throw new Error("Unable to save settings.");
  }
};

/**
 * Get app settings from localStorage
 */
export const getSettings = (): AppSettings => {
  if (!isClient()) {
    return DEFAULT_SETTINGS;
  }

  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch (error) {
    console.error("Failed to retrieve settings:", error);
    return DEFAULT_SETTINGS;
  }
};

// ============================================================================
// Breathing Sessions Storage
// ============================================================================

/**
 * Save a breathing session to localStorage
 */
export const saveBreathingSession = (
  session: Omit<BreathingSession, "id" | "completedAt">
): BreathingSession => {
  if (!isClient()) {
    throw new Error("Storage operations can only be performed on the client side");
  }

  const newSession: BreathingSession = {
    ...session,
    id: generateId(),
    completedAt: getTimestamp(),
  };

  try {
    const existingData = localStorage.getItem(STORAGE_KEYS.BREATHING_SESSIONS);
    const sessions: BreathingSession[] = existingData ? JSON.parse(existingData) : [];
    sessions.push(newSession);
    localStorage.setItem(STORAGE_KEYS.BREATHING_SESSIONS, JSON.stringify(sessions));
    return newSession;
  } catch (error) {
    console.error("Failed to save breathing session:", error);
    throw new Error("Unable to save session.");
  }
};

/**
 * Get all breathing sessions from localStorage
 */
export const getBreathingSessions = (): BreathingSession[] => {
  if (!isClient()) {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEYS.BREATHING_SESSIONS);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to retrieve breathing sessions:", error);
    return [];
  }
};

// ============================================================================
// Stats Storage
// ============================================================================

/**
 * Get usage statistics
 * Note: All calculations are done client-side, no data leaves the device
 */
export const getStats = () => {
  if (!isClient()) {
    return {
      totalSubmissions: 0,
      totalBreathingSessions: 0,
      totalBreathingMinutes: 0,
      lastVisit: null,
    };
  }

  try {
    const submissions = getSubmissions();
    const breathingSessions = getBreathingSessions();
    const lastVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT);

    // Calculate total breathing minutes
    const totalBreathingSeconds = breathingSessions.reduce(
      (acc, session) => acc + session.duration,
      0
    );

    return {
      totalSubmissions: submissions.length,
      totalBreathingSessions: breathingSessions.length,
      totalBreathingMinutes: Math.round(totalBreathingSeconds / 60),
      lastVisit: lastVisit ? new Date(lastVisit) : null,
    };
  } catch (error) {
    console.error("Failed to calculate stats:", error);
    return {
      totalSubmissions: 0,
      totalBreathingSessions: 0,
      totalBreathingMinutes: 0,
      lastVisit: null,
    };
  }
};

/**
 * Update last visit timestamp
 */
export const updateLastVisit = (): void => {
  if (!isClient()) return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_VISIT, getTimestamp());
  } catch (error) {
    console.error("Failed to update last visit:", error);
  }
};