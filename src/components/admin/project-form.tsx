"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project, ProjectImage } from "@prisma/client";
import { projectSchema, ProjectInput } from "@/lib/validations";
import { ImageUploader } from "@/components/admin/image-uploader";

type ProjectWithImages = Project & { images: ProjectImage[] };

export function ProjectForm({ initialData }: { initialData?: ProjectWithImages }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          category: initialData.category,
          location: initialData.location,
          description: initialData.description,
          story: initialData.story ?? "",
          challenges: initialData.challenges ?? "",
          solutions: initialData.solutions ?? "",
          results: initialData.results ?? "",
          clientName: initialData.clientName ?? "",
          clientCompany: initialData.clientCompany ?? "",
          status: initialData.status,
          completionDate: initialData.completionDate
            ? new Date(initialData.completionDate).toISOString().slice(0, 10)
            : "",
          coverImage: initialData.coverImage,
          featured: initialData.featured,
          images: initialData.images.map((i) => i.url),
        }
      : {
          status: "ONGOING",
          featured: false,
          coverImage: "",
          images: [],
        },
  });

  async function onSubmit(data: ProjectInput) {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch(
        initialData ? `/api/admin/projects/${initialData.id}` : "/api/admin/projects",
        {
          method: initialData ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error("Failed to save project");
      router.push("/admin/projects");
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="rounded-2xl border border-black/5 bg-surface p-6 shadow-sm dark:border-white/10">
        <h2 className="mb-5 font-display text-lg font-bold text-foreground">Project Information</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Title</label>
            <input {...register("title")} className={inputClass} placeholder="Meridian Heights Tower" />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <input {...register("category")} className={inputClass} placeholder="Residential" />
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input {...register("location")} className={inputClass} placeholder="Austin, Texas" />
            {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select {...register("status")} className={inputClass}>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Completion Date</label>
            <input type="date" {...register("completionDate")} className={inputClass} />
          </div>
          <div className="flex items-center gap-2 pt-7">
            <input type="checkbox" id="featured" {...register("featured")} className="h-4 w-4" />
            <label htmlFor="featured" className="text-sm font-medium text-foreground/80">
              Feature this project on the homepage
            </label>
          </div>
          <div>
            <label className={labelClass}>Client Name</label>
            <input {...register("clientName")} className={inputClass} placeholder="Sarah Mitchell" />
          </div>
          <div>
            <label className={labelClass}>Client Company</label>
            <input {...register("clientCompany")} className={inputClass} placeholder="Meridian Development Group" />
          </div>
        </div>

        <div className="mt-5">
          <label className={labelClass}>Short Description</label>
          <textarea {...register("description")} rows={3} className={inputClass} />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
        </div>
      </div>

      <div className="rounded-2xl border border-black/5 bg-surface p-6 shadow-sm dark:border-white/10">
        <h2 className="mb-5 font-display text-lg font-bold text-foreground">Project Story</h2>
        <div className="space-y-5">
          <div>
            <label className={labelClass}>The Story</label>
            <textarea {...register("story")} rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Challenges</label>
            <textarea {...register("challenges")} rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Solutions</label>
            <textarea {...register("solutions")} rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Results</label>
            <textarea {...register("results")} rows={3} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-black/5 bg-surface p-6 shadow-sm dark:border-white/10">
        <h2 className="mb-5 font-display text-lg font-bold text-foreground">Media</h2>
        <div className="space-y-6">
          <Controller
            control={control}
            name="coverImage"
            render={({ field }) => (
              <ImageUploader
                label="Cover Image"
                value={field.value ? [field.value] : []}
                onChange={(urls) => field.onChange(urls[0] ?? "")}
              />
            )}
          />
          {errors.coverImage && <p className="text-xs text-red-500">{errors.coverImage.message}</p>}

          <Controller
            control={control}
            name="images"
            render={({ field }) => (
              <ImageUploader
                label="Project Gallery Images"
                value={field.value ?? []}
                onChange={field.onChange}
                multiple
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
          {submitting ? "Saving..." : initialData ? "Update Project" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-foreground/70 dark:border-white/15"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
