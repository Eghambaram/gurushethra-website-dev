import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { TimelineItemForm } from "../../TimelineItemForm";
import { updateTimelineItem } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditTimelineItemPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("timeline_items").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Timeline Milestone" description={data.title} backHref="/admin/about" />
      <ErrorNotice message={error} />
      <TimelineItemForm action={updateTimelineItem.bind(null, id)} defaultValues={data} submitLabel="Save Changes" />
    </>
  );
}
