"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, nullableStr, num, bool, lines, pairs } from "@/lib/formData";

function extractStats(formData: FormData) {
  const stats = [0, 1, 2, 3]
    .map((i) => ({
      value: num(formData, `stat_${i}_value`),
      suffix: str(formData, `stat_${i}_suffix`),
      label: str(formData, `stat_${i}_label`),
    }))
    .filter((s) => s.label);
  return stats.length ? stats : null;
}

function extractFields(formData: FormData) {
  return {
    slug: str(formData, "slug"),
    name: str(formData, "name"),
    title: str(formData, "title"),
    category: str(formData, "category"),
    rank: str(formData, "rank"),
    bio: nullableStr(formData, "bio"),
    credentials: pairs(formData, "credentials"),
    achievements: lines(formData, "achievements"),
    image: str(formData, "image"),
    featured: bool(formData, "featured"),
    stats: extractStats(formData),
  };
}

function friendlyError(error: { code?: string; message: string }): string {
  return error.code === "23505" ? "This slug is already in use — please choose another." : error.message;
}

async function nextOrderIndexInCategory(supabase: Awaited<ReturnType<typeof createClient>>, category: string) {
  const { data } = await supabase
    .from("team_members")
    .select("order_index")
    .eq("category", category)
    .order("order_index", { ascending: false })
    .limit(1);
  return data && data.length > 0 ? data[0].order_index + 1 : 0;
}

export async function createTeamMember(formData: FormData) {
  const supabase = await createClient();
  const fields = extractFields(formData);
  const order_index = await nextOrderIndexInCategory(supabase, fields.category);

  const { error } = await supabase.from("team_members").insert({ ...fields, order_index });
  if (error) {
    redirect(`/admin/team/new?error=${encodeURIComponent(friendlyError(error))}`);
  }

  revalidatePath("/team");
  revalidatePath("/instructor");
  redirect("/admin/team?saved=1");
}

export async function updateTeamMember(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: existing } = await supabase.from("team_members").select("slug, category").eq("id", id).single();
  const fields = extractFields(formData);

  const updates: Record<string, unknown> = { ...fields };
  if (existing && fields.category !== existing.category) {
    updates.order_index = await nextOrderIndexInCategory(supabase, fields.category);
  }

  const { error } = await supabase.from("team_members").update(updates).eq("id", id);
  if (error) {
    redirect(`/admin/team/${id}/edit?error=${encodeURIComponent(friendlyError(error))}`);
  }

  revalidatePath("/team");
  revalidatePath("/instructor");
  if (existing?.slug) revalidatePath(`/team/${existing.slug}`);
  if (fields.slug !== existing?.slug) revalidatePath(`/team/${fields.slug}`);
  redirect("/admin/team?saved=1");
}

export async function deleteTeamMember(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) {
    redirect(`/admin/team?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/team");
  revalidatePath("/instructor");
  redirect("/admin/team?saved=1");
}

export async function moveTeamMember(formData: FormData) {
  const id = str(formData, "id");
  const direction = str(formData, "direction");
  const supabase = await createClient();

  const { data: current } = await supabase.from("team_members").select("category").eq("id", id).single();
  if (!current) return;

  const { data: members } = await supabase
    .from("team_members")
    .select("id, order_index")
    .eq("category", current.category)
    .order("order_index");
  if (!members) return;

  const index = members.findIndex((m) => m.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= members.length) return;

  const a = members[index];
  const b = members[swapIndex];

  await supabase.from("team_members").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("team_members").update({ order_index: a.order_index }).eq("id", b.id);

  revalidatePath("/team");
  redirect("/admin/team");
}
