"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { ADMIN_NAV } from "./nav-links";
import { signOut } from "@/app/admin/actions";

export function AdminSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navList = (
    <nav className="flex flex-col gap-1">
      {ADMIN_NAV.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active ? "bg-brand-gold/10 text-brand-gold" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon size={17} aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-white/8 bg-brand-surface sticky top-0 z-40">
        <span className="font-heading font-black text-white text-sm">GIMA Admin</span>
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="p-2 text-gray-300">
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 bg-brand-surface border-r border-white/8 p-5 flex flex-col gap-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-white text-sm">GIMA Admin</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-1.5 text-gray-400">
                <X size={18} />
              </button>
            </div>
            {navList}
            <SidebarFooter userEmail={userEmail} />
          </div>
          <button
            className="flex-1 bg-black/60"
            onClick={() => setOpen(false)}
            aria-label="Close menu overlay"
          />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 shrink-0 border-r border-white/8 bg-brand-surface p-5 gap-6 min-h-screen sticky top-0">
        <Link href="/admin" className="font-heading font-black text-white text-base">
          GIMA Admin
        </Link>
        <div className="flex-1 overflow-y-auto">{navList}</div>
        <SidebarFooter userEmail={userEmail} />
      </aside>
    </>
  );
}

function SidebarFooter({ userEmail }: { userEmail?: string }) {
  return (
    <div className="flex flex-col gap-3 pt-4 border-t border-white/8">
      <p className="text-xs text-gray-500 truncate">{userEmail}</p>
      <form action={signOut}>
        <button
          type="submit"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-gold transition-colors"
        >
          <LogOut size={15} aria-hidden />
          Log Out
        </button>
      </form>
    </div>
  );
}
