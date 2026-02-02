/**
 * Type definitions for Secret Stress
 * An anonymous academic pressure reporting system
 */

// ============================================================================
// Submission Types
// ============================================================================

/**
 * Represents a user's anonymous submission/stress report
 */
export interface Submission {
  /** Unique identifier for the submission */
  id: string;
  /** The user's anonymous message/content */
  content: string;
  /** Mood rating from 1-5 (1=very stressed, 5=doing well) */
  mood: 1 | 2 | 3 | 4 | 5;
  /** ISO timestamp of when the submission was created */
  timestamp: string;
  /** Optional tags for categorization */
  tags: SubmissionTag[];
  /** Crisis detection result associated with this submission */
  crisisAssessment?: CrisisAssessment;
}

/**
 * Predefined tags for categorizing submissions
 */
export type SubmissionTag =
  | "exams"
  | "deadlines"
  | "social"
  | "family"
  | "future"
  | "burnout"
  | "isolation"
  | "grades"
  | "sleep"
  | "other";

/**
 * Available tag options with display labels
 */
export const SUBMISSION_TAGS: { value: SubmissionTag; label: string }[] = [
  { value: "exams", label: "Exams & Tests" },
  { value: "deadlines", label: "Deadlines" },
  { value: "grades", label: "Grades & Performance" },
  { value: "social", label: "Social Pressure" },
  { value: "family", label: "Family Expectations" },
  { value: "future", label: "Future & Career" },
  { value: "burnout", label: "Burnout" },
  { value: "isolation", label: "Isolation" },
  { value: "sleep", label: "Sleep Issues" },
  { value: "other", label: "Other" },
];

// ============================================================================
// Crisis Detection Types
// ============================================================================

/**
 * Severity levels for crisis detection
 */
export type CrisisSeverity = "none" | "low" | "medium" | "high" | "critical";

/**
 * Represents a crisis detection keyword with metadata
 */
export interface CrisisKeyword {
  /** The keyword or phrase to detect */
  keyword: string;
  /** Severity level of this keyword */
  severity: CrisisSeverity;
  /** Human-readable message to show when this keyword is detected */
  message: string;
  /** Category of crisis for better understanding */
  category: CrisisCategory;
}

/**
 * Categories of crisis situations
 */
export type CrisisCategory =
  | "self-harm"
  | "suicide"
  | "violence"
  | "abuse"
  | "severe-distress"
  | "substance"
  | "eating-disorder";

/**
 * Result of a crisis detection scan
 */
export interface CrisisAssessment {
  /** Detected severity level */
  severity: CrisisSeverity;
  /** List of matched keywords found in the text */
  matchedKeywords: CrisisKeyword[];
  /** Appropriate response message based on severity */
  responseMessage: string;
  /** Whether immediate help resources should be shown */
  showResources: boolean;
  /** Timestamp of the assessment */
  assessedAt: string;
}

/**
 * Crisis response resource link
 */
export interface CrisisResource {
  /** Name of the resource */
  name: string;
  /** Phone number or contact info */
  contact: string;
  /** Description of when to use this resource */
  description: string;
  /** Whether available 24/7 */
  available24x7: boolean;
  /** Optional website URL */
  website?: string;
}

// ============================================================================
// Breathing Exercise Types
// ============================================================================

/**
 * Represents a completed breathing session
 */
export interface BreathingSession {
  /** Unique identifier */
  id: string;
  /** Duration in seconds */
  duration: number;
  /** ISO timestamp of completion */
  completedAt: string;
  /** Breathing technique used */
  technique: BreathingTechnique;
  /** User's self-reported feeling after (1-5) */
  postSessionMood?: 1 | 2 | 3 | 4 | 5;
}

/**
 * Available breathing techniques
 */
export type BreathingTechnique =
  | "4-7-8"
  | "box"
  | "coherent"
  | "deep-belly";

/**
 * Breathing technique configuration
 */
export interface BreathingTechniqueConfig {
  /** Technique identifier */
  id: BreathingTechnique;
  /** Display name */
  name: string;
  /** Description of the technique */
  description: string;
  /** Inhale duration in seconds */
  inhale: number;
  /** Hold duration in seconds (0 if none) */
  hold: number;
  /** Exhale duration in seconds */
  exhale: number;
  /** Second hold duration in seconds (0 if none) */
  hold2: number;
  /** Total cycle duration in seconds */
  cycleDuration: number;
}

// ============================================================================
// App Settings Types
// ============================================================================

/**
 * User's app settings/preferences
 */
export interface AppSettings {
  /** Theme preference */
  theme: ThemePreference;
  /** Whether to enable blur/privacy mode */
  blurEnabled: boolean;
  /** Default breathing technique */
  defaultBreathingTechnique: BreathingTechnique;
  /** Whether to show crisis resources by default */
  showCrisisResources: boolean;
  /** Notification preferences */
  notifications: NotificationSettings;
  /** Accessibility preferences */
  accessibility: AccessibilitySettings;
}

/**
 * Theme options
 */
export type ThemePreference = "light" | "dark" | "system";

/**
 * Notification settings
 */
export interface NotificationSettings {
  /** Enable breathing reminders */
  breathingReminders: boolean;
  /** Reminder frequency in hours */
  reminderFrequency: 1 | 2 | 4 | 8 | 24;
  /** Enable crisis check-in notifications */
  crisisCheckIns: boolean;
}

/**
 * Accessibility settings
 */
export interface AccessibilitySettings {
  /** Reduce animations */
  reduceMotion: boolean;
  /** High contrast mode */
  highContrast: boolean;
  /** Large text */
  largeText: boolean;
  /** Screen reader optimizations */
  screenReaderOptimized: boolean;
}

// ============================================================================
// Community Types
// ============================================================================

/**
 * Anonymous community post (shared anonymously)
 */
export interface CommunityPost {
  /** Unique identifier */
  id: string;
  /** Content (anonymized) */
  content: string;
  /** Mood rating */
  mood: 1 | 2 | 3 | 4 | 5;
  /** Tags */
  tags: SubmissionTag[];
  /** ISO timestamp */
  timestamp: string;
  /** Number of supportive reactions */
  supportCount: number;
  /** Whether the current user has reacted */
  userReacted: boolean;
  /** Moderation status */
  status: "pending" | "approved" | "rejected";
}

/**
 * Support reaction type
 */
export type SupportReaction = "hug" | "same" | "here-for-you" | "sending-love";

// ============================================================================
// Toolkit Types
// ============================================================================

/**
 * A coping resource/tool in the toolkit
 */
export interface CopingTool {
  /** Unique identifier */
  id: string;
  /** Tool name */
  name: string;
  /** Description */
  description: string;
  /** Category */
  category: ToolCategory;
  /** Time needed (in minutes) */
  duration: number;
  /** Difficulty level */
  difficulty: "easy" | "medium" | "advanced";
  /** Steps to follow */
  steps: string[];
  /** When to use this tool */
  whenToUse: string;
  /** User's favorite status */
  isFavorite: boolean;
}

/**
 * Tool categories
 */
export type ToolCategory =
  | "immediate"
  | "grounding"
  | "breathing"
  | "mindfulness"
  | "self-care"
  | "cognitive";

// ============================================================================
// Stats Types
// ============================================================================

/**
 * User's stress statistics (all client-side, anonymous)
 */
export interface StressStats {
  /** Total submissions made */
  totalSubmissions: number;
  /** Average mood over time */
  averageMood: number;
  /** Most common tags */
  commonTags: { tag: SubmissionTag; count: number }[];
  /** Submissions per week trend */
  weeklyTrend: { week: string; count: number; averageMood: number }[];
  /** Total breathing sessions */
  breathingSessionsCompleted: number;
  /** Total minutes spent on breathing exercises */
  totalBreathingMinutes: number;
}

// ============================================================================
// Storage Constants
// ============================================================================

/** localStorage key for submissions */
export const STORAGE_KEYS = {
  SUBMISSIONS: "secret-stress-submissions",
  SETTINGS: "secret-stress-settings",
  BREATHING_SESSIONS: "secret-stress-breathing-sessions",
  STATS: "secret-stress-stats",
  LAST_VISIT: "secret-stress-last-visit",
} as const;

/** Data retention period in days (30 days) */
export const DATA_RETENTION_DAYS = 30;

/** Maximum submission length */
export const MAX_SUBMISSION_LENGTH = 2000;

/** Minimum submission length */
export const MIN_SUBMISSION_LENGTH = 10;
