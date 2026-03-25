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

  return (
    <>
      {/* Desktop navigation (hidden on mobile, visible on desktop) */}
      <Navigation className="hidden md:block" hideMobile={true} />
      
      {/* Mobile hamburger navigation (visible on mobile, hidden on desktop) */}
      {isMobile && <Navigation className="block md:hidden" hideMobile={false} />}
      
      {/* Mobile bottom navigation (only on mobile) */}
      {isMobile && <MobileBottomNav />}
    </>
  );
}