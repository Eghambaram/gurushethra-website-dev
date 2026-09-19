import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { TestimonialForm } from "../../TestimonialForm";
import { updateTestimonial } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditTestimonialPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader title="Edit Testimonial" description={data.name} backHref="/admin/testimonials" />
      <ErrorNotice message={error} />
      <TestimonialForm action={updateTestimonial.bind(null, id)} defaultValues={data} submitLabel="Save Changes" />
    </>
  );
}
