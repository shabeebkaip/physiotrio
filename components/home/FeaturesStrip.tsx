"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

interface FeatureItem {
  image: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const features: FeatureItem[] = [
  {
    image: "/images/home/expert.svg",
    titleEn: "Expert Therapists",
    titleAr: "معالجون متخصصون",
    descEn: "Our team of licensed and certified physiotherapists.",
    descAr: "فريقنا من أخصائيي العلاج الطبيعي المرخصين والمعتمدين.",
  },
  {
    image: "/images/home/emergency.svg",
    titleEn: "Emergency Service",
    titleAr: "رعاية طارئ",
    descEn: "Therapeutic management designed to address acute pain.",
    descAr: "إدارة علاجية مصممة للتعامل مع الآلام الحادة.",
  },
  {
    image: "/images/home/consult.svg",
    titleEn: "Free Consultant",
    titleAr: "استشارة مجانية",
    descEn: "Quality care focused on enhancing your quality of life.",
    descAr: "رعاية عالية الجودة تركز على تحسين جودة حياتك.",
  },
];

export function FeaturesStrip({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".feat-item", 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className="relative bg-[#07150f] py-12 md:py-20 overflow-hidden border-t border-white/5"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {features.map((f, i) => {
            return (
              <div 
                key={i} 
                className={`feat-item group flex items-start md:items-center gap-6 px-4 md:px-8 py-8 transition-all duration-300
                  ${i !== features.length - 1 ? "md:border-r border-white/10" : ""}
                  ${isAr && i !== features.length - 1 ? "md:border-l md:border-r-0" : ""}
                `}
              >
                {/* Expanding Icon Box */}
                <div className="relative flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center overflow-hidden transition-all duration-500">
                   {/* Expanding Background Layer */}
                   <div className="absolute inset-0 bg-white scale-0 rounded-full opacity-0 transition-all duration-500 ease-out group-hover:scale-[1.6] group-hover:opacity-100 group-hover:rounded-none" />
                   
                   <div className="relative z-10 w-8 h-8 transition-all duration-500 group-hover:brightness-0">
                     <Image 
                       src={f.image}
                       alt={isAr ? f.titleAr : f.titleEn}
                       width={32}
                       height={32}
                       className="object-contain"
                     />
                   </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                   <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
                      {isAr ? f.titleAr : f.titleEn}
                   </h3>
                   <p className="text-sm font-medium text-white/40 leading-relaxed max-w-xs">
                      {isAr ? f.descAr : f.descEn}
                   </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(76,175,80,0.03)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
}
