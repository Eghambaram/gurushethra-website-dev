import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { ValueForm } from "../../ValueForm";
import { updateCoreValue } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditCoreValuePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("core_values").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Core Value" description={data.title} backHref="/admin/about" />
      <ErrorNotice message={error} />
      <ValueForm action={updateCoreValue.bind(null, id)} defaultValues={data} submitLabel="Save Changes" />
    </>
  );
}
