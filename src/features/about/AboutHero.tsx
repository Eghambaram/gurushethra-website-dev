"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/common/CTAButton";
import type { AboutHero as AboutHeroData } from "@/types/about";

interface AboutHeroProps {
  aboutHero: AboutHeroData;
}

export function AboutHero({ aboutHero }: AboutHeroProps) {
  return (
    <section className="relative pt-8 pb-20 overflow-hidden" aria-label="About hero">
      {/* Subtle background texture — fixed design element, not admin-editable */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhKyLxf_xVfqZvOwjT00qOU0GfdckkwUEVEdTE1ayiBzifSOOx0cccsfomzX-OtDpb_SoOxBq7dYvkkqQgd4v44QZ1lnu6EgOQKXtysOC5TERco6y5CRT9cM7NWzPo7ya28vBXWN1IU1YiCD8ksgAqHUvWCGPPsIR7FmR3PRiq4zD4NyVvqo2rHRzLGYWU/s3048/IMG_3407.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-background/80 via-brand-background/70 to-brand-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Text */}
          <div className="flex flex-col gap-7">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-10 bg-brand-gold" aria-hidden />
              <span className="text-brand-gold text-xs font-bold tracking-[0.25em] uppercase">
                {aboutHero.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-black text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
            >
              {aboutHero.headline}
              {aboutHero.headlineHighlight && (
                <>
                  <br />
                  <span className="text-brand-gold">{aboutHero.headlineHighlight}</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-gray-300 text-lg leading-relaxed max-w-lg"
            >
              {aboutHero.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CTAButton label={aboutHero.ctaLabel} href={aboutHero.ctaHref} variant="secondary" size="lg" />
            </motion.div>
          </div>

          {/* Image with kanji */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden max-w-sm mx-auto lg:ml-auto">
              <Image
                src={aboutHero.image}
                alt="GIMA karate training"
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Kanji backdrop — overlapping the image corner */}
            <div
              className="absolute -right-6 -bottom-6 text-[14rem] font-black text-brand-gold/8 leading-none select-none pointer-events-none"
              aria-hidden
            >
              武
            </div>

            {/* Est. badge */}
            <div className="absolute -left-5 top-8 flex flex-col items-center justify-center w-20 h-20 rounded-full bg-brand-gold shadow-xl shadow-brand-gold/30">
              <span className="font-heading font-black text-brand-background text-xs tracking-wide">{aboutHero.badgeLabel}</span>
              <span className="font-heading font-black text-brand-background text-xl leading-none">{aboutHero.badgeValue}</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
