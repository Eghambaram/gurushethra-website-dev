"use client";
import { StatTile } from "@/components/common/StatTile";
import { SectionHeading } from "@/components/common/SectionHeading";

interface TeamHeroStat {
  value: number;
  suffix: string;
  label: string;
}

export function TeamHero({ stats }: { stats: TeamHeroStat[] }) {
  return (
    <section className="pt-8 pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading
          as="h1"
          eyebrow="Our People"
          headline="The Team Behind Every Black Belt"
          subtitle="From the founder's dojo in 1998 to four thriving centres today, GIMA is run by senseis, coaches, and organisers who train, teach, and compete alongside every student."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto w-full">
          {stats.map((s, i) => (
            <StatTile key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} size="md" align="center" />
          ))}
        </div>
      </div>
    </section>
  );
}
