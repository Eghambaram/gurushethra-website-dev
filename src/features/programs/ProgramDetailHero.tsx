"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Calendar, CheckCircle2 } from "lucide-react";
import { CTAButton } from "@/components/common/CTAButton";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import type { Program } from "@/types/program";

export function ProgramDetailHero({ program }: { program: Program }) {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src={program.image} alt="" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-background/80 via-brand-background/70 to-brand-background" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <Breadcrumb items={[{ label: "Programs", href: "/programs" }, { label: program.title }]} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <span className="inline-block px-3 py-1 bg-brand-gold text-brand-background text-xs font-bold rounded tracking-widest uppercase mb-4">
                {program.ageRange}
              </span>
              <h1 className="font-heading font-black text-white text-5xl sm:text-6xl leading-[0.95]">{program.title}</h1>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.55 }}
              className="text-gray-300 text-lg leading-relaxed">{program.description}</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2"><Clock size={14} className="text-brand-gold" aria-hidden />{program.duration}</span>
              <span className="flex items-center gap-2"><Calendar size={14} className="text-brand-gold" aria-hidden />{program.schedule}</span>
            </motion.div>
            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col gap-2">
              {program.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-gray-300 text-sm">
                  <CheckCircle2 size={14} className="text-brand-gold shrink-0" aria-hidden />{f}
                </li>
              ))}
            </motion.ul>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-4 flex-wrap">
              <CTAButton label="Book Free Trial" href="/contact" variant="primary" size="lg" />
              <CTAButton label="All Programs" href="/programs" variant="outline" size="lg" />
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src={program.image} alt={program.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
