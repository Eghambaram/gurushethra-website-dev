"use server";
import { redirect } from "next/navigation";
import { toFile } from "@imagekit/nodejs";
import { createClient } from "@/lib/supabase/server";
import { imagekit } from "@/lib/imagekit";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Sign-in failed:", error.name, error.message);
    redirect(`/admin/login?error=${encodeURIComponent("Invalid email or password.")}`);
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

interface UploadResult {
  url?: string;
  width?: number;
  height?: number;
  error?: string;
}

export async function uploadImage(formData: FormData): Promise<UploadResult> {
  // Defense in depth — middleware + RLS already gate this, but check explicitly
  // since this is invoked directly from client code, not just via a form action.
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "No file provided." };
  if (!file.type.startsWith("image/")) return { error: "Only image files are allowed." };
  if (file.size > 5 * 1024 * 1024) return { error: "Image must be 5MB or smaller. Please choose a smaller file." };

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await imagekit.files.upload({
      file: await toFile(buffer, file.name),
      fileName: file.name,
      folder: "/gima",
    });
    return { url: result.url, width: result.width, height: result.height };
  } catch {
    return { error: "Upload failed. Please try again." };
  }
}
