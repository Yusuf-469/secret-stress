import type { Metadata, Viewport } from "next";
import "./globals.css";
import { EmergencyExitButton } from "@/components/secret-stress/EmergencyExitButton";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Secret Stress - Anonymous Academic Pressure Reporting",
  description: "A safe, anonymous space to share academic stress and find support. No tracking, no judgment, just understanding.",
  keywords: ["academic stress", "mental health", "student support", "anonymous", "pressure relief"],
  authors: [{ name: "Secret Stress" }],
  metadataBase: new URL("https://secretstress.app"),
  openGraph: {
    title: "Secret Stress - Anonymous Academic Pressure Reporting",
    description: "A safe, anonymous space to share academic stress and find support.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secret Stress",
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
        
        {/* Emergency exit button - fixed position */}
        <EmergencyExitButton />
        
        {/* Main content */}
        <main id="main-content" className="relative">
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
