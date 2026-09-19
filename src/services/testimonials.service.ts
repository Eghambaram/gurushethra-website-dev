import testimonialsData from "@/data/testimonials.json";
import { createPublicClient } from "@/lib/supabase/public";
import type { Testimonial } from "@/types/testimonial";

function mapRow(row: Record<string, unknown>): Testimonial {
  return {
    id: row.id as string,
    name: row.name as string,
    role: row.role as string,
    rating: row.rating as number,
    quote: row.quote as string,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("testimonials").select("*").order("order_index");
  if (error || !data) return testimonialsData as Testimonial[];
  return data.map(mapRow);
}
