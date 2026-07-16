import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { testimonialSchema } from "@/lib/validations";

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  const testimonials = await prisma.testimonial.findMany({ orderBy: [{ order: "asc" }] });
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const count = await prisma.testimonial.count();
  const testimonial = await prisma.testimonial.create({ data: { ...parsed.data, order: count } });
  return NextResponse.json(testimonial, { status: 201 });
}
