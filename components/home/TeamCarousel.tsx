"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { Star, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Therapist {
  id: string;
  name: { en: string; ar: string };
  title: { en: string; ar: string };
  specializations: string[];
  branches: string[];
  languages: string[];
  yearsExp: number;
  rating: number;
  initials: string;
  image?: string | null;
}

interface TeamCarouselProps {
  locale: string;
  therapists: Therapist[];
  title: string;
  subtitle: string;
  bookWithText: string;
}

const CARD_WIDTH = 320;
const CARD_GAP = 24;
const AUTO_PLAY_DELAY = 3500;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

export function TeamCarousel({ locale, therapists, title, subtitle, bookWithText }: TeamCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isAr = locale === "ar";
  const total = therapists.length;

  // Triple the array: [clone-tail | real | clone-head]
  const extended = [...therapists, ...therapists, ...therapists];

  // Start at the "real" section (offset = total)
  const [realIndex, setRealIndex] = useState(0); // 0-based within real cards
  const extIndex = useRef(total); // current position within extended array
  const isDragging = useRef(false);
  const isTransitioning = useRef(false);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPaused = useRef(false);

  const getX = (idx: number) => -(idx * CARD_STEP);

  // Instantly teleport (no animation) to keep center section in view
  const teleport = useCallback((idx: number) => {
    extIndex.current = idx;
    if (trackRef.current) {
      gsap.set(trackRef.current, { x: getX(idx) });
    }
  }, []);

  // Animated slide
  const slideTo = useCallback((idx: number, onComplete?: () => void) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    extIndex.current = idx;
    setRealIndex(((idx - total) % total + total) % total);
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: getX(idx),
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: () => {
          isTransitioning.current = false;
          onComplete?.();
        }
      });
    } else {
      isTransitioning.current = false;
    }
  }, [total]);

  const next = useCallback(() => {
    const nextIdx = extIndex.current + 1;
    slideTo(nextIdx, () => {
      // If we've slid into the clone-head section, silently jump back
      if (extIndex.current >= total * 2) {
        teleport(extIndex.current - total);
      }
    });
  }, [slideTo, teleport, total]);

  const prev = useCallback(() => {
    const prevIdx = extIndex.current - 1;
    slideTo(prevIdx, () => {
      // If we've slid into the clone-tail section, silently jump forward
      if (extIndex.current < total) {
        teleport(extIndex.current + total);
      }
    });
  }, [slideTo, teleport, total]);

  // Jump to a real card by dot click
  const jumpTo = useCallback((i: number) => {
    const target = total + i;
    slideTo(target);
  }, [slideTo, total]);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      if (!isPaused.current) next();
    }, AUTO_PLAY_DELAY);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [next]);

  // Initialize position
  useEffect(() => {
    if (trackRef.current) {
      gsap.set(trackRef.current, { x: getX(total) });
    }
  }, [total]);

  // ── Drag handlers ──
  const onDragStart = (clientX: number) => {
    isPaused.current = true;
    isDragging.current = true;
    dragStartX.current = clientX;
    dragCurrentX.current = clientX;
  };

  const onDragMove = (clientX: number) => {
    if (!isDragging.current || !trackRef.current) return;
    dragCurrentX.current = clientX;
    const delta = clientX - dragStartX.current;
    gsap.set(trackRef.current, { x: getX(extIndex.current) + delta });
  };

  const onDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    isPaused.current = false;
    const delta = dragCurrentX.current - dragStartX.current;
    const threshold = CARD_STEP * 0.2;
    if (Math.abs(delta) > threshold) {
      delta < 0 ? next() : prev();
    } else {
      gsap.to(trackRef.current, { x: getX(extIndex.current), duration: 0.4, ease: "power2.out" });
    }
  };

  // GSAP entrance
  useGSAP(() => {
    gsap.fromTo(".team-header-anim", { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
    });
    gsap.fromTo(".team-slide-area", { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.3,
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white overflow-hidden border-t border-gray-100">

      {/* ── Header ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16">
        <div className="max-w-2xl">
          <span className="team-header-anim inline-block text-xs font-black uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20">
            {isAr ? "نخبة المتخصصين" : "Medical Experts"}
          </span>
          <h2 className="team-header-anim text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-[#0B162C] leading-tight">
            {title}
          </h2>
          <p className="team-header-anim text-lg md:text-xl font-medium text-gray-400">
            {subtitle}
          </p>
        </div>
      </div>

      {/* ── Infinite Draggable Track ── */}
      <div
        className="team-slide-area relative overflow-hidden px-6 lg:px-12 select-none"
        style={{ opacity: 0, cursor: "grab" }}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
      >
        <div
          ref={trackRef}
          className="flex gap-6 will-change-transform"
          style={{ width: `${extended.length * CARD_STEP}px` }}
        >
          {extended.map((therapist, i) => (
            <div
              key={`${therapist.id}-${i}`}
              className="flex-shrink-0 relative overflow-hidden group"
              style={{ width: CARD_WIDTH, borderRadius: "2.5rem", aspectRatio: "3/4" }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110">
                {therapist.image ? (
                  <Image
                    src={therapist.image}
                    alt={isAr ? therapist.name.ar : therapist.name.en}
                    fill
                    className="object-cover object-top pointer-events-none"
                    unoptimized
                    draggable={false}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-white/20 font-black text-9xl"
                    style={{ background: "linear-gradient(135deg, var(--color-brand-purple) 0%, var(--color-brand-green) 100%)" }}
                  >
                    {therapist.initials}
                  </div>
                )}
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B162C]/90 via-[#0B162C]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Name & Title — moves up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transition-transform duration-500 group-hover:-translate-y-28">
                <h3 className="font-black text-2xl text-white mb-2 leading-tight">
                  {isAr ? therapist.name.ar : therapist.name.en}
                </h3>
                <p className="text-brand-green font-bold text-sm tracking-wide flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse flex-shrink-0" />
                  {isAr ? therapist.title.ar : therapist.title.en}
                </p>
              </div>

              {/* Glassmorphism CTA — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-white/10 backdrop-blur-xl border-t border-white/20 p-5 translate-y-full flex flex-col justify-between transition-transform duration-500 group-hover:translate-y-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Star size={16} fill="#FDE047" color="#FDE047" />
                    <span className="text-white font-black">{therapist.rating}</span>
                  </div>
                  {therapist.branches[0] && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded bg-white/20 text-white capitalize">
                      {therapist.branches[0]}
                    </span>
                  )}
                </div>
                <Link
                  href={`/${locale}/book/${therapist.branches[0]}?therapist=${therapist.id}`}
                  className="w-full py-3 rounded-full flex items-center justify-center gap-2 bg-white text-[#0B162C] font-black text-sm hover:bg-brand-green hover:text-white transition-colors"
                  onClick={(e) => isDragging.current && e.preventDefault()}
                >
                  {bookWithText} {isAr ? therapist.name.ar.split(" ")[1] : therapist.name.en.split(" ")[1]}
                  <ArrowUpRight size={16} strokeWidth={3} className={isAr ? "-scale-x-100" : ""} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dot Indicators ── */}
      <div className="flex justify-center items-center gap-2.5 mt-12">
        {therapists.map((_, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === realIndex ? "32px" : "10px",
              height: "10px",
              background: i === realIndex ? "var(--color-brand-purple)" : "#e2e8f0",
            }}
          />
        ))}
      </div>
    </section>
  );
}
