import { prisma } from "@/lib/prisma";
import { EnquiriesTable } from "@/components/admin/enquiries-table";

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <p className="mb-6 text-sm text-muted">View and manage enquiries submitted through the contact form.</p>
      <EnquiriesTable enquiries={enquiries} />
    </div>
  );
}
