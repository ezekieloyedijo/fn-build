import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { ProjectsPortfolio } from "@/components/sections/projects-portfolio";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export const revalidate = 0;

export default async function HomePage() {
  const [services, projects, gallery, testimonials, faqs] = await Promise.all([
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({
      include: { images: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    }),
    prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" }, take: 24 }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    prisma.faq.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <>
      <Hero />
      <About />
      <Services services={services} />
      <ProjectsPortfolio projects={projects} />
      <Gallery images={gallery} />
      <Testimonials testimonials={testimonials} />
      <FaqSection faqs={faqs} />
      <Contact />
    </>
  );
}
