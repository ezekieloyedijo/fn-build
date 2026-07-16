import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { projectSchema } from "@/lib/validations";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { images: true },
  });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const parsed = projectSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  if (data.images) {
    await prisma.projectImage.deleteMany({ where: { projectId: params.id } });
  }

  const project = await prisma.project.update({
    where: { id: params.id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.location !== undefined && { location: data.location }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.story !== undefined && { story: data.story || null }),
      ...(data.challenges !== undefined && { challenges: data.challenges || null }),
      ...(data.solutions !== undefined && { solutions: data.solutions || null }),
      ...(data.results !== undefined && { results: data.results || null }),
      ...(data.clientName !== undefined && { clientName: data.clientName || null }),
      ...(data.clientCompany !== undefined && { clientCompany: data.clientCompany || null }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.completionDate !== undefined && {
        completionDate: data.completionDate ? new Date(data.completionDate) : null,
      }),
      ...(data.coverImage !== undefined && { coverImage: data.coverImage }),
      ...(data.featured !== undefined && { featured: data.featured }),
      ...(data.images && {
        images: { create: data.images.map((url, order) => ({ url, order })) },
      }),
    },
    include: { images: true },
  });

  return NextResponse.json(project);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const { response } = await requireAdmin();
  if (response) return response;

  await prisma.project.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
