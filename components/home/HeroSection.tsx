"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, HeartPulse, ShieldCheck } from "lucide-react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Entrance sequence
    tl.fromTo(".hero-reveal",
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.15, clearProps: "all" }
    );

    tl.fromTo(".hero-video-bg",
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: "power2.out" },
      0
    );

    // Subtle parallax on scroll
    gsap.to(".hero-content-wrap", {
      y: 100,
      opacity: 0.3,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Pulse animation for the play button
    gsap.to(".play-pulse", {
      scale: 1.4,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: "sine.out"
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center bg-physio-dark pt-32 lg:pt-40"
    >
      {/* ── Video Background ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="hero-video-bg h-full w-full object-cover"
        >
          {/* Using a high-quality clinical placeholder video */}
          <source src="/images/home/hero2.mp4" type="video/mp4" />
        </video>
      </div>
        <div className="absolute inset-0 z-[1] bg-black/30 backdrop-brightness-90"/>
      {/* ── Content Container ── */}
      <div className="hero-content-wrap relative z-10 w-full max-w-7xl px-6 text-center">

        {/* Eyebrow Badge */}
        <div className="hero-reveal mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-2 backdrop-blur-md transition-all hover:border-white/50">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              {t.eyebrow}
            </span>
          </div>
        </div>

        {/* Massive Headline */}
        <h1 className="hero-reveal mb-8 text-[48px] font-semibold leading-[1.05] tracking-tight text-white sm:text-[72px] lg:text-[96px]">
          <span className="block">{t.headline1}</span>
          <span className="text-brand-green">{t.headline2}</span>
        </h1>

        {/* Subheadline Text */}
        <div className="hero-reveal mb-12 flex justify-center">
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-white/80 md:text-xl">
            {t.subheadline}
          </p>
        </div>

        {/* Main Actions */}
        <div className="hero-reveal flex flex-col items-center justify-center gap-4 sm:gap-6 sm:flex-row w-full sm:w-auto px-4 sm:px-0">
          <Link
            href={`/${locale}/book/riyadh`}
            className="group relative flex h-16 w-full items-center justify-center gap-6 overflow-hidden rounded-xl  px-8 text-lg font-bold text-white transition-all active:scale-95 sm:w-auto border-2 border-white"
          >
            {t.bookAppointment}
            <ArrowRight size={20} className={`${isAr ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"} transition-transform`} />
          </Link>

          <Link
            href={`/${locale}/services`}
            className="group relative overflow-hidden inline-flex w-full items-center justify-center gap-3 px-8 py-5 rounded-xl font-bold text-lg text-white transition-all duration-300 sm:w-auto bg-brand-purple border-2 border-brand-purple hover:opacity-90"
          >
            {t.exploreServices}
            {/* <ArrowRight size={18} className={`transition-transform ${isAr ? "rotate-180 group-hover:-translate-x-1.5" : "group-hover:translate-x-1.5"}`} /> */}
          </Link>
        </div>

        {/* Floating Metrics / Trust Strip */}
        <div className="hero-reveal mt-8 border-t border-white/10 pt-12">
          <div className="flex flex-nowrap items-center justify-start sm:justify-center gap-x-6 overflow-x-auto px-2 no-scrollbar">
            {[t.trust1, t.trust2, t.trust3].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:text-white/80">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/40 bg-white/5 text-white">
                  <ShieldCheck size={14} />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
