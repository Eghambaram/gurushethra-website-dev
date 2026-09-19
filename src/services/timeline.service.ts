import timelineData from "@/data/timeline.json";
import valuesData from "@/data/values.json";
import { createPublicClient } from "@/lib/supabase/public";
import type { TimelineItem } from "@/types/timeline";
import type { Value } from "@/types/value";

function mapTimelineRow(row: Record<string, unknown>): TimelineItem {
  return {
    year: row.year as string,
    title: row.title as string,
    description: row.description as string,
  };
}

function mapValueRow(row: Record<string, unknown>): Value {
  return {
    id: row.id as string,
    icon: row.icon as string,
    title: row.title as string,
    description: row.description as string,
  };
}

export async function getTimeline(): Promise<TimelineItem[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("timeline_items").select("*").order("order_index");
  if (error || !data) return timelineData as TimelineItem[];
  return data.map(mapTimelineRow);
}

export async function getValues(): Promise<Value[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("core_values").select("*").order("order_index");
  if (error || !data) return valuesData as Value[];
  return data.map(mapValueRow);
}
