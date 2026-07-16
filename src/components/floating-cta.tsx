"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPhone, FiPlus, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

export function FloatingCta() {
  const [open, setOpen] = useState(false);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15551234567";
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+15551234567";

  const actions = [
    {
      label: "WhatsApp Us",
      href: `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi FNBUILD, I'd like to discuss a project.")}`,
      icon: FaWhatsapp,
      className: "bg-[#25D366] hover:bg-[#1ea952]",
    },
    {
      label: "Call Now",
      href: `tel:${phone.replace(/[^+\d]/g, "")}`,
      icon: FiPhone,
      className: "bg-steel-700 hover:bg-steel-800",
    },
    {
      label: "Request Quote",
      href: "#contact",
      icon: HiOutlineDocumentText,
      className: "bg-gradient-to-br from-primary-500 to-primary-700 hover:brightness-110",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open &&
          actions.map((action, i) => (
            <motion.a
              key={action.label}
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: i * 0.06 }}
              className={`flex items-center gap-3 rounded-full ${action.className} pl-4 pr-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors`}
            >
              <action.icon size={18} />
              {action.label}
            </motion.a>
          ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.9 }}
        aria-label="Quick actions"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow"
      >
        <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ duration: 0.25 }}>
          {open ? <FiX size={22} /> : <FiPlus size={22} />}
        </motion.span>
      </motion.button>
    </div>
  );
}
