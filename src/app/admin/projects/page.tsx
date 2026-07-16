import Link from "next/link";
import Image from "next/image";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">Manage your project portfolio.</p>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
        >
          <FiPlus /> New Project
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-black/5 bg-surface shadow-sm dark:border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-black/5 text-xs uppercase tracking-wide text-muted dark:border-white/10">
              <th className="p-4">Project</th>
              <th className="p-4">Category</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
              <th className="p-4">Updated</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-black/5 last:border-0 dark:border-white/5">
                <td className="flex items-center gap-3 p-4">
                  <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
                  </div>
                  <span className="font-medium text-foreground">{project.title}</span>
                </td>
                <td className="p-4 text-muted">{project.category}</td>
                <td className="p-4 text-muted">{project.location}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      project.status === "COMPLETED"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-primary-500/10 text-primary-600"
                    }`}
                  >
                    {project.status === "COMPLETED" ? "Completed" : "Ongoing"}
                  </span>
                </td>
                <td className="p-4 text-muted">{formatDate(project.updatedAt)}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-primary-500 hover:bg-primary-500/10"
                    >
                      <FiEdit2 size={15} />
                    </Link>
                    <DeleteButton
                      endpoint={`/api/admin/projects/${project.id}`}
                      confirmText={`Delete "${project.title}"? This cannot be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-muted">
                  No projects yet. Create your first project to showcase your work.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
