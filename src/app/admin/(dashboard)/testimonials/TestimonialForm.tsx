import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface TestimonialFormValues {
  name: string;
  role: string;
  rating: number;
  quote: string;
}

interface TestimonialFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: TestimonialFormValues;
  submitLabel: string;
}

export function TestimonialForm({ action, defaultValues: d, submitLabel }: TestimonialFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Name" htmlFor="name">
          <input id="name" name="name" defaultValue={d?.name} className={adminInputClass} required />
        </FormField>
        <FormField label="Role" htmlFor="role" hint="e.g. Parent of a student">
          <input id="role" name="role" defaultValue={d?.role} className={adminInputClass} required />
        </FormField>
      </div>

      <FormField label="Rating" htmlFor="rating" hint="1–5">
        <input id="rating" name="rating" type="number" min={1} max={5} defaultValue={d?.rating ?? 5} className={adminInputClass} required />
      </FormField>

      <FormField label="Quote" htmlFor="quote">
        <textarea id="quote" name="quote" defaultValue={d?.quote} rows={4} className={adminInputClass} required />
      </FormField>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
