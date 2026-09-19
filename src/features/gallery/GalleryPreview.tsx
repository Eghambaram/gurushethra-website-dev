"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { FilterTabs } from "@/components/common/FilterTabs";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CTAButton } from "@/components/common/CTAButton";
import { Lightbox } from "@/components/common/Lightbox";
import type { GalleryItem, GalleryCategory } from "@/types/gallery";

const TABS = [
  { key: "all", label: "All" },
  { key: "training", label: "Training" },
  { key: "tournaments", label: "Tournaments" },
  { key: "events", label: "Events" },
  { key: "black-belt", label: "Black Belt" },
];

interface GalleryPreviewProps {
  items: GalleryItem[];
}

export function GalleryPreview({ items }: GalleryPreviewProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = activeTab === "all" ? items : items.filter((i) => i.category === activeTab as GalleryCategory);
  const preview = filtered.slice(0, 6);

  const openLightbox = (item: GalleryItem) => {
    const idx = filtered.findIndex((i) => i.id === item.id);
    setLightboxIdx(idx);
  };

  const closeLightbox = () => setLightboxIdx(null);

  const prev = () => setLightboxIdx((i) => (i !== null ? Math.max(0, i - 1) : null));
  const next = () => setLightboxIdx((i) => (i !== null ? Math.min(filtered.length - 1, i + 1) : null));

  return (
    <section className="py-16 lg:py-20 bg-brand-background" aria-labelledby="gallery-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeading id="gallery-heading" eyebrow="Visual Story" headline="Gallery" align="left" />
          <FilterTabs tabs={TABS} active={activeTab} onChange={setActiveTab} accentColor="gold" layoutId="gallery-preview-tab" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {preview.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover="hover"
              onClick={() => openLightbox(item)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label={`View ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <motion.div
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
              >
                <ZoomIn size={28} className="text-brand-gold" aria-hidden />
              </motion.div>
            </motion.button>
          ))}
        </div>

        <div className="flex justify-center">
          <CTAButton label="View Full Gallery" href="/gallery" variant="outline" size="md" />
        </div>
      </div>

      <Lightbox
        items={filtered}
        index={lightboxIdx}
        onClose={closeLightbox}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}
