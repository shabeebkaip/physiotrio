"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Globe, ArrowRight, ChevronDown, Phone,
  Activity, Dumbbell, Brain, Heart,
  Droplets, Zap, Radio, Hand,
  ArrowUpRight,
} from "lucide-react";
import { PhysioTrioLogo } from "@/components/common/PhysioTrioLogo";

// ─── Mega menu data ───────────────────────────────────────────────────────────

const serviceCategories = [
  {
    title: { en: "Therapies", ar: "العلاجات" },
    accent: "var(--color-brand-purple)",
    bg: "rgba(var(--color-brand-purple-rgb),0.06)",
    services: [
      { en: "Physical Therapy", ar: "العلاج الطبيعي", slug: "physiotherapy", desc: { en: "Pain relief & full recovery", ar: "تخفيف الألم والتعافي الكامل" }, Icon: Activity },
      { en: "Speech Therapy", ar: "العلاج التخاطبي", slug: "speech-therapy", desc: { en: "Communication & swallowing care", ar: "رعاية التواصل والبلع" }, Icon: Radio },
      { en: "Occupational Therapy", ar: "العلاج الوظيفي", slug: "occupational-therapy", desc: { en: "Restore daily life independence", ar: "استعادة الاستقلالية في الحياة اليومية" }, Icon: Hand },
      { en: "Lymphatic Drainage Therapy (LDT)", ar: "العلاج التصريف الليمفاوي", slug: "lymphatic-drainage", desc: { en: "Reduce swelling & improve flow", ar: "تقليل التورم وتحسين الدورة" }, Icon: Droplets },
    ],
  },
  {
    title: { en: "Rehabilitation & Wellness", ar: "التأهيل والعافية" },
    accent: "var(--color-brand-green)",
    bg: "rgba(var(--color-brand-green-rgb),0.06)",
    services: [
      { en: "Rehabilitation", ar: "التأهيل", slug: "neurological-rehabilitation", desc: { en: "Full recovery programs", ar: "برامج التعافي الشامل" }, Icon: Brain },
      { en: "Fitness & Wellness", ar: "اللياقة والعافية", slug: "fitness-wellness", desc: { en: "Strength, mobility & wellbeing", ar: "القوة والحركة والعافية" }, Icon: Dumbbell },
      { en: "Home Physical Therapy", ar: "العلاج الطبيعي المنزلي", slug: "home-physiotherapy", desc: { en: "Professional care at your home", ar: "رعاية احترافية في منزلك" }, Icon: Heart },
    ],
  },
  {
    title: { en: "Advanced Technology", ar: "الأجهزة المتقدمة" },
    accent: "var(--color-brand-purple-light)",
    bg: "rgba(10,143,160,0.06)",
    services: [
      { en: "Advanced Technology & Sports Recovery", ar: "الأجهزة المتقدمة والاستشفاء الرياضي", slug: "device-based-therapy", desc: { en: "Cutting-edge devices & sports rehab", ar: "أجهزة متطورة وإعادة التأهيل الرياضي" }, Icon: Zap },
    ],
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavbarProps {
  locale: string;
  translations: {
    home: string;
    services: string;
    about: string;
    packages: string;
    news: string;
    contact: string;
    bookNow: string;
    homeCare: string;
  };
}

const plainLinks = [
  { href: "/about", key: "about" },
  { href: "/packages", key: "packages" },
  { href: "/news", key: "news" },
  { href: "/home-care", key: "homeCare" },
  { href: "/contact", key: "contact" },
];

// ─── Mega Menu ────────────────────────────────────────────────────────────────

function ServicesMegaMenu({ locale, onClose, onMouseEnter, onMouseLeave }: { locale: string; onClose: () => void; onMouseEnter: () => void; onMouseLeave: () => void }) {
  const isAr = locale === "ar";

  const flatServices = [
    { en: "Physical Therapy", ar: "العلاج الطبيعي", slug: "physiotherapy", Icon: Activity, accent: "var(--color-brand-purple)", bg: "rgba(136,7,114,0.07)", cat: isAr ? "العلاجات" : "Therapies" },
    { en: "Speech Therapy", ar: "العلاج التخاطبي", slug: "speech-therapy", Icon: Radio, accent: "var(--color-brand-purple)", bg: "rgba(136,7,114,0.07)", cat: isAr ? "العلاجات" : "Therapies" },
    { en: "Occupational Therapy", ar: "العلاج الوظيفي", slug: "occupational-therapy", Icon: Hand, accent: "var(--color-brand-purple)", bg: "rgba(136,7,114,0.07)", cat: isAr ? "العلاجات" : "Therapies" },
    { en: "Lymphatic Drainage (LDT)", ar: "التصريف الليمفاوي", slug: "lymphatic-drainage", Icon: Droplets, accent: "var(--color-brand-purple)", bg: "rgba(136,7,114,0.07)", cat: isAr ? "العلاجات" : "Therapies" },
    { en: "Rehabilitation", ar: "التأهيل", slug: "neurological-rehabilitation", Icon: Brain, accent: "var(--color-brand-green)", bg: "rgba(var(--color-brand-green-rgb),0.07)", cat: isAr ? "التأهيل والعافية" : "Rehab & Wellness" },
    { en: "Fitness & Wellness", ar: "اللياقة والعافية", slug: "fitness-wellness", Icon: Dumbbell, accent: "var(--color-brand-green)", bg: "rgba(var(--color-brand-green-rgb),0.07)", cat: isAr ? "التأهيل والعافية" : "Rehab & Wellness" },
    { en: "Home Physical Therapy", ar: "العلاج الطبيعي المنزلي", slug: "home-physiotherapy", Icon: Heart, accent: "var(--color-brand-green)", bg: "rgba(var(--color-brand-green-rgb),0.07)", cat: isAr ? "التأهيل والعافية" : "Rehab & Wellness" },
    { en: "Advanced Technology", ar: "الأجهزة المتقدمة", slug: "device-based-therapy", Icon: Zap, accent: "#0A8FA0", bg: "rgba(10,143,160,0.07)", cat: isAr ? "التكنولوجيا المتقدمة" : "Advanced Technology" },
  ];

  const grouped = flatServices.reduce<Record<string, typeof flatServices>>((acc, svc) => {
    (acc[svc.cat] = acc[svc.cat] || []).push(svc);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.99 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-full left-0 pointer-events-auto pt-3"
      style={{ zIndex: 60, width: "min(800px, calc(100vw - 32px))" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          background: "#fff",
          boxShadow: "0 20px 60px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.05)",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div className="flex">

          {/* ── Left dark intro panel ── */}
          <div
            className="flex flex-col justify-between p-6 shrink-0"
            style={{ width: 192, background: "var(--color-dark-surface)" }}
          >
            <div>
              <div
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                style={{ background: "rgba(var(--color-brand-green-rgb),0.2)", color: "var(--color-brand-green)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {isAr ? "خدماتنا" : "Our Services"}
              </div>
              <h3 className="text-white font-black text-lg leading-snug mb-2.5">
                {isAr ? "علاج متقدم\nلكل حالة" : "Advanced\nCare For\nEvery Need"}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {isAr
                  ? "من العلاج الطبيعي إلى أحدث التقنيات."
                  : "From physiotherapy to cutting-edge rehabilitation."}
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <Link
                href={`/${locale}/services`}
                onClick={onClose}
                className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                {isAr ? "جميع الخدمات" : "View All Services"}
                <ArrowUpRight size={13} />
              </Link>
              <Link
                href={`/${locale}/book/riyadh`}
                onClick={onClose}
                className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-green))" }}
              >
                {isAr ? "احجز جلسة" : "Book a Session"}
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* ── Right: grouped services ── */}
          <div className="flex-1 p-5 overflow-hidden">
            <div className="space-y-4">
              {Object.entries(grouped).map(([cat, svcs]) => (
                <div key={cat}>
                  {/* Category label */}
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5 px-1" style={{ color: "#9CA3AF" }}>
                    {cat}
                  </p>
                  {/* Services in 2-col grid */}
                  <div className="grid grid-cols-2 gap-0.5">
                    {svcs.map((svc) => (
                      <Link
                        key={svc.en}
                        href={`/${locale}/services/${svc.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all"
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = svc.bg;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: svc.bg }}
                        >
                          <svc.Icon size={13} style={{ color: svc.accent }} strokeWidth={1.8} />
                        </div>
                        <span className="text-sm font-medium leading-tight" style={{ color: "#1a1a2e" }}>
                          {isAr ? svc.ar : svc.en}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA strip */}
            <div
              className="mt-4 flex items-center justify-between px-4 py-2.5 rounded-xl"
              style={{ background: "rgba(136,7,114,0.05)", border: "1px solid rgba(136,7,114,0.10)" }}
            >
              <div>
                <p className="text-xs font-bold" style={{ color: "var(--color-brand-purple)" }}>
                  {isAr ? "استشارة مجانية" : "Free First Consultation"}
                </p>
                <p className="text-[11px]" style={{ color: "#6B7280" }}>
                  {isAr ? "احجز تقييمك الأول مجاناً" : "Book your first assessment at no cost"}
                </p>
              </div>
              <Link
                href={`/${locale}/book/riyadh`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white shrink-0"
                style={{ background: "var(--color-brand-purple)" }}
              >
                {isAr ? "ابدأ الآن" : "Get Started"}
                <ArrowRight size={11} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar({ locale, translations }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherLocale = locale === "en" ? "ar" : "en";

  const getLocalePath = (targetLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  };

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const closeServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const isServicesActive = pathname.startsWith(`/${locale}/services`);

  return (
    <>
      {/* ── Two floating pills ────────────────────────────────────────── */}
      <div className="fixed top-4 left-0 right-0 z-50 px-5 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex items-center gap-4">

          {/* ── Pill 1: Logo + Navigation ── */}
          <motion.nav
            className="pointer-events-auto flex items-center py-2 px-3 rounded-[32px] relative flex-1 min-w-0"
            style={{
              background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.90)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.10)" : "0 2px 16px rgba(0,0,0,0.06)",
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo */}
            <Link href={`/${locale}`} className="shrink-0 pl-2 pr-5">
              <PhysioTrioLogo variant="color" height={53} />
            </Link>

            {/* Logo / nav divider */}
            <span className="w-px h-7 bg-gray-200 shrink-0 mr-5" />

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center justify-between flex-1 pr-2">
              {/* Home */}
              <Link
                href={`/${locale}`}
                className="px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
                style={{
                  color: pathname === `/${locale}` ? "var(--color-brand-purple)" : "#374151",
                  background: pathname === `/${locale}` ? "rgba(136,7,114,0.09)" : "transparent",
                  border: pathname === `/${locale}` ? "1px solid rgba(136,7,114,0.18)" : "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== `/${locale}`) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(136,7,114,0.06)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-brand-purple)";
                    (e.currentTarget as HTMLElement).style.border = "1px solid rgba(136,7,114,0.12)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== `/${locale}`) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#374151";
                    (e.currentTarget as HTMLElement).style.border = "1px solid transparent";
                  }
                }}
              >
                {translations.home}
              </Link>

              {/* Services — mega menu trigger */}
              <div className="relative" onMouseEnter={openServices} onMouseLeave={closeServices}>
                <button
                  className="flex items-center gap-1 px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
                  style={{
                    color: isServicesActive || servicesOpen ? "var(--color-brand-purple)" : "#374151",
                    background: isServicesActive || servicesOpen ? "rgba(136,7,114,0.09)" : "transparent",
                    border: isServicesActive || servicesOpen ? "1px solid rgba(136,7,114,0.18)" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isServicesActive && !servicesOpen) {
                      (e.currentTarget as HTMLElement).style.background = "rgba(136,7,114,0.06)";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-brand-purple)";
                      (e.currentTarget as HTMLElement).style.border = "1px solid rgba(136,7,114,0.12)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isServicesActive && !servicesOpen) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "#374151";
                      (e.currentTarget as HTMLElement).style.border = "1px solid transparent";
                    }
                  }}
                >
                  {translations.services}
                  <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} strokeWidth={2} />
                  </motion.span>
                </button>
              </div>

              {/* Plain links */}
              {plainLinks.map((link) => {
                const href = `/${locale}${link.href}`;
                const isActive = pathname === href || pathname.startsWith(href);
                return (
                  <Link
                    key={link.key}
                    href={href}
                    className="px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
                    style={{
                      color: isActive ? "var(--color-brand-purple)" : "#374151",
                      background: isActive ? "rgba(136,7,114,0.09)" : "transparent",
                      border: isActive ? "1px solid rgba(136,7,114,0.18)" : "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "rgba(136,7,114,0.06)";
                        (e.currentTarget as HTMLElement).style.color = "var(--color-brand-purple)";
                        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(136,7,114,0.12)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "#374151";
                        (e.currentTarget as HTMLElement).style.border = "1px solid transparent";
                      }
                    }}
                  >
                    {translations[link.key as keyof typeof translations]}
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors ml-auto"
              style={{ color: "var(--color-brand-purple)" }}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Mega menu */}
            <AnimatePresence>
              {servicesOpen && (
                <ServicesMegaMenu
                  locale={locale}
                  onClose={() => setServicesOpen(false)}
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                />
              )}
            </AnimatePresence>
          </motion.nav>

          {/* ── Pill 2: Contacts + Actions ── */}
          <motion.div
            className="pointer-events-auto hidden lg:flex items-center gap-3 py-2 px-4 rounded-[32px] shrink-0 self-stretch"
            style={{
              background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.90)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.10)" : "0 2px 16px rgba(0,0,0,0.06)",
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Toll-free */}
            <a
              href="tel:8001000246"
              className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
              style={{ color: "var(--color-brand-green)" }}
            >
              <Phone size={13} />
              800 100 0246
            </a>

            <span className="w-px h-4 bg-gray-200" />

            {/* Language */}
            <Link
              href={getLocalePath(otherLocale)}
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-all hover:bg-gray-50"
              style={{ color: "var(--color-brand-purple)", border: "1px solid rgba(var(--color-brand-purple-rgb),0.25)" }}
            >
              <Globe size={13} />
              {otherLocale === "ar" ? "عربي" : "EN"}
            </Link>

            {/* Book Now */}
            <Link
              href={`/${locale}/book/riyadh`}
              className="inline-flex items-center gap-2 pl-5 pr-1.5 py-1.5 rounded-full font-semibold text-sm text-white transition-all group hover:shadow-lg"
              style={{ background: "var(--color-brand-purple)" }}
            >
              {translations.bookNow}
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5"
                style={{ background: "var(--color-brand-green)" }}
              >
                <ArrowRight size={14} className="text-white" />
              </span>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col overflow-y-auto"
            style={{ background: "var(--color-hero-bg)" }}
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-end p-6">
              <button className="p-2 text-white" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={28} />
              </button>
            </div>

            <div className="px-8 mb-8">
              <PhysioTrioLogo variant="white" height={48} />
            </div>

            <nav className="flex flex-col px-8 gap-1 flex-1">
              <Link href={`/${locale}`} className="text-2xl font-bold text-white py-2 hover:text-green-400 transition-colors" onClick={() => setMenuOpen(false)}>
                {translations.home}
              </Link>

              {/* Services with sub-items */}
              <div>
                <p className="text-2xl font-bold text-white py-2">{translations.services}</p>
                <div className="pl-4 mb-2 space-y-1">
                  {serviceCategories.map((cat) =>
                    cat.services.map((svc) => (
                      <Link
                        key={svc.en}
                        href={`/${locale}/services/${svc.slug}`}
                        className="flex items-center gap-2 py-1.5 text-sm font-medium transition-colors"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        {locale === "ar" ? svc.ar : svc.en}
                      </Link>
                    ))
                  )}
                </div>
              </div>

              {plainLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/${locale}${link.href}`}
                    className="block text-2xl font-bold text-white py-2 hover:text-green-400 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {translations[link.key as keyof typeof translations]}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-8 pb-12 flex flex-col gap-4 mt-8">
              <Link
                href={`/${locale}/book/riyadh`}
                className="w-full py-4 rounded-full text-center font-bold text-white text-lg"
                style={{ background: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-green))" }}
                onClick={() => setMenuOpen(false)}
              >
                {translations.bookNow}
              </Link>
              <Link
                href={getLocalePath(otherLocale)}
                className="w-full py-3 rounded-full text-center font-semibold text-white text-sm border border-white/30"
                onClick={() => setMenuOpen(false)}
              >
                {otherLocale === "ar" ? "عربي" : "English"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
