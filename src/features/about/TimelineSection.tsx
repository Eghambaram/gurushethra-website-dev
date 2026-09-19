"use client";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { TimelineItem } from "@/types/timeline";

interface TimelineSectionProps {
  items: TimelineItem[];
}

export function TimelineSection({ items }: TimelineSectionProps) {
  return (
    <section className="py-24 lg:py-32 bg-brand-surface-alt overflow-hidden" aria-labelledby="timeline-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
        <SectionHeading
          eyebrow="Milestones"
          headline="Our Timeline"
          subtitle="Six pivotal moments that shaped who we are — and who our students have become."
        />

        {/* Desktop: horizontal scroll track */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div
            className="absolute top-[2.6rem] left-0 right-0 h-0.5 bg-gradient-to-r from-brand-gold/20 via-brand-gold/60 to-brand-gold/20"
            aria-hidden
          />

          <div className="grid grid-cols-6 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4"
              >
                {/* Node */}
                <div className="relative flex items-center justify-center w-[4.5rem] h-[4.5rem] rounded-full border-2 border-brand-gold bg-brand-surface-alt z-10 shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                    className="w-3 h-3 rounded-full bg-brand-gold"
                    aria-hidden
                  />
                  <span className="absolute -bottom-7 text-brand-gold font-bold text-sm whitespace-nowrap">
                    {item.year}
                  </span>
                </div>

                {/* Card */}
                <div className="mt-8 p-4 rounded-xl bg-brand-surface border border-white/5 flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-white text-sm leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative flex flex-col gap-0">
          {/* Vertical spine */}
          <div
            className="absolute left-[1.4rem] top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand-gold via-brand-gold/60 to-brand-gold/20"
            aria-hidden
          />

          {items.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-5 pb-10 last:pb-0"
            >
              {/* Node */}
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-brand-gold bg-brand-surface-alt shrink-0 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-gold" aria-hidden />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1 pt-2.5">
                <span className="text-brand-gold font-bold text-sm">{item.year}</span>
                <h3 className="font-heading font-bold text-white text-base">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
