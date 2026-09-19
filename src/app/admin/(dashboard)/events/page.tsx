import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowDown, Pencil, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SavedNotice } from "@/components/admin/SavedNotice";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteEvent, moveEvent } from "./actions";
import { EVENT_STATUSES } from "./categories";

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function AdminEventsPage({ searchParams }: Props) {
  const { saved, error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("events").select("*").order("status").order("order_index");
  const events = data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Events"
        description="Camps, belt gradings, and tournaments — upcoming and past."
        action={
          <Link
            href="/admin/events/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-background font-bold text-xs tracking-widest uppercase rounded hover:bg-[#C9A227] transition-colors"
          >
            <Plus size={14} /> Add Event
          </Link>
        }
      />
      <SavedNotice show={saved === "1"} />
      <ErrorNotice message={error} />

      <div className="flex flex-col gap-8">
        {EVENT_STATUSES.map((s) => {
          const group = events.filter((e) => e.status === s.id);
          if (group.length === 0) return null;

          return (
            <div key={s.id} className="flex flex-col gap-3">
              <h2 className="text-white font-bold text-sm uppercase tracking-wide">
                {s.name} <span className="text-gray-600 font-normal">({group.length})</span>
              </h2>
              {group.map((e, i) => (
                <div key={e.id} className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-brand-surface border border-white/8">
                  <div className="flex items-center gap-3 min-w-0 flex-1 basis-[220px]">
                    <div className="flex flex-col gap-1">
                      <form action={moveEvent}>
                        <input type="hidden" name="id" value={e.id} />
                        <input type="hidden" name="direction" value="up" />
                        <button type="submit" disabled={i === 0} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                          <ArrowUp size={14} />
                        </button>
                      </form>
                      <form action={moveEvent}>
                        <input type="hidden" name="id" value={e.id} />
                        <input type="hidden" name="direction" value="down" />
                        <button type="submit" disabled={i === group.length - 1} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                          <ArrowDown size={14} />
                        </button>
                      </form>
                    </div>

                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-brand-surface-2 shrink-0">
                      <Image src={e.image} alt="" fill sizes="56px" className="object-cover" unoptimized />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{e.title}</p>
                      <p className="text-gray-500 text-xs">{e.type} · {e.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-auto">
                    {e.featured && (
                      <span className="px-2 py-0.5 bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase rounded shrink-0">
                        Featured
                      </span>
                    )}

                    <Link href={`/admin/events/${e.id}/edit`} className="p-2 text-gray-400 hover:text-brand-gold transition-colors" aria-label="Edit">
                      <Pencil size={16} />
                    </Link>
                    <DeleteButton action={deleteEvent.bind(null, e.id)} confirmMessage={`Delete "${e.title}"? This cannot be undone.`} />
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {events.length === 0 && <p className="text-gray-500 text-sm py-8 text-center">No events yet.</p>}
      </div>
    </>
  );
}
