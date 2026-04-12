"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, subtitle, dark = true, children }: PageHeroProps) {
  const blobA = useRef<HTMLDivElement>(null);
  const blobB = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (blobA.current) gsap.to(blobA.current, { scale: 1.25, duration: 5, yoyo: true, repeat: -1, ease: "sine.inOut" });
    if (blobB.current) gsap.to(blobB.current, { scale: 1.15, duration: 7, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.5 });
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pt-36 pb-28"
      style={{ background: dark ? "linear-gradient(135deg, var(--color-hero-bg) 0%, var(--color-dark-surface) 60%, var(--color-dark-surface) 100%)" : "linear-gradient(135deg, var(--color-brand-purple) 0%, var(--color-brand-green) 100%)" }}
    >
      {/* Animated blobs */}
      <div ref={blobA} className="absolute pointer-events-none" style={{ top: "10%", right: "15%", width: 500, height: 500, background: "radial-gradient(circle, rgba(var(--color-brand-purple-rgb),0.25) 0%, transparent 70%)", filter: "blur(60px)", borderRadius: "50%" }} />
      <div ref={blobB} className="absolute pointer-events-none" style={{ bottom: "5%", left: "10%", width: 350, height: 350, background: "radial-gradient(circle, rgba(var(--color-brand-green-rgb),0.18) 0%, transparent 70%)", filter: "blur(50px)", borderRadius: "50%" }} />

      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      <div className="relative container text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-center gap-2 mb-5">
            <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-green)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--color-brand-green)" }}>{eyebrow}</span>
          </div>
        </motion.div>

        <motion.h1
          className="font-black text-white mb-5 leading-tight"
          style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-xl font-light max-w-2xl mx-auto mb-8"
            style={{ color: "rgba(255,255,255,0.7)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
