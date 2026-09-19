import programsData from "@/data/programs.json";
import { createPublicClient } from "@/lib/supabase/public";
import type { Program } from "@/types/program";

function mapRow(row: Record<string, unknown>): Program {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    ageRange: row.age_range as string,
    shortDescription: row.short_description as string,
    description: row.description as string,
    image: row.image as string,
    features: row.features as string[],
    duration: row.duration as string,
    schedule: row.schedule as string,
    featured: row.featured as boolean,
  };
}

export async function getPrograms(): Promise<Program[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("programs").select("*").order("order_index");
  if (error || !data) return programsData as Program[];
  return data.map(mapRow);
}

export async function getFeaturedPrograms(): Promise<Program[]> {
  const all = await getPrograms();
  return all.filter((p) => p.featured);
}

export async function getProgramBySlug(slug: string): Promise<Program | undefined> {
  const all = await getPrograms();
  return all.find((p) => p.slug === slug);
}
