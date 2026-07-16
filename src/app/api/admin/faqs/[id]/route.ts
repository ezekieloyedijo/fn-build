import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { faqSchema } from "@/lib/validations";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const parsed = faqSchema.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const faq = await prisma.faq.update({ where: { id: params.id }, data: parsed.data });
  return NextResponse.json(faq);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const { response } = await requireAdmin();
  if (response) return response;

  await prisma.faq.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
