"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiArrowDown, FiHardDrive } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GiCargoCrane } from "react-icons/gi";
import { FaHardHat } from "react-icons/fa";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?q=80&w=2400&auto=format&fit=crop",
    alt: "Lagos city skyline with modern buildings",
  },
  {
    image: "https://images.unsplash.com/photo-1729843823577-40db41a5e8c9?q=80&w=2400&auto=format&fit=crop",
    alt: "Construction worker in safety vest and hard hat on site",
  },
  {
    image: "https://images.unsplash.com/photo-1593717191400-84f38ee95485?q=80&w=2400&auto=format&fit=crop",
    alt: "Modern city buildings lit up at night",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden bg-steel-950">
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[index].image}
              alt={SLIDES[index].alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-steel-950/70 via-steel-950/60 to-steel-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-950/80 via-transparent to-steel-950/40" />
      </motion.div>

      {/* Floating construction elements */}
      <motion.div
        className="absolute right-[8%] top-[18%] hidden text-primary-400/30 lg:block"
        animate={{ y: [0, -20, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <GiCargoCrane size={120} />
      </motion.div>
      <motion.div
        className="absolute left-[6%] bottom-[22%] hidden text-primary-400/25 md:block"
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <FaHardHat size={70} />
      </motion.div>
      <motion.div
        className="absolute right-[18%] bottom-[14%] hidden text-white/10 sm:block"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <HiOutlineOfficeBuilding size={90} />
      </motion.div>

      <div className="section-container relative z-10 pt-28">
        <div className="glass max-w-3xl rounded-3xl p-8 shadow-glass sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-300"
          >
            <FiHardDrive /> Nigeria&apos;s Trusted Construction &amp; Engineering Partner
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Building The{" "}
            <span className="text-gradient-animated">Future</span> With Excellence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            FNBUILD &amp; Construction delivers world-class homes, estates, commercial complexes, and
            civil works across Lagos, Abuja, Port Harcourt, and beyond — combining sound engineering,
            architectural excellence, and uncompromising craftsmanship on every project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-7 py-4 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
            >
              Start Your Project
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              View Our Projects
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-primary-400" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-white/60"
          aria-label="Scroll to about section"
        >
          <FiArrowDown size={20} />
        </motion.a>
      </div>
    </section>
  );
}
