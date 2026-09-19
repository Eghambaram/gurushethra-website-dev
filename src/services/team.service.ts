import { teamMembers as staticMembers } from "@/data/team";
import { createPublicClient } from "@/lib/supabase/public";
import type { TeamMember, TeamCategory, TeamCategoryId } from "@/types/team";

const CATEGORY_ORDER: { id: TeamCategoryId; name: string }[] = [
  { id: "leadership", name: "Leadership" },
  { id: "technical", name: "Technical Leadership" },
  { id: "administration", name: "Administration & Operations" },
  { id: "advisory", name: "Advisory & Specialist Team" },
  { id: "coaches", name: "Coaches & Committee Members" },
];

function mapRow(row: Record<string, unknown>): TeamMember {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    title: row.title as string,
    category: row.category as TeamCategoryId,
    rank: row.rank as string,
    bio: (row.bio as string | null) ?? undefined,
    credentials: (row.credentials as TeamMember["credentials"]) ?? [],
    achievements: (row.achievements as string[]) ?? [],
    image: row.image as string,
    featured: row.featured as boolean,
    stats: (row.stats as TeamMember["stats"] | null) ?? undefined,
  };
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("team_members").select("*").order("category").order("order_index");
  if (error || !data) return staticMembers;
  return data.map(mapRow);
}

export async function getTeamCategories(): Promise<TeamCategory[]> {
  const members = await getAllTeamMembers();
  return CATEGORY_ORDER.map((c) => ({
    id: c.id,
    name: c.name,
    members: members.filter((m) => m.category === c.id),
  }));
}

export async function getFeaturedTeamMember(): Promise<TeamMember | undefined> {
  const members = await getAllTeamMembers();
  return members.find((m) => m.featured);
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | undefined> {
  const members = await getAllTeamMembers();
  return members.find((m) => m.slug === slug);
}
