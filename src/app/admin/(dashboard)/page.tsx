import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_NAV } from "./nav-links";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const sections = ADMIN_NAV.filter((item) => item.href !== "/admin");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading font-black text-white text-3xl">Welcome back</h1>
        <p className="text-gray-400 mt-1">
          Signed in as <span className="text-white font-medium">{user?.email}</span>. Pick a section to manage.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(({ label, href, icon: Icon, description }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-3 p-5 rounded-xl bg-brand-surface border border-white/8 hover:border-brand-gold/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
              <Icon size={18} className="text-brand-gold" aria-hidden />
            </div>
            <div>
              <h2 className="font-heading font-bold text-white text-sm">{label}</h2>
              <p className="text-gray-500 text-xs mt-0.5">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
