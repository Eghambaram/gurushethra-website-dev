import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

interface AchievementEntryFormValues {
  year: string;
  title: string;
  result: string;
  medals: { gold: number; silver: number; bronze: number };
  description: string;
  image: string;
}

interface AchievementEntryFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: AchievementEntryFormValues;
  submitLabel: string;
}

export function AchievementEntryForm({ action, defaultValues: d, submitLabel }: AchievementEntryFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Year" htmlFor="year">
          <input id="year" name="year" defaultValue={d?.year} className={adminInputClass} required />
        </FormField>
        <FormField label="Result" htmlFor="result" hint="e.g. Gold & Silver Medals">
          <input id="result" name="result" defaultValue={d?.result} className={adminInputClass} required />
        </FormField>
      </div>

      <FormField label="Title" htmlFor="title" hint="e.g. Ipoh City International Open — Malaysia">
        <input id="title" name="title" defaultValue={d?.title} className={adminInputClass} required />
      </FormField>

      <FormField label="Description" htmlFor="description">
        <textarea id="description" name="description" defaultValue={d?.description} rows={3} className={adminInputClass} required />
      </FormField>

      <ImageUploadField name="image" label="Image" defaultValue={d?.image} recommendedSize="1200×480px (2.5:1 landscape banner)" />

      <div className="flex flex-col gap-3">
        <h2 className="text-white font-bold text-sm uppercase tracking-wide">Medals</h2>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Gold" htmlFor="medals_gold">
            <input id="medals_gold" name="medals_gold" type="number" min={0} defaultValue={d?.medals?.gold ?? 0} className={adminInputClass} />
          </FormField>
          <FormField label="Silver" htmlFor="medals_silver">
            <input id="medals_silver" name="medals_silver" type="number" min={0} defaultValue={d?.medals?.silver ?? 0} className={adminInputClass} />
          </FormField>
          <FormField label="Bronze" htmlFor="medals_bronze">
            <input id="medals_bronze" name="medals_bronze" type="number" min={0} defaultValue={d?.medals?.bronze ?? 0} className={adminInputClass} />
          </FormField>
        </div>
      </div>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
