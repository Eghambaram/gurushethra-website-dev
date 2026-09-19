"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, num } from "@/lib/formData";

export async function updateAchievementStats(formData: FormData) {
  const id = str(formData, "id");
  const supabase = await createClient();

  const stats = [0, 1, 2, 3]
    .map((i) => ({
      value: num(formData, `stat_${i}_value`),
      suffix: str(formData, `stat_${i}_suffix`),
      label: str(formData, `stat_${i}_label`),
    }))
    .filter((s) => s.label);

  const { error } = await supabase.from("achievements_meta").update({ stats }).eq("id", id);
  if (error) {
    redirect(`/admin/achievements?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/achievements");
  revalidatePath("/");
  redirect("/admin/achievements?saved=1");
}

function extractEntryFields(formData: FormData) {
  return {
    year: str(formData, "year"),
    title: str(formData, "title"),
    result: str(formData, "result"),
    medals: {
      gold: num(formData, "medals_gold"),
      silver: num(formData, "medals_silver"),
      bronze: num(formData, "medals_bronze"),
    },
    description: str(formData, "description"),
    image: str(formData, "image"),
  };
}

export async function createAchievementEntry(formData: FormData) {
  const supabase = await createClient();
  const { count } = await supabase.from("achievement_entries").select("*", { count: "exact", head: true });

  const { error } = await supabase
    .from("achievement_entries")
    .insert({ ...extractEntryFields(formData), order_index: count ?? 0 });
  if (error) {
    redirect(`/admin/achievements/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/achievements");
  revalidatePath("/");
  redirect("/admin/achievements?saved=1");
}

export async function updateAchievementEntry(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("achievement_entries").update(extractEntryFields(formData)).eq("id", id);
  if (error) {
    redirect(`/admin/achievements/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/achievements");
  revalidatePath("/");
  redirect("/admin/achievements?saved=1");
}

export async function deleteAchievementEntry(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("achievement_entries").delete().eq("id", id);
  if (error) {
    redirect(`/admin/achievements?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/achievements");
  revalidatePath("/");
  redirect("/admin/achievements?saved=1");
}

export async function moveAchievementEntry(formData: FormData) {
  const id = str(formData, "id");
  const direction = str(formData, "direction");
  const supabase = await createClient();

  const { data: entries } = await supabase.from("achievement_entries").select("id, order_index").order("order_index");
  if (!entries) return;

  const index = entries.findIndex((e) => e.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= entries.length) return;

  const a = entries[index];
  const b = entries[swapIndex];

  await supabase.from("achievement_entries").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("achievement_entries").update({ order_index: a.order_index }).eq("id", b.id);

  revalidatePath("/achievements");
  redirect("/admin/achievements");
}
