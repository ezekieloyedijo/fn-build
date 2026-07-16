"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiLock, FiMail, FiArrowLeft, FiAlertCircle } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-steel-950 px-4">
      <div className="pointer-events-none absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-primary-600/25 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-primary-500/15 blur-[110px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass relative w-full max-w-md rounded-3xl border border-white/10 p-8 shadow-glass sm:p-10"
      >
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
          <FiArrowLeft /> Back to website
        </Link>

        <div className="mb-8 flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-700 text-sm font-bold text-white">
            FN
          </span>
          <div>
            <p className="font-display text-lg font-bold text-white">Admin Portal</p>
            <p className="text-xs text-white/50">FNBUILD &amp; Construction</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/80">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors focus:border-primary-500"
                placeholder="admin@fnbuild.com"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/80">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors focus:border-primary-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="flex items-center gap-2 text-sm text-red-400">
              <FiAlertCircle /> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-primary-500 to-primary-700 py-3.5 text-sm font-semibold text-white shadow-glow transition-opacity disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
