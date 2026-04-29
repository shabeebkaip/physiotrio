"use client";

import Link from "next/link";
import { MessageCircle, MapPin, Mail, ArrowRight } from "lucide-react";

const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    news: string;
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
    { href: "/news", label: nav.news },
    { href: "/faq", label: nav.faq },
    { href: "/contact", label: nav.contact },
  ];

  const branches = [
    {
      city: { en: "Riyadh", ar: "الرياض" },
      address: { en: "Al Olaya District, King Fahd Road, Riyadh 12211", ar: "حي العليا، طريق الملك فهد، الرياض 12211" },
      mapUrl: "https://maps.google.com/?q=24.6877,46.7219",
      active: true,
    },
    {
      city: { en: "Makkah", ar: "مكة المكرمة" },
      address: { en: "Al Zaher District, Ibrahim Al Khalil Road, Makkah 24231", ar: "حي الزاهر، طريق إبراهيم الخليل، مكة المكرمة 24231" },
      mapUrl: "https://maps.google.com/?q=21.3891,39.8579",
      active: true,
    },
  ];

  return (
    <footer style={{ background: "#ffffff", borderTop: "1px solid #e5eef0" }}>
      {/* Teal accent top bar */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, var(--color-brand-purple), var(--color-brand-green))" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <PhysioTrioLogo height={200} className="mb-5" />
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-brand-purple)" }}>
              {t.parent}
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B7280" }}>
              {t.tagline}
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/9668001000246"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ background: "rgba(37,211,102,0.1)", color: "#16a34a", border: "1px solid rgba(37,211,102,0.3)" }}
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { href: "https://www.linkedin.com/company/physiotrio", Icon: LinkedinIcon, label: "LinkedIn" },
                { href: "https://x.com/Physiotrio", Icon: TwitterIcon, label: "X / Twitter" },
                { href: "https://www.facebook.com/physiotrio.ksa", Icon: FacebookIcon, label: "Facebook" },
                { href: "https://www.instagram.com/physiotrio/", Icon: InstagramIcon, label: "Instagram" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--color-brand-purple)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(var(--color-brand-purple-rgb),0.08)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-brand-purple)";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3
              className="font-bold text-xs mb-5 tracking-widest uppercase"
              style={{ color: "var(--color-brand-purple)" }}
            >
              {t.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="group flex items-center gap-1.5 text-sm transition-colors"
                    style={{ color: "#4B5563" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brand-purple)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1"
                      style={{ color: "var(--color-brand-purple)" }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Branches */}
          <div>
            <h3
              className="font-bold text-xs mb-5 tracking-widest uppercase"
              style={{ color: "var(--color-brand-purple)" }}
            >
              {t.branchesTitle}
            </h3>
            <div className="space-y-5">
              {branches.map((b) => (
                <div key={b.city.en}>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm" style={{ color: "#111827" }}>
                      {isRTL ? b.city.ar : b.city.en}
                    </p>
                    {!b.active && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
                      >
                        {isRTL ? "قريباً" : "Coming Soon"}
                      </span>
                    )}
                  </div>
                  {b.address && (
                    <a
                      href={b.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-1.5 group/map"
                    >
                      <MapPin size={11} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-brand-purple)" }} />
                      <p className="text-xs leading-relaxed group-hover/map:underline" style={{ color: "#6B7280" }}>
                        {isRTL ? b.address.ar : b.address.en}
                      </p>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3
              className="font-bold text-xs mb-5 tracking-widest uppercase"
              style={{ color: "var(--color-brand-purple)" }}
            >
              {t.contact}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "#9CA3AF" }}>
                  {isRTL ? "الخط المجاني" : "Toll-Free"}
                </p>
                <a href="tel:8001000246" className="text-2xl font-black transition-opacity hover:opacity-80" style={{ color: "var(--color-brand-purple)" }}>
                  800 100 0246
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: "var(--color-brand-green)" }} />
                <a
                  href="mailto:info@physiotrio.com"
                  className="text-sm transition-colors"
                  style={{ color: "#4B5563" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brand-purple)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
                >
                  info@physiotrio.com
                </a>
              </div>

              <Link
                href={`/${locale}/book/riyadh`}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white transition-all hover:scale-105 hover:opacity-90 mt-2"
                style={{ background: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-green))" }}
              >
                {isRTL ? "احجز موعدك" : "Book Appointment"}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid #E5E7EB", color: "#9CA3AF" }}
        >
          <p>{t.rights}</p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/privacy-policy`}
              className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brand-purple)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
            >
              {t.privacy}
            </Link>
            <span>·</span>
            <Link
              href={`/${locale}/terms`}
              className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brand-purple)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
            >
              {t.terms}
            </Link>
          </div>
          <p style={{ color: "var(--color-brand-green)" }}>{t.proudly}</p>
        </div>
      </div>
    </footer>
  );
}
