"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bone, Brain, Dumbbell, Users, Heart, Droplets, Baby, Zap, TrendingUp, ArrowRight, MapPin, Clock } from "lucide-react";
import { useLocation } from "@/lib/context/LocationContext";

const EXPERTISE = [
  {
    en: "Musculoskeletal Rehabilitation",
    ar: "إعادة التأهيل العضلي الهيكلي",
    descEn: "Restoring strength and mobility after joint, muscle, and bone injuries.",
    descAr: "استعادة القوة والحركة بعد إصابات المفاصل والعضلات والعظام.",
    Icon: Bone,
  },
  {
    en: "Neurological Rehabilitation",
    ar: "إعادة التأهيل العصبي",
    descEn: "Specialized recovery programs for stroke, Parkinson's, and nerve conditions.",
    descAr: "برامج تعافٍ متخصصة للسكتة الدماغية وباركنسون والحالات العصبية.",
    Icon: Brain,
  },
  {
    en: "Sports Injury Rehabilitation",
    ar: "إعادة التأهيل من إصابات الرياضة",
    descEn: "Evidence-based rehab to get athletes back to peak performance safely.",
    descAr: "إعادة تأهيل قائمة على الأدلة لإعادة الرياضيين إلى أعلى مستوياتهم.",
    Icon: Dumbbell,
  },
  {
    en: "Geriatric Physical Therapy",
    ar: "العلاج الطبيعي لكبار السن",
    descEn: "Gentle, effective care focused on mobility, balance, and independence.",
    descAr: "رعاية لطيفة وفعّالة تركز على الحركة والتوازن والاستقلالية.",
    Icon: Users,
  },
  {
    en: "Women's Health Physical Therapy",
    ar: "العلاج الطبيعي لصحة المرأة",
    descEn: "Tailored therapy for pre/postnatal care and women's pelvic health.",
    descAr: "علاج مخصص لرعاية ما قبل وبعد الولادة وصحة الحوض لدى المرأة.",
    Icon: Heart,
  },
  {
    en: "Post-Surgical Lymphatic Drainage",
    ar: "التصريف الليمفاوي بعد العمليات",
    descEn: "Reducing swelling and speeding recovery after surgical procedures.",
    descAr: "تقليل التورم وتسريع التعافي بعد التدخلات الجراحية.",
    Icon: Droplets,
  },
  {
    en: "Paediatric Physical Therapy",
    ar: "العلاج الطبيعي للأطفال",
    descEn: "Child-friendly sessions supporting developmental milestones and movement.",
    descAr: "جلسات مناسبة للأطفال تدعم مراحل النمو الحركي.",
    Icon: Baby,
  },
  {
    en: "Sports Recovery",
    ar: "الاستشفاء الرياضي",
    descEn: "Accelerated recovery protocols for training load management and fatigue.",
    descAr: "بروتوكولات استشفاء مسرّعة لإدارة أعباء التدريب والتعب.",
    Icon: Zap,
  },
  {
    en: "Sports Performance Enhancement",
    ar: "تحسين الأداء الرياضي",
    descEn: "Functional training and biomechanical analysis to unlock athletic potential.",
    descAr: "تدريب وظيفي وتحليل بيوميكانيكي للارتقاء بالأداء الرياضي.",
    Icon: TrendingUp,
  },
];

const BRANCH_PREVIEW = 3; // shown per branch

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

function TherapistCard({
  therapist, i, isAr, locale, bookWithText, accentColor, avatarGradient,
}: {
  therapist: Therapist; i: number; isAr: boolean; locale: string;
  bookWithText: string; accentColor: string; avatarGradient: string;
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ border: "1px solid #E5E7EB" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }} />

      <div className="p-5 flex gap-4 items-start">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-black text-base shrink-0"
          style={{ background: avatarGradient }}
        >
          {therapist.initials}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm leading-snug mb-0.5 truncate" style={{ color: "#0f2b1f" }}>
            {isAr ? therapist.name.ar : therapist.name.en}
          </h3>
          <p className="text-xs mb-2.5" style={{ color: "#4B7563" }}>
            {isAr ? therapist.title.ar : therapist.title.en}
          </p>
          <div className="flex items-center gap-3">
            {therapist.yearsExp > 0 && (
              <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: "#4B7563" }}>
                <Clock size={11} />
                {therapist.yearsExp}+ {isAr ? "سنة" : "yrs"}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: "#4B7563" }}>
              <MapPin size={11} />
              {isAr ? (therapist.branches[0] === "riyadh" ? "الرياض" : "مكة") : therapist.branches[0]}
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <Link
          href={`/${locale}/book/${therapist.branches[0]}?therapist=${therapist.id}`}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-center block transition-all hover:opacity-90"
          style={{ background: `${accentColor}18`, color: accentColor, border: `1px solid ${accentColor}40` }}
        >
          {bookWithText} {isAr ? therapist.name.ar.split(" ")[1] : therapist.name.en.split(" ")[1]}
        </Link>
      </div>
    </motion.div>
  );
}

export function TeamCarousel({ locale, therapists, title, subtitle, bookWithText }: TeamCarouselProps) {
  const isAr = locale === "ar";
  const { location } = useLocation();

  const allRiyadh = therapists.filter(t => t.branches.includes("riyadh"));
  const allMakkah  = therapists.filter(t => t.branches.includes("makkah"));

  // When a location is selected, show up to 6 from that branch.
  // When "all", show 3 from each branch side-by-side.
  const riyadhPreview = (location === "makkah" ? [] : allRiyadh).slice(0, location === "all" ? BRANCH_PREVIEW : 6);
  const makkahPreview = (location === "riyadh" ? [] : allMakkah).slice(0, location === "all" ? BRANCH_PREVIEW : 6);
  const preview = [...riyadhPreview, ...makkahPreview];

  return (
    <section className="py-20" style={{ background: "#f6fdf9" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(var(--color-brand-green-rgb),0.12)", color: "var(--color-brand-green-dark)" }}
          >
            {isAr ? "فريقنا الطبي" : "Our Medical Team"}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#0f2b1f" }}>
                {title}
              </h2>
              <p className="text-base" style={{ color: "#4B7563" }}>
                {subtitle}
              </p>
            </div>
            <Link
              href={`/${locale}/team`}
              className="inline-flex items-center gap-2 text-sm font-semibold shrink-0 transition-colors hover:opacity-80"
              style={{ color: "var(--color-brand-green-dark)" }}
            >
              {isAr ? `عرض الكل (${therapists.length})` : `View all (${therapists.length})`}
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

        {/* Expertise — section heading */}
        <div className="mb-6">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3"
            style={{ background: "rgba(var(--color-brand-green-rgb),0.12)", color: "var(--color-brand-green-dark)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-green)" }} />
            {isAr ? "تخصصاتنا" : "Our Specialties"}
          </span>
          <h3 className="text-xl font-black" style={{ color: "#0f2b1f" }}>
            {isAr ? "خبرة متكاملة في 9 تخصصات" : "9 Specialized Areas of Expertise"}
          </h3>
        </div>

        {/* Expertise grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-14">
          {EXPERTISE.map((item, i) => (
            <motion.div
              key={item.en}
              className="flex items-start gap-4 p-4 rounded-2xl group"
              style={{
                background: "white",
                border: "1px solid rgba(var(--color-brand-green-rgb),0.15)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -2, borderColor: "rgba(var(--color-brand-green-rgb),0.4)", transition: { duration: 0.15 } }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(var(--color-brand-green-rgb),0.1)" }}
              >
                <item.Icon size={18} style={{ color: "var(--color-brand-green)" }} strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-bold leading-snug mb-1" style={{ color: "#0f2b1f" }}>
                  {isAr ? item.ar : item.en}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team grid — only renders sections that have cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {riyadhPreview.length > 0 && (
            <>
              {/* Riyadh label — only when both branches visible */}
              {makkahPreview.length > 0 && (
                <div className="sm:col-span-2 lg:col-span-3 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: "var(--color-brand-purple)" }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-brand-purple)" }}>
                    {isAr ? "الرياض" : "Riyadh"}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "rgba(136,7,114,0.15)" }} />
                </div>
              )}
              {riyadhPreview.map((therapist, i) => (
                <TherapistCard key={therapist.id} therapist={therapist} i={i} isAr={isAr} locale={locale} bookWithText={bookWithText} accentColor="var(--color-brand-purple)" avatarGradient="linear-gradient(135deg, #880772 0%, #A8389A 100%)" />
              ))}
            </>
          )}

          {makkahPreview.length > 0 && (
            <>
              {/* Makkah label — only when both branches visible */}
              {riyadhPreview.length > 0 && (
                <div className="sm:col-span-2 lg:col-span-3 flex items-center gap-3 mt-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: "var(--color-brand-green)" }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-brand-green-dark)" }}>
                    {isAr ? "مكة المكرمة" : "Makkah"}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "rgba(76,175,80,0.2)" }} />
                </div>
              )}
              {makkahPreview.map((therapist, i) => (
                <TherapistCard key={therapist.id} therapist={therapist} i={i} isAr={isAr} locale={locale} bookWithText={bookWithText} accentColor="var(--color-brand-green)" avatarGradient="linear-gradient(135deg, #388e3c 0%, #4caf50 100%)" />
              ))}
            </>
          )}
        </div>

        {/* View all CTA */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href={`/${locale}/team`}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:shadow-md"
            style={{
              background: "var(--color-brand-green)",
              color: "white",
            }}
          >
            {isAr
              ? `عرض الفريق كاملاً — ${therapists.length} أخصائي`
              : `Meet the Full Team — ${therapists.length} Specialists`}
            <ArrowRight size={15} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
