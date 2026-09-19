import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowDown, Pencil, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SavedNotice } from "@/components/admin/SavedNotice";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteGalleryItem, moveGalleryItem } from "./actions";
import { GALLERY_CATEGORIES } from "./categories";

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function AdminGalleryPage({ searchParams }: Props) {
  const { saved, error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("gallery_items").select("*").order("category").order("order_index");
  const items = data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Gallery"
        description="Photo gallery — upload, categorize, and reorder images."
        action={
          <Link
            href="/admin/gallery/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-background font-bold text-xs tracking-widest uppercase rounded hover:bg-[#C9A227] transition-colors"
          >
            <Plus size={14} /> Add Photo
          </Link>
        }
      />
      <SavedNotice show={saved === "1"} />
      <ErrorNotice message={error} />

      <div className="flex flex-col gap-8">
        {GALLERY_CATEGORIES.map((cat) => {
          const group = items.filter((i) => i.category === cat.id);
          if (group.length === 0) return null;

          return (
            <div key={cat.id} className="flex flex-col gap-3">
              <h2 className="text-white font-bold text-sm uppercase tracking-wide">
                {cat.name} <span className="text-gray-600 font-normal">({group.length})</span>
              </h2>
              {group.map((item, i) => (
                <div key={item.id} className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-brand-surface border border-white/8">
                  <div className="flex items-center gap-3 min-w-0 flex-1 basis-[220px]">
                    <div className="flex flex-col gap-1">
                      <form action={moveGalleryItem}>
                        <input type="hidden" name="id" value={item.id} />
                        <input type="hidden" name="direction" value="up" />
                        <button type="submit" disabled={i === 0} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                          <ArrowUp size={14} />
                        </button>
                      </form>
                      <form action={moveGalleryItem}>
                        <input type="hidden" name="id" value={item.id} />
                        <input type="hidden" name="direction" value="down" />
                        <button type="submit" disabled={i === group.length - 1} className="p-1 text-gray-400 hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed">
                          <ArrowDown size={14} />
                        </button>
                      </form>
                    </div>

                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-brand-surface-2 shrink-0">
                      <Image src={item.src} alt="" fill sizes="56px" className="object-cover" unoptimized />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{item.alt}</p>
                      <p className="text-gray-500 text-xs">{item.width}×{item.height}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-auto">
                    <Link href={`/admin/gallery/${item.id}/edit`} className="p-2 text-gray-400 hover:text-brand-gold transition-colors" aria-label="Edit">
                      <Pencil size={16} />
                    </Link>
                    <DeleteButton action={deleteGalleryItem.bind(null, item.id)} confirmMessage="Delete this photo? This cannot be undone." />
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {items.length === 0 && <p className="text-gray-500 text-sm py-8 text-center">No photos yet.</p>}
      </div>
    </>
  );
}
