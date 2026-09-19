"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, nullableStr } from "@/lib/formData";

export async function updateSiteSettings(formData: FormData) {
  const id = str(formData, "id");
  const supabase = await createClient();

  const { error } = await supabase
    .from("site_settings")
    .update({
      name: str(formData, "name"),
      short_name: str(formData, "short_name"),
      tagline: str(formData, "tagline"),
      phone: str(formData, "phone"),
      phone2: nullableStr(formData, "phone2"),
      whatsapp: str(formData, "whatsapp"),
      email: str(formData, "email"),
      address: str(formData, "address"),
      hours: str(formData, "hours"),
      map_embed: str(formData, "map_embed"),
      social_facebook: nullableStr(formData, "social_facebook"),
      social_instagram: nullableStr(formData, "social_instagram"),
      social_youtube: nullableStr(formData, "social_youtube"),
      social_whatsapp: nullableStr(formData, "social_whatsapp"),
      default_og_image: nullableStr(formData, "default_og_image"),
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/settings?error=${encodeURIComponent(error.message)}`);
  }

  // The (site) layout wraps every public page, so this refreshes the whole site at once.
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
