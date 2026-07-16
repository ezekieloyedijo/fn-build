import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { testimonialSchema } from "@/lib/validations";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const parsed = testimonialSchema.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const testimonial = await prisma.testimonial.update({ where: { id: params.id }, data: parsed.data });
  return NextResponse.json(testimonial);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const { response } = await requireAdmin();
  if (response) return response;

  await prisma.testimonial.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
