"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function markSubmissionRead(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").update({ status: "read" }).eq("id", id);
  if (error) {
    redirect(`/admin/submissions?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/submissions");
  redirect("/admin/submissions");
}

export async function markSubmissionReplied(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").update({ status: "replied" }).eq("id", id);
  if (error) {
    redirect(`/admin/submissions?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/submissions");
  redirect("/admin/submissions");
}

export async function deleteSubmission(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  if (error) {
    redirect(`/admin/submissions?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/submissions");
  redirect("/admin/submissions");
}
