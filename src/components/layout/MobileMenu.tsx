"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone } from "lucide-react";
import { NAV_LINKS } from "@/constants/site";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { cn } from "@/utils/cn";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const menuVariants = {
  closed: { x: "100%", opacity: 0 },
  open: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 32 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.22, ease: "easeIn" as const },
  },
};

const itemVariants = {
  closed: { x: 24, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: 0.05 + i * 0.055, type: "spring" as const, stiffness: 280, damping: 28 },
  }),
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { phone } = useSiteSettings();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on route change
  useEffect(() => { onClose(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            aria-hidden
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.nav
            key="drawer"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            aria-label="Mobile navigation"
            className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,90vw)] bg-brand-surface-alt border-l border-white/8 flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div>
                <p className="font-heading font-black text-white text-base tracking-wide leading-none">
                  GURUSHETHRA
                </p>
                <p className="text-brand-gold text-[9px] font-semibold tracking-[0.2em] uppercase mt-0.5">
                  Institute of Martial Arts
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded text-gray-400 hover:text-white hover:bg-white/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav links */}
            <ul className="flex flex-col px-4 py-6 gap-1 flex-1" role="list">
              {NAV_LINKS.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.li key={link.href} custom={i} variants={itemVariants} initial="closed" animate="open">
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg text-base font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                        active
                          ? "text-brand-gold bg-brand-gold/10"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {active && (
                        <span className="w-1 h-4 rounded-full bg-brand-gold mr-3 shrink-0" aria-hidden />
                      )}
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            {/* Bottom CTA */}
            <div className="px-6 py-6 border-t border-white/8 flex flex-col gap-3">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-gold text-brand-background font-bold text-sm tracking-widest uppercase rounded transition-colors hover:bg-[#C9A227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                Book Free Trial
              </Link>
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 w-full py-3 border border-white/10 text-gray-400 text-sm rounded hover:border-white/20 hover:text-white transition-colors"
              >
                <Phone size={14} aria-hidden />
                {phone}
              </a>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
