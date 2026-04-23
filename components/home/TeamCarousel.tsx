"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, User } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

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
  const isAr = locale === "ar";
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      className="relative overflow-hidden bg-white py-24 md:py-40"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Header ── */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-block text-[10px] font-black uppercase tracking-[0.4em] text-brand-green"
            >
              {isAr ? "نخبة المتخصصين" : "THE ELITE TEAM"}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-black tracking-tight text-gray-900 leading-[0.95]"
            >
              {isAr ? (
                <>خبرتنا <span className="text-brand-purple">في خدمتك</span></>
              ) : (
                <>Clinical <span className="text-brand-purple">Authority</span></>
              )}
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg font-medium text-gray-400 max-w-sm"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* ── Swiper ── */}
      <div className="relative z-10">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          centeredSlides={false}
          loop={true}
          slidesPerView={1.2}
          spaceBetween={20}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 30 },
            1024: { slidesPerView: 3.2, spaceBetween: 40 },
            1280: { slidesPerView: 4.2, spaceBetween: 40 },
          }}
          className="tc-swiper px-6 !pb-20"
        >
          {therapists.map((th) => {
            const name = isAr ? th.name.ar : th.name.en;
            const role = isAr ? th.title.ar : th.title.en;

            return (
              <SwiperSlide key={th.id}>
                <motion.div
                  onMouseEnter={() => setHoveredId(th.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative h-[500px] rounded-[2.5rem] bg-gray-50 overflow-hidden transition-all duration-700"
                >
                  {/* Background Image Container */}
                  <div className="absolute inset-0 z-0">
                    {th.image ? (
                      <Image
                        src={th.image}
                        alt={name}
                        fill
                        className="object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <User size={80} className="text-gray-200" />
                      </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
                  </div>

                  {/* Info Content - Bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-black text-white leading-tight mb-1 group-hover:text-brand-green transition-colors duration-500">
                        {name}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                        {role}
                      </p>
                    </div>

                    {/* Hidden Details Reveal */}
                    <AnimatePresence>
                      {hoveredId === th.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{isAr ? "الخبرة" : "Experience"}</span>
                              <span className="text-sm font-bold text-white">{th.yearsExp}+ {isAr ? "سنوات" : "Years"}</span>
                            </div>
                            <Link
                              href={`/${locale}/book/${th.branches[0] || "riyadh"}`}
                              className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white hover:scale-110 transition-transform"
                            >
                              <ArrowRight size={18} className={isAr ? "rotate-180" : ""} />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white">
                        {th.branches[0] || "Riyadh"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <style jsx global>{`
        .tc-swiper .swiper-pagination-bullet {
          background: #e2e8f0;
          opacity: 1;
        }
        .tc-swiper .swiper-pagination-bullet-active {
          background: #5E0450;
          width: 20px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}