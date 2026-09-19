import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { FaqItemForm } from "../../FaqItemForm";
import { updateFaqItem } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditFaqItemPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("faq_items").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Question" description={data.question} backHref="/admin/faq" />
      <ErrorNotice message={error} />
      <FaqItemForm action={updateFaqItem.bind(null, id)} defaultValues={data} submitLabel="Save Changes" />
    </>
  );
}
