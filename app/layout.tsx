"use client";

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { useAuth } from "@/contexts/AuthContext";
import { ResponsiveNavigation } from "@/components/secret-stress/ResponsiveNavigation";

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
  const { isAuthenticated } = useAuth();

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
        <main id="main-content" className="relative min-h-screen flex flex-col">
          <Providers>
            {/* Only show navigation when authenticated */}
            {isAuthenticated && <ResponsiveNavigation />}
            
            {/* Main content - Hero section should be visible by default */}
            <div className="flex-1">
              {children}
            </div>
          </Providers>
        </main>
      </body>
    </html>
  );
}
