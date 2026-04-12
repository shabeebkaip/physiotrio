"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ArrowRight } from "lucide-react";
import { PhysioTrioLogo } from "@/components/common/PhysioTrioLogo";

interface NavbarProps {
  locale: string;
  translations: {
    home: string;
    services: string;
    branches: string;
    team: string;
    about: string;
    offers: string;
    blog: string;
    contact: string;
    bookNow: string;
  };
}

const navLinks = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/branches", key: "branches" },
  { href: "/team", key: "team" },
  { href: "/about", key: "about" },
  { href: "/offers", key: "offers" },
  { href: "/contact", key: "contact" },
];

export function Navbar({ locale, translations }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <>
      {/* Floating pill wrapper */}
      <div className="fixed top-9 left-0 right-0 z-50 px-4 pointer-events-none">
        <motion.nav
          className="pointer-events-auto max-w-7xl mx-auto flex items-center justify-between h-16 px-5 rounded-2xl"
          style={{
            background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.88)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.8) inset"
              : "0 2px 12px rgba(0,0,0,0.04)",
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <Link href={`/${locale}`}>
            <PhysioTrioLogo variant="color" height={40} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const href = `/${locale}${link.href}`;
              const isActive = pathname === href || (link.href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={link.key}
                  href={href}
                  className="relative text-sm font-medium transition-colors group"
                  style={{ color: isActive ? "#077688" : "#374151" }}
                >
                  {translations[link.key as keyof typeof translations]}
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300"
                    style={{
                      background: "#077688",
                      width: isActive ? "100%" : "0%",
                    }}
                  />
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
                    style={{ background: "#077688", width: isActive ? "100%" : "0%" }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language toggle */}
            <Link
              href={getLocalePath(otherLocale)}
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-all hover:bg-gray-50"
              style={{ color: "#077688", border: "1px solid rgba(7,118,136,0.25)" }}
            >
              <Globe size={13} />
              {otherLocale === "ar" ? "عربي" : "EN"}
            </Link>

            {/* Book CTA — Pharma style pill with accent circle */}
            <Link
              href={`/${locale}/book/riyadh`}
              className="inline-flex items-center gap-2 pl-5 pr-1.5 py-1.5 rounded-full font-semibold text-sm text-white transition-all group hover:shadow-lg"
              style={{ background: "#077688" }}
            >
              {translations.bookNow}
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5"
                style={{ background: "#4caf50" }}
              >
                <ArrowRight size={14} className="text-white" />
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#077688" }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </motion.nav>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "#0d0820" }}
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                className="p-2 text-white"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            {/* Logo */}
            <div className="px-8 mb-8">
              <PhysioTrioLogo variant="white" height={48} />
            </div>

            {/* Links */}
            <nav className="flex flex-col px-8 gap-6 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-2xl font-bold text-white hover:text-brand-green transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {translations[link.key as keyof typeof translations]}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom actions */}
            <div className="px-8 pb-12 flex flex-col gap-4">
              <Link
                href={`/${locale}/book/riyadh`}
                className="w-full py-4 rounded-full text-center font-bold text-white text-lg"
                style={{ background: "linear-gradient(135deg, #077688, #4caf50)" }}
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
