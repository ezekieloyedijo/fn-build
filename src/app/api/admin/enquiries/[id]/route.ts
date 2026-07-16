import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { z } from "zod";

const statusSchema = z.object({ status: z.enum(["NEW", "CONTACTED", "CLOSED"]) });

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const enquiry = await prisma.enquiry.update({ where: { id: params.id }, data: parsed.data });
  return NextResponse.json(enquiry);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const { response } = await requireAdmin();
  if (response) return response;

  await prisma.enquiry.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
