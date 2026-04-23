"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { rehabTechnologies } from "@/lib/data/rehabTech";

const stats = [
  { value: "13+", labelEn: "Years Experience", labelAr: "سنة خبرة" },
  { value: "36+", labelEn: "Expert Therapists", labelAr: "معالج متخصص" },
  { value: "10K+", labelEn: "Patients Treated", labelAr: "مريض تلقى العلاج" },
  { value: "2", labelEn: "KSA Branches", labelAr: "فروع في المملكة" },
];

const values = [
  {
    en: { title: "Clinical Excellence", desc: "Every treatment plan is grounded in evidence-based practice, delivered by MOH-licensed specialists." },
    ar: { title: "التميز السريري", desc: "كل خطة علاجية مبنية على الممارسة القائمة على الأدلة، يقدمها متخصصون مرخصون من وزارة الصحة." },
  },
  {
    en: { title: "Patient-Centered Care", desc: "Your goals, timeline, and lifestyle shape every decision we make together." },
    ar: { title: "الرعاية المتمحورة حول المريض", desc: "أهدافك وجدولك الزمني وأسلوب حياتك يشكل كل قرار نتخذه معاً." },
  },
  {
    en: { title: "Advanced Technology", desc: "Lokomat, Gait Analysis, AlterG — we invest in equipment that delivers measurable outcomes." },
    ar: { title: "التكنولوجيا المتقدمة", desc: "لوكومات، تحليل المشية، ألتر جي — نستثمر في التقنيات التي تحقق نتائج قابلة للقياس." },
  },
  {
    en: { title: "Cultural Sensitivity", desc: "Arabic and English services, private rooms for women, and a team that understands Saudi patients' needs." },
    ar: { title: "الحساسية الثقافية", desc: "خدمات بالعربية والإنجليزية، غرف خاصة للسيدات، وفريق يفهم احتياجات المرضى السعوديين." },
  },
];

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

export function AboutContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";

  return (
    <main>
      {/* ── Page Header + Stats ─────────────────────────────────────────── */}
      <div className="pt-28 pb-10 px-4 sm:px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-brand-purple)" }}>
            {isAr ? "من نحن" : "About Us"}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {isAr ? "فيزيوتريو — رعاية متخصصة في المملكة" : "PhysioTrio — Specialist Care in Saudi Arabia"}
          </h1>
          <p className="text-base text-gray-500 max-w-2xl mb-10">
            {isAr
              ? "مركز علاج طبيعي متخصص يعمل تحت مظلة مجموعة برجيل القابضة، يقدم خدمات عالية الجودة في الرياض ومكة المكرمة منذ عام 2013."
              : "A specialist physiotherapy centre operating under Burjeel Holdings, delivering high-quality care across Riyadh and Makkah since 2013."}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: "var(--color-brand-purple)" }}>{stat.value}</div>
                <div className="text-sm text-gray-500">{isAr ? stat.labelAr : stat.labelEn}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── About + Burjeel ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
            >
              {isAr ? "مجموعة برجيل القابضة" : "Burjeel Holdings"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 leading-snug">
              {isAr ? "جزء من شبكة رعاية صحية إقليمية رائدة" : "Part of a Leading Regional Healthcare Network"}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {isAr
                ? "تعمل فيزيوتريو تحت مظلة مجموعة برجيل القابضة، إحدى أكبر مجموعات الرعاية الصحية في منطقة الشرق الأوسط وشمال أفريقيا. تتيح لنا هذه الشراكة الاستراتيجية الوصول إلى أحدث البروتوكولات العلاجية والمعايير الدولية في رعاية المرضى."
                : "PhysioTrio operates under Burjeel Holdings, one of the largest healthcare groups across the Middle East and North Africa. This partnership gives us access to the latest treatment protocols and international standards of patient care."}
            </p>
            <div className="space-y-3">
              {[
                isAr ? "أكثر من 13 عاماً من الخبرة السريرية" : "Over 13 years of clinical experience",
                isAr ? "معايير رعاية دولية معتمدة" : "Internationally accredited care standards",
                isAr ? "فريق من المعالجين المرخصين من وزارة الصحة" : "MOH-licensed therapist team",
                isAr ? "حضور في الرياض ومكة المكرمة" : "Present in Riyadh and Makkah",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="flex-shrink-0" style={{ color: "var(--color-brand-green)" }} />
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative h-64 sm:h-80 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Image
              src="https://physiotherabia.com/wp-content/uploads/2023/07/B-PH03-1.jpg"
              alt="PhysioTrio Clinic"
              fill
              className="object-cover"
              unoptimized
            />
            <div
              className="absolute bottom-4 left-4 px-4 py-2.5 rounded-xl text-sm"
              style={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <p className="text-xs text-gray-500 mb-0.5">{isAr ? "جزء من" : "Part of"}</p>
              <p className="font-bold text-gray-900">Burjeel Holdings</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24" style={{ background: "#f8f9fb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
            >
              {isAr ? "قيمنا" : "Our Values"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {isAr ? "المبادئ التي تقود عملنا" : "The Principles That Guide Our Work"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-white border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {isAr ? v.ar.title : v.en.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {isAr ? v.ar.desc : v.en.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rehab Technology ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
            >
              {isAr ? "تقنياتنا" : "Our Technology"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {isAr ? "معدات إعادة التأهيل المتقدمة" : "Advanced Rehabilitation Equipment"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rehabTechnologies.map((tech) => (
              <div
                key={tech.id}
                className="rounded-xl border border-gray-200 overflow-hidden bg-white"
              >
                {tech.image && (
                  <div className="relative h-40">
                    <Image
                      src={tech.image}
                      alt={isAr ? tech.name.ar : tech.name.en}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-1.5 text-sm">
                    {isAr ? tech.name.ar : tech.name.en}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {isAr ? tech.description.ar : tech.description.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {isAr ? "جاهز لبدء رحلة تعافيك؟" : "Ready to Begin Your Recovery?"}
          </h2>
          <p className="text-gray-500 mb-8">
            {isAr
              ? "36+ معالج مرخص في الرياض ومكة المكرمة"
              : "36+ licensed therapists in Riyadh & Makkah"}
          </p>
          <Link
            href={`/${locale}/book/riyadh`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--color-brand-purple)" }}
          >
            {isAr ? "احجز موعدك" : "Book Appointment"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <BookingCTABand locale={locale} title={ctaTitle} bookText={ctaBook} whatsappText={ctaWhatsapp} />
    </main>
  );
}
