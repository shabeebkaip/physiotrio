"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Service {
  id: string;
  slug: string;
  name: { en: string; ar: string };
  shortDesc: { en: string; ar: string };
  durationMinutes: number;
  icon: string;
  featured: boolean;
  image?: string;
}

interface ServicesGridProps {
  locale: string;
  services: Service[];
  title: string;
  subtitle: string;
  bookNowText: string;
}

export function ServicesGrid({ locale, services, title, subtitle, bookNowText }: ServicesGridProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".svc-header > *", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.1, 
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
      }
    );

    gsap.fromTo(".svc-card", 
      { opacity: 0, scale: 0.9, y: 40 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "back.out(1.2)",
        scrollTrigger: { trigger: ".svc-grid", start: "top 80%" }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      dir={isAr ? "rtl" : "ltr"}
      className="relative py-16 lg:py-32 bg-[#FBFBFD] overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* ── Header ── */}
        <div className="svc-header mb-12 lg:mb-20 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/5 border border-brand-purple/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-purple">
                 {isAr ? "خدماتنا" : "Specialized Care"}
              </span>
           </div>
           <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-physio-dark tracking-tight mb-6">
              {title}
           </h2>
           <p className="text-gray-500 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              {subtitle}
           </p>
        </div>

        {/* ── Grid Container ── */}
        <div className="svc-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/${locale}/services/${service.slug}`}
              className="svc-card group relative h-full bg-white rounded-[32px] p-10 border border-[#eff3f1] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 block"
            >
              {/* Sliding Hover Background */}
              <div className="absolute inset-0 bg-physio-dark translate-y-[101%] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              
              {/* Content Wrapper */}
              <div className="relative z-10 h-full flex flex-col">
                 {/* Icon Box */}
                 <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center mb-8 text-brand-purple transition-all duration-500 group-hover:bg-white group-hover:text-brand-green">
                    <div className="w-8 h-8 relative">
                       <Image 
                         src={service.icon} 
                         alt={isAr ? service.name.ar : service.name.en} 
                         fill 
                         className="object-contain transition-all duration-500 group-hover:brightness-100 group-hover:contrast-100"
                         unoptimized
                       />
                    </div>
                 </div>

                 {/* Text Content */}
                 <h3 className="text-2xl font-black text-physio-dark mb-4 tracking-tight leading-tight transition-colors duration-500 group-hover:text-white">
                    {isAr ? service.name.ar : service.name.en}
                 </h3>
                 <p className="text-base text-gray-500 font-medium leading-relaxed mb-8 transition-colors duration-500 group-hover:text-white/80 line-clamp-3">
                    {isAr ? service.shortDesc.ar : service.shortDesc.en}
                 </p>

                 {/* Bottom Arrow Button */}
                 <div className="mt-auto flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-physio-dark transition-all duration-500 group-hover:bg-white group-hover:text-brand-green group-hover:border-white">
                       <ArrowRight size={18} className={isAr ? "rotate-180" : ""} />
                    </div>
                 </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
