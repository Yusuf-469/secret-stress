/**
 * Authentication Error Handler
 *
 * Maps Firebase and auth error codes to user-friendly UI messages.
 * Provides consistent error handling across all authentication flows.
 */

export interface AuthError {
  code: string;
  message: string;
  userMessage: string;
}

export function getAuthErrorMessage(error: any): string {
  if (!error) return "An unexpected error occurred.";

  const errorCode = error.code || error.message || "";

  // Firebase Auth Error Mappings
  const errorMappings: Record<string, string> = {
    // Credential errors
    "auth/invalid-credential": "Invalid email or password.",
    "auth/user-not-found": "Invalid email or password.",
    "auth/wrong-password": "Invalid email or password.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-disabled": "This account has been disabled.",

    // Account conflicts
    "auth/account-exists-with-different-credential": "This account is linked with a different sign-in method.",
    "auth/email-already-in-use": "An account with this email already exists.",

    // Provider-specific errors
    "auth/popup-closed-by-user": "Sign-in was cancelled.",
    "auth/popup-blocked": "Pop-up was blocked by your browser. Please allow pop-ups and try again.",
    "auth/cancelled-popup-request": "Sign-in was cancelled.",

    // Rate limiting
    "auth/too-many-requests": "Too many failed attempts. Please try again later.",

    // Network/Server errors
    "auth/network-request-failed": "Network error. Please check your connection and try again.",
    "auth/internal-error": "Something went wrong. Please try again later.",
    "auth/timeout": "Request timed out. Please try again.",

    // Password validation
    "auth/weak-password": "Password should be at least 6 characters long.",

    // Token/Session errors
    "auth/invalid-verification-code": "Invalid verification code.",
    "auth/invalid-verification-id": "Invalid verification request.",
    "auth/session-cookie-expired": "Your session has expired. Please sign in again.",
    "auth/session-cookie-revoked": "Your session has been revoked. Please sign in again.",

    // Generic fallbacks
    "auth/operation-not-allowed": "This sign-in method is not enabled.",
    "auth/requires-recent-login": "Please sign in again to continue.",
  };

  // Check for exact error code match
  if (errorMappings[errorCode]) {
    return errorMappings[errorCode];
  }

  // Check for partial matches in error message
  for (const [code, message] of Object.entries(errorMappings)) {
    if (errorCode.includes(code.split('/')[1])) {
      return message;
    }
  }

  // Check for common error patterns in message
  const errorMessage = error.message || errorCode;
  if (errorMessage.includes("network")) {
    return "Network error. Please check your connection and try again.";
  }
  if (errorMessage.includes("timeout")) {
    return "Request timed out. Please try again.";
  }
  if (errorMessage.includes("cancelled")) {
    return "Sign-in was cancelled.";
  }

  // Default fallback
  console.warn("Unhandled auth error:", error);
  return "Something went wrong. Please try again.";
}

/**
 * Provider-specific error messages
 */
export const providerErrorMessages = {
  google: {
    failed: "Google sign-in failed. Please try again.",
    cancelled: "Google sign-in was cancelled.",
    blocked: "Google sign-in pop-up was blocked. Please allow pop-ups and try again.",
  },
  github: {
    failed: "GitHub sign-in failed. Please try again.",
    cancelled: "GitHub sign-in was cancelled.",
    blocked: "GitHub sign-in pop-up was blocked. Please allow pop-ups and try again.",
  },
  email: {
    failed: "Email sign-in failed. Please try again.",
  },
} as const;

/**
 * Get loading text for different auth operations
 */
export function getAuthLoadingText(operation: string, provider?: string): string {
  switch (operation) {
    case "login":
      return provider ? `Signing in with ${provider}...` : "Signing in...";
    case "signup":
      return "Creating account...";
    case "reset":
      return "Sending reset email...";
    case "verify":
      return "Verifying...";
    default:
      return "Processing...";
  }
}