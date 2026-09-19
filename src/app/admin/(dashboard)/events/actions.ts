"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { str, bool } from "@/lib/formData";

function extractFields(formData: FormData) {
  return {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    type: str(formData, "type"),
    status: str(formData, "status"),
    date: str(formData, "date"),
    end_date: str(formData, "end_date"),
    time: str(formData, "time"),
    venue: str(formData, "venue"),
    description: str(formData, "description"),
    image: str(formData, "image"),
    featured: bool(formData, "featured"),
  };
}

function friendlyError(error: { code?: string; message: string }): string {
  return error.code === "23505" ? "This slug is already in use — please choose another." : error.message;
}

async function nextOrderIndexInStatus(supabase: Awaited<ReturnType<typeof createClient>>, status: string) {
  const { data } = await supabase
    .from("events")
    .select("order_index")
    .eq("status", status)
    .order("order_index", { ascending: false })
    .limit(1);
  return data && data.length > 0 ? data[0].order_index + 1 : 0;
}

export async function createEvent(formData: FormData) {
  const supabase = await createClient();
  const fields = extractFields(formData);
  const order_index = await nextOrderIndexInStatus(supabase, fields.status);

  const { error } = await supabase.from("events").insert({ ...fields, order_index });
  if (error) {
    redirect(`/admin/events/new?error=${encodeURIComponent(friendlyError(error))}`);
  }

  revalidatePath("/events");
  revalidatePath("/");
  redirect("/admin/events?saved=1");
}

export async function updateEvent(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: existing } = await supabase.from("events").select("status").eq("id", id).single();
  const fields = extractFields(formData);

  const updates: Record<string, unknown> = { ...fields };
  if (existing && fields.status !== existing.status) {
    updates.order_index = await nextOrderIndexInStatus(supabase, fields.status);
  }

  const { error } = await supabase.from("events").update(updates).eq("id", id);
  if (error) {
    redirect(`/admin/events/${id}/edit?error=${encodeURIComponent(friendlyError(error))}`);
  }

  revalidatePath("/events");
  revalidatePath("/");
  redirect("/admin/events?saved=1");
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) {
    redirect(`/admin/events?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/events");
  revalidatePath("/");
  redirect("/admin/events?saved=1");
}

export async function moveEvent(formData: FormData) {
  const id = str(formData, "id");
  const direction = str(formData, "direction");
  const supabase = await createClient();

  const { data: current } = await supabase.from("events").select("status").eq("id", id).single();
  if (!current) return;

  const { data: items } = await supabase
    .from("events")
    .select("id, order_index")
    .eq("status", current.status)
    .order("order_index");
  if (!items) return;

  const index = items.findIndex((i) => i.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= items.length) return;

  const a = items[index];
  const b = items[swapIndex];

  await supabase.from("events").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("events").update({ order_index: a.order_index }).eq("id", b.id);

  revalidatePath("/events");
  redirect("/admin/events");
}
