import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, projectType, message } = parsed.data;

    const enquiry = await prisma.enquiry.create({
      data: { name, email, phone: phone || null, projectType: projectType || null, message },
    });

    sendContactNotification({ name, email, phone, projectType, message }).catch((err) =>
      console.error("Failed to send contact notification email:", err)
    );

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
