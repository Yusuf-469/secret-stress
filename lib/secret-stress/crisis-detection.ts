/**
 * Crisis Detection Utility for Secret Stress
 * 
 * This module provides crisis keyword detection and response generation.
 * It is designed to be sensitive but not alarmist - prioritizing user safety
 * while maintaining a supportive, non-clinical tone.
 * 
 * IMPORTANT: This is a detection system only. It does not diagnose or replace
 * professional mental health support. Always direct users to appropriate resources.
 */

import {
  CrisisKeyword,
  CrisisSeverity,
  CrisisAssessment,
  CrisisResource,
  CrisisCategory,
} from "@/types/secret-stress";

// ============================================================================
// Crisis Keyword Database
// ============================================================================

/**
 * Database of crisis keywords with severity levels and response messages.
 * Keywords are organized by category for better understanding and response tailoring.
 * 
 * Severity levels:
 * - critical: Immediate danger (self-harm, suicide)
 * - high: Serious concern requiring attention
 * - medium: Concerning but not immediately dangerous
 * - low: Mild concern, monitor
 * - none: No crisis detected
 */
const CRISIS_KEYWORDS: CrisisKeyword[] = [
  // Self-harm keywords
  {
    keyword: "kill myself",
    severity: "critical",
    message: "It sounds like you're going through something really painful. You don't have to face this alone.",
    category: "suicide",
  },
  {
    keyword: "suicide",
    severity: "critical",
    message: "I'm really concerned about you. Your life matters, and there are people who want to help.",
    category: "suicide",
  },
  {
    keyword: "suicidal",
    severity: "critical",
    message: "It sounds like you're in a really dark place right now. Please reach out for support - you deserve help.",
    category: "suicide",
  },
  {
    keyword: "end it all",
    severity: "critical",
    message: "I'm hearing that you're in tremendous pain. There are people who care and want to support you through this.",
    category: "suicide",
  },
  {
    keyword: "don't want to live",
    severity: "critical",
    message: "It sounds like you're struggling with some really heavy feelings. You don't have to carry this burden alone.",
    category: "suicide",
  },
  {
    keyword: "better off dead",
    severity: "critical",
    message: "I'm really worried about what you're going through. Your life has value, even when it doesn't feel that way.",
    category: "suicide",
  },
  {
    keyword: "hurt myself",
    severity: "high",
    message: "It sounds like you're in a lot of pain right now. There are healthier ways to cope, and people who can help you find them.",
    category: "self-harm",
  },
  {
    keyword: "self harm",
    severity: "high",
    message: "I hear that you're struggling with some intense emotions. You deserve support in finding safer ways to cope.",
    category: "self-harm",
  },
  {
    keyword: "cutting myself",
    severity: "high",
    message: "It sounds like you're dealing with overwhelming feelings. There are people who understand and want to help.",
    category: "self-harm",
  },
  {
    keyword: "want to die",
    severity: "critical",
    message: "I'm deeply concerned about you. These feelings are serious, but they don't have to be permanent. Please reach out for help.",
    category: "suicide",
  },
  {
    keyword: "no reason to live",
    severity: "critical",
    message: "It sounds like you're feeling hopeless right now. These feelings are real, but they can change with support.",
    category: "suicide",
  },
  
  // Severe distress keywords
  {
    keyword: "can't go on",
    severity: "high",
    message: "It sounds like you're feeling overwhelmed. Taking things one moment at a time is okay - you don't have to figure everything out right now.",
    category: "severe-distress",
  },
  {
    keyword: "breaking down",
    severity: "medium",
    message: "It sounds like you're under a lot of pressure. Remember that it's okay to not be okay sometimes.",
    category: "severe-distress",
  },
  {
    keyword: "losing my mind",
    severity: "medium",
    message: "I hear that you're feeling overwhelmed. What you're experiencing is a response to stress - it doesn't mean you're losing anything.",
    category: "severe-distress",
  },
  {
    keyword: "can't take it anymore",
    severity: "high",
    message: "It sounds like you're at your limit. It's okay to step back and ask for help - you don't have to handle everything alone.",
    category: "severe-distress",
  },
  {
    keyword: "giving up",
    severity: "high",
    message: "I hear that you're feeling exhausted and discouraged. It's okay to rest - giving up on everything and taking a break are different things.",
    category: "severe-distress",
  },
  
  // Abuse keywords
  {
    keyword: "abuse",
    severity: "high",
    message: "It sounds like you might be experiencing something really difficult. You don't deserve to be treated this way, and support is available.",
    category: "abuse",
  },
  {
    keyword: "abusive",
    severity: "high",
    message: "I hear that you're dealing with a harmful situation. You deserve to be treated with respect and kindness.",
    category: "abuse",
  },
  {
    keyword: "being hurt",
    severity: "high",
    message: "It sounds like you might be in a concerning situation. Your safety matters, and there are people who can help.",
    category: "abuse",
  },
  
  // Violence keywords
  {
    keyword: "hurt someone",
    severity: "high",
    message: "It sounds like you're experiencing some intense anger or frustration. These feelings are valid, and there are ways to work through them safely.",
    category: "violence",
  },
  {
    keyword: "kill someone",
    severity: "critical",
    message: "I'm hearing that you're experiencing very intense feelings. It's important to talk to someone who can help you process these emotions safely.",
    category: "violence",
  },
  
  // Eating disorder keywords
  {
    keyword: "starving myself",
    severity: "high",
    message: "It sounds like you might be struggling with your relationship with food. You deserve to nourish yourself, and support is available.",
    category: "eating-disorder",
  },
  {
    keyword: "make myself throw up",
    severity: "high",
    message: "I hear that you're dealing with difficult feelings about your body or food. There are healthier ways to cope, and people who can help.",
    category: "eating-disorder",
  },
  {
    keyword: "eating disorder",
    severity: "high",
    message: "It sounds like you're struggling with food or body image. These challenges are real, and recovery is possible with support.",
    category: "eating-disorder",
  },
  
  // Substance keywords
  {
    keyword: "overdose",
    severity: "critical",
    message: "I'm very concerned about what you're sharing. If you've taken something or are considering it, please seek immediate medical help.",
    category: "substance",
  },
  {
    keyword: "pills to end it",
    severity: "critical",
    message: "I'm deeply worried about you. Please reach out for immediate help - your life matters.",
    category: "substance",
  },
];

// ============================================================================
// Crisis Resources
// ============================================================================

/**
 * Crisis resources available for immediate support.
 * These are national/international resources that users can access.
 */
export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    name: "988 Suicide & Crisis Lifeline",
    contact: "988",
    description: "Free, confidential support for people in distress",
    available24x7: true,
    website: "https://988lifeline.org",
  },
  {
    name: "Crisis Text Line",
    contact: "Text HOME to 741741",
    description: "Text-based crisis support with trained counselors",
    available24x7: true,
    website: "https://www.crisistextline.org",
  },
  {
    name: "National Sexual Assault Hotline",
    contact: "1-800-656-4673",
    description: "Support for survivors of sexual assault",
    available24x7: true,
    website: "https://www.rainn.org",
  },
  {
    name: "National Domestic Violence Hotline",
    contact: "1-800-799-7233",
    description: "Support for those experiencing domestic violence",
    available24x7: true,
    website: "https://www.thehotline.org",
  },
  {
    name: "National Eating Disorders Association",
    contact: "1-800-931-2237",
    description: "Support for eating disorders and body image issues",
    available24x7: false,
    website: "https://www.nationaleatingdisorders.org",
  },
];

// ============================================================================
// Response Message Templates
// ============================================================================

/**
 * Response templates based on severity level.
 * These provide appropriate messaging while maintaining a warm, validating tone.
 */
const SEVERITY_RESPONSES: Record<CrisisSeverity, string> = {
  none: "",
  low: "Thanks for sharing. It sounds like things are a bit challenging right now. Remember, it's okay to take things one step at a time.",
  medium: "I can hear that you're going through something difficult. Your feelings are valid, and it's brave of you to express them. Consider talking to someone you trust.",
  high: "It sounds like you're dealing with something really heavy right now. You don't have to carry this alone - reaching out to a counselor, trusted friend, or crisis line could help.",
  critical: "I'm really concerned about you. What you're experiencing sounds incredibly painful, but please know that help is available and these feelings can change. Please reach out to a crisis line or emergency services right now.",
};

// ============================================================================
// Detection Functions
// ============================================================================

/**
 * Normalize text for detection.
 * Converts to lowercase and removes extra whitespace.
 */
const normalizeText = (text: string): string => {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
};

/**
 * Detect crisis keywords in the provided text.
 * 
 * @param text - The text to analyze
 * @returns CrisisAssessment with severity, matched keywords, and response message
 */
export const detectCrisis = (text: string): CrisisAssessment => {
  if (!text || text.trim().length === 0) {
    return {
      severity: "none",
      matchedKeywords: [],
      responseMessage: "",
      showResources: false,
      assessedAt: new Date().toISOString(),
    };
  }

  const normalizedText = normalizeText(text);
  const matchedKeywords: CrisisKeyword[] = [];

  // Check each keyword against the text
  for (const keywordData of CRISIS_KEYWORDS) {
    if (normalizedText.includes(keywordData.keyword.toLowerCase())) {
      matchedKeywords.push(keywordData);
    }
  }

  // Determine overall severity based on highest matched keyword
  const severityLevels: CrisisSeverity[] = ["none", "low", "medium", "high", "critical"];
  let highestSeverityIndex = 0;

  for (const match of matchedKeywords) {
    const severityIndex = severityLevels.indexOf(match.severity);
    if (severityIndex > highestSeverityIndex) {
      highestSeverityIndex = severityIndex;
    }
  }

  const severity = severityLevels[highestSeverityIndex];

  // Generate response message
  let responseMessage = SEVERITY_RESPONSES[severity];

  // If we have specific matched keywords with messages, use the most severe one's message
  if (matchedKeywords.length > 0) {
    const mostSevereMatch = matchedKeywords.reduce((prev, current) => {
      const prevIndex = severityLevels.indexOf(prev.severity);
      const currentIndex = severityLevels.indexOf(current.severity);
      return currentIndex > prevIndex ? current : prev;
    });
    responseMessage = mostSevereMatch.message;
  }

  // Determine if resources should be shown
  const showResources = severity === "high" || severity === "critical";

  return {
    severity,
    matchedKeywords,
    responseMessage,
    showResources,
    assessedAt: new Date().toISOString(),
  };
};

/**
 * Get appropriate crisis resources based on detected categories.
 * 
 * @param assessment - The crisis assessment result
 * @returns Array of relevant crisis resources
 */
export const getRelevantResources = (assessment: CrisisAssessment): CrisisResource[] => {
  if (assessment.severity === "none" || assessment.severity === "low") {
    return [];
  }

  // Get unique categories from matched keywords
  const categories = new Set(assessment.matchedKeywords.map((k) => k.category));

  // For critical or high severity, always include suicide/crisis resources
  if (assessment.severity === "critical" || assessment.severity === "high") {
    return CRISIS_RESOURCES;
  }

  // Filter resources based on categories (if we had category-specific resources)
  // For now, return general resources for medium severity
  return CRISIS_RESOURCES.slice(0, 3); // Return top 3 resources
};

/**
 * Quick check if text contains any crisis keywords.
 * Useful for UI indicators without full assessment.
 * 
 * @param text - The text to check
 * @returns boolean indicating if any crisis keywords were found
 */
export const containsCrisisKeywords = (text: string): boolean => {
  if (!text || text.trim().length === 0) return false;
  
  const normalizedText = normalizeText(text);
  return CRISIS_KEYWORDS.some((keywordData) =>
    normalizedText.includes(keywordData.keyword.toLowerCase())
  );
};

/**
 * Get the highest severity level from matched keywords.
 * 
 * @param text - The text to analyze
 * @returns The highest CrisisSeverity found, or "none" if no keywords match
 */
export const getHighestSeverity = (text: string): CrisisSeverity => {
  const assessment = detectCrisis(text);
  return assessment.severity;
};

// ============================================================================
// Export keyword database for testing/extensibility
// ============================================================================

/**
 * Get the full crisis keyword database.
 * Useful for testing or extending the system.
 */
export const getCrisisKeywords = (): CrisisKeyword[] => {
  return [...CRISIS_KEYWORDS];
};

/**
 * Add a custom crisis keyword to the database.
 * Note: This only affects the current session.
 * 
 * @param keyword - The CrisisKeyword to add
 */
export const addCrisisKeyword = (keyword: CrisisKeyword): void => {
  CRISIS_KEYWORDS.push(keyword);
};

/**
 * Get all available crisis resources.
 */
export const getAllCrisisResources = (): CrisisResource[] => {
  return [...CRISIS_RESOURCES];
};