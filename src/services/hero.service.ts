import heroData from "@/data/hero.json";
import { createPublicClient } from "@/lib/supabase/public";
import type { Hero } from "@/types/hero";

export async function getHero(): Promise<Hero> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("hero").select("*").single();
  if (error || !data) return heroData as Hero;

  return {
    headlineLines: data.headline_lines,
    subCopy: data.sub_copy,
    ctaPrimary: { label: data.cta_primary_label, href: data.cta_primary_href },
    ctaSecondary: { label: data.cta_secondary_label, href: data.cta_secondary_href },
    stats: data.stats,
    trustBadges: data.trust_badges,
    backgroundImage: data.background_image,
  };
}
