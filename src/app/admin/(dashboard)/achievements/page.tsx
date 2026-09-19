import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowDown, Pencil, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SavedNotice } from "@/components/admin/SavedNotice";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateAchievementStats, deleteAchievementEntry, moveAchievementEntry } from "./actions";

interface AchievementStat {
  value: number;
  suffix: string;
  label: string;
}

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function AdminAchievementsPage({ searchParams }: Props) {
  const { saved, error } = await searchParams;
  const supabase = await createClient();
  const [{ data: meta }, { data: entriesData }] = await Promise.all([
    supabase.from("achievements_meta").select("*").single(),
    supabase.from("achievement_entries").select("*").order("order_index"),
  ]);
  const stats: AchievementStat[] = meta?.stats ?? [];
  const entries = entriesData ?? [];

  return (
    <>
      <AdminPageHeader title="Achievements" description="Headline stats and recent competition results." />
      <SavedNotice show={saved === "1"} />
      <ErrorNotice message={error} />

      <div className="flex flex-col gap-3 mb-10">
        <h2 className="text-white font-bold text-sm uppercase tracking-wide">Headline Stats (4 tiles)</h2>
        <form action={updateAchievementStats} className="flex flex-col gap-4 max-w-2xl">
          <input type="hidden" name="id" value={meta?.id} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-lg bg-brand-surface-2 border border-white/8">
                <FormField label="Value" htmlFor={`stat_${i}_value`}>
                  <input
                    id={`stat_${i}_value`}
                    name={`stat_${i}_value`}
                    type="number"
                    defaultValue={stats[i]?.value}
                    className={adminInputClass}
                    required
                  />
                </FormField>
                <FormField label="Suffix" htmlFor={`stat_${i}_suffix`}>
                  <input id={`stat_${i}_suffix`} name={`stat_${i}_suffix`} defaultValue={stats[i]?.suffix} className={adminInputClass} />
                </FormField>
                <FormField label="Label" htmlFor={`stat_${i}_label`}>
                  <input id={`stat_${i}_label`} name={`stat_${i}_label`} defaultValue={stats[i]?.label} className={adminInputClass} required />
                </FormField>
              </div>
            ))}
          </div>
          <div>
            <SubmitButton label="Save Stats" />
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold text-sm uppercase tracking-wide">Recent Achievements</h2>
          <Link
            href="/admin/achievements/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-background font-bold text-xs tracking-widest uppercase rounded hover:bg-[#C9A227] transition-colors"
          >
            <Plus size={14} /> Add Entry
          </Link>
        </div>

        {entries.map((e, i) => (
          <div key={e.id} className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-brand-surface border border-white/8">
            <div className="flex items-center gap-3 min-w-0 flex-1 basis-[220px]">
              <div className="flex flex-col gap-1">
                <form action={moveAchievementEntry}>
                  <input type="hidden" name="id" value={e.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button type="submit" disabled={i === 0} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                    <ArrowUp size={14} />
                  </button>
                </form>
                <form action={moveAchievementEntry}>
                  <input type="hidden" name="id" value={e.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button type="submit" disabled={i === entries.length - 1} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                    <ArrowDown size={14} />
                  </button>
                </form>
              </div>

              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-brand-surface-2 shrink-0">
                <Image src={e.image} alt="" fill sizes="56px" className="object-cover" unoptimized />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{e.title}</p>
                <p className="text-gray-500 text-xs">{e.year} · {e.result}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-auto">
              <span className="text-[11px] text-gray-500 shrink-0">
                G{e.medals?.gold ?? 0} · S{e.medals?.silver ?? 0} · B{e.medals?.bronze ?? 0}
              </span>

              <Link href={`/admin/achievements/${e.id}/edit`} className="p-2 text-gray-400 hover:text-brand-gold transition-colors" aria-label="Edit">
                <Pencil size={16} />
              </Link>
              <DeleteButton action={deleteAchievementEntry.bind(null, e.id)} confirmMessage={`Delete "${e.title}"? This cannot be undone.`} />
            </div>
          </div>
        ))}

        {entries.length === 0 && <p className="text-gray-500 text-sm py-8 text-center">No achievements yet.</p>}
      </div>
    </>
  );
}
