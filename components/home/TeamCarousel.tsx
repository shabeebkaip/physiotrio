"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

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

const CARD_W = 300;
const CARD_GAP = 24;
const STEP = CARD_W + CARD_GAP;
const AUTO_MS = 3800;

export function TeamCarousel({ locale, therapists, title, subtitle, bookWithText }: TeamCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isAr = locale === "ar";
  const total = therapists.length;
  const extended = [...therapists, ...therapists, ...therapists];

  const [realIndex, setRealIndex] = useState(0);
  const extIdx = useRef(total);
  const dragging = useRef(false);
  const transitioning = useRef(false);
  const dragStartX = useRef(0);
  const dragCurX = useRef(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const paused = useRef(false);

  const getX = (i: number) => -(i * STEP);

  const teleport = useCallback((i: number) => {
    extIdx.current = i;
    if (trackRef.current) gsap.set(trackRef.current, { x: getX(i) });
  }, []);

  const slideTo = useCallback((i: number, cb?: () => void) => {
    if (transitioning.current) return;
    transitioning.current = true;
    extIdx.current = i;
    setRealIndex(((i - total) % total + total) % total);
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: getX(i), duration: 0.72, ease: "power3.inOut",
        onComplete: () => { transitioning.current = false; cb?.(); },
      });
    } else { transitioning.current = false; }
  }, [total]);

  const next = useCallback(() => {
    slideTo(extIdx.current + 1, () => {
      if (extIdx.current >= total * 2) teleport(extIdx.current - total);
    });
  }, [slideTo, teleport, total]);

  const prev = useCallback(() => {
    slideTo(extIdx.current - 1, () => {
      if (extIdx.current < total) teleport(extIdx.current + total);
    });
  }, [slideTo, teleport, total]);

  const jumpTo = useCallback((i: number) => slideTo(total + i), [slideTo, total]);

  useEffect(() => {
    autoRef.current = setInterval(() => { if (!paused.current) next(); }, AUTO_MS);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  useEffect(() => {
    if (trackRef.current) gsap.set(trackRef.current, { x: getX(total) });
  }, [total]);

  const onDragStart = (x: number) => { paused.current = true; dragging.current = true; dragStartX.current = x; dragCurX.current = x; };
  const onDragMove = (x: number) => {
    if (!dragging.current || !trackRef.current) return;
    dragCurX.current = x;
    gsap.set(trackRef.current, { x: getX(extIdx.current) + (x - dragStartX.current) });
  };
  const onDragEnd = () => {
    if (!dragging.current) return;
    dragging.current = false; paused.current = false;
    const delta = dragCurX.current - dragStartX.current;
    if (Math.abs(delta) > STEP * 0.2) { delta < 0 ? next() : prev(); }
    else if (trackRef.current) gsap.to(trackRef.current, { x: getX(extIdx.current), duration: 0.4, ease: "power2.out" });
  };

  useGSAP(() => {
    gsap.from(".team-hdr", {
      opacity: 0, y: 28, duration: 0.7, stagger: 0.12, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 82%", toggleActions: "play none none none" },
    });
    gsap.from(".team-track-wrap", {
      opacity: 0, y: 40, duration: 0.9, ease: "power2.out", delay: 0.25,
      scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-28 overflow-hidden" style={{ background: "#f4fbf7" }}>

      {/* Header + controls */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12">
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 ${isAr ? "sm:flex-row-reverse" : ""}`}>
          <div className={isAr ? "text-right" : "text-left"}>
            <span className="team-hdr inline-block text-xs font-bold uppercase tracking-[0.18em] px-5 py-2 rounded-full mb-4"
              style={{ background: "rgba(76,175,80,0.12)", color: "#388e3c", border: "1px solid rgba(76,175,80,0.22)" }}>
              {isAr ? "نخبة المتخصصين" : "Medical Experts"}
            </span>
            <h2 className="team-hdr text-4xl sm:text-5xl font-black leading-tight mb-2" style={{ color: "#0f2d1f" }}>{title}</h2>
            <p className="team-hdr text-base font-medium" style={{ color: "#4a6b59" }}>{subtitle}</p>
          </div>

          {/* Prev / Next */}
          <div className={`team-hdr flex gap-3 shrink-0 ${isAr ? "flex-row-reverse" : ""}`}>
            <button onClick={prev} aria-label="Previous"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-250"
              style={{ background: "#fff", border: "1.5px solid rgba(136,7,114,0.20)", color: "#880772" }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background="#880772"; b.style.color="#fff"; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background="#fff"; b.style.color="#880772"; }}>
              <ChevronLeft size={20} strokeWidth={2.5} className={isAr ? "scale-x-[-1]" : ""} />
            </button>
            <button onClick={next} aria-label="Next"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-250"
              style={{ background: "#880772", color: "#fff", boxShadow: "0 6px 20px rgba(136,7,114,0.30)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="#5E0450"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="#880772"; }}>
              <ChevronRight size={20} strokeWidth={2.5} className={isAr ? "scale-x-[-1]" : ""} />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel track */}
      <div
        className="team-track-wrap relative overflow-hidden px-6 lg:px-12 select-none"
        style={{ cursor: "grab" }}
        onMouseDown={e => onDragStart(e.clientX)}
        onMouseMove={e => onDragMove(e.clientX)}
        onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
        onTouchStart={e => onDragStart(e.touches[0].clientX)}
        onTouchMove={e => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
      >
        <div ref={trackRef} className="flex gap-6 will-change-transform" style={{ width: `${extended.length * STEP}px` }}>
          {extended.map((th, i) => {
            const name = isAr ? th.name.ar : th.name.en;
            return (
              <div key={`${th.id}-${i}`} className="shrink-0 group overflow-hidden"
                style={{ width: CARD_W, transition: "transform 0.35s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform="translateY(-10px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform="translateY(0)"; }}>

                {/* Photo container with large radius all around */}
                <div 
                  className="relative overflow-hidden transition-all duration-500 shadow-lg" 
                  style={{ height: "420px", background: "#E6EEEC", borderRadius: "32px" }}
                >
                  {th.image ? (
                    <Image 
                      src={th.image} 
                      alt={name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      unoptimized 
                      draggable={false} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/25 font-black text-7xl"
                      style={{ background: "#0f2d1f" }}>
                      {th.initials}
                    </div>
                  )}
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2.5 mt-10">
        {therapists.map((_, i) => (
          <button key={i} onClick={() => jumpTo(i)} aria-label={`Therapist ${i+1}`}
            className="rounded-full transition-all duration-300"
            style={{ width: i===realIndex?"32px":"10px", height:"10px", background: i===realIndex?"#880772":"#c8ddd3" }}
          />
        ))}
      </div>
    </section>
  );
}
