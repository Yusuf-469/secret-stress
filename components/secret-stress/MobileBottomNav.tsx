import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  Home,
  ChartBar,
  PlusCircle,
  Book,
  Settings,
  Grid,
  Folder,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/contexts/AdminContext";

interface NavTab {
  href: string;
  label: string;
  iconOutline: React.ElementType;
  iconFilled: React.ElementType;
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isPressed, setIsPressed] = useState(false);
  
  // Get user role from context
  const { isAdminAuthenticated } = useAdmin();
  const { isAuthenticated } = useAuth();
  
  // Determine role: admin takes precedence if authenticated
  const role = isAdminAuthenticated ? "admin" : (isAuthenticated ? "student" : "student");

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/";
      }
      return pathname.startsWith(href);
    },
    [pathname]
  );

  // Define tabs based on role
  let tabs: NavTab[] = [];
  let showFloatingReportButton = false;

  if (role === "student") {
    // Student tabs: Home, History, Resources, Profile (Report as floating button)
    tabs = [
      {
        href: "/",
        label: "Home",
        iconOutline: Home,
        iconFilled: Home, // Using same icon for now; ideally have filled versions
      },
      {
        href: "/toolkit", // Assuming History is in toolkit? Adjust as needed
        label: "History",
        iconOutline: ChartBar,
        iconFilled: ChartBar,
      },
      {
        href: "/resources", // Assuming Resources page
        label: "Resources",
        iconOutline: Book,
        iconFilled: Book,
      },
      {
        href: "/profile", // Assuming Profile page
        label: "Profile",
        iconOutline: Settings,
        iconFilled: Settings,
      },
    ];
    showFloatingReportButton = true;
  } else if (role === "admin") {
    // Admin tabs: Home, Reports, Users, Config
    tabs = [
      {
        href: "/admin/dashboard",
        label: "HOME",
        iconOutline: Grid,
        iconFilled: Grid,
      },
      {
        href: "/admin/reports", // Adjust path
        label: "REPORTS",
        iconOutline: Folder,
        iconFilled: Folder,
      },
      {
        href: "/admin/users", // Adjust path
        label: "USERS",
        iconOutline: Users,
        iconFilled: Users,
      },
      {
        href: "/admin/config", // Adjust path
        label: "CONFIG",
        iconOutline: Settings,
        iconFilled: Settings,
      },
    ];
    showFloatingReportButton = false;
  }

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  return (
    <>
      {/* Tab Bar */}
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 flex items-center justify-around",
          "bg-white dark:bg-[#1C1C1E]",
          "border-t dark:border-t-[1px] border-gray-200 dark:border-gray-700",
          "shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.2)]",
          "h-[64px] pb-[env(safe-area-inset-bottom)] pt-3",
          "transition-all duration-200"
        )}
      >
        {tabs.map((tab, index) => {
          const active = isActive(tab.href);
          const TabIconOutline = tab.iconOutline;
          const TabIconFilled = tab.iconFilled;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                onMouseDown={handlePressIn}
                onMouseUp={handlePressOut}
                onMouseLeave={handlePressOut}
                onTouchStart={handlePressIn}
                onTouchEnd={handlePressOut}
                onTouchCancel={handlePressOut}
                style={{ touchAction: "manipulation" }}
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5 w-16 h-14 rounded-lg transition-all duration-200",
                  active
                    ? "text-blue-600 dark:text-[#0A84FF] font-semibold"
                    : "text-gray-400 dark:text-[#8E8E93] font-normal",
                  "active:scale-95 active:opacity-80"
                )}
              >
              {/* Icon */}
              <motion.span
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-6 h-6 transition-transform duration-200",
                  isPressed && "scale-95"
                )}
              >
                {active ? (
                  <TabIconFilled className="text-blue-600 dark:text-[#0A84FF]" />
                ) : (
                  <TabIconOutline className="text-gray-400 dark:text-[#8E8E93]" />
                )}
              </motion.span>
              {/* Label */}
              <span className={cn(
                "text-xs",
                active
                  ? "font-semibold text-blue-600 dark:text-[#0A84FF]"
                  : "font-normal text-gray-400 dark:text-[#8E8E93]",
                "transition-colors duration-200"
              )}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Floating Report Button for Students */}
      {showFloatingReportButton && (
        <Link
          href="/submit" // Adjust to your report/submit page
          onMouseDown={handlePressIn}
          onMouseUp={handlePressOut}
          onMouseLeave={handlePressOut}
          onTouchStart={handlePressIn}
          onTouchEnd={handlePressOut}
          onTouchCancel={handlePressOut}
          className={cn(
            "fixed -bottom-[30px] left-1/2 -translate-x-1/2",
            "flex h-[56px] w-[56px] items-center justify-center rounded-full",
            "bg-blue-600 dark:bg-[#0A84FF] hover:bg-blue-700 dark:hover:bg-[#0A84FF]",
            "shadow-lg shadow-blue-500/20 dark:shadow-[#0A84FF]/20",
            "transition-all duration-200",
            "z-20"
          )}
          aria-label="Report stress"
        >
          <motion.span
            whileTap={{ scale: 0.9 }}
            className="flex h-[56px] w-[56px] items-center justify-center rounded-full transition-transform duration-200"
          >
            <PlusCircle className="w-5 h-5 text-white" />
          </motion.span>
        </Link>
      )}
    </>
  );
}