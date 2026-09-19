"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { FilterTabs } from "@/components/common/FilterTabs";
import { Lightbox } from "@/components/common/Lightbox";
import type { GalleryItem, GalleryCategory } from "@/types/gallery";

const TABS = [
  { key: "all", label: "All" },
  { key: "training", label: "Training" },
  { key: "tournaments", label: "Tournaments" },
  { key: "events", label: "Events" },
  { key: "black-belt", label: "Black Belt" },
];

const PAGE_SIZE = 12;

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState("all");
  const [page, setPage] = useState(1);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = useMemo(
    () => active === "all" ? items : items.filter((i) => i.category === active as GalleryCategory),
    [items, active]
  );

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  const handleTabChange = (key: string) => { setActive(key); setPage(1); };
  const openAt = (item: GalleryItem) => setLightboxIdx(filtered.findIndex((i) => i.id === item.id));
  const close = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => (i !== null ? Math.max(0, i - 1) : null));
  const next = () => setLightboxIdx((i) => (i !== null ? Math.min(filtered.length - 1, i + 1) : null));

  return (
    <>
      <div className="flex flex-col gap-8">
        <FilterTabs tabs={TABS} active={active} onChange={handleTabChange} accentColor="gold" layoutId="gallery-grid-tab" />

        {/* Masonry grid via CSS columns */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: (i % PAGE_SIZE) * 0.04 }}
                whileHover="hover"
                onClick={() => openAt(item)}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                aria-label={`View ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <motion.div
                  variants={{ hover: { opacity: 1 } }}
                  initial={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl"
                >
                  <ZoomIn size={28} className="text-brand-gold" aria-hidden />
                </motion.div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-8 py-3.5 border-2 border-brand-gold text-brand-gold font-bold text-sm tracking-widest uppercase rounded hover:bg-brand-gold hover:text-brand-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              Load More ({filtered.length - visible.length} remaining)
            </button>
          </div>
        )}
      </div>

      <Lightbox
        items={filtered}
        index={lightboxIdx}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </>
  );
}
