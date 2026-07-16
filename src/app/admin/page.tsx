import Link from "next/link";
import { FiBriefcase, FiTool, FiMessageSquare, FiImage, FiHelpCircle, FiMail, FiArrowRight } from "react-icons/fi";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [projectCount, ongoingCount, serviceCount, testimonialCount, galleryCount, faqCount, enquiries] =
    await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: "ONGOING" } }),
      prisma.service.count(),
      prisma.testimonial.count(),
      prisma.galleryImage.count(),
      prisma.faq.count(),
      prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const cards = [
    { label: "Projects", value: projectCount, sub: `${ongoingCount} ongoing`, href: "/admin/projects", icon: FiBriefcase },
    { label: "Services", value: serviceCount, sub: "Active services", href: "/admin/services", icon: FiTool },
    { label: "Testimonials", value: testimonialCount, sub: "Client reviews", href: "/admin/testimonials", icon: FiMessageSquare },
    { label: "Gallery Images", value: galleryCount, sub: "Published photos", href: "/admin/gallery", icon: FiImage },
    { label: "FAQs", value: faqCount, sub: "Published answers", href: "/admin/faqs", icon: FiHelpCircle },
    { label: "New Enquiries", value: enquiries.filter((e) => e.status === "NEW").length, sub: "Awaiting response", href: "/admin/enquiries", icon: FiMail },
  ];

  return (
    <div>
      <p className="text-sm text-muted">Welcome back — here's what's happening with your website.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-2xl border border-black/5 bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/15 text-primary-500">
                <card.icon size={20} />
              </span>
              <FiArrowRight className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary-500" />
            </div>
            <p className="mt-4 font-display text-3xl font-bold text-foreground">{card.value}</p>
            <p className="text-sm font-medium text-foreground/70">{card.label}</p>
            <p className="mt-0.5 text-xs text-muted">{card.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-black/5 bg-surface p-6 shadow-sm dark:border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-foreground">Recent Enquiries</h2>
          <Link href="/admin/enquiries" className="text-sm font-medium text-primary-500 hover:underline">
            View all
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 text-xs uppercase tracking-wide text-muted dark:border-white/10">
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Project Type</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="border-b border-black/5 last:border-0 dark:border-white/5">
                  <td className="py-3 pr-4 font-medium text-foreground">{enquiry.name}</td>
                  <td className="py-3 pr-4 text-muted">{enquiry.email}</td>
                  <td className="py-3 pr-4 text-muted">{enquiry.projectType || "—"}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-primary-500/10 px-2.5 py-1 text-xs font-semibold text-primary-500">
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="py-3 text-muted">{formatDate(enquiry.createdAt)}</td>
                </tr>
              ))}
              {enquiries.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-muted">
                    No enquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
