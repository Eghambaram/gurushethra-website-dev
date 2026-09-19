import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client — bypasses Row Level Security entirely. Server-only,
// never import from a client component. Reserved for privileged operations
// that legitimately run outside an admin session (seed scripts, public
// contact-form inserts). Admin CRUD should use lib/supabase/server.ts instead,
// so RLS still applies as a second line of defense.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
