"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Zap, HeartPulse } from "lucide-react";

interface FeatureItem {
  icon: any;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  image: string;
}

const features: FeatureItem[] = [
  {
    icon: ShieldCheck,
    titleEn: "Expert Therapists",
    titleAr: "معالجون متخصصون",
    descEn: "Our team of licensed and certified physiotherapists ensures your recovery.",
    descAr: "فريقنا من أخصائيي العلاج الطبيعي المرخصين يضمن تعافيك.",
    image: "/images/features/saudi_expert_therapist.png",
  },
  {
    icon: Zap,
    titleEn: "Clinical Precision",
    titleAr: "دقة سريرية",
    descEn: "Advanced therapeutic management designed to address acute pain.",
    descAr: "إدارة علاجية متقدمة مصممة للتعامل مع الآلام الحادة.",
    image: "/images/features/clinical_precision.png",
  },
  {
    icon: HeartPulse,
    titleEn: "Quality of Life",
    titleAr: "جودة الحياة",
    descEn: "Quality care focused on enhancing your long-term mobility and health.",
    descAr: "رعاية عالية الجودة تركز على تحسين قدرتك الحركية وصحتك.",
    image: "/images/features/patient_recovery.png",
  },
];

export function FeaturesStrip({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative bg-white py-24 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[1300px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col h-full"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-gray-100 mb-[-80px] z-0">
                <Image
                  src={f.image}
                  alt={isAr ? f.titleAr : f.titleEn}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/5" />
              </div>

              {/* Info Overlay Box */}
              <div className="relative z-10 ml-6 mr-6 md:ml-8 md:mr-0 p-8 md:p-10 bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col">
                {/* Icon */}
                <div className="mb-6 text-gray-400 group-hover:text-brand-purple transition-colors duration-500">
                  <f.icon size={44} strokeWidth={1} />
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4 tracking-tight transition-colors duration-500 group-hover:text-brand-purple">
                  {isAr ? f.titleAr : f.titleEn}
                </h3>
                <p className="text-sm font-medium text-gray-400 leading-relaxed mb-8">
                  {isAr ? f.descAr : f.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
