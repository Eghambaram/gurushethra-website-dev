import Link from "next/link";
import { ArrowUp, ArrowDown, Pencil, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SavedNotice } from "@/components/admin/SavedNotice";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteBranch, moveBranch } from "./actions";

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function AdminBranchesPage({ searchParams }: Props) {
  const { saved, error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("branches").select("*").order("order_index");
  const branches = data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Branches"
        description="Training centre locations, hours, and contact details."
        action={
          <Link
            href="/admin/branches/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-background font-bold text-xs tracking-widest uppercase rounded hover:bg-[#C9A227] transition-colors"
          >
            <Plus size={14} /> Add Branch
          </Link>
        }
      />
      <SavedNotice show={saved === "1"} />
      <ErrorNotice message={error} />

      <div className="flex flex-col gap-3">
        {branches.map((b, i) => (
          <div key={b.id} className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-brand-surface border border-white/8">
            <div className="flex items-center gap-3 min-w-0 flex-1 basis-[220px]">
              <div className="flex flex-col gap-1">
                <form action={moveBranch}>
                  <input type="hidden" name="id" value={b.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button type="submit" disabled={i === 0} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                    <ArrowUp size={14} />
                  </button>
                </form>
                <form action={moveBranch}>
                  <input type="hidden" name="id" value={b.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button type="submit" disabled={i === branches.length - 1} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                    <ArrowDown size={14} />
                  </button>
                </form>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{b.name}</p>
                <p className="text-gray-500 text-xs truncate">{b.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-auto">
              {b.type === "headquarters" && (
                <span className="px-2 py-0.5 bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase rounded shrink-0">
                  HQ
                </span>
              )}

              <Link href={`/admin/branches/${b.id}/edit`} className="p-2 text-gray-400 hover:text-brand-gold transition-colors" aria-label="Edit">
                <Pencil size={16} />
              </Link>
              <DeleteButton action={deleteBranch.bind(null, b.id)} confirmMessage={`Delete "${b.name}"? This cannot be undone.`} />
            </div>
          </div>
        ))}

        {branches.length === 0 && <p className="text-gray-500 text-sm py-8 text-center">No branches yet.</p>}
      </div>
    </>
  );
}
