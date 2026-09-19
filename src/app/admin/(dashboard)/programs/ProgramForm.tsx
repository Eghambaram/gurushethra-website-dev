import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

interface ProgramFormValues {
  slug: string;
  title: string;
  age_range: string;
  short_description: string;
  description: string;
  image: string;
  features: string[];
  duration: string;
  schedule: string;
  featured: boolean;
}

interface ProgramFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: ProgramFormValues;
  submitLabel: string;
}

export function ProgramForm({ action, defaultValues: d, submitLabel }: ProgramFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Title" htmlFor="title">
          <input id="title" name="title" defaultValue={d?.title} className={adminInputClass} required />
        </FormField>
        <FormField label="Slug" htmlFor="slug" hint="URL-friendly, e.g. kids-karate">
          <input id="slug" name="slug" defaultValue={d?.slug} className={adminInputClass} required pattern="[a-z0-9-]+" />
        </FormField>
      </div>

      <FormField label="Age Range" htmlFor="age_range" hint="e.g. 7–12 Years">
        <input id="age_range" name="age_range" defaultValue={d?.age_range} className={adminInputClass} required />
      </FormField>

      <FormField label="Short Description" htmlFor="short_description" hint="Shown on program cards">
        <textarea id="short_description" name="short_description" defaultValue={d?.short_description} rows={2} className={adminInputClass} required />
      </FormField>

      <FormField label="Full Description" htmlFor="description" hint="Shown on the program's detail page">
        <textarea id="description" name="description" defaultValue={d?.description} rows={4} className={adminInputClass} required />
      </FormField>

      <ImageUploadField name="image" label="Image" defaultValue={d?.image} recommendedSize="1600×1200px (4:3)" />

      <FormField label="Features" htmlFor="features" hint="One per line">
        <textarea id="features" name="features" defaultValue={d?.features?.join("\n")} rows={4} className={adminInputClass} />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Duration" htmlFor="duration" hint="e.g. 90-minute classes">
          <input id="duration" name="duration" defaultValue={d?.duration} className={adminInputClass} required />
        </FormField>
        <FormField label="Schedule" htmlFor="schedule">
          <input id="schedule" name="schedule" defaultValue={d?.schedule} className={adminInputClass} required />
        </FormField>
      </div>

      <label className="flex items-center gap-2.5 text-sm text-gray-300">
        <input type="checkbox" name="featured" defaultChecked={d?.featured} className="w-4 h-4 accent-brand-gold" />
        Featured (highlighted on the homepage)
      </label>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
