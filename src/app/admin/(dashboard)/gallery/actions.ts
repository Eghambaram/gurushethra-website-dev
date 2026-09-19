"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, num } from "@/lib/formData";

function extractFields(formData: FormData) {
  return {
    src: str(formData, "src"),
    alt: str(formData, "alt"),
    category: str(formData, "category"),
    width: num(formData, "src_width"),
    height: num(formData, "src_height"),
  };
}

async function nextOrderIndexInCategory(supabase: Awaited<ReturnType<typeof createClient>>, category: string) {
  const { data } = await supabase
    .from("gallery_items")
    .select("order_index")
    .eq("category", category)
    .order("order_index", { ascending: false })
    .limit(1);
  return data && data.length > 0 ? data[0].order_index + 1 : 0;
}

export async function createGalleryItem(formData: FormData) {
  const supabase = await createClient();
  const fields = extractFields(formData);
  const order_index = await nextOrderIndexInCategory(supabase, fields.category);

  const { error } = await supabase.from("gallery_items").insert({ ...fields, order_index });
  if (error) {
    redirect(`/admin/gallery/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/gallery");
  revalidatePath("/");
  redirect("/admin/gallery?saved=1");
}

export async function updateGalleryItem(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: existing } = await supabase.from("gallery_items").select("category").eq("id", id).single();
  const fields = extractFields(formData);

  const updates: Record<string, unknown> = { ...fields };
  if (existing && fields.category !== existing.category) {
    updates.order_index = await nextOrderIndexInCategory(supabase, fields.category);
  }

  const { error } = await supabase.from("gallery_items").update(updates).eq("id", id);
  if (error) {
    redirect(`/admin/gallery/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/gallery");
  revalidatePath("/");
  redirect("/admin/gallery?saved=1");
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  if (error) {
    redirect(`/admin/gallery?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/gallery");
  revalidatePath("/");
  redirect("/admin/gallery?saved=1");
}

export async function moveGalleryItem(formData: FormData) {
  const id = str(formData, "id");
  const direction = str(formData, "direction");
  const supabase = await createClient();

  const { data: current } = await supabase.from("gallery_items").select("category").eq("id", id).single();
  if (!current) return;

  const { data: items } = await supabase
    .from("gallery_items")
    .select("id, order_index")
    .eq("category", current.category)
    .order("order_index");
  if (!items) return;

  const index = items.findIndex((i) => i.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= items.length) return;

  const a = items[index];
  const b = items[swapIndex];

  await supabase.from("gallery_items").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("gallery_items").update({ order_index: a.order_index }).eq("id", b.id);

  revalidatePath("/gallery");
  redirect("/admin/gallery");
}
