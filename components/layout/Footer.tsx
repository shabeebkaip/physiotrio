"use client";

import Link from "next/link";
import { MessageCircle, MapPin, Phone, Mail, ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { PhysioTrioLogo } from "@/components/common/PhysioTrioLogo";

interface FooterProps {
  locale: string;
  t: {
    tagline: string;
    parent: string;
    quickLinks: string;
    branchesTitle: string;
    contact: string;
    rights: string;
    privacy: string;
    terms: string;
    proudly: string;
  };
  nav: {
    home: string;
    services: string;
    branches: string;
    team: string;
    about: string;
    offers: string;
    blog: string;
    faq: string;
    contact: string;
  };
}

export function Footer({ locale, t, nav }: FooterProps) {
  const isRTL = locale === "ar";

  const quickLinks = [
    { href: "/",         label: nav.home },
    { href: "/about",    label: nav.about },
    { href: "/services", label: nav.services },
    { href: "/branches", label: nav.branches },
    { href: "/team",     label: nav.team },
    { href: "/offers",   label: nav.offers },
    { href: "/blog",     label: nav.blog },
    { href: "/faq",      label: nav.faq },
  ];

  const branches = [
    {
      city: { en: "Riyadh", ar: "الرياض" },
      address: { en: "Al Olaya District, King Fahd Road", ar: "حي العليا، طريق الملك فهد" },
      phone: "+966-11-XXX-XXXX",
      active: true,
    },
    {
      city: { en: "Makkah", ar: "مكة المكرمة" },
      address: { en: "Al Zaher District, Ibrahim Al Khalil Rd", ar: "حي الزاهر، طريق إبراهيم الخليل" },
      phone: "+966-12-XXX-XXXX",
      active: true,
    },
    {
      city: { en: "Dammam", ar: "الدمام" },
      address: null,
      phone: null,
      active: false,
    },
  ];

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden"
    >
      {/* ── Pre-Footer Contact Strip ── */}
      <div className="relative py-12 px-6 lg:px-12" style={{ background: "#E9F0EE" }}>
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Work Hours */}
          <div className={`flex items-center gap-5 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
             <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(15,45,31,0.06)" }}>
               <Clock size={24} style={{ color: "#0f2d1f" }} />
             </div>
             <div>
                <h4 className="text-base font-black leading-none mb-1.5" style={{ color: "#0f2d1f" }}>
                  {isRTL ? "ساعات العمل" : "Working Hours"}
                </h4>
                <p className="text-sm font-bold opacity-60" style={{ color: "#0f2d1f" }}>
                  {isRTL ? "السبت - الخميس: 9ص - 9م" : "Sat - Thu: 9AM - 9PM"}
                </p>
             </div>
          </div>

          {/* Emergency */}
          <div className={`flex items-center gap-5 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
             <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(15,45,31,0.06)" }}>
               <Phone size={24} style={{ color: "#0f2d1f" }} />
             </div>
             <div>
                <h4 className="text-base font-black leading-none mb-1.5" style={{ color: "#0f2d1f" }}>
                  {isRTL ? "للطوارئ" : "Emergency Contact"}
                </h4>
               <p className="text-sm font-black" style={{ color: "#0f2d1f" }}>+966 920 000 000</p>
             </div>
          </div>

          {/* CTA */}
          <div className={`flex ${isRTL ? "justify-start" : "justify-end"}`}>
             <Link 
               href={`/${locale}/book/riyadh`}
               className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm text-white transition-all hover:scale-[1.03] shadow-lg"
               style={{ background: "#0f2d1f" }}
             >
               {isRTL ? "احجز موعدك" : "Book Appointment"}
               <ArrowRight size={18} className={isRTL ? "-scale-x-100" : ""} />
             </Link>
          </div>
        </div>
      </div>

      <div className="relative py-20" style={{ background: "#0f2d1f" }}>
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Purple glow blob */}
      <div
        className="absolute top-0 pointer-events-none"
        style={{
          [isRTL ? "left" : "right"]: "0",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(136,7,114,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Main Grid — 4 Columns */}

      {/* ── Main Grid ── */}
      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Col 1 — Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-5 opacity-90">
            <PhysioTrioLogo height={44} />
          </div>
          <p
            className="text-xs font-black uppercase tracking-[0.2em] mb-4"
            style={{ color: "#4caf50" }}
          >
            {isRTL ? "كل ما تحتاج في مركز واحد" : "Everything in one place"}
          </p>
          <p
            className="font-medium leading-relaxed mb-8 max-w-xs text-sm"
            style={{ color: "rgba(255,255,255,0.50)" }}
          >
            {t.tagline}
          </p>

          {/* Contact pills */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@physiotrio.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-250"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#fff"; el.style.borderColor = "rgba(76,175,80,0.40)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "rgba(255,255,255,0.55)"; el.style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              <Mail size={13} />
              hello@physiotrio.com
            </a>
            <a
              href="tel:920000000"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-250"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#fff"; el.style.borderColor = "rgba(136,7,114,0.50)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "rgba(255,255,255,0.55)"; el.style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              <Phone size={13} />
              920 000 000
            </a>
          </div>
        </div>

        {/* Col 2 Ã¢â‚¬â€ Quick Links */}
        <div>
          <h3
            className="font-black text-xs mb-6 tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {t.quickLinks}
          </h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${locale}${link.href}`}
                  className="group flex items-center gap-2 text-sm font-medium transition-all duration-200"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"; }}
                >
                  <span
                    className="w-0 group-hover:w-3 h-px transition-all duration-300"
                    style={{ background: "#4caf50" }}
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 Ã¢â‚¬â€ Branches */}
        <div>
          <h3
            className="font-black text-xs mb-6 tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {t.branchesTitle}
          </h3>
          <div className="space-y-6">
            {branches.map((b) => (
              <div key={b.city.en}>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${b.active ? "bg-green-400 animate-pulse" : "bg-white/20"}`}
                  />
                  <p className="font-black text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {isRTL ? b.city.ar : b.city.en}
                  </p>
                  {!b.active && (
                    <span
                      className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider"
                      style={{ background: "rgba(136,7,114,0.30)", color: "#c97ec0" }}
                    >
                      {isRTL ? "قريباً" : "Soon"}
                    </span>
                  )}
                </div>
                {b.address && (
                  <div className="flex items-start gap-2 ml-4">
                    <MapPin size={11} className="mt-0.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} />
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>
                      {isRTL ? b.address.ar : b.address.en}
                    </p>
                  </div>
                )}
                {b.phone && (
                  <div className="flex items-center gap-2 ml-4 mt-1">
                    <Phone size={11} style={{ color: "#4caf50" }} className="flex-shrink-0" />
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{b.phone}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Col 4 Ã¢â‚¬â€ Contact */}
        <div>
          <h3
            className="font-black text-xs mb-6 tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {t.contact}
          </h3>

          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
            {isRTL ? "الرقم المجاني" : "Toll-Free"}
          </p>
          <a
            href="tel:920000000"
            className="text-4xl font-black mb-8 block transition-colors duration-200"
            style={{ color: "#fff" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#c97ec0"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
          >
            920 000 000
          </a>

          <a
            href="mailto:hello@physiotrio.com"
            className="flex items-center gap-3 mb-8 group transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.55)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"; }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 group-hover:border-green-400"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <Mail size={15} />
            </div>
            <span className="text-sm font-bold">hello@physiotrio.com</span>
          </a>

          <Link
            href={`/${locale}/book/riyadh`}
            className="group w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-sm transition-all duration-200"
            style={{
              color: "rgba(255,255,255,0.80)",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(136,7,114,0.25)";
              el.style.borderColor = "rgba(136,7,114,0.60)";
              el.style.color = "#fff";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(255,255,255,0.04)";
              el.style.borderColor = "rgba(255,255,255,0.12)";
              el.style.color = "rgba(255,255,255,0.80)";
            }}
          >
            {isRTL ? "احجز موعدك" : "Book Appointment"}
            <ArrowUpRight size={18} className="transition-transform group-hover:rotate-12" style={{ color: "#c97ec0" }} />
          </Link>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>{t.rights}</p>
          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}/privacy-policy`}
              className="text-xs font-medium transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.35)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"; }}
            >
              {t.privacy}
            </Link>
            <span style={{ color: "rgba(255,255,255,0.20)" }}>•</span>
            <Link
              href={`/${locale}/terms`}
              className="text-xs font-medium transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.35)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"; }}
            >
              {t.terms}
            </Link>
          </div>
          <p className="text-xs font-black uppercase tracking-wider" style={{ color: "#4caf50" }}>{t.proudly}</p>
        </div>
      </div>
    </div>
    </footer>
  );
}
