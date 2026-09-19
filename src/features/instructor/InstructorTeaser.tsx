"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatTile } from "@/components/common/StatTile";
import { CTAButton } from "@/components/common/CTAButton";
import type { Instructor } from "@/types/instructor";

interface InstructorTeaserProps {
  instructor: Instructor;
}

export function InstructorTeaser({ instructor }: InstructorTeaserProps) {
  return (
    <section
      className="py-16 lg:py-20 bg-brand-surface-alt overflow-hidden"
      aria-labelledby="instructor-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden max-w-sm mx-auto lg:mx-0">
              <Image
                src={instructor.image}
                alt={`${instructor.name} — ${instructor.title}`}
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Name plate */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-heading font-black text-white text-xl">{instructor.name}</p>
                <p className="text-brand-gold text-sm font-semibold mt-0.5">{instructor.dan}</p>
              </div>
            </div>
            {/* Gold accent bar — only visible on lg when columns sit side by side */}
            <div className="hidden lg:block absolute -left-4 top-12 bottom-12 w-1 bg-gradient-to-b from-brand-gold via-brand-gold/60 to-transparent rounded-full" aria-hidden />
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <SectionHeading
              id="instructor-heading"
              eyebrow={instructor.title}
              headline={instructor.name}
              subtitle={instructor.shortBio}
              align="left"
            />

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {instructor.stats.map((s, i) => (
                <StatTile key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} size="sm" />
              ))}
            </div>

            {/* Two columns: qualifications + achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                  <span className="w-4 h-px bg-brand-gold" aria-hidden />
                  Qualifications
                </h3>
                <ul className="flex flex-col gap-2">
                  {instructor.qualifications.slice(0, 4).map((q) => (
                    <li key={q} className="flex items-start gap-2.5 text-gray-400 text-sm">
                      <CheckCircle2 size={14} className="text-brand-gold shrink-0 mt-0.5" aria-hidden />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                  <span className="w-4 h-px bg-brand-gold" aria-hidden />
                  Achievements
                </h3>
                <ul className="flex flex-col gap-2">
                  {instructor.achievements.slice(0, 3).map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-gray-400 text-sm">
                      <Trophy size={14} className="text-brand-gold shrink-0 mt-0.5" aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <CTAButton label="Full Profile" href="/instructor" variant="outline" size="md" className="w-fit" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
