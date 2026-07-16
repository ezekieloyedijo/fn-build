"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiUploadCloud, FiLoader, FiTrash2, FiSave } from "react-icons/fi";
import { GalleryImage } from "@prisma/client";

export function GalleryManager({ images }: { images: GalleryImage[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState("General");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, { caption: string; category: string }>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));

      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { urls } = (await uploadRes.json()) as { urls: string[] };

      await Promise.all(
        urls.map((url) =>
          fetch("/api/admin/gallery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, category, caption: "" }),
          })
        )
      );

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function getDraft(image: GalleryImage) {
    return drafts[image.id] ?? { caption: image.caption ?? "", category: image.category };
  }

  async function saveDraft(image: GalleryImage) {
    const draft = getDraft(image);
    setSavingId(image.id);
    try {
      await fetch(`/api/admin/gallery/${image.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      router.refresh();
    } finally {
      setSavingId(null);
    }
  }

  async function deleteImage(image: GalleryImage) {
    if (!window.confirm("Delete this gallery image?")) return;
    setDeletingId(image.id);
    try {
      await fetch(`/api/admin/gallery/${image.id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  const inputClass =
    "rounded-lg border border-black/10 bg-transparent px-3 py-2 text-xs outline-none focus:border-primary-500 dark:border-white/15";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-black/5 bg-surface p-5 shadow-sm dark:border-white/10">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (e.g. Residential, Sites)"
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
        >
          {uploading ? <FiLoader className="animate-spin" /> : <FiUploadCloud />}
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image) => {
          const draft = getDraft(image);
          return (
            <div key={image.id} className="overflow-hidden rounded-2xl border border-black/5 bg-surface shadow-sm dark:border-white/10">
              <div className="relative h-40 w-full">
                <Image src={image.url} alt={image.caption || ""} fill className="object-cover" />
              </div>
              <div className="space-y-2 p-3">
                <input
                  value={draft.caption}
                  onChange={(e) =>
                    setDrafts((d) => ({ ...d, [image.id]: { ...draft, caption: e.target.value } }))
                  }
                  placeholder="Caption"
                  className={`${inputClass} w-full`}
                />
                <input
                  value={draft.category}
                  onChange={(e) =>
                    setDrafts((d) => ({ ...d, [image.id]: { ...draft, category: e.target.value } }))
                  }
                  placeholder="Category"
                  className={`${inputClass} w-full`}
                />
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => saveDraft(image)}
                    disabled={savingId === image.id}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-primary-500 hover:bg-primary-500/10"
                  >
                    {savingId === image.id ? <FiLoader className="animate-spin" size={14} /> : <FiSave size={14} />}
                  </button>
                  <button
                    onClick={() => deleteImage(image)}
                    disabled={deletingId === image.id}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-500/10"
                  >
                    {deletingId === image.id ? <FiLoader className="animate-spin" size={14} /> : <FiTrash2 size={14} />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {images.length === 0 && (
          <p className="col-span-full py-10 text-center text-muted">No gallery images yet.</p>
        )}
      </div>
    </div>
  );
}
