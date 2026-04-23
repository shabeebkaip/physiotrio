"use client";

import { useRef } from "react";
import { MapPin, Users, UserRound, Clock } from "lucide-react";
import { Counter } from "@/components/common/Counter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export function StatsSection({ locale }: { locale: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isAr = locale === "ar";

  const stats = [
    { icon: MapPin,    value: 3,     suffix: "",   label: { en: "KSA Branches",      ar: "فروع في المملكة" } },
    { icon: UserRound, value: 50,    suffix: "+",  label: { en: "Expert Therapists",  ar: "معالج متخصص" } },
    { icon: Users,     value: 10000, suffix: "+",  label: { en: "Patients Treated",   ar: "مريض تلقى العلاج" } },
    { icon: Clock,     value: 22,    suffix: "+",  label: { en: "Years Experience",   ar: "سنة خبرة" } },
  ];

  useGSAP(() => {
    gsap.fromTo(".stat-item", 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className="relative overflow-hidden border-y border-gray-100"
      style={{ background: "#F8FAF9" }}
    >
      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 items-center">
          {stats.map((s, i) => {
            const Icon = s.icon;
            const isLast = i === stats.length - 1;
            return (
              <div
                key={i}
                className={`stat-item flex flex-col items-center text-center py-12 lg:py-16 px-4 lg:px-6 relative group border-[#E6EEEC]
                  ${i < 2 ? "border-b lg:border-b-0" : ""}
                  ${i % 2 === 0 ? (isAr ? "border-l lg:border-l-0" : "border-r lg:border-r-0") : ""}
                  ${!isLast ? (isAr ? "lg:border-l" : "lg:border-r") : ""}
                `}
              >
                {/* Number */}
                <div 
                  className="text-4xl md:text-5xl font-black leading-none mb-3 tabular-nums transition-transform duration-300 group-hover:scale-110" 
                  style={{ color: "#0f2d1f" }}
                >
                  <Counter end={s.value} />
                  <span className="text-brand-green">{s.suffix}</span>
                </div>
                {/* Label */}
                <p
                  className="text-xs font-black uppercase tracking-[0.18em]"
                  style={{ color: "#4a6b59" }}
                >
                  {isAr ? s.label.ar : s.label.en}
                </p>
                {/* Subtle icon background placeholder style (as per reference hero stats) */}
                <Icon 
                  size={54} 
                  className="stat-ghost-icon absolute opacity-[0.04] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700 group-hover:opacity-10 group-hover:scale-125" 
                  style={{ color: "#0f2d1f" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
