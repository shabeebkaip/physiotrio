"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield } from "lucide-react";
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

export function ServicesGrid({ locale, services, title, subtitle }: ServicesGridProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".locked-card") as HTMLElement[];
    
    // Pin section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${cards.length * 80}%`,
        pin: true,
        scrub: 1,
      }
    });

    // Stacking Animation
    cards.forEach((card, i) => {
      if (i === 0) return; // Keep first card visible
      
      tl.fromTo(card,
        { yPercent: 100, autoAlpha: 0 },
        { 
          yPercent: 0, 
          autoAlpha: 1, 
          ease: "none",
          onStart: () => {
             gsap.to(cards[i-1], { scale: 0.96, opacity: 0.4, duration: 0.5 });
          },
          onReverseComplete: () => {
             gsap.to(cards[i-1], { scale: 1, opacity: 1, duration: 0.5 });
          }
        },
        i
      );
    });
  }, { scope: sectionRef });

  const fallbackImage = "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80";

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#FBFBFD] overflow-hidden"
    >
      <div className="relative h-screen w-full px-6 lg:px-12 flex flex-col">
        
        {/* ── Persistent Header ── */}
        <div className="pt-16 pb-4 z-[100] max-w-4xl mx-auto text-center w-full">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/5 border border-brand-purple/10 mb-4">
              <span className="w-1 h-1 rounded-full bg-brand-purple animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-purple">
                 {isAr ? "خدماتنا" : "Therapeutic Specialties"}
              </span>
           </div>
           <h2 className="text-4xl lg:text-6xl font-black text-[#1d1d1f] tracking-tight mb-4">
              {title}
           </h2>
           <p className="text-[#86868b] text-base lg:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              {subtitle}
           </p>
        </div>

        {/* ── Cards Stack Container ── */}
        <div className="relative flex-1 w-full max-w-[1200px] mx-auto">
          {services.map((service, idx) => (
            <div 
              key={service.id}
              className="locked-card absolute inset-0 w-full h-[65vh] lg:h-[60vh] flex items-center justify-center"
              style={{ 
                zIndex: idx + 10,
                // Offset top slightly to start below header
                top: "10%", 
              }}
            >
              <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col lg:flex-row">
                
                {/* Image Section */}
                <div className="flex-1 relative overflow-hidden">
                  <Image
                    src={service.image || fallbackImage}
                    alt={isAr ? service.name.ar : service.name.en}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center bg-white">
                   <span className="text-[10px] font-black text-brand-green uppercase tracking-[0.4em] mb-4 block">
                      Specialized Care
                   </span>
                   <h3 className="text-3xl lg:text-5xl font-black text-[#1d1d1f] tracking-tighter leading-tight mb-6">
                      {isAr ? service.name.ar : service.name.en}
                   </h3>
                   <p className="text-[#86868b] text-base lg:text-lg leading-relaxed mb-10 max-w-lg">
                      {isAr ? service.shortDesc.ar : service.shortDesc.en}
                   </p>

                   <div className="flex items-center gap-6 mt-auto">
                    <Link
                      href={`/${locale}/services/${service.slug}`}
                      className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest text-brand-purple hover:gap-5 transition-all"
                    >
                      {isAr ? "اقرأ المزيد" : "Details"}
                      <ArrowRight size={18} className={isAr ? "rotate-180" : ""} />
                    </Link>
                    <Link
                      href={`/${locale}/book/riyadh`}
                      className="px-8 py-4 rounded-full bg-[#1d1d1f] text-white font-bold text-xs hover:bg-brand-purple transition-colors shadow-lg"
                    >
                      {isAr ? "احجز الآن" : "Book session"}
                    </Link>
                   </div>
                </div>

                {/* Minimalist Trust Indicator (Corner) */}
                <div className="absolute bottom-10 right-10 flex items-center gap-2 opacity-30 select-none">
                   <Shield size={16} />
                   <span className="text-[8px] font-black uppercase tracking-widest">Medical Standard</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
