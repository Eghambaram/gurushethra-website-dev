import type { EventType, EventStatus } from "@/types/event";

export const EVENT_TYPES: { id: EventType; name: string }[] = [
  { id: "camp", name: "Camp" },
  { id: "grading", name: "Belt Grading" },
  { id: "tournament", name: "Tournament" },
  { id: "seminar", name: "Seminar" },
];

export const EVENT_STATUSES: { id: EventStatus; name: string }[] = [
  { id: "upcoming", name: "Upcoming" },
  { id: "past", name: "Past" },
];
