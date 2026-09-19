"use client";
import { motion } from "framer-motion";
import { Counter } from "./Counter";
import { cardFadeUp } from "@/lib/motion";
import { cn } from "@/utils/cn";

interface StatTileProps {
  value: number;
  suffix?: string;
  label: string;
  index?: number;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
  labelUppercase?: boolean;
  className?: string;
}

const SIZE_STYLES = {
  sm: { padding: "p-4", number: "text-2xl" },
  md: { padding: "p-4", number: "text-3xl" },
  lg: { padding: "p-6", number: "text-4xl" },
} as const;

export function StatTile({
  value,
  suffix = "",
  label,
  index = 0,
  size = "md",
  align = "left",
  labelUppercase = false,
  className,
}: StatTileProps) {
  const s = SIZE_STYLES[size];
  return (
    <motion.div
      {...cardFadeUp({ index, distance: 20 })}
      className={cn(
        "flex flex-col gap-1 rounded-xl bg-brand-surface border border-white/5",
        s.padding,
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Counter
        value={value}
        suffix={suffix}
        className={cn("font-heading font-black text-brand-gold leading-none", s.number)}
      />
      <span
        className={cn(
          "text-gray-500 text-xs leading-tight",
          labelUppercase && "uppercase tracking-wider"
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}
