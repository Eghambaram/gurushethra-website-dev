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

export async function createReason(formData: FormData) {
  const supabase = await createClient();
  const { count } = await supabase.from("why_choose_us_reasons").select("*", { count: "exact", head: true });

  const { error } = await supabase.from("why_choose_us_reasons").insert({ ...extractFields(formData), order_index: count ?? 0 });
  if (error) {
    redirect(`/admin/about/why-choose-us/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  redirect("/admin/about?saved=1");
}

export async function updateReason(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("why_choose_us_reasons").update(extractFields(formData)).eq("id", id);
  if (error) {
    redirect(`/admin/about/why-choose-us/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  redirect("/admin/about?saved=1");
}

export async function deleteReason(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("why_choose_us_reasons").delete().eq("id", id);
  if (error) {
    redirect(`/admin/about?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  redirect("/admin/about?saved=1");
}

export async function moveReason(formData: FormData) {
  const id = str(formData, "id");
  const direction = str(formData, "direction");
  const supabase = await createClient();

  const { data: items } = await supabase.from("why_choose_us_reasons").select("id, order_index").order("order_index");
  if (!items) return;

  const index = items.findIndex((i) => i.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= items.length) return;

  const a = items[index];
  const b = items[swapIndex];

  await supabase.from("why_choose_us_reasons").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("why_choose_us_reasons").update({ order_index: a.order_index }).eq("id", b.id);

  revalidatePath("/");
  redirect("/admin/about");
}
