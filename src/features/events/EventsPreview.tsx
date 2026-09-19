import { SectionHeading } from "@/components/common/SectionHeading";
import { EventCard } from "@/components/common/EventCard";
import { CTAButton } from "@/components/common/CTAButton";
import type { Event } from "@/types/event";

interface EventsPreviewProps {
  events: Event[];
}

export function EventsPreview({ events }: EventsPreviewProps) {
  return (
    <section className="py-16 lg:py-20 bg-brand-background" aria-labelledby="events-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeading
            id="events-heading"
            eyebrow="What's On"
            headline="Upcoming Events"
            subtitle="Camps, belt tests, and tournaments — stay connected with life at GIMA."
            align="left"
          />
          <CTAButton label="All Events" href="/events" variant="outline" size="md" className="shrink-0" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <EventCard key={e.id} event={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
