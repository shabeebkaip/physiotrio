"use client";

import { useRef } from "react";
import Image from "next/image";
import { Users, Crosshair, Award, Zap, Heart, CheckCircle2, Star, ShieldCheck, Activity, ArrowRight } from "lucide-react";
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

  const features = [
    {
      title: isAr ? "فريق ذو خبرة" : "Experienced Team",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "Specialized practitioners dedicated to your rapid and safe recovery journey.",
      icon: Users,
      color: "var(--color-brand-purple)",
      className: "lg:col-span-4 lg:row-span-2 bg-[#F3F6F5]",
    },
    {
      title: isAr ? "تقنية متقدمة" : "Advanced Technology",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "Utilizing cutting-edge diagnostic and therapeutic equipment for precise treatment.",
      icon: Zap,
      color: "var(--color-brand-green)",
      className: "lg:col-span-8 lg:row-span-1 bg-white border border-brand-green/10",
      isFeatured: true,
    },
    {
      title: isAr ? "نهج متمحور حول المريض" : "Patient-Centered",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "Tailored treatment plans that respect your unique needs and lifestyle goals.",
      icon: Heart,
      color: "#ff5722",
      className: "lg:col-span-4 lg:row-span-1 bg-white",
    },
    {
      title: isAr ? "الخبرة والمهارة" : "Expertise & Skill",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "Decades of combined clinical experience in complex physical rehabilitation.",
      icon: Award,
      color: "var(--color-brand-purple)",
      className: "lg:col-span-4 lg:row-span-1 bg-[#0f2d1f] text-white",
    },
    {
      title: isAr ? "مريح وسهل الوصول" : "Accessible Care",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "Strategic locations and flexible scheduling to fit your professional life.",
      icon: ShieldCheck,
      color: "var(--color-brand-green)",
      className: "lg:col-span-6 lg:row-span-1 bg-white",
    },
    {
      title: isAr ? "المشاركة المجتمعية" : "Community Focus",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "We are more than a clinic; we are your local partners in long-term health.",
      icon: Activity,
      color: "var(--color-brand-purple)",
      className: "lg:col-span-6 lg:row-span-1 bg-white/50 backdrop-blur-md border border-white/50",
    },
  ];

  useGSAP(() => {
    // Header animation
    gsap.fromTo(".ex-hdr-anim", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      }
    );

    // Bento grid cards animation
    gsap.fromTo(".bento-card", 
      { opacity: 0, y: 40, scale: 0.95 },
      { 
        opacity: 1, y: 0, scale: 1, 
        duration: 0.8, 
        stagger: {
           each: 0.1,
           from: "start"
        },
        ease: "power4.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      }
    );

    // Subtle parallax for the floating doctor image if any
    gsap.to(".ex-visual-move", {
       y: -20,
       scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
       }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#F8FAF9] overflow-hidden" id="excellence">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <div className="ex-hdr-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green-dark text-xs font-bold uppercase tracking-widest mb-6">
              <Star size={14} fill="currentColor" />
              {isAr ? "التميز التشغيلي" : "Operational Excellence"}
            </div>
            <h2 className="ex-hdr-anim text-[42px] sm:text-[56px] lg:text-[72px] font-black leading-[0.95] tracking-tight" style={{ color: "#0f2d1f" }}>
              <span className="opacity-40">{isAr ? "التميز في" : "Excellence In"}</span> <br/>
              {isAr ? "الرعاية وإعادة التأهيل" : "Care & Rehabilitation"}
            </h2>
          </div>
          <p className="ex-hdr-anim text-lg text-gray-500 font-medium max-w-sm pb-2">
            {isAr ? "نحن نمزج بين الخبرة السريرية وأحدث التقنيات لتقديم رعاية لا مثيل لها." : "We blend clinical expertise with state-of-the-art technology to deliver unparalleled rehabilitation care."}
          </p>
        </div>

        {/* Bento Grid Container */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 min-h-[800px]">
          
          {features.map((item, i) => (
             <div 
               key={i} 
               className={`bento-card group relative rounded-[2.5rem] p-8 lg:p-10 flex flex-col justify-between overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${item.className}`}
             >
                {/* Background Decor / Image */}
                {i === 0 ? (
                  <div className="absolute inset-0 z-0">
                    <Image 
                      src="/images/excellence-expert.png" 
                      alt="Expert Team"
                      fill
                      className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F3F6F5] via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="absolute top-0 right-0 p-12 transition-transform duration-700 group-hover:scale-125 opacity-[0.03] group-hover:opacity-[0.07] pointer-events-none">
                     <item.icon size={180} strokeWidth={1} />
                  </div>
                )}

                <div className="relative z-10">
                   <div 
                     className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-sm`}
                     style={{ 
                       background: item.isFeatured ? "var(--color-brand-green)" : (item.className.includes("text-white") ? "rgba(255,255,255,0.1)" : "white"),
                       color: (item.isFeatured || item.className.includes("text-white")) ? "white" : "var(--color-brand-green)"
                     }}
                   >
                      <item.icon size={28} />
                   </div>
                   
                   <h3 className={`text-2xl lg:text-3xl font-black mb-4 leading-tight ${item.className.includes("text-white") ? "text-white" : "text-[#0f2d1f]"}`}>
                     {item.title}
                   </h3>
                   <p className={`text-base font-medium leading-relaxed opacity-60 max-w-xs ${item.className.includes("text-white") ? "text-white/70" : "text-gray-500"}`}>
                     {item.desc}
                   </p>
                </div>

                {item.isFeatured ? (
                   <div className="relative z-10 mt-12 flex items-center gap-4">
                      <div className="flex -space-x-3">
                         {[1,2,3].map(j => (
                           <div key={j} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                              <Image src={`https://i.pravatar.cc/100?img=${j+20}`} alt="Patient" width={40} height={40} />
                           </div>
                         ))}
                      </div>
                      <span className="text-sm font-bold text-brand-green-dark">Trust verified by 1k+ patients</span>
                   </div>
                ) : (
                  <div className="relative z-10 mt-12">
                    <div className={`w-8 h-8 rounded-full border border-current opacity-20 flex items-center justify-center group-hover:opacity-100 transition-opacity ${item.className.includes("text-white") ? "text-white" : "text-[#0f2d1f]"}`}>
                       <ArrowRight size={16} className={`transition-transform ${isAr ? "rotate-180" : "group-hover:translate-x-0.5"}`} />
                    </div>
                  </div>
                )}
                
                {/* Glassy reflection effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
             </div>
          ))}
        </div>

      </div>
    </section>
  );
}
