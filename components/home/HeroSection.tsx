"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

const branches = [
  { id: "riyadh", labelEn: "Riyadh", labelAr: "الرياض" },
  { id: "makkah", labelEn: "Makkah", labelAr: "مكة" },
  { id: "dammam", labelEn: "Dammam", labelAr: "الدمام", comingSoon: true },
];

const STATS = [
  { number: "22+", labelEn: "Years Experience", labelAr: "سنة خبرة" },
  { number: "10K+", labelEn: "Patients Treated", labelAr: "مرضى تلقوا العلاج" },
  { number: "9", labelEn: "Specialties", labelAr: "تخصصات" },
  { number: "3", labelEn: "KSA Branches", labelAr: "فروع في المملكة" },
];

export function HeroSection({ locale, t }: HeroSectionProps) {
  const [activeBranch, setActiveBranch] = useState("riyadh");
  const isAr = locale === "ar";

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative flex flex-col" style={{ minHeight: "100svh" }}>

      {/* ── Background photo + dark overlay ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://static.zawya.com/view/acePublic/alias/contentid/cbec1451-ab27-4cfd-aa7d-851f20a53c55/0/erabianetwork-jpg.webp?f=3%3A2&q=0.75&w=1920"
          alt="PhysioTrio clinic"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 25%" }}
        />
        {/* Primary dark gradient — left heavy, lighter on right */}
        <div
          className="absolute inset-0"
          style={{
            background: isAr
              ? "linear-gradient(to left, rgba(7,20,30,0.94) 0%, rgba(7,20,30,0.78) 55%, rgba(7,20,30,0.42) 100%)"
              : "linear-gradient(to right, rgba(7,20,30,0.94) 0%, rgba(7,20,30,0.78) 55%, rgba(7,20,30,0.42) 100%)",
          }}
        />
        {/* Bottom fade for stats bar */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "200px",
            background: "linear-gradient(to top, rgba(7,20,30,0.9) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Main text content ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-36 pb-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-7 max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-3 text-xs font-bold uppercase"
                style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em" }}
              >
                <span
                  className="inline-block h-px w-8 flex-shrink-0"
                  style={{ background: "var(--color-brand-green)" }}
                />
                {t.eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
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
              variants={fadeUp}
              className="text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)", maxWidth: "480px" }}
            >
              {t.subheadline}
            </motion.p>

            {/* Branch selector */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5">
              {branches.map((branch) => {
                const isActive = activeBranch === branch.id;
                return (
                  <button
                    key={branch.id}
                    onClick={() => !branch.comingSoon && setActiveBranch(branch.id)}
                    disabled={branch.comingSoon}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, var(--color-brand-purple) 0%, var(--color-brand-purple-light) 100%)"
                        : "transparent",
                      color: "white",
                      border: isActive
                        ? "1.5px solid transparent"
                        : "1.5px solid rgba(255,255,255,0.35)",
                      boxShadow: isActive
                        ? "0 4px 16px rgba(var(--color-brand-purple-rgb),0.5)"
                        : "none",
                      opacity: branch.comingSoon ? 0.4 : 1,
                      cursor: branch.comingSoon ? "not-allowed" : "pointer",
                    }}
                  >
                    {isAr ? branch.labelAr : branch.labelEn}
                    {branch.comingSoon && (
                      <span className="ml-1.5 text-xs opacity-70">
                        {isAr ? "قريباً" : "Soon"}
                      </span>
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={`/${locale}/book/${activeBranch}`}
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
            <motion.div variants={fadeUp} className="flex flex-wrap gap-5">
              {[t.trust1, t.trust2, t.trust3].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                    style={{ background: "var(--color-brand-green)" }}
                  >
                    ✓
                  </span>
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats bar — pinned to hero bottom ── */}
      <motion.div
        className="relative z-10 w-full"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        <div
          style={{
            background: "rgba(7,20,30,0.75)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center text-center py-7 px-4"
                  style={{
                    borderRight:
                      i < STATS.length - 1
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "none",
                  }}
                >
                  <div
                    className="text-3xl lg:text-4xl font-black tabular-nums"
                    style={{ color: "#ffffff" }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-xs font-semibold mt-1.5 uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}
                  >
                    {isAr ? stat.labelAr : stat.labelEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
