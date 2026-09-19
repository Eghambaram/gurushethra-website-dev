"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, bool, lines } from "@/lib/formData";

function extractFields(formData: FormData) {
  return {
    slug: str(formData, "slug"),
    name: str(formData, "name"),
    type: str(formData, "type"),
    address: str(formData, "address"),
    phone: str(formData, "phone"),
    email: str(formData, "email"),
    hours: str(formData, "hours"),
    map_embed: str(formData, "map_embed"),
    features: lines(formData, "features"),
    featured: bool(formData, "featured"),
  };
}

function friendlyError(error: { code?: string; message: string }): string {
  return error.code === "23505" ? "This slug is already in use — please choose another." : error.message;
}

export async function createBranch(formData: FormData) {
  const supabase = await createClient();
  const { count } = await supabase.from("branches").select("*", { count: "exact", head: true });

  const { error } = await supabase.from("branches").insert({ ...extractFields(formData), order_index: count ?? 0 });
  if (error) {
    redirect(`/admin/branches/new?error=${encodeURIComponent(friendlyError(error))}`);
  }

  revalidatePath("/branches");
  revalidatePath("/contact");
  revalidatePath("/");
  redirect("/admin/branches?saved=1");
}

export async function updateBranch(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("branches").update(extractFields(formData)).eq("id", id);
  if (error) {
    redirect(`/admin/branches/${id}/edit?error=${encodeURIComponent(friendlyError(error))}`);
  }

  revalidatePath("/branches");
  revalidatePath("/contact");
  revalidatePath("/");
  redirect("/admin/branches?saved=1");
}

export async function deleteBranch(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("branches").delete().eq("id", id);
  if (error) {
    redirect(`/admin/branches?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/branches");
  revalidatePath("/contact");
  revalidatePath("/");
  redirect("/admin/branches?saved=1");
}

export async function moveBranch(formData: FormData) {
  const id = str(formData, "id");
  const direction = str(formData, "direction");
  const supabase = await createClient();

  const { data: branches } = await supabase.from("branches").select("id, order_index").order("order_index");
  if (!branches) return;

  const index = branches.findIndex((b) => b.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= branches.length) return;

  const a = branches[index];
  const b = branches[swapIndex];

  await supabase.from("branches").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("branches").update({ order_index: a.order_index }).eq("id", b.id);

  revalidatePath("/branches");
  redirect("/admin/branches");
}
