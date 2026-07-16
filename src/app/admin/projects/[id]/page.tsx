import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/project-form";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!project) notFound();

  return (
    <div>
      <p className="mb-6 text-sm text-muted">Update the details for this project.</p>
      <ProjectForm initialData={project} />
    </div>
  );
}
