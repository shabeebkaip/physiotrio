"use client";

import Link from "next/link";
import { MessageCircle, MapPin, Phone, Mail, ArrowRight, ArrowUpRight } from "lucide-react";
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
    { href: "/", label: nav.home },
    { href: "/about", label: nav.about },
    { href: "/services", label: nav.services },
    { href: "/branches", label: nav.branches },
    { href: "/team", label: nav.team },
    { href: "/offers", label: nav.offers },
    { href: "/blog", label: nav.blog },
    { href: "/faq", label: nav.faq },
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
    <footer className="relative overflow-hidden bg-white rounded-tl-[60px] rounded-tr-[60px] border-t-0 shadow-[0_-8px_40px_-10px_rgba(0,0,0,0.08)]">

      {/* ── Top CTA Band ── */}
      <div className="relative border-b border-gray-100">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-start">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B162C] leading-tight mb-3">
              {isRTL ? "هل أنت مستعد لبدء رحلة تعافيك؟" : "Ready to start your recovery journey?"}
            </h2>
            <p className="text-gray-500 font-medium text-lg">
              {isRTL ? "فريقنا من المتخصصين في انتظارك" : "Our specialist team is here for you."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/book/riyadh`}
              className="inline-flex items-center gap-3 pl-7 pr-3 py-3.5 rounded-full font-black text-white bg-[#0B162C] transition-all hover:-translate-y-1 hover:shadow-2xl group"
            >
              {isRTL ? "احجز موعدك الآن" : "Book Appointment"}
              <span className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center">
                <ArrowRight size={18} className="text-white" />
              </span>
            </Link>
            <a
              href="https://wa.me/966500000001"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold border border-gray-200 text-[#0B162C] hover:bg-gray-50 transition-all"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Col 1 — Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-5">
            <PhysioTrioLogo height={48} />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-brand-purple">
            {t.parent}
          </p>
          <p className="text-gray-500 font-medium leading-relaxed mb-8 max-w-xs">
            {t.tagline}
          </p>

          {/* Social / Contact pill row */}
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:hello@physiotrio.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border border-gray-200 text-gray-500 hover:border-brand-green hover:text-brand-green transition-all"
            >
              <Mail size={13} />
              hello@physiotrio.com
            </a>
            <a
              href="tel:920000000"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border border-gray-200 text-gray-500 hover:border-brand-purple hover:text-brand-purple transition-all"
            >
              <Phone size={13} />
              920 000 000
            </a>
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h3 className="font-black text-xs mb-6 tracking-[0.2em] uppercase text-gray-400">
            {t.quickLinks}
          </h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${locale}${link.href}`}
                  className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#0B162C] transition-all"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-brand-green transition-all duration-300" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Branches */}
        <div>
          <h3 className="font-black text-xs mb-6 tracking-[0.2em] uppercase text-gray-400">
            {t.branchesTitle}
          </h3>
          <div className="space-y-6">
            {branches.map((b) => (
              <div key={b.city.en} className="group">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${b.active ? "bg-brand-green animate-pulse" : "bg-white/20"}`} />
                  <p className="font-black text-sm text-[#0B162C]">
                    {isRTL ? b.city.ar : b.city.en}
                  </p>
                  {!b.active && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-purple/20 text-brand-purple tracking-wider">
                      {isRTL ? "قريباً" : "Soon"}
                    </span>
                  )}
                </div>
                {b.address && (
                  <div className="flex items-start gap-2 ml-4">
                    <MapPin size={12} className="mt-0.5 flex-shrink-0 text-gray-500" />
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {isRTL ? b.address.ar : b.address.en}
                    </p>
                  </div>
                )}
                {b.phone && (
                  <div className="flex items-center gap-2 ml-4 mt-1">
                    <Phone size={12} className="text-brand-green flex-shrink-0" />
                    <p className="text-xs text-gray-500">{b.phone}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Col 4 — Contact */}
        <div>
          <h3 className="font-black text-xs mb-6 tracking-[0.2em] uppercase text-gray-400">
            {t.contact}
          </h3>

          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            {isRTL ? "الخط المجاني" : "Toll-Free"}
          </p>
          <a
            href="tel:920000000"
            className="text-4xl font-black text-[#0B162C] mb-8 block hover:text-brand-purple transition-colors"
          >
            920 000 000
          </a>

          <a
            href="mailto:hello@physiotrio.com"
            className="flex items-center gap-3 mb-8 text-gray-500 hover:text-[#0B162C] transition-colors group"
          >
            <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-brand-green group-hover:bg-brand-green/10 transition-all">
              <Mail size={15} />
            </div>
            <span className="text-sm font-bold">hello@physiotrio.com</span>
          </a>

          <Link
            href={`/${locale}/book/riyadh`}
            className="group w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-sm text-[#0B162C] border border-gray-200 hover:border-brand-purple hover:bg-brand-purple/5 transition-all"
          >
            {isRTL ? "احجز موعدك" : "Book Appointment"}
            <ArrowUpRight size={18} className="transition-transform group-hover:rotate-12 text-brand-purple" />
          </Link>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-gray-100">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-gray-400">{t.rights}</p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacy-policy`} className="text-xs font-medium text-gray-400 hover:text-[#0B162C] transition-colors">
              {t.privacy}
            </Link>
            <span className="text-gray-200">•</span>
            <Link href={`/${locale}/terms`} className="text-xs font-medium text-gray-400 hover:text-[#0B162C] transition-colors">
              {t.terms}
            </Link>
          </div>
          <p className="text-xs font-black text-brand-green tracking-wider uppercase">{t.proudly}</p>
        </div>
      </div>
    </footer>
  );
}
