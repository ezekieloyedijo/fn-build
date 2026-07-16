import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";
import { GiBrickWall, GiCargoCrane } from "react-icons/gi";
import { FaHardHat } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";

const STATS = [
  { icon: <FaHardHat size={30} />, value: "10+", label: "Years of Experience" },
  { icon: <HiOutlineOfficeBuilding size={30} />, value: "200+", label: "Projects Delivered Nationwide" },
  { icon: <GiCargoCrane size={30} />, value: "150+", label: "Happy Clients" },
  { icon: <GiBrickWall size={30} />, value: "40+", label: "Expert Engineers" },
];

const POINTS = [
  "CAC-registered, licensed, and fully insured on every project",
  "In-house architectural, engineering, and construction teams",
  "Transparent budgeting and quotations in Naira, with real-time project tracking",
  "Quality materials and modern building techniques suited to Nigerian conditions",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="section-container grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-glass">
            <Image
              src="https://images.unsplash.com/photo-1594538756542-8c88bda491c5?q=80&w=1600&auto=format&fit=crop"
              alt="Modern building development in Lagos, Nigeria"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </div>
          <div className="glass absolute -bottom-8 -right-6 hidden w-56 rounded-2xl p-5 shadow-glass sm:block">
            <p className="font-display text-3xl font-bold text-primary-500">10+</p>
            <p className="text-sm text-muted">Years building across Nigeria</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="About FNBUILD"
            title="Engineering Ambitious Visions Into Lasting Nigerian Landmarks"
            description="Since our founding, FNBUILD & Construction has grown from a regional contractor into a full-service construction and design company trusted by homeowners, property developers, corporate organisations, and government agencies across Nigeria — from Lagos and Abuja to Port Harcourt and beyond."
          />

          <Reveal delay={0.1} className="mt-6 space-y-3">
            {POINTS.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <FiCheckCircle className="mt-0.5 shrink-0 text-primary-500" size={20} />
                <span className="text-sm text-foreground/80 sm:text-base">{point}</span>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-8 rounded-2xl border border-primary-500/20 bg-primary-500/5 p-6">
            <p className="font-display text-lg font-semibold text-foreground">Our Mission</p>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              To deliver construction and design excellence that exceeds expectations for Nigerian
              families and businesses — on time, on budget, and built to last generations.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="section-container mt-20 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
