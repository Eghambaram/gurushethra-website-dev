"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Clock, CalendarDays } from "lucide-react";
import { cardFadeUp } from "@/lib/motion";
import type { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
  index?: number;
}

const TYPE_LABELS: Record<string, string> = {
  camp: "Camp",
  grading: "Belt Test",
  tournament: "Tournament",
  seminar: "Seminar",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const day = new Date(event.date).getDate();
  const month = new Date(event.date).toLocaleString("en-IN", { month: "short" });

  return (
    <motion.article
      {...cardFadeUp({ index })}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-brand-surface border border-white/5 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/5"
    >
      {/* Image with date badge */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-black/20 to-transparent" />

        {/* Date badge */}
        <div className="absolute top-4 left-4 flex flex-col items-center justify-center w-14 h-14 bg-brand-gold rounded-xl shadow-lg">
          <span className="font-bold text-brand-background text-xl leading-none">{day}</span>
          <span className="text-brand-background text-[10px] font-semibold uppercase tracking-wider">{month}</span>
        </div>

        {/* Type badge */}
        <span className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/10">
          {TYPE_LABELS[event.type] ?? event.type}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-heading text-lg font-bold text-white leading-snug group-hover:text-brand-gold transition-colors">
          {event.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed flex-1 line-clamp-2">
          {event.description}
        </p>

        <div className="flex flex-col gap-1.5 text-xs text-gray-500 pt-2 border-t border-white/5">
          <span className="flex items-center gap-2">
            <CalendarDays size={12} aria-hidden />
            {formatDate(event.date)}
            {event.endDate !== event.date && ` – ${formatDate(event.endDate)}`}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={12} aria-hidden /> {event.time}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={12} aria-hidden /> {event.venue}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
