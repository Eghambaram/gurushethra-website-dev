import Link from "next/link";
import { ArrowUp, ArrowDown, Pencil, Plus, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SavedNotice } from "@/components/admin/SavedNotice";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteTestimonial, moveTestimonial } from "./actions";

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function AdminTestimonialsPage({ searchParams }: Props) {
  const { saved, error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").order("order_index");
  const testimonials = data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Testimonials"
        description="Student and parent reviews shown across the site."
        action={
          <Link
            href="/admin/testimonials/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-background font-bold text-xs tracking-widest uppercase rounded hover:bg-[#C9A227] transition-colors"
          >
            <Plus size={14} /> Add Testimonial
          </Link>
        }
      />
      <SavedNotice show={saved === "1"} />
      <ErrorNotice message={error} />

      <div className="flex flex-col gap-3">
        {testimonials.map((t, i) => (
          <div key={t.id} className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-brand-surface border border-white/8">
            <div className="flex items-center gap-3 min-w-0 flex-1 basis-[220px]">
              <div className="flex flex-col gap-1">
                <form action={moveTestimonial}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button type="submit" disabled={i === 0} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                    <ArrowUp size={14} />
                  </button>
                </form>
                <form action={moveTestimonial}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button type="submit" disabled={i === testimonials.length - 1} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                    <ArrowDown size={14} />
                  </button>
                </form>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{t.name}</p>
                <p className="text-gray-500 text-xs truncate">{t.role} · &ldquo;{t.quote}&rdquo;</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-auto">
              <span className="flex items-center gap-0.5 text-brand-gold text-xs shrink-0">
                {t.rating} <Star size={12} className="fill-brand-gold" />
              </span>

              <Link href={`/admin/testimonials/${t.id}/edit`} className="p-2 text-gray-400 hover:text-brand-gold transition-colors" aria-label="Edit">
                <Pencil size={16} />
              </Link>
              <DeleteButton action={deleteTestimonial.bind(null, t.id)} confirmMessage={`Delete this testimonial from "${t.name}"? This cannot be undone.`} />
            </div>
          </div>
        ))}

        {testimonials.length === 0 && <p className="text-gray-500 text-sm py-8 text-center">No testimonials yet.</p>}
      </div>
    </>
  );
}
