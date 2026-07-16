import Link from "next/link";
import Image from "next/image";
import { FiPlus, FiEdit2, FiStar } from "react-icons/fi";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">Manage client testimonials.</p>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
        >
          <FiPlus /> New Testimonial
        </Link>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl border border-black/5 bg-surface p-5 shadow-sm dark:border-white/10">
            <div className="flex items-center gap-3">
              {t.image ? (
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                  <Image src={t.image} alt={t.clientName} fill className="object-cover" />
                </div>
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-500/15 font-semibold text-primary-500">
                  {t.clientName.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-foreground">{t.clientName}</p>
                <p className="text-xs text-muted">{t.company || "—"}</p>
              </div>
            </div>
            <div className="mt-2 flex gap-0.5 text-primary-400">
              {Array.from({ length: t.rating }).map((_, i) => (
                <FiStar key={i} className="fill-current" size={13} />
              ))}
            </div>
            <p className="mt-2 line-clamp-3 text-sm text-muted">{t.message}</p>
            <div className="mt-3 flex justify-end gap-1">
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-primary-500 hover:bg-primary-500/10"
              >
                <FiEdit2 size={15} />
              </Link>
              <DeleteButton
                endpoint={`/api/admin/testimonials/${t.id}`}
                confirmText={`Delete testimonial from "${t.clientName}"?`}
              />
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="col-span-full py-10 text-center text-muted">No testimonials yet.</p>
        )}
      </div>
    </div>
  );
}
