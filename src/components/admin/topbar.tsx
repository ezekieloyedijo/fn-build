"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiGrid,
  FiBriefcase,
  FiTool,
  FiMessageSquare,
  FiImage,
  FiHelpCircle,
  FiMail,
  FiLogOut,
} from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: FiGrid, exact: true },
  { href: "/admin/projects", label: "Projects", icon: FiBriefcase },
  { href: "/admin/services", label: "Services", icon: FiTool },
  { href: "/admin/testimonials", label: "Testimonials", icon: FiMessageSquare },
  { href: "/admin/gallery", label: "Gallery", icon: FiImage },
  { href: "/admin/faqs", label: "FAQs", icon: FiHelpCircle },
  { href: "/admin/enquiries", label: "Enquiries", icon: FiMail },
];

function titleFromPath(pathname: string | null) {
  const match = LINKS.find((link) => (link.exact ? pathname === link.href : pathname?.startsWith(link.href)));
  return match?.label ?? "Dashboard";
}

export function AdminTopbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/5 bg-surface/80 px-5 py-4 backdrop-blur lg:px-8 dark:border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 lg:hidden dark:border-white/15"
          >
            <FiMenu />
          </button>
          <h1 className="font-display text-lg font-bold text-foreground sm:text-xl">
            {titleFromPath(pathname)}
          </h1>
        </div>
        <ThemeToggle />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-steel-950/60 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-64 flex-col bg-steel-950"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                <span className="font-display text-sm font-bold text-white">FNBUILD Admin</span>
                <button onClick={() => setOpen(false)} className="text-white/60">
                  <FiX />
                </button>
              </div>
              <nav className="flex-1 space-y-1 px-3 py-6">
                {LINKS.map((link) => {
                  const active = link.exact ? pathname === link.href : pathname?.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium",
                        active ? "bg-primary-500/15 text-primary-400" : "text-white/60"
                      )}
                    >
                      <link.icon size={17} />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="border-t border-white/10 px-3 py-4">
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/60 hover:text-red-400"
                >
                  <FiLogOut size={17} /> Sign Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
