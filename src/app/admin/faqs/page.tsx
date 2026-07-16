import { prisma } from "@/lib/prisma";
import { FaqManager } from "@/components/admin/faq-manager";

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <p className="mb-6 text-sm text-muted">Manage frequently asked questions.</p>
      <FaqManager faqs={faqs} />
    </div>
  );
}
