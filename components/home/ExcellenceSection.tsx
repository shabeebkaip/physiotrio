"use client";

import { useRef } from "react";
import Image from "next/image";
import { Users, Crosshair, Award, Zap, Heart, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ExcellenceSectionProps {
  locale: string;
}

export function ExcellenceSection({ locale }: ExcellenceSectionProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const leftItems = [
    {
      title: isAr ? "فريق ذو خبرة" : "Experienced Team",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "We understand that injuries and acute pain can unexpectedly.",
      icon: Users,
    },
    {
      title: isAr ? "نهج يركز على المريض" : "Patient-Centered Approach",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "We understand that injuries and acute pain can unexpectedly.",
      icon: Crosshair,
    },
    {
      title: isAr ? "الخبرة والتجربة" : "Expertise And Experience",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "We understand that injuries and acute pain can unexpectedly.",
      icon: Award,
    },
  ];

  const rightItems = [
    {
      title: isAr ? "تقنية متقدمة" : "Advanced Technology",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "We understand that injuries and acute pain can unexpectedly.",
      icon: Zap,
    },
    {
      title: isAr ? "مريح وسهل الوصول" : "Convenient And Accessible",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "We understand that injuries and acute pain can unexpectedly.",
      icon: Heart,
    },
    {
      title: isAr ? "المشاركة المجتمعية" : "Community Involvement",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "We understand that injuries and acute pain can unexpectedly.",
      icon: CheckCircle2,
    },
  ];

  useGSAP(() => {
    gsap.fromTo(".ex-hdr", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
      }
    );
    gsap.fromTo(".ex-card", 
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, scale: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      }
    );
    gsap.fromTo(".ex-doctor",
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#F8FAF9] overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="ex-hdr text-4xl md:text-5xl lg:text-7xl font-black leading-tight" style={{ color: "#0f2d1f" }}>
            <span style={{ color: "rgba(15,45,31,0.5)" }}>{isAr ? "التميز في" : "Excellence In"}</span>{" "}
            <span style={{ color: "#0f2d1f" }}>{isAr ? "الرعاية وإعادة التأهيل" : "Care And Rehabilitation"}</span>
          </h2>
        </div>

        {/* Feature Box Container */}
        <div ref={containerRef} className="ex-card relative rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[560px]">
          
          {/* Left Side (Light) */}
          <div className="flex-1 bg-white p-10 lg:p-16 flex flex-col justify-between gap-12 border-r border-black/5 relative z-0">
            {leftItems.map((item, i) => (
              <div key={i} className={`flex items-start gap-6 ${isAr ? "flex-row-reverse text-right" : "text-left"}`}>
                <div className="w-14 h-14 rounded-2xl bg-[#E6EEEC] flex items-center justify-center shrink-0 shadow-sm border border-black/5">
                  <item.icon size={26} className="text-[#0f2d1f]" />
                </div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-black mb-2" style={{ color: "#0f2d1f" }}>{item.title}</h4>
                  <p className="text-sm lg:text-base leading-relaxed text-gray-400 font-medium max-w-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side (Dark with Brand Gradient) */}
          <div 
            className="flex-1 p-10 lg:p-16 flex flex-col justify-between gap-12 relative z-0"
            style={{ background: "linear-gradient(135deg, #0f2d1f 0%, #081a12 100%)" }}
          >
            {/* Subtle brand glow overlay */}
            <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at top right, #880772, transparent)" }}/>
            
            {rightItems.map((item, i) => (
              <div key={i} className={`relative flex items-start gap-6 ${isAr ? "flex-row text-left" : "flex-row-reverse text-right"}`}>
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-lg"
                  style={{ background: "linear-gradient(135deg, #880772, #5E0450)" }}
                >
                  <item.icon size={26} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl lg:text-2xl font-black mb-2 text-white">{item.title}</h4>
                  <p className="text-sm lg:text-base leading-relaxed text-white/40 font-medium max-w-xs ml-auto mr-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Doctor Image */}
          <div className="ex-doctor absolute left-1/2 bottom-0 -translate-x-1/2 w-full max-w-[500px] pointer-events-none hidden lg:block z-20">
            <Image 
              src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&q=90" 
              alt="Medical Professional" 
              width={800}
              height={1100}
              className="object-contain"
              style={{ 
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.5))",
                transform: "translateY(5%)"
              }}
              unoptimized
            />
          </div>
        </div>

      </div>
    </section>
  );
}
