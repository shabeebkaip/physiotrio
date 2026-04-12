"use client";

import Link from "next/link";
import { Globe, Share2, MessageCircle, Heart } from "lucide-react";
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

  return (
    <footer style={{ background: "var(--color-dark-surface)" }} className="text-white">
      {/* Top border */}
      <div style={{ height: "1px", background: "rgba(var(--color-brand-purple-rgb),0.3)" }} />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1 - Brand */}
          <div>
            <PhysioTrioLogo variant="white" height={50} className="mb-4" />
            <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t.parent}
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              {t.tagline}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Heart, label: "Instagram" },
                { icon: Globe, label: "Twitter/X" },
                { icon: Share2, label: "LinkedIn" },
                { icon: MessageCircle, label: "WhatsApp" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--color-brand-green)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 - Quick Links */}
          <div>
            <h3 className="font-bold text-sm mb-5 tracking-wider uppercase" style={{ color: "var(--color-brand-green)" }}>
              {t.quickLinks}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm transition-colors hover:text-brand-green"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brand-green)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Branches */}
          <div>
            <h3 className="font-bold text-sm mb-5 tracking-wider uppercase" style={{ color: "var(--color-brand-green)" }}>
              {t.branchesTitle}
            </h3>
            <div className="space-y-5">
              <div>
                <p className="font-semibold text-white text-sm mb-1">{locale === "ar" ? "الرياض" : "Riyadh"}</p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {locale === "ar" ? "حي العليا، طريق الملك فهد" : "Al Olaya District, King Fahd Road"}
                </p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>+966-11-XXX-XXXX</p>
              </div>
              <div>
                <p className="font-semibold text-white text-sm mb-1">{locale === "ar" ? "مكة المكرمة" : "Makkah"}</p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {locale === "ar" ? "حي الزاهر، طريق إبراهيم الخليل" : "Al Zaher District, Ibrahim Al Khalil Rd"}
                </p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>+966-12-XXX-XXXX</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-white text-sm">{locale === "ar" ? "الدمام" : "Dammam"}</p>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "var(--color-brand-green)", color: "white" }}>
                  {locale === "ar" ? "قريباً" : "Coming Soon"}
                </span>
              </div>
            </div>
          </div>

          {/* Col 4 - Contact */}
          <div>
            <h3 className="font-bold text-sm mb-5 tracking-wider uppercase" style={{ color: "var(--color-brand-green)" }}>
              {t.contact}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {locale === "ar" ? "الخط المجاني" : "Toll-Free"}
                </p>
                <p className="text-xl font-bold text-white">920 000 000</p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Email</p>
                <a href="mailto:hello@physiotrio.com" className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  hello@physiotrio.com
                </a>
              </div>
              <a
                href="https://wa.me/966500000001"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "#25D366", color: "white" }}
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <Link
                href={`/${locale}/book/riyadh`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "var(--color-brand-purple)", color: "white" }}
              >
                {locale === "ar" ? "احجز الآن" : "Book Online"}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}
        >
          <p>{t.rights}</p>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/privacy-policy`} className="hover:text-white transition-colors">{t.privacy}</Link>
            <span>·</span>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{t.terms}</Link>
          </div>
          <p style={{ color: "var(--color-brand-green)" }}>{t.proudly}</p>
        </div>
      </div>
    </footer>
  );
}
