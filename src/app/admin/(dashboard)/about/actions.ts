"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, nullableStr } from "@/lib/formData";

export async function updateAboutHero(formData: FormData) {
  const id = str(formData, "id");
  const supabase = await createClient();

  const { error } = await supabase
    .from("about_hero")
    .update({
      eyebrow: str(formData, "eyebrow"),
      headline: str(formData, "headline"),
      headline_highlight: nullableStr(formData, "headline_highlight"),
      body: str(formData, "body"),
      cta_label: str(formData, "cta_label"),
      cta_href: str(formData, "cta_href"),
      image: str(formData, "image"),
      badge_label: str(formData, "badge_label"),
      badge_value: str(formData, "badge_value"),
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/about?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/about");
  redirect("/admin/about?saved=1");
}
