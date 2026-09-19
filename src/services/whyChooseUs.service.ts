import whyChooseUsData from "@/data/whyChooseUs.json";
import { createPublicClient } from "@/lib/supabase/public";
import type { WhyChooseUsReason } from "@/types/whyChooseUs";

function mapRow(row: Record<string, unknown>): WhyChooseUsReason {
  return {
    id: row.id as string,
    icon: row.icon as string,
    title: row.title as string,
    description: row.description as string,
  };
}

export async function getWhyChooseUsReasons(): Promise<WhyChooseUsReason[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("why_choose_us_reasons").select("*").order("order_index");
  if (error || !data) return whyChooseUsData as WhyChooseUsReason[];
  return data.map(mapRow);
}
