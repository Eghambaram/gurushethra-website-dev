"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TestimonialCard } from "@/components/common/TestimonialCard";
import { CTAButton } from "@/components/common/CTAButton";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [active, setActive] = useState(0);
  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(testimonials.length - 1, i + 1));

  return (
    <section className="py-16 lg:py-20 bg-brand-surface-alt" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="What They Say"
          headline="Voices from Our Community"
          subtitle="Real words from real students and parents — unedited, unfiltered."
        />

        {/* Desktop 3-up */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard testimonial={testimonials[active]} />
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              disabled={active === 0}
              aria-label="Previous testimonial"
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${
                    i === active ? "bg-brand-gold w-6" : "bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={active === testimonials.length - 1}
              aria-label="Next testimonial"
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* CTA — conversion path after social proof */}
        <div className="flex justify-center pt-2">
          <CTAButton label="Read All Stories" href="/testimonials" variant="outline" size="md" />
        </div>
      </div>
    </section>
  );
}
