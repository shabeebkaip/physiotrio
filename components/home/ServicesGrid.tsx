"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dumbbell, Brain, Hand, Baby, Leaf, Zap, MoveUp, Activity, Stethoscope, ArrowRight, LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Service {
  id: string; slug: string;
  name: { en: string; ar: string };
  shortDesc: { en: string; ar: string };
  durationMinutes: number; icon: string; featured: boolean;
}

interface ServicesGridProps {
  locale: string; services: Service[];
  title: string; subtitle: string; bookNowText: string;
}

const iconMap: Record<string, LucideIcon> = {
  bone: Stethoscope, run: Dumbbell, brain: Brain, hands: Hand,
  child: Baby, spine: Activity, lotus: Leaf, "arrow-up": MoveUp, zap: Zap,
};

const cardColors = [
  { bg: "rgba(136,7,114,0.06)", icon: "#880772" },
  { bg: "rgba(76,175,80,0.08)",  icon: "#388e3c" },
  { bg: "rgba(136,7,114,0.06)", icon: "#880772" },
  { bg: "rgba(76,175,80,0.08)",  icon: "#388e3c" },
  { bg: "rgba(136,7,114,0.06)", icon: "#880772" },
  { bg: "rgba(76,175,80,0.08)",  icon: "#388e3c" },
  { bg: "rgba(136,7,114,0.06)", icon: "#880772" },
  { bg: "rgba(76,175,80,0.08)",  icon: "#388e3c" },
  { bg: "rgba(136,7,114,0.06)", icon: "#880772" },
];

export function ServicesGrid({ locale, services, title, subtitle, bookNowText }: ServicesGridProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".srv-hdr", 
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
      }
    );
    gsap.fromTo(".srv-card",
      { opacity: 0, y: 50, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 88%", toggleActions: "play none none none" },
      }
    );
    setTimeout(() => ScrollTrigger.refresh(), 500);
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-28 overflow-hidden" style={{ background: "#f4fbf7" }}>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="srv-hdr inline-block text-xs font-bold uppercase tracking-[0.20em] px-5 py-2 rounded-full mb-5"
            style={{ background: "rgba(76,175,80,0.12)", color: "#388e3c", border: "1px solid rgba(76,175,80,0.22)" }}>
            {isAr ? "مجالات تخصصنا" : "Our Specialties"}
          </span>
          <h2 className="srv-hdr text-4xl sm:text-5xl font-black leading-tight mb-4" style={{ color: "#0f2d1f" }}>{title}</h2>
          <p className="srv-hdr text-lg font-medium leading-relaxed" style={{ color: "#4a6b59" }}>{subtitle}</p>
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            return (
              <div
                key={service.id}
                className="srv-card group flex flex-col rounded-[24px] overflow-hidden transition-all duration-300 relative"
                style={{ 
                  background: "#fff", 
                  border: "1px solid #E6EEEC",
                }}
                onMouseEnter={e => { 
                  const el = e.currentTarget as HTMLDivElement; 
                  el.style.boxShadow = "0 20px 50px rgba(15, 45, 31, 0.08)"; 
                  el.style.transform = "translateY(-6px)"; 
                  el.style.borderColor = "rgba(76, 175, 80, 0.15)"; 
                }}
                onMouseLeave={e => { 
                  const el = e.currentTarget as HTMLDivElement; 
                  el.style.boxShadow = "none"; 
                  el.style.transform = "translateY(0)"; 
                  el.style.borderColor = "#E6EEEC"; 
                }}
              >
                {/* Image Section */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={service.image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"}
                    alt={isAr ? service.name.ar : service.name.en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-8 flex flex-col items-start bg-white">
                  <h3 className="text-xl font-black mb-6 leading-tight group-hover:text-brand-purple transition-colors" style={{ color: "#0f2d1f" }}>
                    {isAr ? service.name.ar : service.name.en}
                  </h3>

                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="inline-flex items-center gap-3 py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 hover:gap-5"
                    style={{ background: "#0f2d1f", color: "#fff" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#880772"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#0f2d1f"; }}
                  >
                    {isAr ? "اقرأ المزيد" : "Read More"}
                    <ArrowRight size={18} className={isAr ? "-scale-x-100" : ""} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
