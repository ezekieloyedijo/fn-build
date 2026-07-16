import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonial = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!testimonial) notFound();

  return (
    <div>
      <p className="mb-6 text-sm text-muted">Update this testimonial.</p>
      <TestimonialForm initialData={testimonial} />
    </div>
  );
}
