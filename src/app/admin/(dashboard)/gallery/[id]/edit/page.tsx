import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { GalleryItemForm } from "../../GalleryItemForm";
import { updateGalleryItem } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditGalleryItemPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("gallery_items").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Photo" description={data.alt} backHref="/admin/gallery" />
      <ErrorNotice message={error} />
      <GalleryItemForm action={updateGalleryItem.bind(null, id)} defaultValues={data} submitLabel="Save Changes" />
    </>
  );
}
