import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { TEAM_CATEGORIES } from "./categories";

interface TeamMemberFormValues {
  slug: string;
  name: string;
  title: string;
  category: string;
  rank: string;
  bio: string | null;
  credentials: { label: string; value: string }[];
  achievements: string[];
  image: string;
  featured: boolean;
  stats: { value: number; suffix: string; label: string }[] | null;
}

interface TeamMemberFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: TeamMemberFormValues;
  submitLabel: string;
}

export function TeamMemberForm({ action, defaultValues: d, submitLabel }: TeamMemberFormProps) {
  const stats = d?.stats ?? [];
  const credentialsText = d?.credentials?.map((c) => (c.value ? `${c.label}: ${c.value}` : c.label)).join("\n") ?? "";

  return (
    <form action={action} className="flex flex-col gap-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Name" htmlFor="name">
          <input id="name" name="name" defaultValue={d?.name} className={adminInputClass} required />
        </FormField>
        <FormField label="Slug" htmlFor="slug" hint="URL-friendly, e.g. sensei-name">
          <input id="slug" name="slug" defaultValue={d?.slug} className={adminInputClass} required pattern="[a-z0-9-]+" />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Title" htmlFor="title" hint="e.g. Chief Instructor">
          <input id="title" name="title" defaultValue={d?.title} className={adminInputClass} required />
        </FormField>
        <FormField label="Category" htmlFor="category">
          <select id="category" name="category" defaultValue={d?.category ?? TEAM_CATEGORIES[0].id} className={adminInputClass} required>
            {TEAM_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Rank" htmlFor="rank" hint="e.g. IV Dan Black Belt">
        <input id="rank" name="rank" defaultValue={d?.rank} className={adminInputClass} required />
      </FormField>

      <FormField label="Bio" htmlFor="bio" hint="Optional — shown on the member's profile page">
        <textarea id="bio" name="bio" defaultValue={d?.bio ?? ""} rows={4} className={adminInputClass} />
      </FormField>

      <ImageUploadField name="image" label="Photo" defaultValue={d?.image} recommendedSize="1200×1500px (4:5 portrait)" />

      <FormField label="Credentials" htmlFor="credentials" hint={'One per line — "Label: Value" (or just a label)'}>
        <textarea id="credentials" name="credentials" defaultValue={credentialsText} rows={4} className={adminInputClass} />
      </FormField>

      <FormField label="Achievements" htmlFor="achievements" hint="One per line">
        <textarea id="achievements" name="achievements" defaultValue={d?.achievements?.join("\n")} rows={4} className={adminInputClass} />
      </FormField>

      <div className="flex flex-col gap-3">
        <h2 className="text-white font-bold text-sm uppercase tracking-wide">Stats (optional — up to 4 tiles)</h2>
        <p className="text-xs text-gray-600">Only used for the featured founder profile. Leave a row's label blank to skip it.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-lg bg-brand-surface-2 border border-white/8">
              <FormField label="Value" htmlFor={`stat_${i}_value`}>
                <input id={`stat_${i}_value`} name={`stat_${i}_value`} type="number" defaultValue={stats[i]?.value} className={adminInputClass} />
              </FormField>
              <FormField label="Suffix" htmlFor={`stat_${i}_suffix`}>
                <input id={`stat_${i}_suffix`} name={`stat_${i}_suffix`} defaultValue={stats[i]?.suffix} className={adminInputClass} />
              </FormField>
              <FormField label="Label" htmlFor={`stat_${i}_label`}>
                <input id={`stat_${i}_label`} name={`stat_${i}_label`} defaultValue={stats[i]?.label} className={adminInputClass} />
              </FormField>
            </div>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-sm text-gray-300">
        <input type="checkbox" name="featured" defaultChecked={d?.featured} className="w-4 h-4 accent-brand-gold" />
        Featured (shown in the founder spotlight on the Team page; their profile link redirects to /instructor)
      </label>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
