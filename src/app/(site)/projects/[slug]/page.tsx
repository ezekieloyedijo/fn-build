import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiMapPin, FiUser, FiTag } from "react-icons/fi";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { ProjectGallery } from "@/components/project-gallery";
import { Reveal } from "@/components/ui/reveal";

interface PageProps {
  params: { slug: string };
}

async function getProject(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.coverImage }],
    },
  };
}

export const dynamic = "force-dynamic";

const STORY_SECTIONS = [
  { key: "story" as const, title: "The Story" },
  { key: "challenges" as const, title: "The Challenges" },
  { key: "solutions" as const, title: "Our Solutions" },
  { key: "results" as const, title: "The Results" },
];

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  return (
    <article>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-steel-950">
        <div className="absolute inset-0">
          <Image src={project.coverImage} alt={project.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/60 to-steel-950/30" />
        </div>

        <div className="section-container relative z-10 pb-16 pt-40 text-white">
          <Link
            href="/#projects"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-primary-300"
          >
            <FiArrowLeft /> Back to Projects
          </Link>

          <Reveal>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                project.status === "COMPLETED" ? "bg-emerald-600" : "bg-primary-600"
              }`}
            >
              {project.status === "COMPLETED" ? "Completed" : "Ongoing"}
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <FiMapPin className="text-primary-400" /> {project.location}
            </span>
            <span className="flex items-center gap-2">
              <FiTag className="text-primary-400" /> {project.category}
            </span>
            {project.completionDate && (
              <span className="flex items-center gap-2">
                <FiCalendar className="text-primary-400" /> {formatDate(project.completionDate)}
              </span>
            )}
            {project.clientName && (
              <span className="flex items-center gap-2">
                <FiUser className="text-primary-400" /> {project.clientName}
              </span>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section-container grid gap-16 py-20 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-foreground">Overview</h2>
            <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted">
              {project.description}
            </p>
          </Reveal>

          {STORY_SECTIONS.map(
            (section) =>
              project[section.key] && (
                <Reveal key={section.key}>
                  <h2 className="font-display text-2xl font-bold text-foreground">{section.title}</h2>
                  <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted">
                    {project[section.key]}
                  </p>
                </Reveal>
              )
          )}

          {project.images.length > 0 && (
            <Reveal>
              <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Project Gallery</h2>
              <ProjectGallery images={project.images} title={project.title} />
            </Reveal>
          )}
        </div>

        <Reveal className="lg:col-span-1">
          <div className="glass sticky top-28 rounded-2xl border border-black/5 p-6 shadow-glass dark:border-white/10">
            <h3 className="font-display text-lg font-bold text-foreground">Project Details</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between border-b border-black/5 pb-3 dark:border-white/10">
                <dt className="text-muted">Category</dt>
                <dd className="font-medium text-foreground">{project.category}</dd>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-3 dark:border-white/10">
                <dt className="text-muted">Location</dt>
                <dd className="font-medium text-foreground">{project.location}</dd>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-3 dark:border-white/10">
                <dt className="text-muted">Status</dt>
                <dd className="font-medium text-foreground">
                  {project.status === "COMPLETED" ? "Completed" : "Ongoing"}
                </dd>
              </div>
              {project.completionDate && (
                <div className="flex justify-between border-b border-black/5 pb-3 dark:border-white/10">
                  <dt className="text-muted">Completion</dt>
                  <dd className="font-medium text-foreground">{formatDate(project.completionDate)}</dd>
                </div>
              )}
              {project.clientCompany && (
                <div className="flex justify-between pb-1">
                  <dt className="text-muted">Client</dt>
                  <dd className="font-medium text-foreground">{project.clientCompany}</dd>
                </div>
              )}
            </dl>

            <a
              href="/#contact"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-5 py-3 text-sm font-semibold text-white shadow-glow"
            >
              Start a Similar Project
            </a>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
