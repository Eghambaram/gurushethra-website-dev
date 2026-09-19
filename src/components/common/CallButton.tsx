"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

// Fires in a short burst then rests — mimics an actual phone ringing in
// intervals, rather than WhatsApp's continuous pulse.
const RING_TRANSITION = {
  delay: 2,
  duration: 0.8,
  repeat: Infinity,
  repeatDelay: 2.2,
  ease: "easeInOut",
} as const;

// Same check as framer-motion's own `useReducedMotion()`, without its
// dev-only console warning (which fires unconditionally whenever the OS
// preference is on, even though we already gate animations on it below).
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return prefers;
}

export function CallButton() {
  const pathname = usePathname();
  const { phone } = useSiteSettings();
  const prefersReducedMotion = usePrefersReducedMotion();

  // The real motion preference resolves synchronously on the client's first
  // render, which never matches SSR's unknowable `null` — deferring the
  // branch to post-mount guarantees hydration always compares two identical
  // "not yet animated" trees.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const shouldAnimate = mounted && !prefersReducedMotion;

  if (pathname === "/contact") return null;

  return (
    <motion.a
      href={`tel:${phone}`}
      aria-label={`Call us at ${phone}`}
      className="group fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold shadow-lg shadow-brand-gold/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-background"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.65, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.94 }}
    >
      {/* Ring glow burst — synced with the icon shake below */}
      {shouldAnimate && (
        <motion.span
          className="absolute inset-0 rounded-full bg-brand-gold"
          animate={{ scale: [1, 1, 1.3, 1.55], opacity: [0, 0.55, 0.2, 0] }}
          transition={RING_TRANSITION}
          aria-hidden
        />
      )}

      {/* Tooltip — desktop hover only, aria-label already covers a11y */}
      <span
        className="pointer-events-none absolute -top-11 right-1/2 translate-x-1/2 whitespace-nowrap rounded-md bg-brand-background px-3 py-1.5 text-xs font-semibold text-white shadow-lg opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 z-10"
        aria-hidden
      >
        Call Us
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-brand-background" />
      </span>

      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-white relative z-10"
        aria-hidden
        animate={shouldAnimate ? { rotate: [0, -24, 20, -18, 14, -8, 4, 0] } : undefined}
        transition={RING_TRANSITION}
      >
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </motion.svg>
    </motion.a>
  );
}
