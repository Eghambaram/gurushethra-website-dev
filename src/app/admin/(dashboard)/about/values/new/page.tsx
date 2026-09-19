import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { ValueForm } from "../ValueForm";
import { createCoreValue } from "../actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewCoreValuePage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <>
      <AdminPageHeader title="Add Core Value" backHref="/admin/about" />
      <ErrorNotice message={error} />
      <ValueForm action={createCoreValue} submitLabel="Create Value" />
    </>
  );
}
