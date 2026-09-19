"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CTAButton } from "@/components/common/CTAButton";
import { resolveIcon } from "@/lib/icons";
import type { Hero } from "@/types/hero";

interface HeroSectionProps {
  hero: Hero;
}

export function HeroSection({ hero }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Reduced parallax range — less GPU work, still cinematic
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Parallax background — will-change tells browser to composite this layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, willChange: "transform" }}
      >
        <Image
          src={hero.backgroundImage}
          alt="GIMA championship team"
          width={1920}
          height={1280}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover object-center"
          priority
          fetchPriority="high"
        />
        {/* Left-heavy gradient keeps text zone dark while right side shows photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-background/90 via-brand-background/60 to-brand-background/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-brand-background" />
      </motion.div>

      {/* Kanji watermark — only xl, low opacity texture */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[28rem] font-black text-white/[0.025] select-none leading-none pointer-events-none hidden xl:block"
        aria-hidden
      >
        空
      </div>

      {/* Vertical gold accent line on the left */}
      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-[2px] hidden lg:block"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-brand-gold), transparent)" }}
        aria-hidden
      />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-28 sm:pb-20 flex flex-col items-start gap-6 lg:gap-7"
      >
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-brand-gold" aria-hidden />
          <span className="text-brand-gold text-[11px] font-bold tracking-[0.32em] uppercase">
            Goju-Ryu Karate · Chennai · Est. 1998
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="flex flex-col gap-0.5 font-heading font-black text-white leading-[0.92] tracking-tight text-[clamp(2.6rem,7.5vw,6.5rem)] max-w-3xl">
          {hero.headlineLines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-gray-300 text-base sm:text-lg max-w-md leading-relaxed"
        >
          {hero.subCopy}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-3"
        >
          <CTAButton label={hero.ctaPrimary.label} href={hero.ctaPrimary.href} variant="primary" size="lg" />
          <CTAButton label={hero.ctaSecondary.label} href={hero.ctaSecondary.href} variant="outline" size="lg" />
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-wrap gap-3 mt-1"
          aria-label="Key credentials"
        >
          {hero.trustBadges.map(({ icon, text }) => {
            const Icon = resolveIcon(icon);
            return (
              <div
                key={text}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <Icon size={13} className="text-brand-gold shrink-0" aria-hidden />
                <span className="text-gray-300 text-[11px] font-medium tracking-wide whitespace-nowrap">{text}</span>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-white/25 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-brand-gold/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
