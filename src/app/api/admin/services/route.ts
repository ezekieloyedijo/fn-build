import { NextResponse } from "next/server";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { serviceSchema } from "@/lib/validations";

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  const services = await prisma.service.findMany({ orderBy: [{ order: "asc" }] });
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const data = parsed.data;
  const baseSlug = slugify(data.title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.service.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const count = await prisma.service.count();
  const service = await prisma.service.create({
    data: { ...data, slug, order: count },
  });

  return NextResponse.json(service, { status: 201 });
}
