"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 dark:bg-steel-950/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 shadow-sm py-3"
          : "bg-transparent py-6"
      )}
    >
      <nav className="section-container flex items-center justify-between">
        <Link href="#home" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <span
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-primary-700 text-white text-sm shadow-glow"
            )}
          >
            FN
          </span>
          <span className={cn(scrolled ? "text-foreground" : "text-white")}>
            FNBUILD <span className="text-primary-500">&amp;</span> Construction
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-500",
                scrolled ? "text-foreground/80" : "text-white/90"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle className={scrolled ? "" : "text-white border-white/30"} />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
          >
            Get a Quote <FiArrowRight />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
            scrolled ? "border-black/10 dark:border-white/15 text-foreground" : "border-white/30 text-white"
          )}
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white dark:bg-steel-950 border-t border-black/5 dark:border-white/10"
          >
            <div className="section-container py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-3 text-base font-medium border-b border-black/5 dark:border-white/5 text-foreground/90 hover:text-primary-500"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-5 py-3 text-sm font-semibold text-white"
              >
                Get a Quote <FiArrowRight />
              </a>
              <div className="mt-4 flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
