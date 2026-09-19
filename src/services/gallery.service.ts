import galleryData from "@/data/gallery.json";
import { createPublicClient } from "@/lib/supabase/public";
import type { GalleryItem, GalleryCategory } from "@/types/gallery";

function mapRow(row: Record<string, unknown>): GalleryItem {
  return {
    id: row.id as string,
    src: row.src as string,
    alt: row.alt as string,
    category: row.category as GalleryCategory,
    width: row.width as number,
    height: row.height as number,
  };
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("gallery_items").select("*").order("category").order("order_index");
  if (error || !data) return galleryData as GalleryItem[];
  return data.map(mapRow);
}

export async function getGalleryByCategory(category: GalleryCategory): Promise<GalleryItem[]> {
  const all = await getGalleryItems();
  return all.filter((item) => item.category === category);
}

export async function getPreviewGalleryItems(count = 6): Promise<GalleryItem[]> {
  const all = await getGalleryItems();
  return all.slice(0, count);
}
