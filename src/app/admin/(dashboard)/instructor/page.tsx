import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SavedNotice } from "@/components/admin/SavedNotice";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updateInstructor } from "./actions";

interface InstructorStat {
  value: number;
  suffix: string;
  label: string;
}

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function AdminInstructorPage({ searchParams }: Props) {
  const { saved, error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("instructor").select("*").single();
  const stats: InstructorStat[] = data.stats;

  return (
    <>
      <AdminPageHeader title="Instructor" description="Founder profile — bio, stats, qualifications, and achievements." />
      <SavedNotice show={saved === "1"} />
      <ErrorNotice message={error} />

      <form action={updateInstructor} className="flex flex-col gap-6 max-w-2xl">
        <input type="hidden" name="id" value={data.id} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Name" htmlFor="name">
            <input id="name" name="name" defaultValue={data.name} className={adminInputClass} required />
          </FormField>
          <FormField label="Title" htmlFor="title" hint="e.g. Founder & President">
            <input id="title" name="title" defaultValue={data.title} className={adminInputClass} required />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label="Rank / Dan" htmlFor="dan">
            <input id="dan" name="dan" defaultValue={data.dan} className={adminInputClass} required />
          </FormField>
          <FormField label="Style" htmlFor="style">
            <input id="style" name="style" defaultValue={data.style} className={adminInputClass} required />
          </FormField>
        </div>

        <FormField label="Short Bio" htmlFor="short_bio" hint="Shown in the Home page teaser">
          <textarea id="short_bio" name="short_bio" defaultValue={data.short_bio} rows={2} className={adminInputClass} required />
        </FormField>

        <FormField label="Full Bio" htmlFor="bio" hint="Shown on the full Instructor page">
          <textarea id="bio" name="bio" defaultValue={data.bio} rows={4} className={adminInputClass} required />
        </FormField>

        <FormField label="Extended Bio" htmlFor="bio_extended" hint="Shown as a pull-quote">
          <textarea id="bio_extended" name="bio_extended" defaultValue={data.bio_extended} rows={4} className={adminInputClass} required />
        </FormField>

        <ImageUploadField name="image" label="Photo" defaultValue={data.image} recommendedSize="1200×1600px (3:4 portrait)" />

        <div className="flex flex-col gap-3">
          <h2 className="text-white font-bold text-sm uppercase tracking-wide">Stats (4 tiles)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-lg bg-brand-surface-2 border border-white/8">
                <FormField label="Value" htmlFor={`stat_${i}_value`}>
                  <input
                    id={`stat_${i}_value`}
                    name={`stat_${i}_value`}
                    type="number"
                    defaultValue={stats[i]?.value}
                    className={adminInputClass}
                    required
                  />
                </FormField>
                <FormField label="Suffix" htmlFor={`stat_${i}_suffix`}>
                  <input id={`stat_${i}_suffix`} name={`stat_${i}_suffix`} defaultValue={stats[i]?.suffix} className={adminInputClass} />
                </FormField>
                <FormField label="Label" htmlFor={`stat_${i}_label`}>
                  <input id={`stat_${i}_label`} name={`stat_${i}_label`} defaultValue={stats[i]?.label} className={adminInputClass} required />
                </FormField>
              </div>
            ))}
          </div>
        </div>

        <FormField label="Qualifications" htmlFor="qualifications" hint="One per line">
          <textarea
            id="qualifications"
            name="qualifications"
            defaultValue={data.qualifications.join("\n")}
            rows={6}
            className={adminInputClass}
          />
        </FormField>

        <FormField label="Achievements" htmlFor="achievements" hint="One per line">
          <textarea
            id="achievements"
            name="achievements"
            defaultValue={data.achievements.join("\n")}
            rows={6}
            className={adminInputClass}
          />
        </FormField>

        <SubmitButton label="Save Instructor" />
      </form>
    </>
  );
}
