"use client";
import { useState } from "react";
import { FilterTabs } from "@/components/common/FilterTabs";
import { EventCard } from "@/components/common/EventCard";
import type { Event } from "@/types/event";

const TABS = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past Events" },
];

export function EventsGrid({ events }: { events: Event[] }) {
  const [active, setActive] = useState("upcoming");
  const filtered = events.filter((e) => e.status === active);

  return (
    <div className="flex flex-col gap-8">
      <FilterTabs tabs={TABS} active={active} onChange={setActive} accentColor="red" layoutId="events-grid-tab" />
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-16">No {active} events at this time. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
        </div>
      )}
    </div>
  );
}
