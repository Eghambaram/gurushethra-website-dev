import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ICON_NAMES } from "@/lib/icons";

interface ReasonFormValues {
  icon: string;
  title: string;
  description: string;
}

interface ReasonFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: ReasonFormValues;
  submitLabel: string;
}

export function ReasonForm({ action, defaultValues: d, submitLabel }: ReasonFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Title" htmlFor="title">
          <input id="title" name="title" defaultValue={d?.title} className={adminInputClass} required />
        </FormField>
        <FormField label="Icon" htmlFor="icon">
          <select id="icon" name="icon" defaultValue={d?.icon ?? ICON_NAMES[0]} className={adminInputClass} required>
            {ICON_NAMES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Description" htmlFor="description">
        <textarea id="description" name="description" defaultValue={d?.description} rows={3} className={adminInputClass} required />
      </FormField>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
