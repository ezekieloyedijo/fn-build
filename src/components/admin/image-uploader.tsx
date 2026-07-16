"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FiUploadCloud, FiX, FiLoader } from "react-icons/fi";

interface ImageUploaderProps {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
}

export function ImageUploader({ label, value, onChange, multiple = false }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Upload failed");
      }
      const { urls } = (await res.json()) as { urls: string[] };

      onChange(multiple ? [...value, ...urls] : [urls[0]]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground/80">{label}</label>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {value.map((url, i) => (
          <div key={url + i} className="group relative aspect-square overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
            <Image src={url} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <FiX size={13} />
            </button>
          </div>
        ))}

        {(multiple || value.length === 0) && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-black/15 text-muted transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-white/15"
          >
            {uploading ? <FiLoader className="animate-spin" size={20} /> : <FiUploadCloud size={20} />}
            <span className="text-[11px] font-medium">{uploading ? "Uploading..." : "Upload"}</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
