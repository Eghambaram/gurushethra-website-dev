import achievementsData from "@/data/achievements.json";
import { createPublicClient } from "@/lib/supabase/public";
import type { Achievements, RecentAchievement } from "@/types/achievement";

function mapRow(row: Record<string, unknown>): RecentAchievement {
  return {
    id: row.id as string,
    year: row.year as string,
    title: row.title as string,
    result: row.result as string,
    medals: row.medals as RecentAchievement["medals"],
    description: row.description as string,
    image: row.image as string,
  };
}

export async function getAchievements(): Promise<Achievements> {
  const supabase = createPublicClient();
  const [metaRes, entriesRes] = await Promise.all([
    supabase.from("achievements_meta").select("*").single(),
    supabase.from("achievement_entries").select("*").order("order_index"),
  ]);

  if (metaRes.error || !metaRes.data || entriesRes.error || !entriesRes.data) {
    return achievementsData as Achievements;
  }

  return {
    stats: metaRes.data.stats as Achievements["stats"],
    recent: entriesRes.data.map(mapRow),
  };
}

export async function getRecentAchievements(count?: number): Promise<RecentAchievement[]> {
  const { recent } = await getAchievements();
  return count ? recent.slice(0, count) : recent;
}
