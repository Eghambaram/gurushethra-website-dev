"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, num, lines } from "@/lib/formData";

export async function updateHero(formData: FormData) {
  const id = str(formData, "id");
  const supabase = await createClient();

  const stats = [0, 1, 2, 3].map((i) => ({
    value: num(formData, `stat_${i}_value`),
    suffix: str(formData, `stat_${i}_suffix`),
    label: str(formData, `stat_${i}_label`),
  }));

  const trustBadges = [0, 1, 2].map((i) => ({
    icon: str(formData, `badge_${i}_icon`),
    text: str(formData, `badge_${i}_text`),
  }));

  const { error } = await supabase
    .from("hero")
    .update({
      headline_lines: lines(formData, "headline_lines"),
      sub_copy: str(formData, "sub_copy"),
      cta_primary_label: str(formData, "cta_primary_label"),
      cta_primary_href: str(formData, "cta_primary_href"),
      cta_secondary_label: str(formData, "cta_secondary_label"),
      cta_secondary_href: str(formData, "cta_secondary_href"),
      stats,
      trust_badges: trustBadges,
      background_image: str(formData, "background_image"),
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/hero?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  redirect("/admin/hero?saved=1");
}
