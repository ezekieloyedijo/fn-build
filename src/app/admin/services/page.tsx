import Link from "next/link";
import Image from "next/image";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">Manage the services you offer.</p>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
        >
          <FiPlus /> New Service
        </Link>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.id} className="overflow-hidden rounded-2xl border border-black/5 bg-surface shadow-sm dark:border-white/10">
            <div className="relative h-36 w-full">
              <Image src={service.image} alt={service.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-display font-bold text-foreground">{service.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-muted">{service.description}</p>
              <div className="mt-3 flex justify-end gap-1">
                <Link
                  href={`/admin/services/${service.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-primary-500 hover:bg-primary-500/10"
                >
                  <FiEdit2 size={15} />
                </Link>
                <DeleteButton
                  endpoint={`/api/admin/services/${service.id}`}
                  confirmText={`Delete "${service.title}"?`}
                />
              </div>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <p className="col-span-full py-10 text-center text-muted">No services yet.</p>
        )}
      </div>
    </div>
  );
}
