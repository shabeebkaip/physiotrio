"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

const slides = [
  {
    id: "riyadh",
    labelEn: "Riyadh",
    labelAr: "الرياض",
    addressEn: "Al Olaya District, King Fahd Road",
    addressAr: "حي العليا، طريق الملك فهد",
    image: "/center-images/DSC07546.jpg",
  },
  {
    id: "makkah",
    labelEn: "Makkah",
    labelAr: "مكة المكرمة",
    addressEn: "Al Zaher District, Ibrahim Al Khalil Road",
    addressAr: "حي الزاهر، طريق إبراهيم الخليل",
    image: "/center-images/DSC07303.jpg",
  },
];

const AUTOPLAY_INTERVAL = 5000;

export function HeroSection({ locale, t }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const isAr = locale === "ar";

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next, paused]);

  const slide = slides[current];

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      y: -16,
      transition: { duration: 0.4, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "100svh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background slides ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id + "-bg"}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src={slide.image}
            alt={isAr ? slide.labelAr : slide.labelEn}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 25%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: isAr
                ? "linear-gradient(to left, rgba(7,20,30,0.94) 0%, rgba(7,20,30,0.78) 55%, rgba(7,20,30,0.38) 100%)"
                : "linear-gradient(to right, rgba(7,20,30,0.94) 0%, rgba(7,20,30,0.78) 55%, rgba(7,20,30,0.38) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-36 pb-16">
          <div className="flex flex-col gap-7 max-w-2xl">

            {/* Eyebrow */}
            <motion.div
              key={slide.id + "-eyebrow"}
              initial="hidden" animate="show" exit="exit"
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
              key={slide.id + "-headline"}
              initial="hidden" animate="show" exit="exit"
              variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay: 0.08 } } }}
              className="font-black leading-[0.92] tracking-tight text-white"
              style={{ fontSize: "clamp(36px, 7vw, 96px)" }}
            >
              {t.headline1}
              <br />
              <span style={{ color: "var(--color-brand-green)" }}>{t.headline2}</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              key={slide.id + "-sub"}
              initial="hidden" animate="show" exit="exit"
              variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay: 0.16 } } }}
              className="text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)", maxWidth: "480px" }}
            >
              {t.subheadline}
            </motion.p>

            {/* Branch badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + "-branch"}
                initial={{ opacity: 0, x: isAr ? 16 : -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isAr ? -16 : 16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, var(--color-brand-purple) 0%, var(--color-brand-purple-light) 100%)",
                    boxShadow: "0 4px 16px rgba(var(--color-brand-purple-rgb),0.45)",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "var(--color-brand-green)" }}
                  />
                  {isAr ? slide.labelAr : slide.labelEn}
                </span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {isAr ? slide.addressAr : slide.addressEn}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              key={slide.id + "-cta"}
              initial="hidden" animate="show" exit="exit"
              variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay: 0.28 } } }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                href={`/${locale}/book/${slide.id}`}
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

          </div>
        </div>
      </div>

      {/* ── Slider controls ── */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-12 pb-10 max-w-7xl mx-auto w-full">

        {/* Dots + progress */}
        <div className="flex items-center gap-4">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className="flex flex-col gap-1.5 items-start group"
              aria-label={isAr ? s.labelAr : s.labelEn}
            >
              <span
                className="text-xs font-semibold transition-colors duration-200"
                style={{ color: i === current ? "white" : "rgba(255,255,255,0.35)" }}
              >
                {isAr ? s.labelAr : s.labelEn}
              </span>
              <span className="relative h-0.5 w-14 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
                {i === current && (
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: "var(--color-brand-green)" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
                    key={slide.id}
                  />
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Prev / Next arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
            aria-label="Previous"
          >
            {isAr ? "→" : "←"}
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
            aria-label="Next"
          >
            {isAr ? "←" : "→"}
          </button>
        </div>
      </div>
    </section>
  );
}
