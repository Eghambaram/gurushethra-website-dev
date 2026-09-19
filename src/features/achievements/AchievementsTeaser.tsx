"use client";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatTile } from "@/components/common/StatTile";
import { AchievementCard } from "@/components/common/AchievementCard";
import { CTAButton } from "@/components/common/CTAButton";
import type { Achievements } from "@/types/achievement";

interface AchievementsTeaserProps {
  achievements: Achievements;
}

export function AchievementsTeaser({ achievements }: AchievementsTeaserProps) {
  return (
    <section className="py-16 lg:py-20 bg-brand-surface-alt" aria-labelledby="achievements-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeading
            id="achievements-heading"
            eyebrow="Our Record"
            headline="A Legacy of Champions"
            subtitle="Decades of dedication, measured in medals, titles, and lives changed."
            align="left"
          />
          <CTAButton label="Full Record" href="/achievements" variant="outline" size="md" className="shrink-0" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.stats.map((s, i) => (
            <StatTile key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} size="lg" labelUppercase />
          ))}
        </div>

        {/* Recent achievements list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0">
          <div>
            {achievements.recent.slice(0, 2).map((a, i) => (
              <AchievementCard key={a.id} achievement={a} index={i} />
            ))}
          </div>
          <div>
            {achievements.recent.slice(2, 4).map((a, i) => (
              <AchievementCard key={a.id} achievement={a} index={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
