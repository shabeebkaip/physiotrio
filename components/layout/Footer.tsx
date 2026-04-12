"use client";

import Link from "next/link";
import { MessageCircle, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
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
    <footer style={{ background: "#ffffff", borderTop: "1px solid #e5eef0" }}>
      {/* Teal accent top bar */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, var(--color-brand-purple), var(--color-brand-green))" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <PhysioTrioLogo height={48} className="mb-5" />
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-brand-purple)" }}>
              {t.parent}
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B7280" }}>
              {t.tagline}
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/966500000001"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ background: "rgba(37,211,102,0.1)", color: "#16a34a", border: "1px solid rgba(37,211,102,0.3)" }}
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
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
                    <div className="flex items-start gap-1.5">
                      <MapPin size={11} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-brand-purple)" }} />
                      <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                        {isRTL ? b.address.ar : b.address.en}
                      </p>
                    </div>
                  )}
                  {b.phone && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <Phone size={11} style={{ color: "var(--color-brand-green)" }} />
                      <p className="text-xs" style={{ color: "#6B7280" }}>{b.phone}</p>
                    </div>
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
                <p className="text-2xl font-black" style={{ color: "var(--color-brand-purple)" }}>
                  920 000 000
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: "var(--color-brand-green)" }} />
                <a
                  href="mailto:hello@physiotrio.com"
                  className="text-sm transition-colors"
                  style={{ color: "#4B5563" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brand-purple)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
                >
                  hello@physiotrio.com
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
