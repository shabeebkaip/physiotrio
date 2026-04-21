"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Star, ShieldCheck, HeartPulse } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

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

export function HeroSection({ locale, t }: HeroSectionProps) {
  const isAr = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance animations
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(".hero-text-anim",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.12 }
    );

    tl.fromTo(".hero-visual-anim",
      { x: isAr ? -100 : 100, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
      "-=0.8"
    );

    // Continuous floating animation for image container
    gsap.to(visualRef.current, {
      y: -8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Subtle parallax for the main image
    gsap.to(".hero-main-img", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Parallax background elements
    gsap.to(".hero-bg-blob", {
      yPercent: -25,
      rotate: 15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    setTimeout(() => ScrollTrigger.refresh(), 500);
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      dir={isAr ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden min-h-[100svh] flex items-center pt-32 pb-20 lg:pt-40 lg:pb-32"
      style={{ background: "var(--color-surface-light)" }}
    >
      {/* ── Background Elements ── */}
      <div className="hero-bg-blob absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "var(--color-brand-green)" }} />
      <div className="hero-bg-blob absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{ background: "var(--color-brand-purple)" }} />

      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(#0f2d1f 1px, transparent 1px), linear-gradient(90deg, #0f2d1f 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

        {/* ── Left Content (col-7) ── */}
        <div className={`lg:col-span-7 flex flex-col z-10 ${isAr ? "items-start text-right" : "items-start text-left"}`}>
          {/* Eyebrow */}
          <div className="hero-text-anim mb-8">
            <span
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:scale-105 cursor-default"
              style={{ background: "rgba(136,7,114,0.08)", color: "var(--color-brand-purple)", border: "1px solid rgba(136,7,114,0.15)" }}
            >
              <ShieldCheck size={14} className="opacity-70" />
              {t.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-text-anim text-[46px] sm:text-[64px] lg:text-[84px] font-black leading-[1.02] tracking-tight mb-8"
            style={{ color: "var(--color-physio-dark)" }}
          >
            {isAr ? "وجهتك للراحة" : "Destination For"} <br />
            <span className="text-gradient">
              {isAr ? "والتحسن الصحي" : "Relief & Wellness"}
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="hero-text-anim text-lg md:text-xl leading-[1.8] mb-10 max-w-xl font-medium"
            style={{ color: "#4a6b59" }}
          >
            {t.subheadline}
          </p>

          {/* Buttons */}
          <div className="hero-text-anim flex flex-col sm:flex-row gap-6 mb-16">
            <Link
              href={`/${locale}/services`}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full font-bold text-base text-white transition-all duration-300"
              style={{ background: "linear-gradient(135deg, var(--color-brand-green), var(--color-brand-green-dark))", boxShadow: "0 12px 40px rgba(76,175,80,0.3)" }}
            >
              {t.exploreServices}
              <ArrowRight size={18} className={`transition-transform ${isAr ? "rotate-180 group-hover:-translate-x-1.5" : "group-hover:translate-x-1.5"}`} />
            </Link>

            <Link
              href={`/${locale}/book/riyadh`}
              className="inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full font-bold text-base transition-all duration-300 group"
              style={{
                color: "var(--color-brand-green)",
                border: "2px solid var(--color-brand-green)",
                background: "transparent",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(76,175,80,0.06)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
              }}
            >
              {t.bookAppointment}
              <HeartPulse size={18} className="transition-transform group-hover:scale-110" />
            </Link>
          </div>

          {/* Trust marks */}
          <div className="hero-text-anim flex flex-wrap gap-8 pt-8 w-full" style={{ borderTop: "1.5px solid rgba(15,45,31,0.08)" }}>
            {[t.trust1, t.trust2, t.trust3].map((item, i) => (
              <span key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide" style={{ color: "var(--color-physio-dark)" }}>
                <CheckCircle2 size={18} strokeWidth={3} className="text-brand-green" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right Column: Visual (col-5) ── */}
        <div ref={visualRef} className="lg:col-span-5 relative mt-20 lg:mt-0 flex justify-center lg:justify-end">
          <div className="hero-visual-anim relative w-full max-w-[540px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] bg-white/50 backdrop-blur-sm p-4 border border-white/40">
            {/* Main Image */}
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
              <Image
                src="/images/hero-physio.png"
                alt="Professional Physiotherapy"
                fill
                className="hero-main-img object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Decorative shapes behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none -z-10 opacity-30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/20 rounded-full blur-3xl animate-morph-blob" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl animate-morph-blob" style={{ animationDelay: '-5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
