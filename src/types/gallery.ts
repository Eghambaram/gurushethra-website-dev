export type GalleryCategory = "training" | "tournaments" | "events" | "black-belt";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
}
