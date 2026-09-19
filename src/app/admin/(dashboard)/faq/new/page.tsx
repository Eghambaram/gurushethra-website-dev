import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { FaqItemForm } from "../FaqItemForm";
import { createFaqItem } from "../actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewFaqItemPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <>
      <AdminPageHeader title="Add Question" backHref="/admin/faq" />
      <ErrorNotice message={error} />
      <FaqItemForm action={createFaqItem} submitLabel="Create Question" />
    </>
  );
}
