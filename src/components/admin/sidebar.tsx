"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  FiGrid,
  FiBriefcase,
  FiTool,
  FiMessageSquare,
  FiImage,
  FiHelpCircle,
  FiMail,
  FiLogOut,
  FiExternalLink,
} from "react-icons/fi";
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

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-steel-950 lg:flex">
      <div className="flex items-center gap-2 border-b border-white/10 px-6 py-6">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-primary-700 text-sm font-bold text-white">
          FN
        </span>
        <div>
          <p className="font-display text-sm font-bold leading-none text-white">FNBUILD</p>
          <p className="text-[11px] text-white/40">Admin Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {LINKS.map((link) => {
          const active = link.exact ? pathname === link.href : pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-primary-500/15 text-primary-400" : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <link.icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white"
        >
          <FiExternalLink size={17} /> View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/60 hover:bg-red-500/10 hover:text-red-400"
        >
          <FiLogOut size={17} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
