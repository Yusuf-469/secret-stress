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
    return (
      <>
        {/* Mobile hamburger navigation (visible on mobile) */}
        <Navigation className="block" hideMobile={false} showDesktopNav={false} />
        {/* Mobile bottom navigation (only on mobile) */}
        <MobileBottomNav />
      </>
    );
  } else {
    return (
      <Navigation className="hidden" hideMobile={true} showDesktopNav={true} />
    );
  }
}