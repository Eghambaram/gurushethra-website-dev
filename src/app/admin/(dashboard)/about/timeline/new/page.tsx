import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { TimelineItemForm } from "../TimelineItemForm";
import { createTimelineItem } from "../actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewTimelineItemPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <>
      <AdminPageHeader title="Add Timeline Milestone" backHref="/admin/about" />
      <ErrorNotice message={error} />
      <TimelineItemForm action={createTimelineItem} submitLabel="Create Milestone" />
    </>
  );
}
