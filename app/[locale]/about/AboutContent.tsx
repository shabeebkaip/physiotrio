"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CheckCircle2, ArrowRight, Zap, Heart, Globe, Shield } from "lucide-react";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { rehabTechnologies } from "@/lib/data/rehabTech";

const stats = [
  { value: "3", labelEn: "Branches", labelAr: "فروع" },
  { value: "50+", labelEn: "Therapists", labelAr: "معالج" },
  { value: "10K+", labelEn: "Patients Treated", labelAr: "مريض تلقى العلاج" },
  { value: "9", labelEn: "Specialties", labelAr: "تخصص" },
];

const values = [
  {
    icon: Zap,
    color: "var(--color-brand-purple)",
    en: { title: "Clinical Excellence", desc: "Every treatment plan is grounded in evidence-based practice, delivered by MOH-licensed specialists." },
    ar: { title: "التميز السريري", desc: "كل خطة علاجية مبنية على الممارسة القائمة على الأدلة، يقدمها متخصصون مرخصون من وزارة الصحة." },
  },
  {
    icon: Heart,
    color: "var(--color-brand-green)",
    en: { title: "Patient-Centered Care", desc: "We listen first. Your goals, timeline, and lifestyle shape every decision we make together." },
    ar: { title: "الرعاية المتمحورة حول المريض", desc: "نستمع أولاً. أهدافك وجدولك الزمني وأسلوب حياتك يشكل كل قرار نتخذه معاً." },
  },
  {
    icon: Shield,
    color: "var(--color-brand-purple)",
    en: { title: "Advanced Technology", desc: "Lokomat®, Gait Analysis, HBOT, AlterG — we invest in technology that delivers measurable results." },
    ar: { title: "التكنولوجيا المتقدمة", desc: "لوكومات®، تحليل المشية، العلاج بالأكسجين، ألتر جي — نستثمر في التكنولوجيا التي تحقق نتائج قابلة للقياس." },
  },
  {
    icon: Globe,
    color: "var(--color-brand-green)",
    en: { title: "Cultural Sensitivity", desc: "Arabic and English services, private rooms for women, and a team that understands Saudi patients' needs." },
    ar: { title: "الحساسية الثقافية", desc: "خدمات بالعربية والإنجليزية، غرف خاصة للسيدات، وفريق يفهم احتياجات المرضى السعوديين." },
  },
];

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

export function AboutContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";
  const heroRef = useRef<HTMLElement>(null);
  const blobA = useRef<HTMLDivElement>(null);
  const blobB = useRef<HTMLDivElement>(null);
  const blobC = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (blobA.current) gsap.to(blobA.current, { scale: 1.3, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut" });
    if (blobB.current) gsap.to(blobB.current, { scale: 1.2, duration: 8, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2 });
    if (blobC.current) gsap.to(blobC.current, { scale: 1.15, duration: 5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1 });
  }, { scope: heroRef });

  return (
    <main>
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden pt-36 pb-28" style={{ background: "linear-gradient(135deg, var(--color-hero-bg) 0%, var(--color-dark-surface) 60%, var(--color-dark-surface) 100%)" }}>
        <div ref={blobA} className="absolute pointer-events-none" style={{ top: "5%", right: "5%", width: 700, height: 700, background: "radial-gradient(circle, rgba(var(--color-brand-purple-rgb),0.18) 0%, transparent 70%)", filter: "blur(80px)", borderRadius: "50%" }} />
        <div ref={blobB} className="absolute pointer-events-none" style={{ bottom: "-10%", left: "0%", width: 500, height: 500, background: "radial-gradient(circle, rgba(var(--color-brand-green-rgb),0.12) 0%, transparent 70%)", filter: "blur(70px)", borderRadius: "50%" }} />
        <div ref={blobC} className="absolute pointer-events-none" style={{ top: "40%", left: "30%", width: 400, height: 400, background: "radial-gradient(circle, rgba(var(--color-brand-purple-rgb),0.1) 0%, transparent 70%)", filter: "blur(60px)", borderRadius: "50%" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div className="flex items-center gap-2 mb-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--color-brand-green)" }}>{isAr ? "من نحن" : "About Us"}</span>
            </motion.div>

            <motion.h1 className="font-black text-white mb-6 leading-tight" style={{ fontSize: "clamp(40px, 5.5vw, 76px)" }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {isAr ? "فيزيوتريو" : "PhysioTrio"}
              <br />
              <span style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-green))", backgroundClip: "text" }}>
                {isAr ? "رعاية استثنائية" : "Premium Care"}
              </span>
            </motion.h1>

            <motion.p className="text-lg font-light mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {isAr
                ? "مركز العلاج الطبيعي المتميز في المملكة العربية السعودية، التابع لمجموعة برجيل القابضة — إحدى أكبر مجموعات الرعاية الصحية في منطقة الخليج."
                : "Saudi Arabia's premium physiotherapy center, operating under Burjeel Holdings — one of the GCC's largest healthcare groups."}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Link
                href={`/${locale}/book/riyadh`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-green))" }}
              >
                {isAr ? "احجز موعدك" : "Book Appointment"} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          <motion.div className="relative h-80 lg:h-96 rounded-3xl overflow-hidden" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <Image
              src="/center-images/DSC07303.jpg"
              alt="PhysioTrio Clinic"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(var(--color-brand-purple-rgb),0.2), transparent)" }} />
            {/* Floating badge */}
            <motion.div
              className="absolute bottom-6 left-6 px-5 py-3 rounded-2xl"
              style={{ background: "rgba(13,30,58,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(var(--color-brand-purple-rgb),0.3)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs font-bold" style={{ color: "var(--color-brand-green)" }}>{isAr ? "جزء من" : "Part of"}</p>
              <p className="text-sm font-black text-white">Burjeel Holdings</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: "linear-gradient(90deg, var(--color-brand-purple), var(--color-brand-green-dark))" }} className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs font-light" style={{ color: "rgba(255,255,255,0.75)" }}>{isAr ? stat.labelAr : stat.labelEn}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Burjeel Holdings */}
      <section className="py-28" style={{ background: "var(--color-surface-light)" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-5 px-4 py-2 rounded-full" style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-purple)" }} />
              {isAr ? "مجموعة برجيل القابضة" : "Burjeel Holdings"}
            </span>
            <h2 className="font-black mb-6 leading-tight" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: "var(--color-hero-bg)" }}>
              {isAr ? "جزء من عائلة برجيل" : "Part of the Burjeel Family"}
            </h2>
            <p className="text-base font-light leading-relaxed mb-8" style={{ color: "#555" }}>
              {isAr
                ? "فيزيوتريو يعمل تحت مظلة مجموعة برجيل القابضة، إحدى أكبر وأرسخ مجموعات الرعاية الصحية في منطقة الشرق الأوسط وشمال أفريقيا. بفضل هذه الشراكة، نمتلك إمكانية الوصول إلى أحدث التقنيات الطبية والبروتوكولات العلاجية ومعايير الرعاية الدولية."
                : "PhysioTrio operates under Burjeel Holdings, one of the largest and most established healthcare groups across the Middle East and North Africa. Through this partnership, we have access to cutting-edge medical technologies, treatment protocols, and international care standards."}
            </p>
            <div className="space-y-3">
              {[
                isAr ? "استثمارات راسخة في الرعاية الصحية" : "Established healthcare investments",
                isAr ? "معايير رعاية دولية" : "International care standards",
                isAr ? "موارد سريرية مدعومة" : "Backed clinical resources",
                isAr ? "حضور إقليمي قوي" : "Strong regional presence",
              ].map((item, i) => (
                <motion.div key={i} className="flex items-center gap-3" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <CheckCircle2 size={18} style={{ color: "var(--color-brand-green)" }} className="flex-shrink-0" />
                  <span className="text-sm font-medium" style={{ color: "#444" }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="relative h-72 rounded-3xl overflow-hidden" initial={{ opacity: 0, scale: 0.93 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Image
              src="/center-images/DSC07597.jpg"
              alt="Burjeel Holdings"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-3xl" style={{ border: "1px solid rgba(var(--color-brand-purple-rgb),0.15)" }} />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div className="flex items-center justify-center gap-2 mb-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-green)" }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--color-brand-green)" }}>{isAr ? "قيمنا" : "Our Values"}</span>
            </motion.div>
            <motion.h2 className="font-black mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: "var(--color-hero-bg)" }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              {isAr ? "قيمنا ورؤيتنا" : "Our Values & Vision"}
            </motion.h2>
            <motion.p className="text-base font-light max-w-lg mx-auto" style={{ color: "#888" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              {isAr ? "المبادئ التي توجه كل جلسة وكل قرار في فيزيوتريو" : "The principles that guide every session and every decision at PhysioTrio"}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  className="group p-8 rounded-3xl relative overflow-hidden"
                  style={{ background: "var(--color-surface-light)", border: "1px solid rgba(var(--color-brand-purple-rgb),0.08)" }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(var(--color-brand-purple-rgb),0.1)" }}
                >
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-5" style={{ background: v.color }} />

                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: `linear-gradient(135deg, ${v.color}20, ${v.color}10)`, border: `1px solid ${v.color}25` }}>
                    <Icon size={20} style={{ color: v.color }} />
                  </div>
                  <h3 className="text-lg font-black mb-3" style={{ color: "var(--color-hero-bg)" }}>
                    {isAr ? v.ar.title : v.en.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "#666" }}>
                    {isAr ? v.ar.desc : v.en.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RehabTech */}
      <section className="py-28" style={{ background: "linear-gradient(180deg, var(--color-surface-light) 0%, var(--color-brand-purple-muted) 100%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div className="flex items-center justify-center gap-2 mb-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-green)" }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--color-brand-green)" }}>{isAr ? "تقنياتنا" : "Our Technology"}</span>
            </motion.div>
            <motion.h2 className="font-black mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: "var(--color-hero-bg)" }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              {isAr ? "معدات إعادة التأهيل المتقدمة" : "Advanced Rehab Equipment"}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rehabTechnologies.map((tech, i) => (
              <motion.div
                key={tech.id}
                className="group bg-white rounded-3xl overflow-hidden"
                style={{ boxShadow: "0 4px 24px rgba(var(--color-brand-purple-rgb),0.07)" }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(var(--color-brand-purple-rgb),0.14)" }}
              >
                {tech.image && (
                  <div className="relative h-40 overflow-hidden">
                    <Image src={tech.image} alt={isAr ? tech.name.ar : tech.name.en} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(13,30,58,0.5) 100%)" }} />
                  </div>
                )}
                <div className="h-1" style={{ background: "linear-gradient(90deg, var(--color-brand-green), var(--color-brand-purple))" }} />
                <div className="p-6">
                  <h3 className="font-black text-sm mb-2" style={{ color: "var(--color-brand-purple)" }}>
                    {isAr ? tech.name.ar : tech.name.en}
                  </h3>
                  <p className="text-xs font-light leading-relaxed" style={{ color: "#666" }}>
                    {isAr ? tech.description.ar : tech.description.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA strip before band */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, var(--color-hero-bg), var(--color-dark-surface))" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 className="font-black text-white mb-4" style={{ fontSize: "clamp(28px, 4vw, 52px)" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {isAr ? "جاهز لبدء رحلة تعافيك؟" : "Ready to Begin Your Recovery?"}
          </motion.h2>
          <motion.p className="text-base font-light mb-8" style={{ color: "rgba(255,255,255,0.65)" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            {isAr ? "50+ معالج مرخص في انتظارك في الرياض ومكة المكرمة" : "50+ licensed therapists waiting for you in Riyadh & Makkah"}
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link href={`/${locale}/book/riyadh`} className="px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-green))" }}>
              {isAr ? "احجز الآن" : "Book Now"} →
            </Link>
            <Link href={`/${locale}/team`} className="px-8 py-4 rounded-full font-bold transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1.5px solid rgba(255,255,255,0.2)" }}>
              {isAr ? "تعرف على فريقنا" : "Meet Our Team"}
            </Link>
          </motion.div>
        </div>
      </section>

      <BookingCTABand locale={locale} title={ctaTitle} bookText={ctaBook} whatsappText={ctaWhatsapp} />
    </main>
  );
}
