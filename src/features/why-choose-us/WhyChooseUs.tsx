"use client";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { resolveIcon } from "@/lib/icons";
import type { WhyChooseUsReason } from "@/types/whyChooseUs";

interface WhyChooseUsProps {
  reasons: WhyChooseUsReason[];
}

export function WhyChooseUs({ reasons }: WhyChooseUsProps) {
  return (
    <section className="py-16 lg:py-20 bg-brand-surface-alt relative overflow-hidden" aria-labelledby="why-heading">
      {/* Background kanji */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
        <span className="text-[40rem] font-black text-white/[0.015] leading-none">道</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <SectionHeading
          id="why-heading"
          eyebrow="Why GIMA"
          headline="The Difference is in the Detail"
          subtitle="Not every dojo is the same. Here is what sets Gurushethra apart — and why Chennai families have trusted us since 1998."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ id, icon, title, description }, i) => {
            const Icon = resolveIcon(icon);
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative p-7 rounded-2xl bg-brand-surface border border-white/5 hover:border-brand-gold/25 transition-all duration-300 flex flex-col gap-5 overflow-hidden"
              >
                {/* Faded sequence number — adds depth without clutter */}
                <span className="absolute bottom-3 right-4 font-heading font-black text-[5rem] leading-none text-white/[0.03] select-none pointer-events-none" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                  <Icon size={22} className="text-brand-gold" aria-hidden />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-white text-lg group-hover:text-brand-gold transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
