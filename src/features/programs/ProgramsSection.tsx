import { SectionHeading } from "@/components/common/SectionHeading";
import { ProgramCard } from "@/components/common/ProgramCard";
import { CTAButton } from "@/components/common/CTAButton";
import type { Program } from "@/types/program";

interface ProgramsSectionProps {
  programs: Program[];
}

export function ProgramsSection({ programs }: ProgramsSectionProps) {
  return (
    <section className="py-16 lg:py-20 bg-brand-background" aria-labelledby="programs-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeading
            id="programs-heading"
            eyebrow="What We Offer"
            headline="Train for Every Stage of Life"
            subtitle="Six purpose-built programs for ages 4 to adult — each with a clear curriculum, belt pathway, and dedicated instructor time."
            align="left"
          />
          <CTAButton label="View All Programs" href="/programs" variant="outline" size="md" className="shrink-0" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <ProgramCard key={p.id} program={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
