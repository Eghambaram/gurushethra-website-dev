import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { TeamMemberForm } from "../../TeamMemberForm";
import { updateTeamMember } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditTeamMemberPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("team_members").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Team Member" description={data.name} backHref="/admin/team" />
      <ErrorNotice message={error} />
      <TeamMemberForm action={updateTeamMember.bind(null, id)} defaultValues={data} submitLabel="Save Changes" />
    </>
  );
}
