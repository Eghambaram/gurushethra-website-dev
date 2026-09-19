"use client";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface Tab {
  key: string;
  label: string;
}

interface FilterTabsProps {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
  accentColor?: "gold" | "red";
  layoutId?: string;
  className?: string;
}

export function FilterTabs({
  tabs,
  active,
  onChange,
  accentColor = "gold",
  layoutId = "tab-indicator",
  className,
}: FilterTabsProps) {
  const accent = accentColor === "gold" ? "var(--color-brand-gold)" : "var(--color-brand-red)";

  return (
    <div
      role="tablist"
      aria-label="Filter tabs"
      className={cn("flex items-center gap-1 flex-wrap", className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={cn(
              "relative px-5 py-3 min-h-[44px] text-sm font-semibold tracking-wide uppercase transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-1 focus-visible:ring-offset-brand-background",
              isActive ? "text-white" : "text-gray-400 hover:text-white"
            )}
          >
            {tab.label}
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: accent }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
