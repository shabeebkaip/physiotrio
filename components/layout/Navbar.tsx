"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu, X, Globe, ArrowRight, ChevronDown, MapPin,
  Activity, Dumbbell, Brain, Baby, Users, Heart,
  Droplets, Zap, Radio, Gauge, Layers, Bot, Hand,
  ArrowUpRight, Stethoscope,
} from "lucide-react";
import { PhysioTrioLogo } from "@/components/common/PhysioTrioLogo";
import { useLocation, type Location } from "@/lib/context/LocationContext";

const serviceCategories = [
  {
    title: { en: "Core Therapies", ar: "العلاجات الأساسية" },
    accent: "var(--color-brand-purple)",
    bg: "rgba(var(--color-brand-purple-rgb),0.06)",
    services: [
      { en: "Physiotherapy", ar: "العلاج الطبيعي", slug: "physiotherapy", desc: { en: "Pain relief & full recovery", ar: "تخفيف الألم والتعافي" }, Icon: Activity },
      { en: "Sports Physiotherapy", ar: "علاج طبيعي رياضي", slug: "sports-physiotherapy", desc: { en: "Athlete recovery & performance", ar: "تعافي الرياضيين والأداء" }, Icon: Dumbbell },
      { en: "Manual Therapy", ar: "العلاج اليدوي", slug: "manual-therapy", desc: { en: "Hands-on joint & tissue care", ar: "رعاية المفاصل والأنسجة" }, Icon: Hand },
      { en: "Hydrotherapy", ar: "العلاج المائي", slug: "hydrotherapy", desc: { en: "Water-based rehabilitation", ar: "إعادة تأهيل مائية" }, Icon: Droplets },
    ],
  },
  {
    title: { en: "Specialist Programs", ar: "البرامج المتخصصة" },
    accent: "var(--color-brand-green)",
    bg: "rgba(var(--color-brand-green-rgb),0.06)",
    services: [
      { en: "Neurological Rehab", ar: "إعادة التأهيل العصبي", slug: "neurological-rehabilitation", desc: { en: "Stroke & brain injury recovery", ar: "التعافي من السكتة الدماغية" }, Icon: Brain },
      { en: "Pediatric Physiotherapy", ar: "علاج طبيعي للأطفال", slug: "pediatric-physiotherapy", desc: { en: "Children's developmental care", ar: "رعاية النمو للأطفال" }, Icon: Baby },
      { en: "Geriatric Physiotherapy", ar: "علاج لكبار السن", slug: "geriatric-physiotherapy", desc: { en: "Mobility & balance for seniors", ar: "الحركة والتوازن لكبار السن" }, Icon: Users },
      { en: "Women's Health Program", ar: "برنامج صحة المرأة", slug: "womens-health", desc: { en: "Pelvic floor & postnatal care", ar: "قاع الحوض وما بعد الولادة" }, Icon: Heart },
    ],
  },
  {
    title: { en: "Advanced Technology", ar: "التقنية المتقدمة" },
    accent: "var(--color-brand-purple-light)",
    bg: "rgba(10,143,160,0.06)",
    services: [
      { en: "CryoTherapy Chamber", ar: "غرفة العلاج بالتبريد", slug: "device-based-therapy", desc: { en: "Full-body cold therapy", ar: "علاج بالبرودة الكاملة" }, Icon: Zap },
      { en: "Shock Wave Therapy", ar: "علاج الموجات الصادمة", slug: "device-based-therapy", desc: { en: "Tendon & tissue healing", ar: "شفاء الأوتار والأنسجة" }, Icon: Radio },
      { en: "Lokomat Neuro-Rehab", ar: "لوكومات العصبي", slug: "device-based-therapy", desc: { en: "Robotic walking rehab", ar: "إعادة التأهيل بالمشي الروبوتي" }, Icon: Bot },
      { en: "IDD Therapy", ar: "علاج IDD", slug: "device-based-therapy", desc: { en: "Spinal decompression", ar: "تخفيف ضغط العمود الفقري" }, Icon: Layers },
      { en: "Antigravity Treadmill", ar: "جهاز المشي بلا جاذبية", slug: "device-based-therapy", desc: { en: "Zero-impact gait training", ar: "تدريب المشي بدون تأثير" }, Icon: Activity },
      { en: "VO2 MAX Testing", ar: "اختبار VO2 MAX", slug: "device-based-therapy", desc: { en: "Athletic performance analysis", ar: "تحليل الأداء الرياضي" }, Icon: Gauge },
      { en: "David Spinal Solution", ar: "حل داود للعمود الفقري", slug: "device-based-therapy", desc: { en: "Targeted spine rehabilitation", ar: "إعادة تأهيل العمود الفقري" }, Icon: Stethoscope },
    ],
  },
];

interface NavbarProps {
  locale: string;
  translations: {
    home: string;
    services: string;
    about: string;
    contact: string;
    bookNow: string;
    homeCare?: string;
    packages?: string;
    news?: string;
    branches?: string;
    team?: string;
    offers?: string;
    blog?: string;
  };
}

// ─── Location picker ─────────────────────────────────────────────────────────

const LOCATION_OPTIONS: { value: Location; en: string; ar: string }[] = [
  { value: "all",    en: "All Locations", ar: "كل المواقع" },
  { value: "riyadh", en: "Riyadh",        ar: "الرياض" },
  { value: "makkah", en: "Makkah",        ar: "مكة المكرمة" },
];

function LocationPicker({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const { location, setLocation } = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = LOCATION_OPTIONS.find(o => o.value === location)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
        style={{
          color: location === "all" ? "#374151" : "var(--color-brand-purple)",
          background: location === "all" ? "#F3F4F6" : "rgba(136,7,114,0.09)",
          border: location === "all" ? "1px solid #E5E7EB" : "1px solid rgba(136,7,114,0.22)",
        }}
      >
        <MapPin size={12} strokeWidth={2.5} />
        {isAr ? current.ar : current.en}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }}>
          <ChevronDown size={12} strokeWidth={2.5} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full mt-2 right-0 bg-white rounded-xl overflow-hidden"
            style={{
              minWidth: 160,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)",
              zIndex: 70,
            }}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            {LOCATION_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => { setLocation(opt.value); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                style={{
                  color: location === opt.value ? "var(--color-brand-purple)" : "#374151",
                  background: location === opt.value ? "rgba(136,7,114,0.06)" : undefined,
                  fontWeight: location === opt.value ? 700 : undefined,
                  textAlign: isAr ? "right" : "left",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: opt.value === "all" ? "#9CA3AF" : opt.value === "riyadh" ? "var(--color-brand-purple)" : "var(--color-brand-green)",
                    opacity: location === opt.value ? 1 : 0.35,
                  }}
                />
                {isAr ? opt.ar : opt.en}
                {location === opt.value && (
                  <span className="ml-auto text-xs" style={{ color: "var(--color-brand-purple)" }}>✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Order: Home (rendered separately), About, Services (dropdown), Packages, News, Home Care, Contact Us
const plainLinksBeforeServices = [
  { href: "/about", key: "about" },
];
const plainLinksAfterServices = [
  { href: "/packages", key: "packages" },
  { href: "/news", key: "news" },
  { href: "/home-care", key: "homeCare" },
  { href: "/contact", key: "contact" },
];

function ServicesMegaMenu({ locale, onClose, onMouseEnter, onMouseLeave }: {
  locale: string; onClose: () => void; onMouseEnter: () => void; onMouseLeave: () => void;
}) {
  const isAr = locale === "ar";
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 pointer-events-auto"
      style={{ zIndex: 60 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-full border-t border-gray-100" style={{ background: "#fff", boxShadow: "0 16px 48px rgba(0,0,0,0.10)" }}>
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12 py-8">
          <div className="grid grid-cols-[200px_1fr_200px] gap-8">

            {/* Left intro */}
            <div className="flex flex-col justify-between p-6 rounded-xl" style={{ background: "#0B162C" }}>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full mb-5"
                  style={{ background: "rgba(var(--color-brand-green-rgb),0.2)", color: "var(--color-brand-green)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {isAr ? "خدماتنا" : "Our Services"}
                </div>
                <h3 className="text-white font-black text-lg leading-snug mb-3">
                  {isAr ? "علاج متقدم لكل حالة" : "Advanced Care For Every Need"}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {isAr ? "من العلاج الطبيعي الأساسي إلى أحدث التقنيات الطبية." : "From core physiotherapy to cutting-edge rehabilitation technology."}
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <Link href={`/${locale}/services`} onClick={onClose}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                  {isAr ? "جميع الخدمات" : "View All Services"}<ArrowUpRight size={13} />
                </Link>
                <Link href={`/${locale}/book/riyadh`} onClick={onClose}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-bold text-white"
                  style={{ background: "var(--color-brand-purple)" }}>
                  {isAr ? "احجز جلسة" : "Book a Session"}<ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Service categories */}
            <div className="grid grid-cols-3 gap-6">
              {serviceCategories.map((cat) => (
                <div key={cat.title.en}>
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.accent }} />
                    <span className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: cat.accent }}>
                      {isAr ? cat.title.ar : cat.title.en}
                    </span>
                  </div>
                  <ul className="space-y-0.5">
                    {cat.services.map((svc) => (
                      <li key={svc.en}>
                        <Link href={`/${locale}/services/${svc.slug}`} onClick={onClose}
                          className="flex items-start gap-2.5 px-2 py-2 rounded-lg transition-all group"
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = cat.bg; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                          <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: cat.bg }}>
                            <svc.Icon size={12} style={{ color: cat.accent }} strokeWidth={1.75} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold leading-tight group-hover:text-[var(--color-brand-purple)] transition-colors" style={{ color: "#1a1a2e" }}>
                              {isAr ? svc.ar : svc.en}
                            </p>
                            <p className="text-xs mt-0.5 leading-snug text-gray-400">{isAr ? svc.desc.ar : svc.desc.en}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right panel */}
            <div className="flex flex-col border-l border-gray-100 pl-8">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 mb-3">
                {isAr ? "الأكثر طلباً" : "Most Requested"}
              </p>
              <div className="space-y-1.5 flex-1">
                {[
                  { en: "Senior Physiotherapist", ar: "معالج أول", slug: "physiotherapy" },
                  { en: "Physiotherapist Specialist", ar: "أخصائي علاج طبيعي", slug: "physiotherapy" },
                  { en: "Home Physiotherapy", ar: "علاج طبيعي منزلي", slug: "physiotherapy" },
                ].map((item) => (
                  <Link key={item.en} href={`/${locale}/services/${item.slug}`} onClick={onClose}
                    className="flex items-center gap-2 px-2 py-2 rounded-lg transition-all hover:bg-gray-50 group" style={{ color: "#374151" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--color-brand-purple)" }} />
                    <span className="group-hover:text-[var(--color-brand-purple)] transition-colors text-xs">{isAr ? item.ar : item.en}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4 p-3.5 rounded-xl" style={{ background: "rgba(var(--color-brand-purple-rgb),0.05)", border: "1px solid rgba(var(--color-brand-purple-rgb),0.1)" }}>
                <p className="text-xs font-bold mb-0.5" style={{ color: "var(--color-brand-purple)" }}>{isAr ? "استشارة مجانية" : "Free Consultation"}</p>
                <p className="text-xs text-gray-400 mb-2">{isAr ? "احجز تقييمك الأول مجاناً" : "Book your first assessment free"}</p>
                <Link href={`/${locale}/book/riyadh`} onClick={onClose} className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: "var(--color-brand-purple)" }}>
                  {isAr ? "ابدأ الآن" : "Get Started"} <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MobileLocationButton({ opt, locale }: { opt: typeof LOCATION_OPTIONS[number]; locale: string }) {
  const isAr = locale === "ar";
  const { location, setLocation } = useLocation();
  const active = location === opt.value;
  return (
    <button
      onClick={() => setLocation(opt.value)}
      className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
      style={{
        background: active ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
        color: active ? "white" : "rgba(255,255,255,0.5)",
        border: active ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
      }}
    >
      {isAr ? opt.ar : opt.en}
    </button>
  );
}

export function Navbar({ locale, translations }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      {/* Full-width bar — positioned below TollFreeStrip (36px tall) */}
      <div className="fixed left-0 right-0 w-full z-50" style={{ top: "36px" }}>
        <nav
          className="w-full relative"
          style={{
            background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)",
            backdropFilter: "blur(16px)",
            borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(0,0,0,0.05)",
            boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
            transition: "background 0.2s, box-shadow 0.2s, border-color 0.2s",
          }}
          onMouseLeave={closeServices}
        >
          <div className="max-w-[1300px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16">

            {/* Logo */}
            <Link href={`/${locale}`} className="flex-shrink-0">
              <PhysioTrioLogo variant="color" height={100} />
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {/* Home */}
              <Link href={`/${locale}`}
                className="relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-50"
                style={{ color: pathname === `/${locale}` || pathname === `/${locale}/` ? "var(--color-brand-purple)" : "#374151" }}>
                {translations.home}
                {(pathname === `/${locale}` || pathname === `/${locale}/`) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full" style={{ background: "var(--color-brand-purple)" }} />
                )}
              </Link>

              {plainLinksBeforeServices.map((link) => {
                const href = `/${locale}${link.href}`;
                const label = translations[link.key as keyof typeof translations];
                if (!label) return null;
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link key={link.key} href={href}
                    className="relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-50"
                    style={{ color: isActive ? "var(--color-brand-purple)" : "#374151" }}>
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full" style={{ background: "var(--color-brand-purple)" }} />
                    )}
                  </Link>
                );
              })}

              <div className="relative" onMouseEnter={openServices}>
                <button
                  className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-50"
                  style={{ color: isServicesActive || servicesOpen ? "var(--color-brand-purple)" : "#374151" }}
                >
                  {translations.services}
                  <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={13} strokeWidth={2} />
                  </motion.span>
                </button>
                {isServicesActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full" style={{ background: "var(--color-brand-purple)" }} />
                )}
              </div>

              {plainLinksAfterServices.map((link) => {
                const href = `/${locale}${link.href}`;
                const label = translations[link.key as keyof typeof translations];
                if (!label) return null;
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link key={link.key} href={href}
                    className="relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-50"
                    style={{ color: isActive ? "var(--color-brand-purple)" : "#374151" }}>
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full" style={{ background: "var(--color-brand-purple)" }} />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3">
              <LocationPicker locale={locale} />
              <div className="h-5 w-px bg-gray-200" />
              <Link href={getLocalePath(otherLocale)}
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-all hover:bg-gray-50"
                style={{ color: "#374151" }}>
                <Globe size={14} className="text-gray-400" />
                {otherLocale === "ar" ? "عربي" : "EN"}
              </Link>
              <div className="h-5 w-px bg-gray-200" />
              <Link href={`/${locale}/book/riyadh`}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-md font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: "var(--color-brand-purple)" }}>
                {translations.bookNow}
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mobile burger */}
            <button className="lg:hidden p-2 rounded-md transition-colors hover:bg-gray-50"
              style={{ color: "#374151" }} onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>

          {/* Mega menu */}
          <AnimatePresence>
            {servicesOpen && (
              <ServicesMegaMenu locale={locale} onClose={() => setServicesOpen(false)}
                onMouseEnter={openServices} onMouseLeave={closeServices} />
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-[100] flex flex-col overflow-y-auto"
            style={{ background: "#0B162C" }}
            initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <PhysioTrioLogo variant="white" height={40} />
              <button className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
              {/* Home */}
              <Link href={`/${locale}`}
                className="flex items-center h-12 text-base font-semibold text-white/80 hover:text-white transition-colors rounded-lg px-3 hover:bg-white/5"
                onClick={() => setMenuOpen(false)}>
                {translations.home}
              </Link>
              {/* About */}
              {plainLinksBeforeServices.map((link) => {
                const label = translations[link.key as keyof typeof translations];
                if (!label) return null;
                return (
                  <Link key={link.key} href={`/${locale}${link.href}`}
                    className="flex items-center h-12 text-base font-semibold text-white/80 hover:text-white transition-colors rounded-lg px-3 hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}>
                    {label}
                  </Link>
                );
              })}
              {/* Services */}
              <div>
                <p className="flex items-center h-12 text-base font-semibold text-white/80 px-3">{translations.services}</p>
                <div className="pl-6 mb-2 space-y-0.5">
                  {serviceCategories.map((cat) =>
                    cat.services.map((svc) => (
                      <Link key={svc.en} href={`/${locale}/services/${svc.slug}`}
                        className="flex items-center gap-2 h-9 text-sm font-medium transition-colors rounded-lg px-3 hover:bg-white/5"
                        style={{ color: "rgba(255,255,255,0.55)" }} onClick={() => setMenuOpen(false)}>
                        <span className="w-1 h-1 rounded-full bg-green-400 shrink-0" />
                        {locale === "ar" ? svc.ar : svc.en}
                      </Link>
                    ))
                  )}
                </div>
              </div>
              {/* Packages, News, Home Care, Contact Us */}
              {plainLinksAfterServices.map((link) => {
                const label = translations[link.key as keyof typeof translations];
                if (!label) return null;
                return (
                  <Link key={link.key} href={`/${locale}${link.href}`}
                    className="flex items-center h-12 text-base font-semibold text-white/80 hover:text-white transition-colors rounded-lg px-3 hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}>
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="px-6 pb-10 flex flex-col gap-3 border-t border-white/10 pt-6">
              <Link href={`/${locale}/book/riyadh`}
                className="w-full py-3.5 rounded-lg text-center font-bold text-white text-sm"
                style={{ background: "var(--color-brand-purple)" }} onClick={() => setMenuOpen(false)}>
                {translations.bookNow}
              </Link>
              {/* Location picker for mobile */}
              <div className="flex items-center justify-center gap-2">
                {LOCATION_OPTIONS.map(opt => (
                  <MobileLocationButton key={opt.value} opt={opt} locale={locale} />
                ))}
              </div>
              <Link href={getLocalePath(otherLocale)}
                className="w-full py-3 rounded-lg text-center font-medium text-white/60 text-sm border border-white/10 hover:border-white/20 transition-colors"
                onClick={() => setMenuOpen(false)}>
                {otherLocale === "ar" ? "عربي" : "English"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
