"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str } from "@/lib/formData";

function extractFields(formData: FormData) {
  return {
    question: str(formData, "question"),
    answer: str(formData, "answer"),
  };
}

export async function createFaqItem(formData: FormData) {
  const supabase = await createClient();
  const { count } = await supabase.from("faq_items").select("*", { count: "exact", head: true });

  const { error } = await supabase.from("faq_items").insert({ ...extractFields(formData), order_index: count ?? 0 });
  if (error) {
    redirect(`/admin/faq/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/faq");
  redirect("/admin/faq?saved=1");
}

export async function updateFaqItem(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("faq_items").update(extractFields(formData)).eq("id", id);
  if (error) {
    redirect(`/admin/faq/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/faq");
  redirect("/admin/faq?saved=1");
}

export async function deleteFaqItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("faq_items").delete().eq("id", id);
  if (error) {
    redirect(`/admin/faq?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/faq");
  redirect("/admin/faq?saved=1");
}

export async function moveFaqItem(formData: FormData) {
  const id = str(formData, "id");
  const direction = str(formData, "direction");
  const supabase = await createClient();

  const { data: items } = await supabase.from("faq_items").select("id, order_index").order("order_index");
  if (!items) return;

  const index = items.findIndex((i) => i.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= items.length) return;

  const a = items[index];
  const b = items[swapIndex];

  await supabase.from("faq_items").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("faq_items").update({ order_index: a.order_index }).eq("id", b.id);

  revalidatePath("/faq");
  redirect("/admin/faq");
}
