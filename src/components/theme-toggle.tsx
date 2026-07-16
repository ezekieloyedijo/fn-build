"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={`h-9 w-9 ${className ?? ""}`} />;
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-current transition-colors hover:bg-primary-500/20 hover:text-primary-400 ${className ?? ""}`}
    >
      {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
    </button>
  );
}
