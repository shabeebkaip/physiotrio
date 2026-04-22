"use client";

import { useRef } from "react";
import Image from "next/image";
import { Users, Zap, Heart, Award, ShieldCheck, Activity } from "lucide-react";
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
  const expertRef = useRef<HTMLDivElement>(null);

  const leftFeatures = [
    {
      title: isAr ? "فريق ذو خبرة" : "Experienced Team",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "Specialized practitioners dedicated to your rapid and safe recovery journey.",
      icon: Users,
      iconColor: "var(--color-brand-purple)",
    },
    {
      title: isAr ? "نهج متمحور حول المريض" : "Patient-Centered",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "Tailored treatment plans that respect your unique needs and lifestyle goals.",
      icon: Heart,
      iconColor: "var(--color-brand-purple)",
    },
    {
      title: isAr ? "الخبرة والمهارة" : "Expertise & Skill",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "Decades of combined clinical experience in complex physical rehabilitation.",
      icon: Award,
      iconColor: "var(--color-brand-purple)",
    },
  ];

  const rightFeatures = [
    {
      title: isAr ? "تقنية متقدمة" : "Advanced Technology",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "Utilizing cutting-edge diagnostic and therapeutic equipment for precise treatment.",
      icon: Zap,
      iconColor: "var(--color-brand-green)",
    },
    {
      title: isAr ? "مريح وسهل الوصول" : "Accessible Care",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "Strategic locations and flexible scheduling to fit your professional life.",
      icon: ShieldCheck,
      iconColor: "var(--color-brand-green)",
    },
    {
      title: isAr ? "المشاركة المجتمعية" : "Community Focus",
      desc: isAr ? "نحن نتفهم أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع." : "We are more than a clinic; we are your local partners in long-term health.",
      icon: Activity,
      iconColor: "var(--color-brand-green)",
    },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });

    tl.from(".ex-title", { opacity: 0, y: 40, duration: 1, ease: "power3.out" })
      .from(".ex-split-container", { scale: 0.95, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=0.6")
      .from(".feat-left", { opacity: 0, x: -30, stagger: 0.2, duration: 0.8, ease: "power2.out" }, "-=0.8")
      .from(".feat-right", { opacity: 0, x: 30, stagger: 0.2, duration: 0.8, ease: "power2.out" }, "-=0.8")
      .from(".ex-expert-img", { opacity: 0, y: 100, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.75)" }, "-=1");

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} dir={isAr ? "rtl" : "ltr"} className="py-16 lg:py-32 bg-white overflow-hidden" id="excellence">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Centered Heading */}
        <div className="ex-title text-center mb-12 lg:mb-20">
           <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="text-brand-purple">{isAr ? "التميز في" : "Excellence In"}</span> <br className="md:hidden" />
              <span className="md:ml-3 text-brand-green">{isAr ? "الرعاية وإعادة التأهيل" : "Care And Rehabilitation"}</span>
           </h2>
        </div>

        {/* The Split Container */}
        <div className="ex-split-container relative">
           <div className="grid grid-cols-1 lg:grid-cols-2 rounded-[40px] lg:rounded-[60px] overflow-hidden border border-gray-100 shadow-xl">
              
              {/* Left Canvas (Muted Purple) */}
              <div className={`bg-[#F3E5F1]/30 p-8 md:p-12 lg:p-14 flex flex-col justify-center gap-10 md:gap-12 order-2 lg:order-1 ${isAr ? "lg:pl-30" : "lg:pr-32"}`}>
                 {leftFeatures.map((feat, i) => (
                    <div key={i} className={`feat-left group flex items-center gap-6 ${isAr ? "text-right" : "text-left"}`}>
                       <div 
                         className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110"
                         style={{ color: feat.iconColor }}
                       >
                          <feat.icon size={28} strokeWidth={1.5} />
                       </div>
                       <div>
                          <h3 className="text-xl font-bold text-physio-dark mb-1">{feat.title}</h3>
                          <p className="text-sm font-medium text-gray-400 leading-relaxed max-w-xs">{feat.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Right Canvas (Muted Green) */}
              <div className={`bg-[#f0faf0] p-8 md:p-12 lg:p-14 flex flex-col justify-center gap-10 md:gap-12 order-3 lg:order-2 ${isAr ? "lg:pr-30" : "lg:pl-32"}`}>
                 {rightFeatures.map((feat, i) => (
                    <div key={i} className={`feat-right group flex items-center gap-6 flex-row-reverse ${isAr ? "text-left" : "text-right"}`}>
                       <div 
                          className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{ color: feat.iconColor }}
                       >
                          <feat.icon size={28} strokeWidth={1.5} />
                       </div>
                       <div>
                          <h3 className="text-xl font-bold text-physio-dark mb-1">{feat.title}</h3>
                          <p className="text-sm font-medium text-gray-400 leading-relaxed max-w-xs">{feat.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Overlapping Central Expert Image */}
           <div ref={expertRef} className="ex-expert-img absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] pointer-events-none z-20 hidden lg:block">
              <div className="relative aspect-[9/9] w-full">
                 <Image 
                   src="/images/home/doctor.png" 
                   alt="Physiotherapy Expert"
                   fill
                   className="object-contain object-bottom"
                   unoptimized
                 />
              </div>
           </div>
        </div>

        {/* Mobile Expert Version (Visible only on small screens) */}
        {/* <div className="lg:hidden mt-[-100px] relative z-20 flex justify-center h-[300px]">
           <Image 
             src="/images/home/doctor.png" 
             alt="Physiotherapy Expert"
             width={300}
             height={400}
             className="object-contain object-bottom"
             unoptimized
           />
        </div> */}

      </div>
    </section>
  );
}
