"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { StarRating } from "./StarRating";
import { cardFadeUp } from "@/lib/motion";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.article
      {...cardFadeUp({ index })}
      className="bg-brand-surface rounded-xl p-7 flex flex-col gap-5 border border-white/5 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/5 h-full"
    >
      {/* Top row: stars + large decorative quote */}
      <div className="flex items-start justify-between gap-2">
        <StarRating rating={testimonial.rating} />
        <Quote size={32} className="text-brand-gold/60 shrink-0 -mt-1" aria-hidden />
      </div>

      <blockquote className="text-gray-200 text-[15px] leading-relaxed flex-1 italic">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3 pt-4 border-t border-white/8">
        <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center shrink-0">
          <span className="text-brand-gold font-bold text-sm" aria-hidden>
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{testimonial.name}</p>
          <p className="text-brand-gold/70 text-xs">{testimonial.role}</p>
        </div>
      </div>
    </motion.article>
  );
}
