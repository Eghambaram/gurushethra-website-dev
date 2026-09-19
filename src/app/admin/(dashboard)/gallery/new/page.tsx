import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { GalleryItemForm } from "../GalleryItemForm";
import { createGalleryItem } from "../actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewGalleryItemPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <>
      <AdminPageHeader title="Add Photo" backHref="/admin/gallery" />
      <ErrorNotice message={error} />
      <GalleryItemForm action={createGalleryItem} submitLabel="Add Photo" />
    </>
  );
}
