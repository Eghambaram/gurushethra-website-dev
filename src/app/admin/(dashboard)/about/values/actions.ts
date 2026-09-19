"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str } from "@/lib/formData";

function extractFields(formData: FormData) {
  return {
    icon: str(formData, "icon"),
    title: str(formData, "title"),
    description: str(formData, "description"),
  };
}

export async function createCoreValue(formData: FormData) {
  const supabase = await createClient();
  const { count } = await supabase.from("core_values").select("*", { count: "exact", head: true });

  const { error } = await supabase.from("core_values").insert({ ...extractFields(formData), order_index: count ?? 0 });
  if (error) {
    redirect(`/admin/about/values/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/about");
  redirect("/admin/about?saved=1");
}

export async function updateCoreValue(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("core_values").update(extractFields(formData)).eq("id", id);
  if (error) {
    redirect(`/admin/about/values/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/about");
  redirect("/admin/about?saved=1");
}

export async function deleteCoreValue(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("core_values").delete().eq("id", id);
  if (error) {
    redirect(`/admin/about?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/about");
  redirect("/admin/about?saved=1");
}

export async function moveCoreValue(formData: FormData) {
  const id = str(formData, "id");
  const direction = str(formData, "direction");
  const supabase = await createClient();

  const { data: items } = await supabase.from("core_values").select("id, order_index").order("order_index");
  if (!items) return;

  const index = items.findIndex((i) => i.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= items.length) return;

  const a = items[index];
  const b = items[swapIndex];

  await supabase.from("core_values").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("core_values").update({ order_index: a.order_index }).eq("id", b.id);

  revalidatePath("/about");
  redirect("/admin/about");
}
