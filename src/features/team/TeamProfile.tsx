"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Trophy } from "lucide-react";
import { StatTile } from "@/components/common/StatTile";
import { CTAButton } from "@/components/common/CTAButton";
import { getInitials } from "@/utils/initials";
import type { TeamMember } from "@/types/team";

export function TeamProfile({ member }: { member: TeamMember }) {
  const hasCredentials = member.credentials.length > 0;
  const hasAchievements = member.achievements.length > 0;
  const hasStats = (member.stats?.length ?? 0) > 0;
  const hasPhoto = !member.image.includes("placeholder-instructor");

  return (
    <article className="pt-8 pb-0">
      <section className="relative overflow-hidden pb-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden max-w-sm mx-auto lg:mx-0 shadow-2xl">
                {hasPhoto ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-surface-2 to-brand-surface-alt">
                    <span className="font-heading font-black text-brand-gold/35 text-7xl tracking-wide">
                      {getInitials(member.name)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-heading font-black text-white text-2xl">{member.name}</p>
                  <p className="text-brand-gold font-semibold mt-0.5">{member.rank}</p>
                </div>
              </div>
              <div
                className="absolute -left-3 top-16 bottom-16 w-1 bg-gradient-to-b from-brand-gold via-brand-gold/50 to-transparent rounded-full"
                aria-hidden
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-8 pt-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-brand-gold" aria-hidden />
                  <span className="text-brand-gold text-xs font-bold tracking-[0.25em] uppercase">
                    {member.title}
                  </span>
                </div>
                <h1 className="font-heading font-black text-white text-5xl lg:text-6xl leading-[0.95] mb-6">
                  {member.name}
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {member.bio ??
                    `${member.name} serves as ${member.title} at Gurushethra Institute of Martial Arts, holding the rank of ${member.rank}.`}
                </p>
              </div>

              {hasStats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {member.stats!.map((s, i) => (
                    <StatTile key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} size="md" />
                  ))}
                </div>
              )}

              <CTAButton label="Book a Free Trial" href="/contact" variant="primary" size="lg" className="w-fit" />
            </motion.div>
          </div>
        </div>
      </section>

      {(hasCredentials || hasAchievements) && (
        <section className="py-20 bg-brand-surface-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 gap-12 ${hasCredentials && hasAchievements ? "lg:grid-cols-2" : ""}`}>
              {hasCredentials && (
                <div className="flex flex-col gap-6">
                  <h2 className="font-heading font-bold text-white text-2xl flex items-center gap-3">
                    <span className="w-6 h-px bg-brand-gold" aria-hidden />
                    Credentials
                  </h2>
                  <ul className="flex flex-col gap-4">
                    {member.credentials.map((c, i) => (
                      <motion.li
                        key={c.label}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-brand-surface border border-white/5"
                      >
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" aria-hidden />
                        <span className="text-gray-300 text-sm leading-relaxed">
                          <span className="text-white font-medium">{c.label}:</span> {c.value}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
              {hasAchievements && (
                <div className="flex flex-col gap-6">
                  <h2 className="font-heading font-bold text-white text-2xl flex items-center gap-3">
                    <span className="w-6 h-px bg-brand-gold" aria-hidden />
                    Achievements
                  </h2>
                  <ul className="flex flex-col gap-4">
                    {member.achievements.map((a, i) => (
                      <motion.li
                        key={a}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-brand-surface border border-white/5"
                      >
                        <Trophy size={16} className="text-brand-gold shrink-0 mt-0.5" aria-hidden />
                        <span className="text-gray-300 text-sm leading-relaxed">{a}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex justify-center">
        <CTAButton label="Meet the Rest of the Team" href="/team" variant="outline" size="md" />
      </div>
    </article>
  );
}
