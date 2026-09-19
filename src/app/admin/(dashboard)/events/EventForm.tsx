import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { EVENT_TYPES, EVENT_STATUSES } from "./categories";

interface EventFormValues {
  slug: string;
  title: string;
  type: string;
  status: string;
  date: string;
  end_date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
  featured: boolean;
}

interface EventFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: EventFormValues;
  submitLabel: string;
}

export function EventForm({ action, defaultValues: d, submitLabel }: EventFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Title" htmlFor="title">
          <input id="title" name="title" defaultValue={d?.title} className={adminInputClass} required />
        </FormField>
        <FormField label="Slug" htmlFor="slug" hint="URL-friendly, e.g. summer-camp-2026">
          <input id="slug" name="slug" defaultValue={d?.slug} className={adminInputClass} required pattern="[a-z0-9-]+" />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Type" htmlFor="type">
          <select id="type" name="type" defaultValue={d?.type ?? EVENT_TYPES[0].id} className={adminInputClass} required>
            {EVENT_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Status" htmlFor="status">
          <select id="status" name="status" defaultValue={d?.status ?? EVENT_STATUSES[0].id} className={adminInputClass} required>
            {EVENT_STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Start Date" htmlFor="date">
          <input id="date" name="date" type="date" defaultValue={d?.date} className={adminInputClass} required />
        </FormField>
        <FormField label="End Date" htmlFor="end_date">
          <input id="end_date" name="end_date" type="date" defaultValue={d?.end_date} className={adminInputClass} required />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Time" htmlFor="time" hint="e.g. 9:00 AM – 1:00 PM">
          <input id="time" name="time" defaultValue={d?.time} className={adminInputClass} required />
        </FormField>
        <FormField label="Venue" htmlFor="venue">
          <input id="venue" name="venue" defaultValue={d?.venue} className={adminInputClass} required />
        </FormField>
      </div>

      <FormField label="Description" htmlFor="description">
        <textarea id="description" name="description" defaultValue={d?.description} rows={4} className={adminInputClass} required />
      </FormField>

      <ImageUploadField name="image" label="Image" defaultValue={d?.image} recommendedSize="1200×675px (16:9)" />

      <label className="flex items-center gap-2.5 text-sm text-gray-300">
        <input type="checkbox" name="featured" defaultChecked={d?.featured} className="w-4 h-4 accent-brand-gold" />
        Featured
      </label>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
