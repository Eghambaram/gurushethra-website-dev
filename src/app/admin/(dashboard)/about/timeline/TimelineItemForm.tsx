import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface TimelineItemFormValues {
  year: string;
  title: string;
  description: string;
}

interface TimelineItemFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: TimelineItemFormValues;
  submitLabel: string;
}

export function TimelineItemForm({ action, defaultValues: d, submitLabel }: TimelineItemFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Year" htmlFor="year">
          <input id="year" name="year" defaultValue={d?.year} className={adminInputClass} required />
        </FormField>
        <FormField label="Title" htmlFor="title">
          <input id="title" name="title" defaultValue={d?.title} className={adminInputClass} required />
        </FormField>
      </div>

      <FormField label="Description" htmlFor="description">
        <textarea id="description" name="description" defaultValue={d?.description} rows={3} className={adminInputClass} required />
      </FormField>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
