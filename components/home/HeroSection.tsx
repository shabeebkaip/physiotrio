"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Award, CheckCircle2, ArrowRight } from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
  { id: "riyadh", labelEn: "Riyadh", labelAr: "الرياض" },
  { id: "makkah", labelEn: "Makkah", labelAr: "مكة" },
  { id: "dammam", labelEn: "Dammam", labelAr: "الدمام", comingSoon: true },
];

gsap.registerPlugin(useGSAP);

export function HeroSection({ locale, t }: HeroSectionProps) {
  const [activeBranch, setActiveBranch] = useState("riyadh");
  const isAr = locale === "ar";
  
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Left-side content timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-text-anim",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
    );

    // Right-side image mask animation
    gsap.fromTo(
      ".hero-image-mask",
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.2 }
    );

    // Right-side floating cards
    gsap.fromTo(
      ".hero-floating-card",
      { scale: 0.7, y: 30, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.5)", stagger: 0.2, delay: 0.6 }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-[#f8fcfb] overflow-hidden" style={{ minHeight: "100svh" }}>
      
      {/* Decorative background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-green/5 blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple/5 blur-3xl opacity-50" />

      <div className="max-w-[1400px] mx-auto min-h-[100svh] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 pt-32 pb-20 lg:py-0">
        
        {/* ── Left Side: Content ── */}
        <div className="w-full lg:w-[50%] flex flex-col items-start z-10">
          
          {/* Eyebrow */}
          <div className="hero-text-anim mb-6 flex items-center gap-3">
            <span className="w-10 h-[2px] bg-brand-green rounded-full" />
            <span className="text-sm font-bold tracking-widest text-brand-green uppercase">
              {t.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-text-anim text-[42px] sm:text-[56px] lg:text-[72px] font-black leading-[1.05] tracking-tight mb-8" style={{ color: "#0B162C" }}>
            {t.headline1}{" "}
            <span className="relative inline-block text-brand-purple">
              {t.headline2}
              <svg className="absolute w-full h-[12px] -bottom-1 left-0 opacity-40 text-brand-green" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 15, 100 0" stroke="currentColor" strokeWidth="4" fill="transparent" />
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-text-anim text-lg md:text-xl text-gray-500 mb-10 max-w-xl leading-relaxed">
            {t.subheadline}
          </p>

          {/* Branches & CTAs */}
          <div className="hero-text-anim w-full max-w-xl flex flex-col gap-8">
            <div className="flex flex-wrap gap-3">
              {branches.map((branch) => {
                const isActive = activeBranch === branch.id;
                return (
                  <button
                    key={branch.id}
                    onClick={() => !branch.comingSoon && setActiveBranch(branch.id)}
                    disabled={branch.comingSoon}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                      isActive 
                        ? "bg-brand-purple text-white shadow-[0_8px_16px_-4px_rgba(var(--color-brand-purple-rgb),0.4)]" 
                        : "bg-white text-gray-500 border border-gray-200 hover:border-brand-purple/30"
                    }`}
                    style={{ opacity: branch.comingSoon ? 0.5 : 1, cursor: branch.comingSoon ? "not-allowed" : "pointer" }}
                  >
                    {isAr ? branch.labelAr : branch.labelEn}
                    {branch.comingSoon && <span className="ml-1.5 text-[10px] font-black opacity-60 uppercase">{isAr ? "قريباً" : "Soon"}</span>}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/book/${activeBranch}`}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-brand-green text-white rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                {t.bookAppointment}
                <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
              <Link
                href={`/${locale}/services`}
                className="flex items-center justify-center px-8 py-4 bg-white text-[#0B162C] border-2 border-gray-100 rounded-full font-bold text-lg hover:border-brand-green hover:text-brand-green transition-all duration-300"
              >
                {t.exploreServices}
              </Link>
            </div>
          </div>

          {/* Trust Marks */}
          <div className="hero-text-anim mt-12 flex flex-wrap items-center gap-6 pt-8 border-t border-gray-200/60 w-full max-w-xl">
            {[t.trust1, t.trust2, t.trust3].map((item, i) => (
              <span key={i} className="flex items-center gap-2.5 text-sm font-bold text-[#0B162C]">
                <CheckCircle2 color="var(--color-brand-purple)" size={20} strokeWidth={2.5} />
                {item}
              </span>
            ))}
          </div>

        </div>

        {/* ── Right Side: Imagery & Floating Cards ── */}
        <div className="w-full lg:w-[45%] relative mt-20 lg:mt-0 flex justify-center lg:justify-end z-10">
          
          {/* Main Image Mask */}
          <div className="hero-image-mask relative w-full max-w-[500px] aspect-[3/4] rounded-tl-[120px] rounded-br-[120px] rounded-tr-[30px] rounded-bl-[30px] overflow-hidden shadow-2xl bg-gray-100 will-change-transform">
            <Image
              src="https://static.zawya.com/view/acePublic/alias/contentid/cbec1451-ab27-4cfd-aa7d-851f20a53c55/0/erabianetwork-jpg.webp?f=3%3A2&q=0.75&w=1920"
              alt="PhysioTrio Expert Physiotherapy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </div>

          {/* Floating Card: Patients */}
          <div className="hero-floating-card absolute bottom-10 -left-6 sm:-left-12 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.15)] flex flex-col gap-2 border border-white max-w-[200px] will-change-transform">
            <div className="flex -space-x-3 mb-1">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"><Image src="https://physiotherabia.com/wp-content/uploads/2023/08/Sports-Rehabilitation.jpg" alt="patient" width={40} height={40} className="object-cover h-full" /></div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-purple/20 overflow-hidden"><Image src="https://physiotherabia.com/wp-content/uploads/2023/11/display-pic-1.jpg" alt="patient" width={40} height={40} className="object-cover h-full"/></div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-green flex items-center justify-center text-white text-xs font-bold">+</div>
            </div>
            <h4 className="text-[#0B162C] font-black text-xl">10K+</h4>
            <p className="text-xs font-bold text-gray-500 leading-tight">
              {isAr ? "مرضى تعافوا بالكامل" : "Patients fully recovered"}
            </p>
          </div>

          {/* Floating Card: Experience */}
          <div className="hero-floating-card absolute top-16 -right-6 sm:-right-8 bg-white p-5 rounded-tr-[30px] rounded-bl-[30px] rounded-tl-xl rounded-br-xl shadow-[0_20px_40px_-5px_rgba(var(--color-brand-purple-rgb),0.2)] flex items-center gap-4 border border-gray-100 will-change-transform">
            <div className="w-14 h-14 bg-brand-purple/10 text-brand-purple rounded-full flex items-center justify-center flex-shrink-0">
               <Award size={28} strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="text-[#0B162C] font-black text-2xl">22+</span>
               <span className="text-xs font-bold text-gray-500 leading-tight">
                {isAr ? "سنوات خبرة" : "Years Experience"}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
