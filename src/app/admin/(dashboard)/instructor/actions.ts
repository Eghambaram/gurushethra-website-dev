"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, num, lines } from "@/lib/formData";

export async function updateInstructor(formData: FormData) {
  const id = str(formData, "id");
  const supabase = await createClient();

  const stats = [0, 1, 2, 3].map((i) => ({
    value: num(formData, `stat_${i}_value`),
    suffix: str(formData, `stat_${i}_suffix`),
    label: str(formData, `stat_${i}_label`),
  }));

  const { error } = await supabase
    .from("instructor")
    .update({
      name: str(formData, "name"),
      title: str(formData, "title"),
      dan: str(formData, "dan"),
      style: str(formData, "style"),
      short_bio: str(formData, "short_bio"),
      bio: str(formData, "bio"),
      bio_extended: str(formData, "bio_extended"),
      image: str(formData, "image"),
      stats,
      qualifications: lines(formData, "qualifications"),
      achievements: lines(formData, "achievements"),
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/instructor?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/instructor");
  redirect("/admin/instructor?saved=1");
}
