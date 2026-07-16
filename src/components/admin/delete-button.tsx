"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiTrash2, FiLoader } from "react-icons/fi";

export function DeleteButton({ endpoint, confirmText }: { endpoint: string; confirmText: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!window.confirm(confirmText)) return;
    setLoading(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.refresh();
    } catch {
      window.alert("Failed to delete. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      aria-label="Delete"
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
    >
      {loading ? <FiLoader className="animate-spin" size={15} /> : <FiTrash2 size={15} />}
    </button>
  );
}
