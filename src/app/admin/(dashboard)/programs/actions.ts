"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, bool, lines } from "@/lib/formData";

function extractFields(formData: FormData) {
  return {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    age_range: str(formData, "age_range"),
    short_description: str(formData, "short_description"),
    description: str(formData, "description"),
    image: str(formData, "image"),
    features: lines(formData, "features"),
    duration: str(formData, "duration"),
    schedule: str(formData, "schedule"),
    featured: bool(formData, "featured"),
  };
}

function friendlyError(error: { code?: string; message: string }): string {
  return error.code === "23505" ? "This slug is already in use — please choose another." : error.message;
}

export async function createProgram(formData: FormData) {
  const supabase = await createClient();
  const { count } = await supabase.from("programs").select("*", { count: "exact", head: true });

  const { error } = await supabase.from("programs").insert({ ...extractFields(formData), order_index: count ?? 0 });
  if (error) {
    redirect(`/admin/programs/new?error=${encodeURIComponent(friendlyError(error))}`);
  }

  revalidatePath("/programs");
  revalidatePath("/");
  redirect("/admin/programs?saved=1");
}

export async function updateProgram(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: existing } = await supabase.from("programs").select("slug").eq("id", id).single();
  const fields = extractFields(formData);

  const { error } = await supabase.from("programs").update(fields).eq("id", id);
  if (error) {
    redirect(`/admin/programs/${id}/edit?error=${encodeURIComponent(friendlyError(error))}`);
  }

  revalidatePath("/programs");
  revalidatePath("/");
  if (existing?.slug) revalidatePath(`/programs/${existing.slug}`);
  if (fields.slug !== existing?.slug) revalidatePath(`/programs/${fields.slug}`);
  redirect("/admin/programs?saved=1");
}

export async function deleteProgram(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("programs").delete().eq("id", id);
  if (error) {
    redirect(`/admin/programs?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/programs");
  revalidatePath("/");
  redirect("/admin/programs?saved=1");
}

export async function moveProgram(formData: FormData) {
  const id = str(formData, "id");
  const direction = str(formData, "direction");
  const supabase = await createClient();

  const { data: programs } = await supabase.from("programs").select("id, order_index").order("order_index");
  if (!programs) return;

  const index = programs.findIndex((p) => p.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= programs.length) return;

  const current = programs[index];
  const swap = programs[swapIndex];

  await supabase.from("programs").update({ order_index: swap.order_index }).eq("id", current.id);
  await supabase.from("programs").update({ order_index: current.order_index }).eq("id", swap.id);

  revalidatePath("/programs");
  redirect("/admin/programs");
}
