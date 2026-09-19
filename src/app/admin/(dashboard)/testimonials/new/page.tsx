import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { TestimonialForm } from "../TestimonialForm";
import { createTestimonial } from "../actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewTestimonialPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <>
      <AdminPageHeader title="Add Testimonial" backHref="/admin/testimonials" />
      <ErrorNotice message={error} />
      <TestimonialForm action={createTestimonial} submitLabel="Create Testimonial" />
    </>
  );
}
