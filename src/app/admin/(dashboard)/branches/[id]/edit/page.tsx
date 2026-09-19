import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { BranchForm } from "../../BranchForm";
import { updateBranch } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditBranchPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("branches").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Branch" description={data.name} backHref="/admin/branches" />
      <ErrorNotice message={error} />
      <BranchForm action={updateBranch.bind(null, id)} defaultValues={data} submitLabel="Save Changes" />
    </>
  );
}
