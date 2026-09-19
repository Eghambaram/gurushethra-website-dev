"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { StatTile } from "@/components/common/StatTile";
import { CTAButton } from "@/components/common/CTAButton";
import { smoothScrollToId } from "@/utils/scroll";
import type { TeamMember } from "@/types/team";

export function FounderSpotlight({ founder }: { founder: TeamMember }) {
  return (
    <section className="py-16 lg:py-20 bg-brand-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden max-w-sm mx-auto lg:mx-0 shadow-2xl">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-heading font-black text-white text-2xl">{founder.name}</p>
                <p className="text-brand-gold font-semibold mt-0.5">{founder.rank}</p>
              </div>
            </div>
            <div
              className="absolute -left-3 top-16 bottom-16 w-1 bg-gradient-to-b from-brand-gold via-brand-gold/50 to-transparent rounded-full"
              aria-hidden
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-7"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-brand-gold" aria-hidden />
                <span className="text-brand-gold text-xs font-bold tracking-[0.25em] uppercase">
                  {founder.title}
                </span>
              </div>
              <h2 className="font-heading font-black text-white text-4xl lg:text-5xl leading-[1.05] mb-5">
                {founder.name}
              </h2>
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                The founder who built GIMA from a single dojo in 1998 into four training
                centres across Chennai — and still trains alongside every sensei and coach on
                this page.
              </p>
            </div>

            {founder.stats && founder.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {founder.stats.map((s, i) => (
                  <StatTile key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} size="sm" />
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <CTAButton label="View Full Profile" href="/instructor" variant="primary" size="md" />
              <CTAButton
                label="See Full Roster"
                href="#roster"
                variant="outline"
                size="md"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToId("roster");
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
