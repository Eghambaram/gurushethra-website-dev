"use client";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  headline: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  headline,
  subtitle,
  align = "center",
  as = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const isLeft = align === "left";
  const Heading = as;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex flex-col gap-3",
        isLeft ? "items-start text-left" : "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-brand-gold" aria-hidden />
          <span className="text-brand-gold text-xs font-bold tracking-[0.22em] uppercase">
            {eyebrow}
          </span>
          {/* Right-side line only on center-aligned headings */}
          {!isLeft && <span className="h-px w-8 bg-brand-gold" aria-hidden />}
        </div>
      )}
      <Heading
        id={id}
        className="font-heading text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-white leading-[1.1]"
      >
        {headline}
      </Heading>
      {subtitle && (
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed mt-1">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
