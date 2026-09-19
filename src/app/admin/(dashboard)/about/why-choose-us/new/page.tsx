import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { ReasonForm } from "../ReasonForm";
import { createReason } from "../actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewReasonPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <>
      <AdminPageHeader title="Add Reason" backHref="/admin/about" />
      <ErrorNotice message={error} />
      <ReasonForm action={createReason} submitLabel="Create Reason" />
    </>
  );
}
