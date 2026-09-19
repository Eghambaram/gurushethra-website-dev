import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { ProgramForm } from "../ProgramForm";
import { createProgram } from "../actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewProgramPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <>
      <AdminPageHeader title="Add Program" backHref="/admin/programs" />
      <ErrorNotice message={error} />
      <ProgramForm action={createProgram} submitLabel="Create Program" />
    </>
  );
}
