import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, description, align = "center", light }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-500">
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-white/70" : "text-muted")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
