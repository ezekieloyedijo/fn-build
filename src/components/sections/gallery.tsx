"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GalleryImage } from "@prisma/client";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function Gallery({ images }: { images: GalleryImage[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(images.map((i) => i.category)))], [images]);
  const [category, setCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = images.filter((img) => category === "All" || img.category === category);

  if (images.length === 0) return null;

  function openAt(index: number) {
    setActiveIndex(index);
  }
  function close() {
    setActiveIndex(null);
  }
  function next() {
    setActiveIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }
  function prev() {
    setActiveIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Gallery"
          title="A Visual Journey Through Our Work"
          description="Explore construction sites, finished builds, and architectural details from projects across our portfolio."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                category === c
                  ? "border-primary-500 bg-primary-500 text-white"
                  : "border-black/10 text-foreground/70 hover:border-primary-400 dark:border-white/15"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {filtered.map((image, i) => (
            <Reveal key={image.id} delay={(i % 6) * 0.05} className="break-inside-avoid">
              <button
                onClick={() => openAt(i)}
                className="group relative block w-full overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.url}
                  alt={image.caption || "Construction gallery image"}
                  width={600}
                  height={400 + (i % 3) * 80}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-steel-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {image.caption && <p className="p-4 text-sm font-medium text-white">{image.caption}</p>}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-steel-950/95 p-4 backdrop-blur"
            onClick={close}
          >
            <button
              aria-label="Close preview"
              onClick={close}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <FiX size={20} />
            </button>
            <button
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-8"
            >
              <FiChevronLeft size={22} />
            </button>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[activeIndex].url}
                alt={filtered[activeIndex].caption || "Construction gallery image"}
                width={1400}
                height={1000}
                className="max-h-[85vh] w-full rounded-xl object-contain"
              />
              {filtered[activeIndex].caption && (
                <p className="mt-3 text-center text-sm text-white/70">{filtered[activeIndex].caption}</p>
              )}
            </motion.div>
            <button
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-8"
            >
              <FiChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
