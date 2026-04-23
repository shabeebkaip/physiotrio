"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight, Clock } from "lucide-react";

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

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
    about: string;
    packages: string;
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
    { href: "/packages", label: nav.packages },
    { href: "/blog", label: nav.blog },
    { href: "/faq", label: nav.faq },
    { href: "/contact", label: nav.contact },
  ];

  const branches = [
    {
      city: { en: "Riyadh", ar: "الرياض" },
      address: { en: "Al Olaya District, King Fahd Road", ar: "حي العليا، طريق الملك فهد" },
      active: true,
    },
    {
      city: { en: "Makkah", ar: "مكة المكرمة" },
      address: { en: "Al Zaher District, Ibrahim Al Khalil Rd", ar: "حي الزاهر، طريق إبراهيم الخليل" },
      active: true,
    },
    {
      city: { en: "Dammam", ar: "الدمام" },
      address: null,
      active: false,
    },
  ];

  const socialLinks = [
    { icon: InstagramIcon, href: "https://www.instagram.com/physiotrio/" },
    { icon: TwitterIcon, href: "https://x.com/Physiotrio" },
    { icon: FacebookIcon, href: "https://www.facebook.com/physiotrio.ksa" },
    { icon: LinkedinIcon, href: "https://www.linkedin.com/company/physiotrio" },
  ];

  return (
    <footer dir={isRTL ? "rtl" : "ltr"} className="bg-white">

      {/* ── Pre-footer info strip ── */}
      <div className="border-t border-gray-100 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

            {/* Working hours */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Clock size={16} className="text-brand-green" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                  {isRTL ? "ساعات العمل" : "Working Hours"}
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  {isRTL ? "السبت – الخميس: 9ص – 9م" : "Sat – Thu: 9AM – 9PM"}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-10 bg-gray-200" />

            {/* Contact number */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Phone size={16} className="text-brand-purple" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                  {isRTL ? "تواصل معنا" : "Call Us"}
                </p>
                <a href="tel:920000000" className="text-sm font-semibold text-gray-700 hover:text-brand-purple transition-colors">
                  920 000 000
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-10 bg-gray-200" />

            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Mail size={16} className="text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                  {isRTL ? "البريد الإلكتروني" : "Email"}
                </p>
                <a href="mailto:hello@physiotrio.com" className="text-sm font-semibold text-gray-700 hover:text-brand-purple transition-colors">
                  hello@physiotrio.com
                </a>
              </div>
            </div>

            {/* Book CTA */}
            <Link
              href={`/${locale}/book/riyadh`}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity shrink-0"
            >
              {isRTL ? "احجز موعداً" : "Book Appointment"}
              <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
            </Link>

          </div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="bg-[#111827] text-white">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* Brand */}
            <div>
              <PhysioTrioLogo height={44} />
              <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-xs">
                {t.tagline}
              </p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                {t.parent}
              </p>
              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all"
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-6">
                {t.quickLinks}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Branches */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-6">
                {t.branchesTitle}
              </h3>
              <div className="space-y-6">
                {branches.map((b) => (
                  <div key={b.city.en}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${b.active ? "bg-brand-green" : "bg-white/20"}`} />
                      <span className="text-sm font-semibold text-white/90">
                        {isRTL ? b.city.ar : b.city.en}
                      </span>
                      {!b.active && (
                        <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded bg-white/8 text-white/30">
                          {isRTL ? "قريباً" : "Soon"}
                        </span>
                      )}
                    </div>
                    {b.address && (
                      <div className={`flex items-start gap-1.5 ${isRTL ? "mr-3.5" : "ml-3.5"}`}>
                        <MapPin size={11} className="mt-0.5 text-white/25 shrink-0" />
                        <p className="text-xs text-white/50 leading-relaxed">
                          {isRTL ? b.address.ar : b.address.en}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-6">
                {t.contact}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">
                    {isRTL ? "الرقم المجاني" : "Toll-Free"}
                  </p>
                  <a href="tel:920000000" className="text-2xl font-bold text-white hover:text-brand-green transition-colors">
                    920 000 000
                  </a>
                </div>
                <a href="mailto:hello@physiotrio.com" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                  <Mail size={13} />
                  hello@physiotrio.com
                </a>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/50">{t.rights}</p>
            <div className="flex items-center gap-6">
              <Link href={`/${locale}/privacy-policy`} className="text-xs text-white/50 hover:text-white transition-colors">
                {t.privacy}
              </Link>
              <span className="w-px h-3 bg-white/20" />
              <Link href={`/${locale}/terms`} className="text-xs text-white/50 hover:text-white transition-colors">
                {t.terms}
              </Link>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">{t.proudly}</p>
          </div>
        </div>
      </div>

    </footer>
  );
}
