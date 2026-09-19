"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { cardFadeUp } from "@/lib/motion";
import type { Program } from "@/types/program";

interface ProgramCardProps {
  program: Program;
  index?: number;
}

export function ProgramCard({ program, index = 0 }: ProgramCardProps) {
  return (
    <motion.article
      {...cardFadeUp({ index })}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-brand-surface border border-white/5 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/5"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent" />
        {/* Age badge */}
        <span className="absolute top-3 right-3 px-3 py-1 bg-brand-gold text-brand-background text-xs font-bold rounded tracking-wide uppercase">
          {program.ageRange}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-heading text-xl font-bold text-white group-hover:text-brand-gold transition-colors">
          {program.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-1">
          {program.shortDescription}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-1 border-t border-white/5">
          <span className="flex items-center gap-1.5">
            <Clock size={12} aria-hidden /> {program.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={12} aria-hidden /> {program.schedule}
          </span>
        </div>

        <CTAButton
          label="Learn More"
          href={`/programs/${program.slug}`}
          variant="outline"
          size="sm"
          className="w-full mt-1 min-h-[44px]"
        />
      </div>
    </motion.article>
  );
}
