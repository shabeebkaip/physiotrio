"use client";

import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

  return (
    <section 
      dir={isAr ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-gray-50/50 py-24 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[1300px] px-6">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-purple mb-4"
          >
            {isAr ? "مجتمع فيزيوتريو" : "THE PHYSIOTRIO COMMUNITY"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-gray-900 leading-tight"
          >
            {isAr ? (
              <>قصص <span className="text-brand-green">النجاح</span> التي تلهمنا</>
            ) : (
              <>Stories of <span className="text-brand-green">Success</span> that inspire us</>
            )}
          </motion.h2>
        </div>

        {/* 2-Card Swiper */}
        <div className="relative px-2">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              1024: { slidesPerView: 2, spaceBetween: 40 },
            }}
            className="!pb-16"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="h-auto py-4">
                <div className="group relative h-full flex flex-col bg-white rounded-[2rem] p-10 shadow-sm border-t-4 border-t-transparent transition-all duration-500 hover:border-t-brand-green hover:shadow-xl hover:-translate-y-1">
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        fill={i < t.stars ? "#FBBF24" : "none"} 
                        className={i < t.stars ? "text-[#FBBF24]" : "text-gray-200"} 
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl font-medium text-gray-600 leading-relaxed mb-12">
                    &ldquo;{isAr ? t.quote.ar : t.quote.en}&rdquo;
                  </blockquote>

                  {/* Footer: Author & Large Quote Icon */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar placeholder with Initials */}
                      <div className="w-14 h-14 rounded-full bg-brand-purple/10 flex items-center justify-center text-xl font-black text-brand-purple border border-brand-purple/10">
                        {isAr ? t.name.ar.charAt(0) : t.name.en.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-gray-900">
                          {isAr ? t.name.ar : t.name.en}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          <MapPin size={12} />
                          {isAr ? t.branch.ar : t.branch.en}
                        </div>
                      </div>
                    </div>

                    {/* Large Decorative Quote Icon */}
                    <div className="opacity-[0.70] text-brand-purple group-hover:opacity-[0.80] transition-opacity duration-500">
                      <Quote size={55} fill="currentColor" className={isAr ? "-scale-x-100" : ""} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #e2e8f0;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #4caf50;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
