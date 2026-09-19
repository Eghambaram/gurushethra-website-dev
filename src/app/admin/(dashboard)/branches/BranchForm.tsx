import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface BranchFormValues {
  slug: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  map_embed: string;
  features: string[];
  featured: boolean;
}

interface BranchFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: BranchFormValues;
  submitLabel: string;
}

export function BranchForm({ action, defaultValues: d, submitLabel }: BranchFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Name" htmlFor="name">
          <input id="name" name="name" defaultValue={d?.name} className={adminInputClass} required />
        </FormField>
        <FormField label="Slug" htmlFor="slug" hint="URL-friendly, e.g. chromepet">
          <input id="slug" name="slug" defaultValue={d?.slug} className={adminInputClass} required pattern="[a-z0-9-]+" />
        </FormField>
      </div>

      <FormField label="Type" htmlFor="type">
        <select id="type" name="type" defaultValue={d?.type ?? "branch"} className={adminInputClass} required>
          <option value="headquarters">Headquarters</option>
          <option value="branch">Branch</option>
        </select>
      </FormField>

      <FormField label="Address" htmlFor="address">
        <textarea id="address" name="address" defaultValue={d?.address} rows={2} className={adminInputClass} required />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Phone" htmlFor="phone">
          <input id="phone" name="phone" defaultValue={d?.phone} className={adminInputClass} required />
        </FormField>
        <FormField label="Email" htmlFor="email">
          <input id="email" name="email" type="email" defaultValue={d?.email} className={adminInputClass} required />
        </FormField>
      </div>

      <FormField label="Hours" htmlFor="hours" hint="e.g. Mon–Sat: 6:00 AM – 9:00 PM">
        <input id="hours" name="hours" defaultValue={d?.hours} className={adminInputClass} required />
      </FormField>

      <FormField label="Map Embed" htmlFor="map_embed" hint="Google Maps embed URL">
        <input id="map_embed" name="map_embed" defaultValue={d?.map_embed} className={adminInputClass} required />
      </FormField>

      <FormField label="Features" htmlFor="features" hint="One per line">
        <textarea id="features" name="features" defaultValue={d?.features?.join("\n")} rows={4} className={adminInputClass} />
      </FormField>

      <label className="flex items-center gap-2.5 text-sm text-gray-300">
        <input type="checkbox" name="featured" defaultChecked={d?.featured} className="w-4 h-4 accent-brand-gold" />
        Featured
      </label>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
