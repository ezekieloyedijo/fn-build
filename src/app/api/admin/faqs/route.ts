import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { faqSchema } from "@/lib/validations";

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  const faqs = await prisma.faq.findMany({ orderBy: [{ order: "asc" }] });
  return NextResponse.json(faqs);
}

export async function POST(request: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const parsed = faqSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const count = await prisma.faq.count();
  const faq = await prisma.faq.create({ data: { ...parsed.data, order: count } });
  return NextResponse.json(faq, { status: 201 });
}
