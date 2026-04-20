"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Users, Award, CheckCircle2, Phone, Calendar, User } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface HeroSectionProps {
  locale: string;
  t: {
    eyebrow: string;
    headline1: string;
    headline2: string;
    subheadline: string;
    bookAppointment: string;
    exploreServices: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
}

const branches = [
  { id: "riyadh", labelEn: "Riyadh",  labelAr: "الرياض" },
  { id: "makkah", labelEn: "Makkah",  labelAr: "مكة" },
  { id: "dammam", labelEn: "Dammam",  labelAr: "الدمام", comingSoon: true },
];

export function HeroSection({ locale, t }: HeroSectionProps) {
  const [activeBranch, setActiveBranch] = useState("riyadh");
  const isAr = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".hero-text-anim", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }
    );
    tl.fromTo(".hero-form-anim", 
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
      "-=0.4"
    );
    // Refresh scroll triggers in case hero height affects them
    setTimeout(() => ScrollTrigger.refresh(), 500);
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      dir={isAr ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden min-h-[100svh] flex items-center pt-32 pb-20 lg:py-0"
      style={{ background: "#f8fafb" }}
    >
      {/* Decorative abstract elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-[0.03]">
        <svg viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="400" cy="400" r="300" stroke="#0f2d1f" strokeWidth="60" />
          <circle cx="400" cy="400" r="200" stroke="#4caf50" strokeWidth="40" />
        </svg>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 lg:gap-16 items-center">
        
        {/* ── Left Column: Text ── */}
        <div className={`flex flex-col z-10 ${isAr ? "items-start text-right" : "items-start text-left"}`}>
          {/* Eyebrow */}
          <div className="hero-text-anim mb-6">
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.18em] uppercase"
              style={{ background: "rgba(136,7,114,0.08)", color: "#880772", border: "1px solid rgba(136,7,114,0.15)" }}
            >
              {t.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-text-anim text-[42px] sm:text-[58px] lg:text-[72px] font-black leading-[1.04] tracking-tight mb-6"
            style={{ color: "#0f2d1f" }}
          >
            {isAr ? "وجهتك للراحة والتحسن" : "Destination For Relief & Wellness"}
          </h1>

          {/* Subheadline */}
          <p
            className="hero-text-anim text-lg md:text-xl leading-[1.8] mb-9 max-w-lg"
            style={{ color: "#4a6b59" }}
          >
            {t.subheadline}
          </p>

          {/* Buttons */}
          <div className="hero-text-anim flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href={`/${locale}/services`}
              className="group inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full font-bold text-base text-white transition-all duration-300 hover:-translate-y-1"
              style={{ background: "#4caf50", boxShadow: "0 8px 30px rgba(76,175,80,0.30)" }}
            >
              {t.exploreServices}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/${locale}/book/riyadh`}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-bold text-base transition-all duration-300 hover:-translate-y-1"
              style={{
                color: "#4caf50",
                border: "2px solid #4caf50",
                background: "transparent",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#4caf50";
                el.style.color = "#fff";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = "#4caf50";
              }}
            >
              {t.bookAppointment}
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Trust marks */}
          <div className="hero-text-anim flex flex-wrap gap-5 pt-8" style={{ borderTop: "1.5px solid rgba(15,45,31,0.08)" }}>
            {[t.trust1, t.trust2].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#2d5c3f" }}>
                <CheckCircle2 size={17} strokeWidth={2.5} color="#4caf50" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right Column: Form Card ── */}
        <div className="hero-form-anim relative mt-16 lg:mt-0">
          <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-physio relative z-10 border border-black/5">
            <h3 className="text-2xl font-black mb-2" style={{ color: "#0f2d1f" }}>
              {isAr ? "احجز موعدك" : "Book Appointment"}
            </h3>
            <p className="text-sm font-medium mb-8" style={{ color: "#4a6b59" }}>
              {isAr ? "قم بجدولة موعدك بسهولة عن طريق ملء النموذج البسيط الخاص بنا." : "Easily schedule your appointment by filling out our simple form."}
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={18} />
                </span>
                <input 
                  type="text" 
                  placeholder={isAr ? "اسمك الكامل" : "Full Name"} 
                  className="w-full bg-[#f8fafb] border-none rounded-xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-green outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone size={18} />
                  </span>
                  <input 
                    type="tel" 
                    placeholder={isAr ? "رقم الهاتف" : "Phone Number"} 
                    className="w-full bg-[#f8fafb] border-none rounded-xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-green outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Calendar size={18} />
                  </span>
                  <input 
                    type="date" 
                    className="w-full bg-[#f8fafb] border-none rounded-xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-green outline-none transition-all"
                  />
                </div>
              </div>
              <select 
                className="w-full bg-[#f8fafb] border-none rounded-xl py-4 px-4 text-sm font-medium focus:ring-2 focus:ring-brand-green outline-none transition-all appearance-none"
              >
                <option>{isAr ? "اختر الخدمة" : "Select Service"}</option>
                <option>{isAr ? "العلاج الطبيعي" : "Physiotherapy"}</option>
                <option>{isAr ? "العلاج اليدوي" : "Manual Therapy"}</option>
                <option>{isAr ? "إعادة التأهيل الرياضي" : "Sports Rehabilitation"}</option>
              </select>
              
              <button 
                type="submit" 
                className="w-full py-4 rounded-xl font-bold text-white transition-all hover:translate-y-[-2px] hover:shadow-lg flex items-center justify-center gap-3 mt-4"
                style={{ background: "#4caf50" }}
              >
                {isAr ? "إرسال الطلب" : "Submit Request"}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Floating stats badges around form */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-brand-purple flex flex-col items-center justify-center text-white shadow-xl animate-float z-20">
            <span className="text-xl font-black">24/7</span>
            <span className="text-[9px] font-bold uppercase tracking-wider">{isAr ? "طوارئ" : "Emergency"}</span>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl z-20 border border-black/5 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(136,7,114,0.1)" }}>
               <Users size={20} className="text-brand-purple" />
             </div>
             <div>
               <p className="text-lg font-black leading-none" style={{ color: "#0f2d1f" }}>100K+</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{isAr ? "عميل سعيد" : "Happy Clients"}</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
