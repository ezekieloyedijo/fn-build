"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";
import { Enquiry, EnquiryStatus } from "@prisma/client";
import { formatDate, cn } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/delete-button";

const STATUS_STYLES: Record<EnquiryStatus, string> = {
  NEW: "bg-primary-500/10 text-primary-600",
  CONTACTED: "bg-blue-500/10 text-blue-600",
  CLOSED: "bg-emerald-500/10 text-emerald-600",
};

export function EnquiriesTable({ enquiries }: { enquiries: Enquiry[] }) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateStatus(enquiry: Enquiry, status: EnquiryStatus) {
    setUpdatingId(enquiry.id);
    try {
      await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-4">
      {enquiries.map((enquiry) => (
        <div key={enquiry.id} className="rounded-2xl border border-black/5 bg-surface p-5 shadow-sm dark:border-white/10">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-display font-bold text-foreground">{enquiry.name}</p>
              <p className="text-sm text-muted">
                {enquiry.email} {enquiry.phone && `· ${enquiry.phone}`}
              </p>
              {enquiry.projectType && (
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary-500">
                  {enquiry.projectType}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", STATUS_STYLES[enquiry.status])}>
                {enquiry.status}
              </span>
              <DeleteButton
                endpoint={`/api/admin/enquiries/${enquiry.id}`}
                confirmText={`Delete enquiry from "${enquiry.name}"?`}
              />
            </div>
          </div>

          <p className="mt-3 whitespace-pre-line text-sm text-foreground/80">{enquiry.message}</p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted">{formatDate(enquiry.createdAt)}</p>
            <div className="flex items-center gap-2">
              {updatingId === enquiry.id && <FiLoader className="animate-spin text-primary-500" size={14} />}
              {(["NEW", "CONTACTED", "CLOSED"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(enquiry, status)}
                  disabled={enquiry.status === status || updatingId === enquiry.id}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-40",
                    enquiry.status === status
                      ? "border-primary-500 bg-primary-500 text-white"
                      : "border-black/10 text-foreground/60 hover:border-primary-400 dark:border-white/15"
                  )}
                >
                  Mark {status.charAt(0) + status.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
      {enquiries.length === 0 && <p className="py-10 text-center text-muted">No enquiries yet.</p>}
    </div>
  );
}
