import faqData from "@/data/faq.json";
import { createPublicClient } from "@/lib/supabase/public";
import type { FAQItem } from "@/types/faq";

function mapRow(row: Record<string, unknown>): FAQItem {
  return {
    id: row.id as string,
    question: row.question as string,
    answer: row.answer as string,
  };
}

export async function getFAQItems(): Promise<FAQItem[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("faq_items").select("*").order("order_index");
  if (error || !data) return faqData as FAQItem[];
  return data.map(mapRow);
}
