"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, CheckCircle2, ArrowRight, Star, Users } from "lucide-react";

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
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-text-anim",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
    );

    gsap.fromTo(
      ".hero-image-wrap",
      { scale: 0.88, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.3, ease: "power2.out", delay: 0.25 }
    );

    gsap.fromTo(
      ".hero-blob-bg",
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.6, ease: "power2.out", delay: 0.1 }
    );

    gsap.fromTo(
      ".hero-floating-card",
      { scale: 0.6, y: 30, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.85, ease: "back.out(1.6)", stagger: 0.18, delay: 0.7 }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f8fcfb] overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #880772 2px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative curved SVG lines */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-25 pointer-events-none">
        <svg viewBox="0 0 600 800" fill="none" className="w-full h-full">
          <path
            d="M 500 -80 Q 650 250, 580 520 Q 510 790, 320 900"
            stroke="rgba(76,175,80,0.35)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M 560 -30 Q 710 300, 640 570 Q 570 840, 380 950"
            stroke="rgba(136,7,114,0.2)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto min-h-[100svh] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 pt-32 pb-20 lg:py-0 gap-12 lg:gap-6">

        {/* ── Left: Content ── */}
        <div className="w-full lg:w-[52%] flex flex-col items-start z-10">

          {/* Eyebrow */}
          <div className="hero-text-anim mb-6 flex items-center gap-3">
            <span className="w-10 h-[2px] bg-brand-green rounded-full" />
            <span className="text-sm font-bold tracking-widest text-brand-green uppercase">
              {t.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-text-anim text-[40px] sm:text-[54px] lg:text-[68px] font-black leading-[1.05] tracking-tight mb-8"
            style={{ color: "#0B162C" }}
          >
            {t.headline1}{" "}
            <span className="relative inline-block text-brand-purple">
              {t.headline2}
              <svg
                className="absolute w-full h-[12px] -bottom-1 left-0 opacity-40 text-brand-green"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 50 15, 100 0" stroke="currentColor" strokeWidth="4" fill="transparent" />
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-text-anim text-lg md:text-xl text-gray-500 mb-10 max-w-xl leading-relaxed">
            {t.subheadline}
          </p>

          {/* Branch selectors + CTAs */}
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
                    {branch.comingSoon && (
                      <span className="ml-1.5 text-[10px] font-black opacity-60 uppercase">
                        {isAr ? "قريباً" : "Soon"}
                      </span>
                    )}
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

          {/* Trust marks */}
          <div className="hero-text-anim mt-12 flex flex-wrap items-center gap-6 pt-8 border-t border-gray-200/60 w-full max-w-xl">
            {[t.trust1, t.trust2, t.trust3].map((item, i) => (
              <span key={i} className="flex items-center gap-2.5 text-sm font-bold text-[#0B162C]">
                <CheckCircle2 color="var(--color-brand-purple)" size={20} strokeWidth={2.5} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: Organic Blob Image + Floating Elements ── */}
        <div className="w-full lg:w-[44%] relative flex justify-center lg:justify-end z-10 lg:py-16">

          {/* Soft glow blobs behind image */}
          <div
            className="hero-blob-bg absolute inset-[-12%] pointer-events-none opacity-0"
            style={{
              background: "radial-gradient(ellipse at 60% 50%, rgba(76,175,80,0.18) 0%, transparent 65%)",
              borderRadius: "45% 55% 50% 50% / 40% 50% 50% 60%",
            }}
          />
          <div
            className="hero-blob-bg absolute inset-[-6%] pointer-events-none opacity-0"
            style={{
              background: "radial-gradient(ellipse at 40% 50%, rgba(136,7,114,0.1) 0%, transparent 65%)",
              borderRadius: "55% 45% 40% 60% / 50% 55% 45% 50%",
            }}
          />

          {/* Organic blob image wrapper */}
          <div
            className="hero-image-wrap relative will-change-transform opacity-0"
            style={{ width: "100%", maxWidth: "460px" }}
          >
            {/* Glow ring */}
            <div
              className="absolute inset-[-4%] animate-morph-blob pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(76,175,80,0.18), rgba(136,7,114,0.12))",
                animationDuration: "12s",
              }}
            />

            {/* Main image with morphing blob shape */}
            <div
              className="relative w-full overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.22)] animate-morph-blob"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src="https://static.zawya.com/view/acePublic/alias/contentid/cbec1451-ab27-4cfd-aa7d-851f20a53c55/0/erabianetwork-jpg.webp?f=3%3A2&q=0.75&w=1920"
                alt="PhysioTrio Expert Physiotherapy"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover"
              />
              {/* Subtle inner light vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
            </div>

            {/* ── Floating Card 1: Star Rating — top right ── */}
            <div
              className="hero-floating-card absolute -top-4 -right-4 sm:-right-8 bg-white px-4 py-3 rounded-2xl shadow-[0_12px_32px_-8px_rgba(0,0,0,0.14)] border border-gray-100/80 flex items-center gap-3 will-change-transform"
            >
              <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Star size={16} className="text-amber-400" fill="currentColor" />
              </div>
              <div>
                <p className="text-[#0B162C] font-black text-base leading-none">4.9 / 5</p>
                <p className="text-[11px] font-bold text-gray-400 mt-0.5 leading-none">
                  {isAr ? "+500 تقييم" : "500+ Reviews"}
                </p>
              </div>
            </div>

            {/* ── Floating Card 2: Patients — bottom left ── */}
            <div
              className="hero-floating-card absolute bottom-8 -left-4 sm:-left-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-[0_16px_40px_-8px_rgba(0,0,0,0.15)] border border-white flex items-center gap-3.5 will-change-transform"
              style={{ maxWidth: "195px" }}
            >
              <div className="flex -space-x-2 flex-shrink-0">
                <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-gray-100">
                  <Image
                    src="https://physiotherabia.com/wp-content/uploads/2023/08/Sports-Rehabilitation.jpg"
                    alt="patient"
                    width={36}
                    height={36}
                    className="object-cover h-full"
                  />
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-brand-purple/10">
                  <Image
                    src="https://physiotherabia.com/wp-content/uploads/2023/11/display-pic-1.jpg"
                    alt="patient"
                    width={36}
                    height={36}
                    className="object-cover h-full"
                  />
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-white bg-brand-green flex items-center justify-center">
                  <Users size={14} className="text-white" />
                </div>
              </div>
              <div>
                <p className="text-[#0B162C] font-black text-lg leading-none">10K+</p>
                <p className="text-[11px] font-bold text-gray-500 leading-snug mt-0.5">
                  {isAr ? "مريض تعافوا" : "Patients Healed"}
                </p>
              </div>
            </div>

            {/* ── Floating Card 3: Experience — mid-right, blob shape ── */}
            <div
              className="hero-floating-card absolute top-1/2 -translate-y-1/2 -right-5 sm:-right-10 flex flex-col items-center justify-center gap-1 will-change-transform shadow-[0_12px_32px_-6px_rgba(136,7,114,0.35)]"
              style={{
                width: "88px",
                height: "88px",
                background: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-purple-dark))",
                borderRadius: "50% 30% 50% 30% / 35% 50% 35% 50%",
              }}
            >
              <Award size={18} className="text-white/80" strokeWidth={2} />
              <span className="text-white font-black text-xl leading-none">22+</span>
              <span className="text-white/65 text-[9px] font-bold uppercase tracking-wider leading-none">
                {isAr ? "سنة" : "Years"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
