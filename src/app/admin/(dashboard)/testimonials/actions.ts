"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, num } from "@/lib/formData";

function extractFields(formData: FormData) {
  return {
    name: str(formData, "name"),
    role: str(formData, "role"),
    rating: num(formData, "rating"),
    quote: str(formData, "quote"),
  };
}

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient();
  const { count } = await supabase.from("testimonials").select("*", { count: "exact", head: true });

  const { error } = await supabase.from("testimonials").insert({ ...extractFields(formData), order_index: count ?? 0 });
  if (error) {
    redirect(`/admin/testimonials/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  redirect("/admin/testimonials?saved=1");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update(extractFields(formData)).eq("id", id);
  if (error) {
    redirect(`/admin/testimonials/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  redirect("/admin/testimonials?saved=1");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) {
    redirect(`/admin/testimonials?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  redirect("/admin/testimonials?saved=1");
}

export async function moveTestimonial(formData: FormData) {
  const id = str(formData, "id");
  const direction = str(formData, "direction");
  const supabase = await createClient();

  const { data: items } = await supabase.from("testimonials").select("id, order_index").order("order_index");
  if (!items) return;

  const index = items.findIndex((i) => i.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= items.length) return;

  const a = items[index];
  const b = items[swapIndex];

  await supabase.from("testimonials").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("testimonials").update({ order_index: a.order_index }).eq("id", b.id);

  revalidatePath("/");
  redirect("/admin/testimonials");
}
