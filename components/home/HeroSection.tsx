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
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
          poster="/center-images/DSC07546.jpg"
        >
        </video>
        <div
          className="absolute inset-0"
          style={{
            background: isAr
              ? "linear-gradient(to left, rgba(7,20,30,0.88) 0%, rgba(7,20,30,0.65) 55%, rgba(7,20,30,0.25) 100%)"
              : "linear-gradient(to right, rgba(7,20,30,0.88) 0%, rgba(7,20,30,0.65) 55%, rgba(7,20,30,0.25) 100%)",
          }}
        />
      </div>

      {/* Content — pinned to bottom-start */}
      <div className="relative z-10 flex-1 flex items-end">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-16 sm:pb-24">
          <div className="flex flex-col gap-6 max-w-xl">

            {/* Eyebrow */}
            <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp}>
              <span
                className="inline-flex items-center gap-3 text-xs font-semibold uppercase"
                style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.14em" }}
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
              custom={0.1}
              variants={fadeUp}
              className="font-bold text-white leading-tight"
              style={{ fontSize: "clamp(34px, 5.5vw, 72px)" }}
            >
              {t.headline1}
              <br />
              <span style={{ color: "var(--color-brand-green)" }}>{t.headline2}</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial="hidden"
              animate="show"
              custom={0.18}
              variants={fadeUp}
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)", maxWidth: "420px" }}
            >
              {t.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="show"
              custom={0.26}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href={`/${locale}/book/riyadh`}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--color-brand-purple)" }}
              >
                {t.bookAppointment}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold text-sm text-white transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.3)" }}
              >
                {t.exploreServices}
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial="hidden"
              animate="show"
              custom={0.34}
              variants={fadeUp}
              className="flex flex-wrap gap-5 pt-2"
            >
              {[t.trust1, t.trust2, t.trust3].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-xs font-medium"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0"
                    style={{ background: "var(--color-brand-green)", fontSize: "9px" }}
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
