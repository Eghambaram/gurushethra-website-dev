"use client";
import { motion } from "framer-motion";
import { Counter } from "@/components/common/Counter";
import type { HeroStat } from "@/types/hero";

interface StatsBarProps {
  stats: HeroStat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section
      className="relative z-10 bg-brand-surface-alt border-y border-white/6"
      aria-label="Key statistics"
    >
      {/* Gold top shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-brand-gold) 40%, var(--color-brand-gold) 60%, transparent)" }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center justify-center py-8 px-4 gap-1.5 border-r border-white/5 last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/[0.03] transition-colors duration-300" />

              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="font-heading font-black text-brand-gold text-4xl lg:text-5xl leading-none relative z-10"
              />
              <span className="text-gray-500 text-[10px] font-semibold tracking-[0.18em] uppercase text-center relative z-10">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom shimmer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-brand-gold) 40%, var(--color-brand-gold) 60%, transparent)" }}
        aria-hidden
      />
    </section>
  );
}
