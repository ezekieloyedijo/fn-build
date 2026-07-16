import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "@/components/admin/service-form";

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) notFound();

  return (
    <div>
      <p className="mb-6 text-sm text-muted">Update this service.</p>
      <ServiceForm initialData={service} />
    </div>
  );
}
