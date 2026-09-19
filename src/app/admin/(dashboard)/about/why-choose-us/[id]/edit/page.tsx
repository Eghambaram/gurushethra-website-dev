import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { ReasonForm } from "../../ReasonForm";
import { updateReason } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditReasonPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("why_choose_us_reasons").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Reason" description={data.title} backHref="/admin/about" />
      <ErrorNotice message={error} />
      <ReasonForm action={updateReason.bind(null, id)} defaultValues={data} submitLabel="Save Changes" />
    </>
  );
}
