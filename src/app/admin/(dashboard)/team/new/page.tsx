import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { TeamMemberForm } from "../TeamMemberForm";
import { createTeamMember } from "../actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewTeamMemberPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <>
      <AdminPageHeader title="Add Team Member" backHref="/admin/team" />
      <ErrorNotice message={error} />
      <TeamMemberForm action={createTeamMember} submitLabel="Create Member" />
    </>
  );
}
