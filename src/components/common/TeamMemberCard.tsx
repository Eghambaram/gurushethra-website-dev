"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { cardMountFadeUp } from "@/lib/motion";
import { getInitials } from "@/utils/initials";
import type { TeamMember } from "@/types/team";

function shortRank(rank: string) {
  const base = rank.split("—")[0].trim();
  const danMatch = base.match(/^[IVXLCDM]+\s*Dan/i);
  return danMatch ? danMatch[0] : base;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index?: number;
}

export function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
  const hasPhoto = !member.image.includes("placeholder-instructor");

  return (
    <motion.div layout {...cardMountFadeUp({ index })}>
      <Link
        href={`/team/${member.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-xl bg-brand-surface border border-white/5 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          {hasPhoto ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-surface-2 to-brand-surface-alt">
              <span className="font-heading font-black text-brand-gold/35 text-5xl tracking-wide">
                {getInitials(member.name)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/15 to-transparent" />
          <span className="absolute top-3 right-3 max-w-[75%] px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-brand-gold/40 text-brand-gold text-[10px] font-bold rounded uppercase tracking-wide text-right leading-tight">
            {shortRank(member.rank)}
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-heading font-bold text-white text-base leading-tight">{member.name}</p>
            <p className="text-brand-gold text-xs font-semibold mt-0.5">{member.title}</p>
          </div>
        </div>
        {member.achievements.length > 0 && (
          <div className="flex flex-wrap gap-1.5 p-3 border-t border-white/5">
            {member.achievements.slice(0, 2).map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/5 text-gray-400 text-[11px] rounded"
              >
                <Trophy size={10} className="text-brand-gold" aria-hidden />
                {a}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
