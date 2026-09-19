import eventsData from "@/data/events.json";
import { createPublicClient } from "@/lib/supabase/public";
import type { Event, EventStatus } from "@/types/event";

function mapRow(row: Record<string, unknown>): Event {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    type: row.type as Event["type"],
    status: row.status as EventStatus,
    date: row.date as string,
    endDate: row.end_date as string,
    time: row.time as string,
    venue: row.venue as string,
    description: row.description as string,
    image: row.image as string,
    featured: row.featured as boolean,
  };
}

export async function getEvents(): Promise<Event[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("events").select("*").order("status").order("order_index");
  if (error || !data) return eventsData as Event[];
  return data.map(mapRow);
}

export async function getEventsByStatus(status: EventStatus): Promise<Event[]> {
  const all = await getEvents();
  return all.filter((e) => e.status === status);
}

export async function getUpcomingEvents(count?: number): Promise<Event[]> {
  const all = await getEvents();
  const upcoming = all.filter((e) => e.status === "upcoming");
  return count ? upcoming.slice(0, count) : upcoming;
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const all = await getEvents();
  return all.find((e) => e.slug === slug);
}
