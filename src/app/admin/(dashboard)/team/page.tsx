import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowDown, Pencil, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SavedNotice } from "@/components/admin/SavedNotice";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteTeamMember, moveTeamMember } from "./actions";
import { TEAM_CATEGORIES } from "./categories";

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function AdminTeamPage({ searchParams }: Props) {
  const { saved, error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("team_members").select("*").order("category").order("order_index");
  const members = data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Team"
        description="Staff roster grouped by category."
        action={
          <Link
            href="/admin/team/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-background font-bold text-xs tracking-widest uppercase rounded hover:bg-[#C9A227] transition-colors"
          >
            <Plus size={14} /> Add Member
          </Link>
        }
      />
      <SavedNotice show={saved === "1"} />
      <ErrorNotice message={error} />

      <div className="flex flex-col gap-8">
        {TEAM_CATEGORIES.map((cat) => {
          const group = members.filter((m) => m.category === cat.id);
          if (group.length === 0) return null;

          return (
            <div key={cat.id} className="flex flex-col gap-3">
              <h2 className="text-white font-bold text-sm uppercase tracking-wide">{cat.name}</h2>
              {group.map((m, i) => (
                <div key={m.id} className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-brand-surface border border-white/8">
                  <div className="flex items-center gap-3 min-w-0 flex-1 basis-[220px]">
                    <div className="flex flex-col gap-1">
                      <form action={moveTeamMember}>
                        <input type="hidden" name="id" value={m.id} />
                        <input type="hidden" name="direction" value="up" />
                        <button type="submit" disabled={i === 0} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                          <ArrowUp size={14} />
                        </button>
                      </form>
                      <form action={moveTeamMember}>
                        <input type="hidden" name="id" value={m.id} />
                        <input type="hidden" name="direction" value="down" />
                        <button type="submit" disabled={i === group.length - 1} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                          <ArrowDown size={14} />
                        </button>
                      </form>
                    </div>

                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-brand-surface-2 shrink-0">
                      <Image src={m.image} alt="" fill sizes="56px" className="object-cover" unoptimized />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{m.name}</p>
                      <p className="text-gray-500 text-xs truncate">{m.title} · {m.rank}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-auto">
                    {m.featured && (
                      <span className="px-2 py-0.5 bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase rounded shrink-0">
                        Featured
                      </span>
                    )}

                    <Link href={`/admin/team/${m.id}/edit`} className="p-2 text-gray-400 hover:text-brand-gold transition-colors" aria-label="Edit">
                      <Pencil size={16} />
                    </Link>
                    <DeleteButton action={deleteTeamMember.bind(null, m.id)} confirmMessage={`Delete "${m.name}"? This cannot be undone.`} />
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {members.length === 0 && <p className="text-gray-500 text-sm py-8 text-center">No team members yet.</p>}
      </div>
    </>
  );
}
