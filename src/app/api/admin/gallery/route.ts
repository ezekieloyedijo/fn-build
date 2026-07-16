import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { galleryImageSchema } from "@/lib/validations";

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  const images = await prisma.galleryImage.findMany({ orderBy: [{ createdAt: "desc" }] });
  return NextResponse.json(images);
}

export async function POST(request: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const parsed = galleryImageSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const image = await prisma.galleryImage.create({ data: parsed.data });
  return NextResponse.json(image, { status: 201 });
}
