import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { AchievementEntryForm } from "../../AchievementEntryForm";
import { updateAchievementEntry } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditAchievementEntryPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("achievement_entries").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Achievement" description={data.title} backHref="/admin/achievements" />
      <ErrorNotice message={error} />
      <AchievementEntryForm action={updateAchievementEntry.bind(null, id)} defaultValues={data} submitLabel="Save Changes" />
    </>
  );
}
