import { NextResponse } from "next/server";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { projectSchema } from "@/lib/validations";

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  const projects = await prisma.project.findMany({
    include: { images: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const baseSlug = slugify(data.title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.project.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const project = await prisma.project.create({
    data: {
      title: data.title,
      slug,
      category: data.category,
      location: data.location,
      description: data.description,
      story: data.story || null,
      challenges: data.challenges || null,
      solutions: data.solutions || null,
      results: data.results || null,
      clientName: data.clientName || null,
      clientCompany: data.clientCompany || null,
      status: data.status,
      completionDate: data.completionDate ? new Date(data.completionDate) : null,
      coverImage: data.coverImage,
      featured: data.featured ?? false,
      images: data.images?.length
        ? { create: data.images.map((url, order) => ({ url, order })) }
        : undefined,
    },
    include: { images: true },
  });

  return NextResponse.json(project, { status: 201 });
}
