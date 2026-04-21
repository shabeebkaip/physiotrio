"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Therapist {
  id: string;
  name: { en: string; ar: string };
  title: { en: string; ar: string };
  specializations: string[];
  branches: string[];
  languages: string[];
  yearsExp: number;
  rating: number;
  initials: string;
  image?: string | null;
}

interface TeamCarouselProps {
  locale: string;
  therapists: Therapist[];
  title: string;
  subtitle: string;
  bookWithText: string;
}

export function TeamCarousel({
  locale,
  therapists,
  title,
  subtitle,
}: TeamCarouselProps) {
  const isAr       = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const prevRef    = useRef<HTMLButtonElement>(null);
  const nextRef    = useRef<HTMLButtonElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── GSAP scroll entrance ── */
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });
      tl.fromTo(".tc-eyebrow",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(".tc-title",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(".tc-subtitle",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(".tc-swiper-wrap",
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    },
    { scope: sectionRef }
  );

  return (
    <>
      <style>{`
        /* Standard Swiper pagination override */
        .tc-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #e2e8f0;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .tc-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #0f2d1f;
        }
        
        .tc-swiper .swiper-slide {
          transition: transform 0.5s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.5s ease;
          opacity: 0.4;
          transform: scale(0.9);
        }
        .tc-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-white py-20 pb-32 md:py-32"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* ── Header ── */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <span className="tc-eyebrow mb-4 inline-block text-[11px] font-black uppercase tracking-[0.2em] text-[#3dbb7c]">
            {isAr ? "نخبة المتخصصين" : "OUR MEDICAL TEAM"}
          </span>

          <h2 className="tc-title mb-6 text-4xl font-black tracking-tight text-[#0f2d1f] sm:text-5xl md:text-6xl">
            {title}
          </h2>

          <p className="tc-subtitle mx-auto max-w-2xl text-lg font-medium text-[#4a6b59]/80">
            {subtitle}
          </p>
        </div>

        {/* ── Swiper ── */}
        <div className="tc-swiper-wrap relative z-10 mt-20">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            centeredSlides
            loop
            slidesPerView={1.4}
            spaceBetween={30}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".tc-pagination" }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation === "object") {
                (swiper.params.navigation as any).prevEl = prevRef.current;
                (swiper.params.navigation as any).nextEl = nextRef.current;
              }
            }}
            onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
            className="tc-swiper px-6"
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 40 },
              1024: { slidesPerView: 3.2, spaceBetween: 50 },
              1280: { slidesPerView: 4.0, spaceBetween: 60 },
            }}
          >
            {therapists.map((th) => {
              const name = isAr ? th.name.ar : th.name.en;
              // Pick first specialization as a shorter label, or fallback to title
              const category = isAr 
                ? (th.specializations[0] || th.title.ar)
                : (th.specializations[0]?.replace(/-/g, " ") || th.title.en);

              return (
                <SwiperSlide key={th.id} className="py-10">
                  <div className="flex flex-col items-center">
                    {/* Circle Image Wrapper */}
                    <div className="relative mb-8 aspect-square w-full max-w-[240px]">
                      <div className="absolute inset-0 rounded-full border border-gray-100 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] bg-white">
                        <div className="relative h-full w-full overflow-hidden rounded-full border border-gray-50 bg-[#f9fafb]">
                          {th.image ? (
                            <Image
                              src={th.image}
                              alt={name}
                              fill
                              className="object-cover object-top transition-transform duration-500 hover:scale-110"
                              unoptimized
                              draggable={false}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-gray-200">
                              {th.initials}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Text content - centered */}
                    <div className="text-center">
                      <h3 className="mb-2 text-xl font-black tracking-tight text-[#0f2d1f] md:text-2xl">
                        {name}
                      </h3>
                      <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
                        {category}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

        </div>

      </section>

    </>
  );
}