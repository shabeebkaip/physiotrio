"use client";

import { useState, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Testimonial {
  id: string;
  quote: { en: string; ar: string };
  name: { en: string; ar: string };
  branch: { en: string; ar: string };
  stars: number;
}

interface TestimonialsCarouselProps {
  locale: string;
  testimonials: Testimonial[];
  title?: string;
}

export function TestimonialsCarousel({ locale, testimonials }: TestimonialsCarouselProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const ekgRef = useRef<SVGSVGElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useGSAP(() => {
    // Reveal Header
    gsap.from(".testim-reveal", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    // Swiper entry
    gsap.from(".testim-swiper-container", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      dir={isAr ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#FBFBFD] py-24 lg:py-32"
    >
      {/* ── Background Clinical Logic ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg 
            ref={ekgRef}
            viewBox="0 0 1000 200" 
            className="w-full h-auto stroke-[#E6EEEC] stroke-[2] fill-none"
        >
            <path d="M0,100 L200,100 L220,80 L240,120 L260,20 L280,180 L300,100 L500,100 L520,80 L540,120 L560,20 L580,180 L600,100 L1000,100" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header Block */}
        <div className="mb-20 text-center">
          <div className="testim-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-brand-green">
            <CheckCircle2 size={12} className="text-brand-green" />
            {isAr ? "مجتمع فيزيوتريو" : "THE PHYSIOTRIO COMMUNITY"}
          </div>
          <h2 className="testim-reveal text-4xl font-black leading-tight text-[#0f2d1f] sm:text-6xl">
            {isAr ? (
              <>
                قصص <span className="text-brand-green">النجاح</span> <br />
                التي تلهمنا
              </>
            ) : (
              <>
                STORIES OF <br />
                <span className="text-brand-green">TRUE RECOVERY</span>
              </>
            )}
          </h2>
        </div>

        {/* ── Swiper Carousel ── */}
        <div className="testim-swiper-container relative mx-auto w-full">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSwiper={setSwiperInstance}
            dir={isAr ? "rtl" : "ltr"}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!px-4 !pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="h-auto">
                <div className="group flex h-full flex-col justify-between rounded-[2rem] bg-white p-10 shadow-[0_20px_50px_-20px_rgba(15,45,31,0.08)] border border-[#E6EEEC] transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(15,45,31,0.15)] hover:-translate-y-2">
                  
                  {/* Decorative Background Icon */}
                  <Quote className={`absolute top-8 text-brand-green/10 transition-transform duration-300 group-hover:scale-110 ${isAr ? "left-8 -scale-x-100" : "right-8"}`} size={50} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Stars */}
                    <div className="mb-8 flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={20}
                          fill="#f59e0b"
                          className="text-[#f59e0b]"
                        />
                      ))}
                    </div>

                    {/* Quote text */}
                    <blockquote className="mb-10 text-lg font-medium italic leading-relaxed text-gray-500 line-clamp-4">
                      &ldquo;{isAr ? t.quote.ar : t.quote.en}&rdquo;
                    </blockquote>

                    {/* Author Meta */}
                    <div className="mt-auto flex items-center gap-5 border-t border-gray-100 pt-6">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-brand-purple text-xl font-black text-white shadow-lg shadow-brand-purple/30">
                        {isAr ? t.name.ar.charAt(0) : t.name.en.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-lg font-black tracking-tight text-[#0f2d1f]">
                            {isAr ? t.name.ar : t.name.en}
                        </h4>
                        <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">
                            <MapPin size={12} />
                            {isAr ? t.branch.ar : t.branch.en}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Premium Controls */}
          <div className="mt-10 flex items-center justify-center gap-6">
               <button
                  onClick={() => swiperInstance?.slidePrev()}
                  className="group flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all hover:bg-brand-green hover:border-brand-green hover:text-white active:scale-95"
               >
                  <ChevronLeft size={24} className={`text-gray-500 transition-colors group-hover:text-white ${isAr ? "rotate-180" : ""}`} />
               </button>

               <button
                  onClick={() => swiperInstance?.slideNext()}
                  className="group flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all hover:bg-brand-green hover:border-brand-green hover:text-white active:scale-95"
               >
                  <ChevronRight size={24} className={`text-gray-500 transition-colors group-hover:text-white ${isAr ? "rotate-180" : ""}`} />
               </button>
          </div>
        </div>

        {/* Clinical Proof Ribbon */}
        <div className="testim-reveal mt-20 flex items-center justify-center opacity-40">
             <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                 <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-[#0f2d1f]">50k+</span>
                    <span className="max-w-[80px] text-[9px] font-bold uppercase leading-tight tracking-widest">{isAr ? "مريض سعيد" : "HAPPY PATIENTS"}</span>
                 </div>
                 <div className="hidden h-8 w-px bg-gray-300 md:block" />
                 <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-[#0f2d1f]">99%</span>
                    <span className="max-w-[80px] text-[9px] font-bold uppercase leading-tight tracking-widest">{isAr ? "معدل الرضا" : "SUCCESS RATE"}</span>
                 </div>
                 <div className="hidden h-8 w-px bg-gray-300 md:block" />
                 <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-[#0f2d1f]">10+</span>
                    <span className="max-w-[80px] text-[9px] font-bold uppercase leading-tight tracking-widest">{isAr ? "أطباء مختصين" : "EXPERT DOCTORS"}</span>
                 </div>
             </div>
        </div>
      </div>
    </section>
  );
}
