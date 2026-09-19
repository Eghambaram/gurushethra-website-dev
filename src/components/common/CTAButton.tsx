"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

interface CTAButtonProps {
  label: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  external?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gold text-brand-background hover:bg-[#C9A227] focus-visible:ring-brand-gold",
  secondary:
    "bg-brand-red text-white hover:bg-[#7A1A1A] focus-visible:ring-brand-red",
  outline:
    "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-background focus-visible:ring-brand-gold",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-xs min-h-[44px]",
  md: "px-7 py-3.5 text-sm min-h-[44px]",
  lg: "px-9 py-4 text-base min-h-[44px]",
};

export function CTAButton({
  label,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled = false,
  external = false,
}: CTAButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 font-bold tracking-widest uppercase rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-background disabled:opacity-40 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className
  );

  if (href && !disabled) {
    return (
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="inline-block"
      >
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={base} onClick={onClick}>
            {label}
          </a>
        ) : (
          <Link href={href} className={base} onClick={onClick}>
            {label}
          </Link>
        )}
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={base}
    >
      {label}
    </motion.button>
  );
}
