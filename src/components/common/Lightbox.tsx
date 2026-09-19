"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/types/gallery";

interface LightboxProps {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {index !== null && item && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            <X size={22} />
          </button>

          {index > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Previous image"
              className="absolute left-3 sm:left-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {index < items.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Next image"
              className="absolute right-3 sm:right-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <ChevronRight size={28} />
            </button>
          )}

          <motion.div
            key={index}
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="relative w-full max-w-5xl max-h-[85vh] mx-4 sm:mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="object-contain w-full max-h-[82vh] rounded-xl"
              priority
            />
            <p className="text-gray-400 text-sm text-center mt-3">
              {item.alt}
              <span className="ml-2 text-gray-600">({index + 1} / {items.length})</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
