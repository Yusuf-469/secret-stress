"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/secret-stress/Navigation";
import { MobileBottomNav } from "@/components/secret-stress/MobileBottomNav";

export function ResponsiveNavigation() {
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

  if (isMobile) {
    // On mobile, only show the bottom navigation bar
    return <MobileBottomNav />;
  } else {
    // On desktop, show the horizontal navigation
    return <Navigation className="hidden" hideMobile={true} showDesktopNav={true} />;
  }
}