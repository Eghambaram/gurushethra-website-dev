import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cookie-free client for public content reads. Using this instead of the
// session-aware client in server.ts keeps public pages eligible for static
// rendering / ISR — calling cookies() anywhere in the render path forces
// Next.js to opt the whole route into fully dynamic, per-request rendering,
// which public content reads never need.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}
