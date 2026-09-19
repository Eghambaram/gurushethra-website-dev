import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { BranchForm } from "../BranchForm";
import { createBranch } from "../actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewBranchPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <>
      <AdminPageHeader title="Add Branch" backHref="/admin/branches" />
      <ErrorNotice message={error} />
      <BranchForm action={createBranch} submitLabel="Create Branch" />
    </>
  );
}
