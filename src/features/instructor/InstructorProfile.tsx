"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Trophy, Quote } from "lucide-react";
import { StatTile } from "@/components/common/StatTile";
import { CTAButton } from "@/components/common/CTAButton";
import type { Instructor } from "@/types/instructor";

export function InstructorProfile({ instructor }: { instructor: Instructor }) {
  return (
    <article className="pt-8 pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden pb-20">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image src={instructor.image} alt="" fill sizes="100vw" className="object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-background/60 to-brand-background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Portrait */}
            <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden max-w-sm mx-auto lg:mx-0 shadow-2xl">
                <Image src={instructor.image} alt={instructor.name} fill sizes="(max-width:1024px) 80vw, 40vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-heading font-black text-white text-2xl">{instructor.name}</p>
                  <p className="text-brand-gold font-semibold mt-0.5">{instructor.dan} · {instructor.style}</p>
                </div>
              </div>
              <div className="absolute -left-3 top-16 bottom-16 w-1 bg-gradient-to-b from-brand-gold via-brand-gold/50 to-transparent rounded-full" aria-hidden />
            </motion.div>

            {/* Bio + stats */}
            <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-8 pt-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-brand-gold" aria-hidden />
                  <span className="text-brand-gold text-xs font-bold tracking-[0.25em] uppercase">{instructor.title}</span>
                </div>
                <h1 className="font-heading font-black text-white text-5xl lg:text-6xl leading-[0.95] mb-6">{instructor.name}</h1>
                <p className="text-gray-300 text-lg leading-relaxed">{instructor.bio}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {instructor.stats.map((s, i) => (
                  <StatTile key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} size="md" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative p-6 rounded-xl bg-brand-surface border-l-2 border-brand-gold">
                <Quote size={24} className="text-brand-gold/30 absolute top-4 right-4" aria-hidden />
                <p className="text-gray-300 text-base italic leading-relaxed">&ldquo;{instructor.bioExtended}&rdquo;</p>
              </div>

              <CTAButton label="Book a Free Trial" href="/contact" variant="primary" size="lg" className="w-fit" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Qualifications & Achievements */}
      <section className="py-20 bg-brand-surface-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col gap-6">
              <h2 className="font-heading font-bold text-white text-2xl flex items-center gap-3">
                <span className="w-6 h-px bg-brand-gold" aria-hidden />Qualifications
              </h2>
              <ul className="flex flex-col gap-4">
                {instructor.qualifications.map((q, i) => (
                  <motion.li key={q} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-brand-surface border border-white/5">
                    <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" aria-hidden />
                    <span className="text-gray-300 text-sm leading-relaxed">{q}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col gap-6">
              <h2 className="font-heading font-bold text-white text-2xl flex items-center gap-3">
                <span className="w-6 h-px bg-brand-gold" aria-hidden />Achievements
              </h2>
              <ul className="flex flex-col gap-4">
                {instructor.achievements.map((a, i) => (
                  <motion.li key={a} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-brand-surface border border-white/5">
                    <Trophy size={16} className="text-brand-gold shrink-0 mt-0.5" aria-hidden />
                    <span className="text-gray-300 text-sm leading-relaxed">{a}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </article>
  );
}
