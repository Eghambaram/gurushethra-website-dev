import instructorData from "@/data/instructor.json";
import { createPublicClient } from "@/lib/supabase/public";
import type { Instructor } from "@/types/instructor";

export async function getInstructor(): Promise<Instructor> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("instructor").select("*").single();
  if (error || !data) return instructorData as Instructor;

  return {
    name: data.name,
    title: data.title,
    dan: data.dan,
    style: data.style,
    shortBio: data.short_bio,
    bio: data.bio,
    bioExtended: data.bio_extended,
    image: data.image,
    stats: data.stats,
    qualifications: data.qualifications,
    achievements: data.achievements,
  };
}
