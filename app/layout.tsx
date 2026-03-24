"use client";

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { useState, useEffect } from "react";
import { MobileBottomNav } from "@/components/secret-stress/MobileBottomNav";
import Navigation from "@/components/secret-stress/Navigation";

export const metadata: Metadata = {
  title: "SILENT STRESS - Anonymous Academic Pressure Reporting",
  description: "A safe, anonymous space to share academic stress and find support. No tracking, no judgment, just understanding.",
  keywords: ["academic stress", "mental health", "student support", "anonymous", "pressure relief"],
  authors: [{ name: "SILENT STRESS" }],
  metadataBase: new URL("https://silentstress.app"),
  openGraph: {
    title: "SILENT STRESS - Anonymous Academic Pressure Reporting",
    description: "A safe, anonymous space to share academic stress and find support.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SILENT STRESS",
    description: "Anonymous academic pressure reporting system",
  },
  // Privacy and security headers
  other: {
    "referrer": "no-referrer",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "x-xss-protection": "1; mode=block",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7C9A92" },
    { media: "(prefers-color-scheme: dark)", color: "#1A202C" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return true; // assume mobile on server to avoid mismatch
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Security meta tags */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; frame-src 'none';" />
        <meta name="referrer" content="no-referrer" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Main content */}
        <main id="main-content" className="relative">
          <Providers>
            {/* Navigation - hide mobile hamburger on mobile when showing bottom tab bar */}
            <Navigation hideMobile={isMobile} />
            {isMobile && <MobileBottomNav />}
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
