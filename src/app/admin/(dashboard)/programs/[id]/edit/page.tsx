import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { ProgramForm } from "../../ProgramForm";
import { updateProgram } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditProgramPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("programs").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Program" description={data.title} backHref="/admin/programs" />
      <ErrorNotice message={error} />
      <ProgramForm action={updateProgram.bind(null, id)} defaultValues={data} submitLabel="Save Changes" />
    </>
  );
}
