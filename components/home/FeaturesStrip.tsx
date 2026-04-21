"use client";

import { useRef } from "react";
import { Stethoscope, ShieldAlert, MessageSquare } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

interface FeatureItem {
  icon: React.ElementType;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const features: FeatureItem[] = [
  {
    icon: Stethoscope,
    titleEn: "Expert Therapists",
    titleAr: "معالجون متخصصون",
    descEn: "Licensed clinical specialists with years of expertise.",
    descAr: "معالجون مرخصون وسنوات من الخبرة.",
  },
  {
    icon: ShieldAlert,
    titleEn: "Emergency Care",
    titleAr: "رعاية طوارئ",
    descEn: "Prompt therapeutic management for acute pain.",
    descAr: "إدارة علاجية سريعة للألم الحاد.",
  },
  {
    icon: MessageSquare,
    titleEn: "Free Consultation",
    titleAr: "استشارة مجانية",
    descEn: "No-obligation initial consultation for new patients.",
    descAr: "استشارة أولية مجانية بدون التزامات.",
  },
];

export function FeaturesStrip({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Path drawing animation
    gsap.fromTo(".path-line", 
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      }
    );

    // Staggered reveal
    gsap.from(".feat-node", {
      opacity: 0,
      y: 15,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className="relative bg-white py-24 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* The Central Path Axis (Pristine Light Gray) */}
        <div className="absolute top-[84px] left-12 right-12 h-px bg-gray-100 hidden md:block">
           <div className="path-line absolute inset-0 bg-brand-purple/40 origin-left" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0 relative">
          {features.map((f, i) => {
            const Icon = f.icon;
            const num = (i + 1).toString().padStart(2, "0");
            
            return (
              <div key={i} className="feat-node group flex flex-col items-center md:items-start text-center md:text-left relative px-8">
                
                {/* Technical Node Head */}
                <div className="relative mb-12">
                   <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center bg-white relative z-10 transition-all group-hover:border-brand-purple group-hover:shadow-[0_0_30px_-5px_rgba(136,7,114,0.1)]">
                      <Icon size={24} className="text-brand-green group-hover:text-brand-purple transition-colors" />
                   </div>
                   {/* Vertical link for mobile/stacking */}
                   <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-px h-16 bg-gray-100" />
                </div>

                {/* Content Block */}
                <div className={`${isAr ? "md:text-right" : "md:text-left"}`}>
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                      <span className="text-[10px] font-black text-brand-purple tracking-widest">{num}</span>
                      <div className="w-6 h-[1px] bg-gray-100" />
                   </div>
                   
                   <h3 className="text-xl md:text-2xl font-black text-brand-green tracking-tight mb-4 group-hover:text-brand-purple transition-colors">
                      {isAr ? f.titleAr : f.titleEn}
                   </h3>
                   
                   <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-xs mx-auto md:mx-0">
                      {isAr ? f.descAr : f.descEn}
                   </p>
                </div>

                {/* Technical "Closing" Mark */}
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-4 h-4 rounded-full border-2 border-brand-purple" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
