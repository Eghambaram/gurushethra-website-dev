"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Medal } from "lucide-react";
import { EASE_STANDARD } from "@/lib/motion";
import type { RecentAchievement } from "@/types/achievement";

interface AchievementCardProps {
  achievement: RecentAchievement;
  index?: number;
}

export function AchievementCard({ achievement, index = 0 }: AchievementCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_STANDARD }}
      className="flex gap-5 group"
    >
      {/* Year spine */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        <span className="text-brand-gold font-bold text-sm">{achievement.year}</span>
        <div className="w-px flex-1 bg-gradient-to-b from-brand-gold/60 to-transparent" aria-hidden />
      </div>

      {/* Card */}
      <div className="relative flex-1 overflow-hidden rounded-xl bg-brand-surface border border-white/5 group-hover:border-brand-gold/30 group-hover:shadow-xl group-hover:shadow-brand-gold/5 transition-all duration-300 mb-8">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-gold to-transparent" aria-hidden />

        {achievement.image && (
          <div className="relative h-32 overflow-hidden">
            <Image
              src={achievement.image}
              alt={achievement.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-surface to-transparent" />
          </div>
        )}

        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading font-bold text-white text-base leading-snug">
              {achievement.title}
            </h3>
            <span className="px-2.5 py-1 bg-brand-red/80 text-white text-xs font-semibold rounded shrink-0">
              {achievement.result}
            </span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">{achievement.description}</p>

          {/* Medal row — only shown when there are medals to display */}
          {(achievement.medals.gold > 0 || achievement.medals.silver > 0 || achievement.medals.bronze > 0) && (
            <div className="flex gap-4 pt-2 border-t border-white/5">
              {achievement.medals.gold > 0 && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-yellow-400">
                  <Medal size={13} aria-hidden />
                  {achievement.medals.gold}G
                </span>
              )}
              {achievement.medals.silver > 0 && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-300">
                  <Medal size={13} aria-hidden />
                  {achievement.medals.silver}S
                </span>
              )}
              {achievement.medals.bronze > 0 && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-orange-400">
                  <Medal size={13} aria-hidden />
                  {achievement.medals.bronze}B
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
