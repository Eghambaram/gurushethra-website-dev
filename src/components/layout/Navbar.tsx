"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/constants/site";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
          scrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/8 shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
            : "bg-gradient-to-b from-black/70 to-transparent backdrop-blur-sm border-b border-white/5"
        )}
      >
        {/* Gold top accent line — always present, subtly glows when scrolled */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-60"
          )}
          style={{ background: "linear-gradient(90deg, transparent 0%, var(--color-brand-gold) 30%, var(--color-brand-gold) 70%, transparent 100%)" }}
          aria-hidden
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 lg:h-[72px] gap-3">

            {/* Logo */}
            <Link
              href="/"
              aria-label="Gurushethra Institute of Martial Arts — Home"
              className="flex items-center gap-3 shrink-0 flex-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded"
            >
              <div className="relative w-9 h-9 lg:w-10 lg:h-10 shrink-0 ring-1 ring-brand-gold/30 rounded-full overflow-hidden">
                <Image
                  src="/images/gima-logo.jpg"
                  alt="GIMA logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-black text-white text-[13px] lg:text-[14px] tracking-wide">
                  GURUSHETHRA
                </span>
                <span className="text-brand-gold text-[7px] lg:text-[8px] font-semibold tracking-[0.22em] uppercase mt-0.5">
                  Institute of Martial Arts
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex flex-1 items-center justify-center gap-0"
            >
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-2.5 xl:px-3.5 py-2 text-[11.5px] xl:text-[13px] font-semibold transition-colors duration-150 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold whitespace-nowrap",
                      active ? "text-brand-gold" : "text-gray-300 hover:text-white"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        initial={{ opacity: 0, scaleX: 0.4 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute bottom-0 left-2.5 xl:left-3.5 right-2.5 xl:right-3.5 h-[2px] rounded-full bg-brand-gold origin-left"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + mobile trigger */}
            <div className="flex items-center gap-3 flex-none ml-auto lg:ml-0">
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 bg-brand-gold text-brand-background font-bold text-[11px] xl:text-[12px] tracking-widest uppercase rounded-sm hover:bg-[#e2bb3c] active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-background whitespace-nowrap shadow-[0_0_16px_rgba(212,175,55,0.25)]"
              >
                Book Free Trial
              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="lg:hidden p-2 rounded text-gray-300 hover:text-white hover:bg-white/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                <Menu size={22} />
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
