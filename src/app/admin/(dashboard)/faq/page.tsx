import Link from "next/link";
import { ArrowUp, ArrowDown, Pencil, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SavedNotice } from "@/components/admin/SavedNotice";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteFaqItem, moveFaqItem } from "./actions";

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function AdminFaqPage({ searchParams }: Props) {
  const { saved, error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("faq_items").select("*").order("order_index");
  const items = data ?? [];

  return (
    <>
      <AdminPageHeader
        title="FAQ"
        description="Frequently asked questions shown on the FAQ page."
        action={
          <Link
            href="/admin/faq/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-background font-bold text-xs tracking-widest uppercase rounded hover:bg-[#C9A227] transition-colors"
          >
            <Plus size={14} /> Add Question
          </Link>
        }
      />
      <SavedNotice show={saved === "1"} />
      <ErrorNotice message={error} />

      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={item.id} className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-brand-surface border border-white/8">
            <div className="flex items-center gap-3 min-w-0 flex-1 basis-[220px]">
              <div className="flex flex-col gap-1">
                <form action={moveFaqItem}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button type="submit" disabled={i === 0} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                    <ArrowUp size={14} />
                  </button>
                </form>
                <form action={moveFaqItem}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button type="submit" disabled={i === items.length - 1} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                    <ArrowDown size={14} />
                  </button>
                </form>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{item.question}</p>
                <p className="text-gray-500 text-xs truncate">{item.answer}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-auto">
              <Link href={`/admin/faq/${item.id}/edit`} className="p-2 text-gray-400 hover:text-brand-gold transition-colors" aria-label="Edit">
                <Pencil size={16} />
              </Link>
              <DeleteButton action={deleteFaqItem.bind(null, item.id)} confirmMessage="Delete this question? This cannot be undone." />
            </div>
          </div>
        ))}

        {items.length === 0 && <p className="text-gray-500 text-sm py-8 text-center">No questions yet.</p>}
      </div>
    </>
  );
}
