"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Dumbbell, Brain, Hand, Baby, Leaf, Zap,
  MoveUp, Activity, Stethoscope, ArrowUpRight, LucideIcon
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Service {
  id: string;
  slug: string;
  name: { en: string; ar: string };
  shortDesc: { en: string; ar: string };
  durationMinutes: number;
  icon: string;
  featured: boolean;
}

interface ServicesGridProps {
  locale: string;
  services: Service[];
  title: string;
  subtitle: string;
  bookNowText: string;
}

const iconMap: Record<string, LucideIcon> = {
  bone: Stethoscope,
  run: Dumbbell,
  brain: Brain,
  hands: Hand,
  child: Baby,
  spine: Activity,
  lotus: Leaf,
  "arrow-up": MoveUp,
  zap: Zap,
};

export function ServicesGrid({ locale, services, title, subtitle, bookNowText }: ServicesGridProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header elegant float
    gsap.fromTo(
      ".srv-header-anim",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    // Explosive staggered entrance for the pills
    gsap.fromTo(
      ".srv-pill",
      { opacity: 0, scale: 0.8, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "back.out(1.5)", // Massive bounce back effect for pop
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
      {/* Absolute background accent lines for modern structural feel */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(var(--color-brand-purple-rgb), 0.15) 2px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Header ── */}
        <div className="mb-20 text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="srv-header-anim flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-brand-green" />
            <span className="text-sm font-black uppercase tracking-[0.2em] text-brand-green">
              {isAr ? "مجالات تخصصنا" : "Our Specialties"}
            </span>
            <span className="w-8 h-px bg-brand-green" />
          </div>
          
          <h2 className="srv-header-anim text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-[#0B162C] mb-6 drop-shadow-sm">
            {title}
          </h2>
          
          <p className="srv-header-anim text-lg md:text-xl font-medium text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* ── Grid of Interactive Floating Pills ── */}
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Stethoscope;

            return (
              <div key={service.id} className="srv-pill">
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="group relative flex items-center p-3 sm:p-4 bg-white rounded-full shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(var(--color-brand-purple-rgb),0.2)] transition-all duration-500 ease-out border border-gray-100 overflow-hidden"
                >
                  {/* Fluid Wave Fill Animation on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-brand-purple to-[#523A9E] ${isAr ? "origin-right" : "origin-left"} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] pointer-events-none`} />

                  {/* Icon Container - Perfectly circular */}
                  <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-[#F1F5F9] rounded-full flex items-center justify-center transition-transform duration-700 group-hover:rotate-[360deg] shadow-inner group-hover:bg-white group-hover:text-brand-purple">
                    <Icon size={28} strokeWidth={2} className="text-brand-purple" />
                  </div>

                  {/* Typography - Only Heading per constraint */}
                  <div className={`relative z-10 flex-1 px-4 sm:px-6 flex justify-between items-center ${isAr ? "text-right" : "text-left"}`}>
                    <h3 className="text-[1.1rem] sm:text-xl font-black text-[#0B162C] group-hover:text-white transition-colors duration-300 leading-tight">
                      {isAr ? service.name.ar : service.name.en}
                    </h3>
                  </div>

                  {/* Action Arrow (Glassmorphism circle revealing on hover) */}
                  <div className="relative z-10 w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-white bg-white/20 backdrop-blur-md opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out mr-3">
                     <ArrowUpRight size={22} strokeWidth={2.5} className={isAr ? "-scale-x-100" : ""} />
                  </div>

                </Link>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
