"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";
import { Testimonial } from "@prisma/client";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  function go(dir: 1 | -1) {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  }

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-steel-950 py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-primary-600/20 blur-[100px]" />
      <div className="section-container relative">
        <SectionHeading
          eyebrow="Client Voices"
          title="What Our Clients Say About Us"
          description="Real feedback from the homeowners, developers, and businesses who trusted us with their vision."
          light
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <FaQuoteLeft className="mx-auto mb-6 text-primary-500" size={36} />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="font-display text-xl leading-relaxed text-white/90 sm:text-2xl">
                &ldquo;{current.message}&rdquo;
              </p>

              <div className="mt-6 flex items-center justify-center gap-1 text-primary-400">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                {current.image && (
                  <Image
                    src={current.image}
                    alt={current.clientName}
                    width={52}
                    height={52}
                    className="h-[52px] w-[52px] rounded-full border-2 border-primary-500 object-cover"
                  />
                )}
                <div className="text-left">
                  <p className="font-semibold">{current.clientName}</p>
                  {current.company && <p className="text-sm text-white/50">{current.company}</p>}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:bg-white/10"
              >
                <FiChevronLeft />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-7 bg-primary-400" : "w-1.5 bg-white/25"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:bg-white/10"
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
