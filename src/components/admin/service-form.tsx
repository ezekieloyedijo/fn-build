"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Service } from "@prisma/client";
import { serviceSchema, ServiceInput } from "@/lib/validations";
import { ImageUploader } from "@/components/admin/image-uploader";
import { ICON_OPTIONS } from "@/lib/icon-map";

export function ServiceForm({ initialData }: { initialData?: Service }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceInput>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          image: initialData.image,
          icon: initialData.icon,
        }
      : { icon: ICON_OPTIONS[0], image: "" },
  });

  async function onSubmit(data: ServiceInput) {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch(
        initialData ? `/api/admin/services/${initialData.id}` : "/api/admin/services",
        {
          method: initialData ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error("Failed to save service");
      router.push("/admin/services");
      router.refresh();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 dark:border-white/15";
  const labelClass = "mb-1.5 block text-sm font-medium text-foreground/80";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <div className="rounded-2xl border border-black/5 bg-surface p-6 shadow-sm dark:border-white/10">
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Service Title</label>
            <input {...register("title")} className={inputClass} placeholder="Building Construction" />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Icon</label>
            <select {...register("icon")} className={inputClass}>
              {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea {...register("description")} rows={4} className={inputClass} />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
          </div>
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <ImageUploader
                label="Service Image"
                value={field.value ? [field.value] : []}
                onChange={(urls) => field.onChange(urls[0] ?? "")}
              />
            )}
          />
          {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
        </div>
      </div>

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
        >
          {submitting ? "Saving..." : initialData ? "Update Service" : "Create Service"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/services")}
          className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-foreground/70 dark:border-white/15"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
