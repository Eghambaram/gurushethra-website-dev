"use client";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { resolveIcon } from "@/lib/icons";
import type { Value } from "@/types/value";

interface ValuesSectionProps {
  values: Value[];
}

export function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className="py-24 lg:py-32 bg-brand-background" aria-labelledby="values-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">
        <SectionHeading
          eyebrow="What We Stand For"
          headline="Our Values"
          subtitle="The principles that guide every class, every grading, every interaction at GIMA."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {values.map((value, i) => {
            const Icon = resolveIcon(value.icon);
            return (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col items-center text-center gap-5 p-8 rounded-2xl bg-brand-surface border border-white/5 hover:border-brand-gold/30 transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-brand-gold/0 to-brand-gold/0 group-hover:from-brand-gold/5 group-hover:to-transparent transition-all duration-500 rounded-2xl"
                  aria-hidden
                />

                {/* Top gold line on hover */}
                <div
                  className="absolute top-0 left-8 right-8 h-0.5 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] rounded-full"
                  aria-hidden
                />

                {/* Icon */}
                <div className="relative w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors duration-300">
                  <Icon size={26} className="text-brand-gold" aria-hidden />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-white text-lg group-hover:text-brand-gold transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>

                {/* Number watermark */}
                <div
                  className="absolute -bottom-4 -right-2 font-heading font-black text-[6rem] leading-none text-white/[0.025] select-none pointer-events-none"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
