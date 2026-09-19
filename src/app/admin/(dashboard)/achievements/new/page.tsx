import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { AchievementEntryForm } from "../AchievementEntryForm";
import { createAchievementEntry } from "../actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewAchievementEntryPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <>
      <AdminPageHeader title="Add Achievement" backHref="/admin/achievements" />
      <ErrorNotice message={error} />
      <AchievementEntryForm action={createAchievementEntry} submitLabel="Create Entry" />
    </>
  );
}
