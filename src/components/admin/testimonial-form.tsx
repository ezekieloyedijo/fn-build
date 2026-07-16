"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Testimonial } from "@prisma/client";
import { testimonialSchema, TestimonialInput } from "@/lib/validations";
import { ImageUploader } from "@/components/admin/image-uploader";

export function TestimonialForm({ initialData }: { initialData?: Testimonial }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TestimonialInput>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: initialData
      ? {
          clientName: initialData.clientName,
          company: initialData.company ?? "",
          message: initialData.message,
          image: initialData.image ?? "",
          rating: initialData.rating,
        }
      : { rating: 5, image: "" },
  });

  async function onSubmit(data: TestimonialInput) {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch(
        initialData ? `/api/admin/testimonials/${initialData.id}` : "/api/admin/testimonials",
        {
          method: initialData ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error("Failed to save testimonial");
      router.push("/admin/testimonials");
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
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Client Name</label>
            <input {...register("clientName")} className={inputClass} placeholder="Sarah Mitchell" />
            {errors.clientName && <p className="mt-1 text-xs text-red-500">{errors.clientName.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Company</label>
            <input {...register("company")} className={inputClass} placeholder="Mitchell Residence" />
          </div>
          <div>
            <label className={labelClass}>Rating (1-5)</label>
            <input
              type="number"
              min={1}
              max={5}
              {...register("rating", { valueAsNumber: true })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-5">
          <label className={labelClass}>Testimonial Message</label>
          <textarea {...register("message")} rows={4} className={inputClass} />
          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
        </div>

        <div className="mt-5">
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <ImageUploader
                label="Client Photo"
                value={field.value ? [field.value] : []}
                onChange={(urls) => field.onChange(urls[0] ?? "")}
              />
            )}
          />
        </div>
      </div>

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
        >
          {submitting ? "Saving..." : initialData ? "Update Testimonial" : "Create Testimonial"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/testimonials")}
          className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-foreground/70 dark:border-white/15"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
