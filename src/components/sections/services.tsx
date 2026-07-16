import Image from "next/image";
import { Service } from "@prisma/client";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { getServiceIcon } from "@/lib/icon-map";

export function Services({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="What We Do"
          title="Comprehensive Construction Services"
          description="From first sketch to final handover, our multidisciplinary teams deliver every phase of your project under one roof."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <Reveal key={service.id} delay={(i % 3) * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-black/5 bg-surface shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-white/10">
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(min-width: 1024px) 33vw, 90vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-steel-950/80 via-steel-950/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow">
                      <Icon size={22} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary-400 to-primary-700 transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
