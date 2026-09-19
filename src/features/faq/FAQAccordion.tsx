"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { EASE_STANDARD } from "@/lib/motion";
import type { FAQItem } from "@/types/faq";

const CONTENT_VARIANTS = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { height: { duration: 0.3, ease: EASE_STANDARD }, opacity: { duration: 0.15 } },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: { height: { duration: 0.38, ease: EASE_STANDARD }, opacity: { duration: 0.25, delay: 0.12 } },
  },
} as const;

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <dl className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-xl border transition-all duration-200 overflow-hidden ${
              isOpen ? "border-brand-gold/40 bg-brand-surface" : "border-white/5 bg-brand-surface/60"
            }`}
          >
            <dt>
              <button
                onClick={() => setOpen(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-inset"
              >
                <span className={`font-semibold text-base leading-snug transition-colors ${isOpen ? "text-brand-gold" : "text-white"}`}>
                  {item.question}
                </span>
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-colors ${
                  isOpen ? "border-brand-gold bg-brand-gold/10 text-brand-gold" : "border-white/10 text-gray-400"
                }`} aria-hidden>
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
            </dt>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.dd
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={CONTENT_VARIANTS}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {item.answer}
                  </p>
                </motion.dd>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </dl>
  );
}
