"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap, Heart, Globe, Shield, Users, Award, MapPin } from "lucide-react";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { rehabTechnologies } from "@/lib/data/rehabTech";

// ─── Data ─────────────────────────────────────────────────────────────────────

const values = [
  {
    icon: Zap,
    color: "var(--color-brand-purple)",
    bg: "rgba(136,7,114,0.07)",
    en: { title: "Clinical Excellence", desc: "Every treatment plan is grounded in evidence-based practice, delivered by MOH-licensed specialists." },
    ar: { title: "التميز السريري", desc: "كل خطة علاجية مبنية على الممارسة القائمة على الأدلة، يقدمها متخصصون مرخصون من وزارة الصحة." },
  },
  {
    icon: Heart,
    color: "var(--color-brand-green)",
    bg: "rgba(76,175,80,0.07)",
    en: { title: "Patient-Centered Care", desc: "We listen first. Your goals, timeline, and lifestyle shape every decision we make together." },
    ar: { title: "الرعاية المتمحورة حول المريض", desc: "نستمع أولاً. أهدافك وجدولك الزمني وأسلوب حياتك يشكل كل قرار نتخذه معاً." },
  },
  {
    icon: Shield,
    color: "var(--color-brand-purple)",
    bg: "rgba(136,7,114,0.07)",
    en: { title: "Advanced Technology", desc: "Lokomat®, Gait Analysis, HBOT, AlterG — we invest in technology that delivers measurable results." },
    ar: { title: "التكنولوجيا المتقدمة", desc: "لوكومات®، تحليل المشية، العلاج بالأكسجين، ألتر جي — نستثمر في التكنولوجيا التي تحقق نتائج قابلة للقياس." },
  },
  {
    icon: Globe,
    color: "var(--color-brand-green)",
    bg: "rgba(76,175,80,0.07)",
    en: { title: "Cultural Sensitivity", desc: "Arabic and English services, private rooms for women, and a team that understands Saudi patients' needs." },
    ar: { title: "الحساسية الثقافية", desc: "خدمات بالعربية والإنجليزية، غرف خاصة للسيدات، وفريق يفهم احتياجات المرضى السعوديين." },
  },
];

const stats = [
  { icon: Users,  en: { val: "10,000+", label: "Patients Treated" },   ar: { val: "+10,000", label: "مريض تمت معالجتهم" } },
  { icon: Award,  en: { val: "35+",     label: "Licensed Therapists" }, ar: { val: "+35",     label: "معالج مرخص" } },
  { icon: MapPin, en: { val: "2",       label: "Active Branches" },     ar: { val: "2",       label: "فرع نشط" } },
];

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

export function AboutContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";

  return (
    <main>

      {/* ── Hero — clean clinical ───────────────────────────────────────── */}
      <section
        className="pt-36 pb-0"
        style={{ background: "#ffffff", borderBottom: "1px solid #eef2f6" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-end">

            {/* Left: text */}
            <div className="pb-14">
              <motion.span
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-purple)" }} />
                {isAr ? "من نحن" : "About Us"}
              </motion.span>

              <motion.h1
                className="font-black mb-5 leading-tight"
                style={{ fontSize: "clamp(32px, 4.5vw, 60px)", color: "#111827" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
              >
                {isAr ? (
                  <>فيزيوتريو<br /><span style={{ color: "var(--color-brand-purple)" }}>رعاية استثنائية</span></>
                ) : (
                  <>PhysioTrio<br /><span style={{ color: "var(--color-brand-purple)" }}>Premium Care</span></>
                )}
              </motion.h1>

              <motion.p
                className="text-base leading-relaxed mb-8 max-w-lg"
                style={{ color: "#4B5563" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
              >
                {isAr
                  ? "مركز العلاج الطبيعي المتميز في المملكة العربية السعودية، التابع لمجموعة برجيل القابضة — إحدى أكبر مجموعات الرعاية الصحية في منطقة الخليج."
                  : "Saudi Arabia's premium physiotherapy center, operating under Burjeel Arabia — one of the GCC's largest healthcare groups."}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3 mb-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href={`/${locale}/book/riyadh`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-sm transition-all hover:shadow-lg hover:opacity-90"
                  style={{ background: "var(--color-brand-purple)" }}
                >
                  {isAr ? "احجز موعدك" : "Book Appointment"}
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href={`/${locale}/team`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:bg-gray-50"
                  style={{ color: "#374151", border: "1.5px solid #E5E7EB" }}
                >
                  {isAr ? "تعرف على فريقنا" : "Meet Our Team"}
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                className="flex flex-wrap gap-8 pt-8"
                style={{ borderTop: "1px solid #F3F4F6" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
              >
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(136,7,114,0.07)" }}>
                        <Icon size={16} style={{ color: "var(--color-brand-purple)" }} />
                      </div>
                      <div>
                        <p className="text-xl font-black leading-none" style={{ color: "#111827" }}>
                          {isAr ? s.ar.val : s.en.val}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
                          {isAr ? s.ar.label : s.en.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right: clinic photo flush at bottom */}
            <motion.div
              className="relative h-[420px] lg:h-[500px] rounded-t-3xl overflow-hidden self-end"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <Image
                src="/center-images/DSC07303.jpg"
                alt="PhysioTrio Clinic"
                fill
                className="object-cover"
              />
              {/* Subtle brand tint overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(136,7,114,0.12) 0%, transparent 50%)" }} />

              {/* Floating Burjeel badge */}
              <motion.div
                className="absolute bottom-6 left-6 px-4 py-2.5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(136,7,114,0.12)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
                  {isAr ? "جزء من" : "Part of"}
                </p>
                <p className="text-sm font-black" style={{ color: "var(--color-brand-purple)" }}>
                  Burjeel Arabia
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Burjeel Arabia section ──────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-purple)" }} />
              {isAr ? "مجموعة برجيل القابضة" : "Burjeel Arabia"}
            </span>

            <h2
              className="font-black mb-5 leading-tight"
              style={{ fontSize: "clamp(26px, 3vw, 42px)", color: "#111827" }}
            >
              {isAr ? "جزء من عائلة برجيل" : "Part of the Burjeel Family"}
            </h2>

            <p className="text-base leading-relaxed mb-8" style={{ color: "#4B5563" }}>
              {isAr
                ? "فيزيوتريو يعمل تحت مظلة مجموعة برجيل القابضة، إحدى أكبر وأرسخ مجموعات الرعاية الصحية في منطقة الشرق الأوسط وشمال أفريقيا. بفضل هذه الشراكة، نمتلك إمكانية الوصول إلى أحدث التقنيات الطبية والبروتوكولات العلاجية ومعايير الرعاية الدولية."
                : "PhysioTrio operates under Burjeel Arabia, one of the largest and most established healthcare groups across the Middle East and North Africa. Through this partnership, we have access to cutting-edge medical technologies, treatment protocols, and international care standards."}
            </p>

            <div className="space-y-3">
              {[
                isAr ? "استثمارات راسخة في الرعاية الصحية" : "Established healthcare investments",
                isAr ? "معايير رعاية دولية" : "International care standards",
                isAr ? "موارد سريرية مدعومة" : "Backed clinical resources",
                isAr ? "حضور إقليمي قوي" : "Strong regional presence",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <CheckCircle2 size={17} style={{ color: "var(--color-brand-green)", flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: "#374151" }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative h-72 lg:h-80 rounded-2xl overflow-hidden"
            style={{ border: "1px solid #e8ecf0" }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/center-images/DSC07597.jpg"
              alt="Burjeel Arabia"
              fill
              className="object-cover"
            />
          </motion.div>

        </div>
      </section>

      {/* ── Values ─────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <motion.span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(76,175,80,0.08)", color: "var(--color-brand-green)" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-green)" }} />
              {isAr ? "قيمنا" : "Our Values"}
            </motion.span>
            <motion.h2
              className="font-black mb-3"
              style={{ fontSize: "clamp(26px, 3vw, 42px)", color: "#111827" }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
            >
              {isAr ? "قيمنا ورؤيتنا" : "Our Values & Vision"}
            </motion.h2>
            <motion.p
              className="text-sm max-w-lg mx-auto"
              style={{ color: "#6B7280" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
            >
              {isAr
                ? "المبادئ التي توجه كل جلسة وكل قرار في فيزيوتريو"
                : "The principles that guide every session and every decision at PhysioTrio"}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  className="group p-7 rounded-2xl"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #eef2f6",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4, boxShadow: "0 12px 36px rgba(0,0,0,0.07)", background: "#ffffff" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: v.bg }}
                  >
                    <Icon size={20} style={{ color: v.color }} />
                  </div>
                  <h3 className="text-base font-black mb-2" style={{ color: "#111827" }}>
                    {isAr ? v.ar.title : v.en.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {isAr ? v.ar.desc : v.en.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Technology ─────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <motion.span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-purple)" }} />
              {isAr ? "التقنيات والأجهزة" : "Technologies & Equipment"}
            </motion.span>
            <motion.h2
              className="font-black"
              style={{ fontSize: "clamp(26px, 3vw, 42px)", color: "#111827" }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
            >
              {isAr ? "أحدث الأجهزة والتقنيات العلاجية" : "State-of-the-Art Treatment Technology"}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rehabTechnologies.map((tech, i) => (
              <motion.div
                key={tech.id}
                className="group bg-white rounded-2xl overflow-hidden"
                style={{ border: "1px solid #eef2f6" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.07, 0.28) }}
                whileHover={{ y: -5, boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}
              >
                {tech.image && (
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={tech.image}
                      alt={isAr ? tech.name.ar : tech.name.en}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                )}
                {/* Purple–green accent bar */}
                <div className="h-0.5" style={{ background: "linear-gradient(90deg, var(--color-brand-purple), var(--color-brand-green))" }} />
                <div className="p-5">
                  <h3 className="font-black text-sm mb-1.5" style={{ color: "var(--color-brand-purple)" }}>
                    {isAr ? tech.name.ar : tech.name.en}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                    {isAr ? tech.description.ar : tech.description.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Light CTA strip ─────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#ffffff", borderTop: "1px solid #eef2f6" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {isAr ? "ابدأ رحلتك" : "Start Your Journey"}
          </motion.span>
          <motion.h2
            className="font-black mb-4"
            style={{ fontSize: "clamp(26px, 3.5vw, 44px)", color: "#111827" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {isAr ? "جاهز لبدء رحلة تعافيك؟" : "Ready to Begin Your Recovery?"}
          </motion.h2>
          <motion.p
            className="text-base mb-8 max-w-md mx-auto"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {isAr
              ? "٣٥+ معالج مرخص في انتظارك في الرياض ومكة المكرمة"
              : "35+ licensed therapists waiting for you across Riyadh & Makkah"}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
          >
            <Link
              href={`/${locale}/book/riyadh`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-sm transition-all hover:opacity-90 hover:shadow-lg"
              style={{ background: "var(--color-brand-purple)" }}
            >
              {isAr ? "احجز الآن" : "Book Now"}
              <ArrowRight size={15} />
            </Link>
            <Link
              href={`/${locale}/team`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:bg-gray-50"
              style={{ color: "#374151", border: "1.5px solid #E5E7EB" }}
            >
              {isAr ? "تعرف على فريقنا" : "Meet Our Team"}
            </Link>
          </motion.div>
        </div>
      </section>

      <BookingCTABand locale={locale} title={ctaTitle} bookText={ctaBook} whatsappText={ctaWhatsapp} />
    </main>
  );
}
