import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface FaqItemFormValues {
  question: string;
  answer: string;
}

interface FaqItemFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: FaqItemFormValues;
  submitLabel: string;
}

export function FaqItemForm({ action, defaultValues: d, submitLabel }: FaqItemFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6 max-w-2xl">
      <FormField label="Question" htmlFor="question">
        <input id="question" name="question" defaultValue={d?.question} className={adminInputClass} required />
      </FormField>

      <FormField label="Answer" htmlFor="answer">
        <textarea id="answer" name="answer" defaultValue={d?.answer} rows={5} className={adminInputClass} required />
      </FormField>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
