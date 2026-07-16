import nodemailer from "nodemailer";

export interface ContactEmailPayload {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  message: string;
}

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
}

export async function sendContactNotification(payload: ContactEmailPayload) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("SMTP not configured — skipping email notification.");
    return;
  }

  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER!;

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `New enquiry from ${payload.name} — FNBUILD & Construction`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color:#d97706;">New Website Enquiry</h2>
        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="padding:8px 0; font-weight:bold; width:140px;">Name</td><td>${payload.name}</td></tr>
          <tr><td style="padding:8px 0; font-weight:bold;">Email</td><td>${payload.email}</td></tr>
          <tr><td style="padding:8px 0; font-weight:bold;">Phone</td><td>${payload.phone || "—"}</td></tr>
          <tr><td style="padding:8px 0; font-weight:bold;">Project Type</td><td>${payload.projectType || "—"}</td></tr>
        </table>
        <p style="font-weight:bold; margin-top:16px;">Message</p>
        <p style="white-space:pre-wrap; background:#f4f6f8; padding:12px; border-radius:8px;">${payload.message}</p>
      </div>
    `,
  });
}
