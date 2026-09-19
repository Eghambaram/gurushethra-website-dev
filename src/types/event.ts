export type EventType = "camp" | "grading" | "tournament" | "seminar";
export type EventStatus = "upcoming" | "past";

export interface Event {
  id: string;
  slug: string;
  title: string;
  type: EventType;
  status: EventStatus;
  date: string;
  endDate: string;
  time: string;
  venue: string;
  description: string;
  image: string;
  featured: boolean;
}
