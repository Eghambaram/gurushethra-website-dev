"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { CTAButton } from "@/components/common/CTAButton";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { Phone } from "lucide-react";

interface CTABandProps {
  eyebrow?: string;
  headline?: ReactNode;
  subtitle?: string;
}

export function CTABand({
  eyebrow = "Start Today",
  headline = <>Your First Class<br />Is On Us.</>,
  subtitle = "Book a free trial session at any GIMA centre. No equipment needed, no commitment required — just show up and find out what you're capable of.",
}: CTABandProps = {}) {
  const { phone } = useSiteSettings();

  return (
    <section className="relative overflow-hidden py-16 lg:py-20" aria-label="Call to action">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiSU4VYKu6fFAYjIvjimFvExP1VHCK3M618fHqOO7SdxtWr6qFrR7CriyyElZLzYzEH9rUJhr43Jht6TpuoATy7G9_nceHw-gS4gCxJmBa4Vq3c-OKjdyBWAv8gpNC9KLv6QetN4QL34QKH2ygD_8rgkRh-k8ZBVo6R19IagIewkSpJR2hSRsYIMu8roB8/w584-h328/IMG_2351.jpg"
          alt="GIMA championship"
          width={1200}
          height={675}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-background/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-background via-transparent to-brand-background" />
      </div>

      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" aria-hidden />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-brand-gold" aria-hidden />
            <span className="text-brand-gold text-xs font-bold tracking-[0.25em] uppercase">
              {eyebrow}
            </span>
            <span className="h-px w-10 bg-brand-gold" aria-hidden />
          </div>
          <h2 className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
            {headline}
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center w-full"
        >
          <CTAButton label="Book Free Trial" href="/contact" variant="primary" size="lg" className="w-full sm:w-auto" />
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 border-2 border-white/20 text-white font-bold text-sm tracking-widest uppercase rounded hover:border-white/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[44px]"
          >
            <Phone size={16} aria-hidden />
            {phone}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-500 text-sm"
        >
          Limited seats per batch. Early registration recommended.
        </motion.p>
      </div>

      {/* Gold bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" aria-hidden />
    </section>
  );
}
