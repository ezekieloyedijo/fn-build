"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ProjectImage } from "@prisma/client";

export function ProjectGallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  function next() {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }
  function prev() {
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map((image, i) => (
          <motion.button
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
            onClick={() => setActiveIndex(i)}
            className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2 sm:col-span-2" : ""}`}
          >
            <Image
              src={image.url}
              alt={image.caption || title}
              width={800}
              height={600}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-steel-950/0 transition-colors group-hover:bg-steel-950/20" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-steel-950/95 p-4 backdrop-blur"
            onClick={() => setActiveIndex(null)}
          >
            <button
              aria-label="Close"
              onClick={() => setActiveIndex(null)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <FiX size={20} />
            </button>
            <button
              aria-label="Previous"
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
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex].url}
                alt={images[activeIndex].caption || title}
                width={1400}
                height={1000}
                className="max-h-[85vh] w-full rounded-xl object-contain"
              />
            </motion.div>
            <button
              aria-label="Next"
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
    </>
  );
}
