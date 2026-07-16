"use client";

import { ReactNode, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  delay?: number;
}

export function StatCard({ icon, value, label, delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-10, 10]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="card-3d glass relative overflow-hidden rounded-2xl p-6 sm:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, background: "radial-gradient(circle at center, rgba(217,119,6,0.18), transparent 70%)" }}
      />
      <div className="mb-4 text-primary-400" style={{ transform: "translateZ(30px)" }}>
        {icon}
      </div>
      <div
        className="font-display text-3xl font-bold text-foreground sm:text-4xl"
        style={{ transform: "translateZ(30px)" }}
      >
        {value}
      </div>
      <p className="mt-1 text-sm text-muted" style={{ transform: "translateZ(20px)" }}>
        {label}
      </p>
    </motion.div>
  );
}
