import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { EventForm } from "../EventForm";
import { createEvent } from "../actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewEventPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <>
      <AdminPageHeader title="Add Event" backHref="/admin/events" />
      <ErrorNotice message={error} />
      <EventForm action={createEvent} submitLabel="Create Event" />
    </>
  );
}
