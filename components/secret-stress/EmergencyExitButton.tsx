"use client";

/**
 * Emergency Exit Button Component
 * 
 * Provides a quick way for users to leave the site in case of emergency.
 * Clears form data and redirects to a neutral website.
 */

import { LogOut } from "lucide-react";

export function EmergencyExitButton() {
  const handleEmergencyExit = () => {
    // Clear sensitive data before redirecting
    if (typeof window !== "undefined") {
      // Clear any form data from memory
      const forms = document.querySelectorAll("form");
      forms.forEach((form) => form.reset());
      
      // Redirect to a neutral site
      window.location.href = "https://www.google.com/search?q=weather";
    }
  };

  return (
    <button
      onClick={handleEmergencyExit}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-destructive text-destructive-foreground text-sm font-medium rounded-lg shadow-lg hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 transition-all duration-200 no-print"
      aria-label="Emergency exit - quickly leave this site"
      title="Emergency exit (press to quickly leave)"
    >
      <span className="flex items-center gap-2">
        <LogOut className="h-4 w-4" aria-hidden="true" />
        Exit Quickly
      </span>
    </button>
  );
}
