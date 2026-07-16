"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import { Project, ProjectImage } from "@prisma/client";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn, formatDate, truncate } from "@/lib/utils";

type ProjectWithImages = Project & { images: ProjectImage[] };

export function ProjectsPortfolio({ projects }: { projects: ProjectWithImages[] }) {
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState<"All" | "COMPLETED" | "ONGOING">("All");

  const filtered = projects.filter((p) => {
    const categoryMatch = category === "All" || p.category === category;
    const statusMatch = status === "All" || p.status === status;
    return categoryMatch && statusMatch;
  });

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="relative bg-steel-50 py-24 dark:bg-steel-900/40 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Our Portfolio"
          title="Projects That Define Our Craft"
          description="A curated showcase of the residential, commercial, and civil projects we've brought to life across the country."
        />

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  category === c
                    ? "border-primary-500 bg-primary-500 text-white"
                    : "border-black/10 bg-transparent text-foreground/70 hover:border-primary-400 dark:border-white/15"
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(["All", "COMPLETED", "ONGOING"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                  status === s
                    ? "bg-steel-900 text-white dark:bg-white dark:text-steel-900"
                    : "bg-black/5 text-foreground/60 dark:bg-white/10"
                )}
              >
                {s === "All" ? "All Projects" : s === "COMPLETED" ? "Completed" : "Ongoing"}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block h-full overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:ring-white/10"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(min-width: 1024px) 33vw, 90vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-steel-950/85 via-steel-950/10 to-transparent" />
                    <span
                      className={cn(
                        "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white",
                        project.status === "COMPLETED" ? "bg-emerald-600/90" : "bg-primary-600/90"
                      )}
                    >
                      {project.status === "COMPLETED" ? "Completed" : "Ongoing"}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-primary-300">
                          {project.category}
                        </p>
                        <h3 className="mt-1 font-display text-xl font-bold">{project.title}</h3>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        <FiArrowUpRight />
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
                      <FiMapPin size={13} /> {project.location}
                      {project.completionDate && ` · ${formatDate(project.completionDate)}`}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                      {truncate(project.description, 110)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted">No projects match the selected filters yet.</p>
        )}
      </div>
    </section>
  );
}
