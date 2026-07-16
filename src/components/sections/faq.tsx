"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { Faq } from "@prisma/client";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="section-container mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Answers to the questions we hear most often from clients planning a new build or renovation."
        />

        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <Reveal key={faq.id} delay={i * 0.05}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors",
                    isOpen
                      ? "border-primary-500/40 bg-primary-500/5"
                      : "border-black/10 bg-surface dark:border-white/10"
                  )}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="font-display text-base font-semibold text-foreground sm:text-lg">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-primary-500"
                    >
                      <FiPlus />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      >
                        <p className="px-5 pb-6 text-sm leading-relaxed text-muted sm:px-6 sm:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
