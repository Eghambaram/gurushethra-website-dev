import branchesData from "@/data/branches.json";
import { createPublicClient } from "@/lib/supabase/public";
import type { Branch } from "@/types/branch";

function mapRow(row: Record<string, unknown>): Branch {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    type: row.type as Branch["type"],
    address: row.address as string,
    phone: row.phone as string,
    email: row.email as string,
    hours: row.hours as string,
    mapEmbed: row.map_embed as string,
    features: (row.features as string[]) ?? [],
    featured: row.featured as boolean,
  };
}

export async function getBranches(): Promise<Branch[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("branches").select("*").order("order_index");
  if (error || !data) return branchesData as Branch[];
  return data.map(mapRow);
}

export async function getBranchBySlug(slug: string): Promise<Branch | undefined> {
  const all = await getBranches();
  return all.find((b) => b.slug === slug);
}

export async function getHeadquarters(): Promise<Branch | undefined> {
  const all = await getBranches();
  return all.find((b) => b.type === "headquarters");
}
