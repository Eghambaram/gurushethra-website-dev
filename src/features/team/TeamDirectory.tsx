"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FilterTabs } from "@/components/common/FilterTabs";
import { TeamMemberCard } from "@/components/common/TeamMemberCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { TeamCategory } from "@/types/team";

export function TeamDirectory({ categories }: { categories: TeamCategory[] }) {
  const rosterCategories = categories
    .map((c) => ({ ...c, members: c.members.filter((m) => !m.featured) }))
    .filter((c) => c.members.length > 0);
  const allMembers = rosterCategories.flatMap((c) => c.members);

  const tabs = [{ key: "all", label: "All" }, ...rosterCategories.map((c) => ({ key: c.id, label: c.name }))];
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? allMembers : rosterCategories.find((c) => c.id === active)?.members ?? [];

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <SectionHeading
          eyebrow="The Roster"
          headline="Instructors & Committee"
          subtitle="Every belt on this page was earned through years of disciplined training. Meet the senseis, coaches, and organisers who run GIMA day to day."
        />
        <FilterTabs tabs={tabs} active={active} onChange={setActive} layoutId="team-tab" />
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((m, i) => (
            <TeamMemberCard key={`${active}-${m.id}`} member={m} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
