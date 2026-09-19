import { FormField, adminInputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { GALLERY_CATEGORIES } from "./categories";

interface GalleryItemFormValues {
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

interface GalleryItemFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: GalleryItemFormValues;
  submitLabel: string;
}

export function GalleryItemForm({ action, defaultValues: d, submitLabel }: GalleryItemFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6 max-w-2xl">
      <ImageUploadField
        name="src"
        label="Photo"
        defaultValue={d?.src}
        recommendedSize="Any — actual dimensions are captured automatically for the masonry grid"
        captureDimensions
        defaultWidth={d?.width}
        defaultHeight={d?.height}
      />

      <FormField label="Alt Text" htmlFor="alt" hint="Describes the photo — used for accessibility and SEO">
        <input id="alt" name="alt" defaultValue={d?.alt} className={adminInputClass} required />
      </FormField>

      <FormField label="Category" htmlFor="category">
        <select id="category" name="category" defaultValue={d?.category ?? GALLERY_CATEGORIES[0].id} className={adminInputClass} required>
          {GALLERY_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </FormField>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
