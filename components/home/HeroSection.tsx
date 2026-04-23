"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface HeroSectionProps {
  locale: string;
  t: {
    eyebrow: string;
    headline1: string;
    headline2: string;
    subheadline: string;
    bookAppointment: string;
    exploreServices: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function HeroSection({ locale, t }: HeroSectionProps) {
  const isAr = locale === "ar";

  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Video background ─────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
          poster="/center-images/DSC07546.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: isAr
              ? "linear-gradient(to left, rgba(7,20,30,0.92) 0%, rgba(7,20,30,0.75) 55%, rgba(7,20,30,0.35) 100%)"
              : "linear-gradient(to right, rgba(7,20,30,0.92) 0%, rgba(7,20,30,0.75) 55%, rgba(7,20,30,0.35) 100%)",
          }}
        />
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-end">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-16 sm:pb-24">
          <div className="flex flex-col gap-7 max-w-2xl" style={{ direction: isAr ? "rtl" : "ltr" }}>

            {/* Eyebrow */}
            <motion.div
              initial="hidden"
              animate="show"
              custom={0}
              variants={fadeUp}
            >
              <span
                className="inline-flex items-center gap-3 text-xs font-bold uppercase"
                style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em" }}
              >
                <span
                  className="inline-block h-px w-8 shrink-0"
                  style={{ background: "var(--color-brand-green)" }}
                />
                {t.eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial="hidden"
              animate="show"
              custom={0.08}
              variants={fadeUp}
              className="font-black leading-[0.92] tracking-tight text-white"
              style={{ fontSize: "clamp(36px, 7vw, 96px)" }}
            >
              {t.headline1}
              <br />
              <span style={{ color: "var(--color-brand-green)" }}>{t.headline2}</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial="hidden"
              animate="show"
              custom={0.16}
              variants={fadeUp}
              className="text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)", maxWidth: "480px" }}
            >
              {t.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="show"
              custom={0.24}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                href={`/${locale}/book/riyadh`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-bold text-white transition-all duration-200 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, var(--color-brand-purple) 0%, var(--color-brand-purple-light) 100%)",
                  boxShadow: "0 6px 24px rgba(var(--color-brand-purple-rgb),0.5)",
                }}
              >
                {t.bookAppointment}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="text-lg"
                >
                  →
                </motion.span>
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 hover:bg-white/10"
                style={{ border: "1.5px solid rgba(255,255,255,0.4)" }}
              >
                {t.exploreServices}
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial="hidden"
              animate="show"
              custom={0.32}
              variants={fadeUp}
              className="flex flex-wrap gap-5"
            >
              {[t.trust1, t.trust2, t.trust3].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                    style={{ background: "var(--color-brand-green)" }}
                  >
                    ✓
                  </span>
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
