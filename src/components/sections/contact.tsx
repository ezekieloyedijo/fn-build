"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FiCheckCircle, FiMail, FiMapPin, FiPhone, FiSend, FiAlertCircle } from "react-icons/fi";
import { contactSchema, ContactInput } from "@/lib/validations";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const PROJECT_TYPES = [
  "Residential Construction",
  "Estate Development",
  "Commercial Construction",
  "Renovation",
  "Architectural Design",
  "Civil Engineering (Road/Drainage/Bridge)",
  "Religious/Institutional Building",
  "School Building",
  "Other",
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="section-container grid gap-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading
            align="left"
            eyebrow="Get In Touch"
            title="Let's Build Something Extraordinary Together"
            description="Tell us about your project and our team will follow up within 48 hours with a free, no-obligation quotation in Naira."
          />

          <Reveal delay={0.15} className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-primary-500">
                <FiMapPin />
              </span>
              <div>
                <p className="font-semibold text-foreground">Head Office</p>
                <p className="text-sm text-muted">1, Abe-Koko Shopping Complex, Abe-Koko Junction, Ogooluwa/Africa, Osogbo, Osun State</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-primary-500">
                <FiPhone />
              </span>
              <div>
                <p className="font-semibold text-foreground">Call Us</p>
                <p className="text-sm text-muted">{process.env.NEXT_PUBLIC_PHONE_NUMBER || "+234 803 897 5028"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-primary-500">
                <FiMail />
              </span>
              <div>
                <p className="font-semibold text-foreground">Email Us</p>
                <p className="text-sm text-muted">info@fnbuild.com.ng</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="glass rounded-3xl border border-black/5 p-6 shadow-glass dark:border-white/10 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">Full Name</label>
                <input
                  {...register("name")}
                  className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary-500 dark:border-white/15"
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">Email Address</label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary-500 dark:border-white/15"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">Phone Number</label>
                <input
                  {...register("phone")}
                  className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary-500 dark:border-white/15"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">Project Type</label>
                <select
                  {...register("projectType")}
                  className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary-500 dark:border-white/15"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a project type
                  </option>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type} className="text-steel-900">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">Message</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary-500 dark:border-white/15"
                  placeholder="Tell us about your project, budget, and timeline..."
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={status === "loading"}
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-4 text-sm font-semibold text-white shadow-glow transition-opacity disabled:opacity-60 sm:w-auto"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
              <FiSend />
            </motion.button>

            {status === "success" && (
              <p className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-500">
                <FiCheckCircle /> Thank you! Your message has been sent — we'll be in touch shortly.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 flex items-center gap-2 text-sm font-medium text-red-500">
                <FiAlertCircle /> Something went wrong. Please try again or call us directly.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
