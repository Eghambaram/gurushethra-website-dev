"use client";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/SectionHeading";

const BELTS = [
  {
    rank: "9th Kyu",
    color: "bg-yellow-400",
    borderColor: "border-yellow-400/50",
    glowColor: "shadow-yellow-400/20",
    textColor: "text-brand-background",
    label: "Yellow",
    months: "0 – 3 months",
    skills: "Stances, basic blocks, first kata",
  },
  {
    rank: "8th Kyu",
    color: "bg-orange-400",
    borderColor: "border-orange-400/50",
    glowColor: "shadow-orange-400/20",
    textColor: "text-brand-background",
    label: "Orange",
    months: "3 – 6 months",
    skills: "Strikes, kicks, movement drills",
  },
  {
    rank: "7th Kyu",
    color: "bg-green-500",
    borderColor: "border-green-500/50",
    glowColor: "shadow-green-500/20",
    textColor: "text-white",
    label: "Green",
    months: "6 – 12 months",
    skills: "Combinations, partner work, kata 2",
  },
  {
    rank: "6th Kyu",
    color: "bg-blue-500",
    borderColor: "border-blue-500/50",
    glowColor: "shadow-blue-500/20",
    textColor: "text-white",
    label: "Blue",
    months: "1 – 2 years",
    skills: "Kumite basics, bunkai, strength",
  },
  {
    rank: "5th Kyu",
    color: "bg-purple-500",
    borderColor: "border-purple-500/50",
    glowColor: "shadow-purple-500/20",
    textColor: "text-white",
    label: "Purple",
    months: "2 – 3 years",
    skills: "Free sparring, advanced kata",
  },
  {
    rank: "1st–4th Kyu",
    color: "bg-amber-800",
    borderColor: "border-amber-800/50",
    glowColor: "shadow-amber-800/20",
    textColor: "text-white",
    label: "Brown",
    months: "3 – 5 years",
    skills: "Competition prep, leadership",
  },
  {
    rank: "Dan Grade",
    color: "bg-brand-background",
    borderColor: "border-brand-gold",
    glowColor: "shadow-brand-gold/30",
    textColor: "text-white",
    label: "Black",
    months: "5+ years",
    skills: "Mastery, leadership, tradition",
    isBlack: true,
  },
];

export function BeltJourneySection() {
  return (
    <section
      className="py-16 lg:py-20 bg-brand-background overflow-hidden relative"
      aria-labelledby="belt-heading"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(212,175,55,0.04),transparent)]" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <SectionHeading
          id="belt-heading"
          eyebrow="Your Path"
          headline="The Belt Journey"
          subtitle="Every black belt was once a white belt. Your journey starts with a single step — and GIMA walks every step with you."
        />

        {/* Desktop: card row with connecting line */}
        <div className="hidden md:block relative" aria-label="Belt progression from white to black">
          {/* Connecting gradient line threaded through the disc centres (p-4 + half of w-14 = 16+28 = 44px) */}
          <div
            className="absolute top-[44px] left-[calc(100%/14+8px)] right-[calc(100%/14+8px)] h-px bg-gradient-to-r from-white/15 via-brand-gold/50 to-brand-gold"
            aria-hidden
          />

          <div className="grid grid-cols-7 gap-3">
            {BELTS.map((belt, i) => (
              <motion.div
                key={belt.rank}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col gap-3 p-4 rounded-xl border ${belt.isBlack ? "bg-brand-surface border-brand-gold/30" : "bg-brand-surface-alt border-white/6"} transition-all duration-300 hover:border-brand-gold/40 group`}
              >
                {/* Belt disc */}
                <div className="flex items-center justify-center">
                  <div
                    className={`w-14 h-14 rounded-full ${belt.color} border-2 ${belt.borderColor} shadow-lg ${belt.glowColor} relative shrink-0`}
                    aria-label={`${belt.label} belt`}
                  >
                    {belt.isBlack && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{ boxShadow: ["0 0 0px var(--color-brand-gold)", "0 0 18px var(--color-brand-gold)", "0 0 0px var(--color-brand-gold)"] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        aria-hidden
                      />
                    )}
                  </div>
                </div>

                {/* Label block */}
                <div className="flex flex-col gap-1 text-center">
                  <p className={`font-heading font-bold text-sm ${belt.isBlack ? "text-brand-gold" : "text-white"} group-hover:text-brand-gold transition-colors`}>
                    {belt.label}
                  </p>
                  <p className="text-gray-500 text-[10px] font-medium">{belt.rank}</p>
                  <p className="text-gray-600 text-[10px] leading-snug mt-0.5">{belt.months}</p>
                </div>

                {/* Skills — hidden until hover on lg */}
                <p className="text-gray-500 text-[10px] text-center leading-relaxed border-t border-white/5 pt-2 mt-auto">
                  {belt.skills}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative" aria-label="Belt progression">
          <div
            className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-white/15 via-brand-gold/50 to-brand-gold"
            aria-hidden
          />
          <div className="flex flex-col gap-3">
            {BELTS.map((belt, i) => (
              <motion.div
                key={belt.rank}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-center gap-4 pl-4 pr-4 py-4 rounded-xl border ${belt.isBlack ? "bg-brand-surface border-brand-gold/30" : "bg-brand-surface-alt border-white/5"} ml-4`}
              >
                {/* Connector dot on the timeline */}
                <div className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-background border-2 border-brand-gold/60 z-10" aria-hidden />

                <div className={`w-10 h-10 rounded-full ${belt.color} border-2 ${belt.borderColor} shrink-0`} aria-hidden />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <p className={`font-bold text-sm ${belt.isBlack ? "text-brand-gold" : "text-white"}`}>
                      {belt.label} Belt
                    </p>
                    <span className="text-gray-500 text-[10px]">{belt.rank}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">{belt.months}</p>
                  <p className="text-gray-600 text-[11px] mt-1 leading-snug">{belt.skills}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-gray-500 text-sm"
        >
          Belt examinations held twice yearly. Progress depends on consistent attendance and instructor assessment.
        </motion.p>
      </div>
    </section>
  );
}
