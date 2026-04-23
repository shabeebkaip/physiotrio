"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  ArrowUpRight, 
  Clock,
  Instagram,
  Twitter,
  Facebook,
  Linkedin
} from "lucide-react";
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

  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden font-display bg-white"
    >
      {/* ── Pre-Footer Service Cards ── */}
      <div className="relative py-16 px-6 lg:px-12 bg-gray-50/50">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Work Hours Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm flex items-center gap-6 ${isRTL ? "flex-row-reverse text-right" : ""}`}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-brand-green/5 text-brand-green">
                <Clock size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  {isRTL ? "ساعات العمل" : "Working Hours"}
                </h4>
                <p className="text-sm font-medium text-gray-500">
                  {isRTL ? "السبت - الخميس: 9ص - 9م" : "Sat - Thu: 9AM - 9PM"}
                </p>
              </div>
            </motion.div>

            {/* Emergency Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm flex items-center gap-6 ${isRTL ? "flex-row-reverse text-right" : ""}`}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-brand-purple/5 text-brand-purple">
                <Phone size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  {isRTL ? "للطوارئ" : "Emergency Contact"}
                </h4>
                <p className="text-lg font-black text-brand-purple">920 000 000</p>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center"
            >
              <Link 
                href={`/${locale}/book/riyadh`}
                className="group w-full h-full flex items-center justify-between p-8 rounded-[2rem] bg-brand-purple text-white shadow-xl shadow-brand-purple/20 transition-all hover:scale-[1.02] hover:shadow-2xl hover:bg-brand-purple-dark"
              >
                <div className={isRTL ? "text-right" : "text-left"}>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">
                    {isRTL ? "متوفر الآن" : "Available Now"}
                  </p>
                  <h4 className="text-xl font-black">
                    {isRTL ? "احجز موعدك" : "Book Appointment"}
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight size={24} className={isRTL ? "rotate-180" : ""} />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Main Footer Content ── */}
      <div className="relative pt-24 pb-12 bg-brand-purple text-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        
        <div className="relative max-w-[1300px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-12">
            
            {/* Col 1: Brand */}
            <div className="space-y-8">
              <PhysioTrioLogo height={48} />
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-green">
                  {isRTL ? "نحو حياة أفضل" : "Towards a better life"}
                </p>
                <p className="text-sm leading-relaxed text-white/80 max-w-xs font-medium">
                  {t.tagline}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-purple hover:border-white/20 transition-all text-white/40 hover:text-white"
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 mb-8">
                {t.quickLinks}
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="group flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-brand-green transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Branches */}
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 mb-8">
                {t.branchesTitle}
              </h3>
              <div className="space-y-8">
                {branches.map((b) => (
                  <div key={b.city.en} className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-2 h-2 rounded-full ${b.active ? "bg-brand-green shadow-[0_0_8px_rgba(76,175,80,0.6)] animate-pulse" : "bg-white/20"}`} />
                      <span className="font-bold text-sm text-white/90 group-hover:text-white transition-colors">
                        {isRTL ? b.city.ar : b.city.en}
                      </span>
                      {!b.active && (
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/5 tracking-wider">
                          {isRTL ? "قريباً" : "Soon"}
                        </span>
                      )}
                    </div>
                    {b.address && (
                      <div className={`flex items-start gap-2 ${isRTL ? "mr-5" : "ml-5"}`}>
                        <MapPin size={12} className="mt-1 text-white/20 shrink-0" />
                        <p className="text-xs leading-relaxed text-white/70">
                          {isRTL ? b.address.ar : b.address.en}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 mb-8">
                {t.contact}
              </h3>
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
                    {isRTL ? "الرقم المجاني" : "Toll-Free"}
                  </p>
                  <a
                    href="tel:920000000"
                    className="text-4xl font-black text-white hover:text-brand-green transition-colors block"
                  >
                    920 000 000
                  </a>
                </div>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@physiotrio.com"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-green/10 group-hover:border-brand-green/20 transition-all text-white/30 group-hover:text-brand-green">
                      <Mail size={16} />
                    </div>
                    <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                      hello@physiotrio.com
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            <p className="text-[13px] font-medium text-white/60">
              {t.rights}
            </p>
            <div className="flex items-center gap-8">
              <Link href={`/${locale}/privacy-policy`} className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">
                {t.privacy}
              </Link>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <Link href={`/${locale}/terms`} className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">
                {t.terms}
              </Link>
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest text-brand-green">
              {t.proudly}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
