"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type BodyPart = {
  en: string;
  ar: string;
  id: string;
  iconSrc: string;
  bgImage: string;
  bgPosition: string; // Add position for custom focus
  desc: {
    en: string;
    ar: string;
  };
};

const bodyParts: BodyPart[] = [
  { 
    en: "Neck Pain", 
    ar: "ألم الرقبة", 
    id: "neck", 
    iconSrc: "/images/home/neck.svg",
    bgImage: "/images/bodyparts/neck_treatment.png",
    bgPosition: "center 20%",
    desc: { en: "PhysioTrio Clinic specialized cervical spine therapy.", ar: "علاج الفقرات العنقية المتخصص في عيادة فيزيوتريو." }
  },
  { 
    en: "Shoulder Pain", 
    ar: "ألم الكتف", 
    id: "shoulder", 
    iconSrc: "/images/home/sholder.svg",
    bgImage: "/images/bodyparts/neck.png", 
    bgPosition: "center 30%",
    desc: { en: "Advanced rehabilitation at PhysioTrio Clinic.", ar: "تأهيل متقدم في عيادة فيزيوتريو." }
  },
  { 
    en: "Hip Pain", 
    ar: "ألم الورك", 
    id: "hip", 
    iconSrc: "/images/home/hip.svg",
    bgImage: "/images/bodyparts/hip.webp", 
    bgPosition: "center 70%", // Focus on lower body area
    desc: { en: "Joint mobilization expert care.", ar: "رعاية خبيرة في تحريك المفاصل." }
  },
  { 
    en: "Knee Pain", 
    ar: "ألم الركبة", 
    id: "knee", 
    iconSrc: "/images/home/knee.svg",
    bgImage: "/images/bodyparts/knee.webp", 
    bgPosition: "center 60%", // Focus on knee height
    desc: { en: "PhysioTrio's recovery program for athletes.", ar: "برنامج فيزيوتريو للتعافي الرياضي." }
  },
  { 
    en: "Elbow Pain", 
    ar: "ألم الكوع", 
    id: "elbow", 
    iconSrc: "/images/home/elbow.svg",
    bgImage: "/images/bodyparts/tech.png", 
    bgPosition: "right center",
    desc: { en: "Precision treatment for strain.", ar: "علاج دقيق لإصابات الإجهاد." }
  },
  { 
    en: "Hand & Wrist", 
    ar: "اليد والمعصم", 
    id: "hand", 
    iconSrc: "/images/home/hand.svg",
    bgImage: "/images/bodyparts/hand.png",
    bgPosition: "center center",
    desc: { en: "Fine motor recovery specialists.", ar: "أخصائيون في استعادة المهارات الحركية." }
  },
  { 
    en: "Foot & Ankle", 
    ar: "القدم والكاحل", 
    id: "foot", 
    iconSrc: "/images/home/foot.svg",
    bgImage: "/images/bodyparts/foot.webp", // Patient recovery image
    bgPosition: "center 90%", // Focus on feet
    desc: { en: "Gait analysis at PhysioTrio Clinic.", ar: "تحليل المشي في عيادة فيزيوتريو." }
  },
  { 
    en: "Back Pain", 
    ar: "ألم الظهر", 
    id: "back", 
    iconSrc: "/images/home/neck.svg",
    bgImage: "/images/bodyparts/back.png",
    bgPosition: "center center",
    desc: { en: "World-class spine health center.", ar: "مركز عالمي لصحة العمود الفقري." }
  },
  { 
    en: "Leg Pain", 
    ar: "ألم الساق", 
    id: "leg", 
    iconSrc: "/images/home/hip.svg",
    bgImage: "/images/bodyparts/ankle.webp", // Patient recovery image
    bgPosition: "center 60%", // Focus on legs
    desc: { en: "Muscle recovery and blood flow.", ar: "تعافي العضلات وتحسين الدورة الدموية." }
  },
];

export function BodyPartsSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative py-24 lg:py-32 bg-white"
    >
      <div className="relative z-10 mx-auto max-w-[1300px] px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-purple mb-4"
            >
              {isAr ? "مجالات الخبرة" : "AREAS OF EXPERTISE"}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-black text-physio-dark leading-[0.95] tracking-tight"
            >
              {isAr ? (
                <>تخصصات <span className="text-brand-purple">عالمية</span> <br /> لنتائج ملموسة</>
              ) : (
                <>World-Class <span className="text-brand-purple">Specialties</span> <br /> for results</>
              )}
            </motion.h2>
          </div>
        </div>

        {/* Immersive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-100">
          {bodyParts.map((part, index) => {
            const isPurple = index % 2 === 0;
            const overlayBg = isPurple ? "bg-brand-purple/90" : "bg-brand-green/90";

            return (
              <motion.div
                key={part.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/${locale}/services`}
                  className="group relative block aspect-[4/5] sm:aspect-square overflow-hidden border-r border-b border-gray-100"
                >
                  {/* Background Image Initially Visible */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={part.bgImage}
                      alt={isAr ? part.ar : part.en}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ objectPosition: part.bgPosition }}
                    />
                    {/* Subtle Initial Darkening */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {/* Bottom Label (Initial) */}
                    <div className="absolute inset-x-0 bottom-0 p-8 z-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                      <h3 className="text-2xl font-black text-white drop-shadow-lg">
                        {isAr ? part.ar : part.en}
                      </h3>
                      <div className="w-8 h-1 bg-brand-green mt-2 rounded-full" />
                    </div>
                  </div>

                  {/* Hover Overlay: Color + Icon + Full Text */}
                  <div className={`absolute inset-0 z-20 ${overlayBg} flex flex-col items-center justify-center text-center p-12 transition-all duration-700 ease-in-out translate-y-full group-hover:translate-y-0`}>
                    
                    {/* Icon Reveal */}
                    <div className="relative w-20 h-20 mb-8 transition-transform duration-700 delay-100 group-hover:scale-100 scale-75">
                      <Image
                        src={part.iconSrc}
                        alt={isAr ? part.ar : part.en}
                        fill
                        className="object-contain brightness-0 invert"
                      />
                    </div>

                    <h3 className="text-2xl font-black text-white mb-4">
                      {isAr ? part.ar : part.en}
                    </h3>
                    
                    <p className="text-sm font-medium text-white/90 mb-10 max-w-[240px]">
                      {isAr ? part.desc.ar : part.desc.en}
                    </p>

                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-900 shadow-xl">
                      <ArrowRight size={20} className={isAr ? "rotate-180" : ""} />
                    </div>

                    {/* Subtle Background Number */}
                    <span className="absolute top-6 left-6 text-5xl font-black text-white/10 select-none">
                      {index + 1}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}