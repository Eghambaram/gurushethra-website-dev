import type { TeamCategoryId } from "@/types/team";

export const TEAM_CATEGORIES: { id: TeamCategoryId; name: string }[] = [
  { id: "leadership", name: "Leadership" },
  { id: "technical", name: "Technical Leadership" },
  { id: "administration", name: "Administration & Operations" },
  { id: "advisory", name: "Advisory & Specialist Team" },
  { id: "coaches", name: "Coaches & Committee Members" },
];
