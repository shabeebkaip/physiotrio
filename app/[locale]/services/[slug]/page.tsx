import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TollFreeStrip } from "@/components/layout/TollFreeStrip";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { services } from "@/lib/data/services";
import { CheckCircle2, Clock, Users, ArrowRight, Lock, Shield } from "lucide-react";

export async function generateStaticParams() {
  return services.flatMap((service) => [
    { locale: "en", slug: service.slug },
    { locale: "ar", slug: service.slug },
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${locale === "ar" ? service.name.ar : service.name.en} — PhysioTrio`,
    description: locale === "ar" ? service.shortDesc.ar : service.shortDesc.en,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const nav = await getTranslations("nav");
  const footer = await getTranslations("footer");
  const cta = await getTranslations("cta");

  const navT = {
        home: nav("home"), services: nav("services"), about: nav("about"),
    packages: nav("packages"), news: nav("news"), contact: nav("contact"),
    bookNow: nav("bookNow"), homeCare: nav("homeCare"),
  };
  const footerT = {
    tagline: footer("tagline"), parent: footer("parent"), quickLinks: footer("quickLinks"),
    branchesTitle: footer("branchesTitle"), contact: footer("contact"), rights: footer("rights"),
    privacy: footer("privacy"), terms: footer("terms"), proudly: footer("proudly"),
  };
  const navForFooter = {
        home: nav("home"), services: nav("services"), about: nav("about"),
    packages: nav("packages"), news: nav("news"), faq: nav("faq"), contact: nav("contact"),
  };

  const isAr = locale === "ar";

  const steps = [
    {
      en: { title: "Initial Consultation", desc: "We assess your condition, medical history, and goals to create a personalised treatment plan." },
      ar: { title: "الاستشارة الأولية", desc: "نقيّم حالتك وتاريخك الطبي وأهدافك لإنشاء خطة علاجية مخصصة." },
    },
    {
      en: { title: "Assessment", desc: "A comprehensive physical assessment to identify the root cause and areas requiring treatment." },
      ar: { title: "التقييم", desc: "تقييم جسدي شامل لتحديد السبب الجذري والمناطق التي تحتاج علاجاً." },
    },
    {
      en: { title: "Treatment & Recovery", desc: "Targeted, evidence-based treatment with continuous monitoring and adjustment of your programme." },
      ar: { title: "العلاج والتعافي", desc: "علاج مستهدف قائم على الأدلة مع مراقبة مستمرة وتعديل برنامجك." },
    },
  ];

  return (
    <>
      <TollFreeStrip locale={locale} />
      <Navbar locale={locale} translations={navT} />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden flex flex-col justify-end"
          style={{ height: "70vh", minHeight: "460px" }}
        >
          {service.image ? (
            <Image
              src={service.image}
              alt={isAr ? service.name.ar : service.name.en}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--color-hero-bg), var(--color-dark-surface))" }} />
          )}
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(10,20,30,0.92) 0%, rgba(10,20,30,0.5) 55%, rgba(10,20,30,0.1) 100%)" }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 md:pb-20 w-full">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
              <Link href={`/${locale}/services`} className="hover:text-white transition-colors">
                {isAr ? "الخدمات" : "Services"}
              </Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>{isAr ? service.name.ar : service.name.en}</span>
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {service.privateService && (
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)", color: "white", backdropFilter: "blur(8px)" }}
                >
                  <Lock size={11} />
                  {isAr ? "خدمة خاصة للسيدات" : "Women Only"}
                </span>
              )}
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.15)", color: "white", backdropFilter: "blur(8px)" }}
              >
                <Clock size={11} />
                {service.durationMinutes} {isAr ? "دقيقة / جلسة" : "min / session"}
              </span>
              {service.sessionFrequency && (
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)", color: "white", backdropFilter: "blur(8px)" }}
                >
                  <Users size={11} />
                  {isAr ? service.sessionFrequency.ar : service.sessionFrequency.en}
                </span>
              )}
            </div>

            <h1
              className="font-bold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
            >
              {isAr ? service.name.ar : service.name.en}
            </h1>
            <p
              className="text-lg max-w-2xl mb-8"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {isAr ? service.shortDesc.ar : service.shortDesc.en}
            </p>

            <Link
              href={`/${locale}/book/riyadh?service=${service.slug}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:opacity-90 hover:gap-3"
              style={{ background: "var(--color-brand-purple)", color: "white" }}
            >
              {isAr ? "احجز هذه الخدمة" : "Book This Service"}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* ── Content ──────────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">

              {/* Left — Conditions */}
              <div>
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
                  style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
                >
                  {isAr ? "ما نعالجه" : "What We Treat"}
                </span>
                <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>
                  {isAr ? "الحالات التي نعالجها" : "Conditions We Treat"}
                </h2>
                <div className="space-y-2">
                  {(isAr ? service.conditions.ar : service.conditions.en).map((condition, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                    >
                      <CheckCircle2 size={16} className="flex-shrink-0" style={{ color: "var(--color-brand-green)" }} />
                      <span className="text-sm font-medium" style={{ color: "#374151" }}>{condition}</span>
                    </div>
                  ))}
                </div>

                {/* Who is this for */}
                <div
                  className="mt-8 p-5 rounded-2xl"
                  style={{ background: "rgba(var(--color-brand-purple-rgb),0.04)", border: "1px solid rgba(var(--color-brand-purple-rgb),0.1)" }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-brand-purple)" }}>
                    {isAr ? "من هذه الخدمة له؟" : "Who is this for?"}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {isAr ? service.targetPatients.ar : service.targetPatients.en}
                  </p>
                </div>
              </div>

              {/* Right — How It Works + MOH */}
              <div>
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
                  style={{ background: "rgba(var(--color-brand-green-rgb),0.08)", color: "var(--color-brand-green-dark)" }}
                >
                  {isAr ? "الخطوات" : "The Process"}
                </span>
                <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>
                  {isAr ? "كيف يعمل" : "How It Works"}
                </h2>
                <div className="space-y-6">
                  {steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5"
                        style={{ background: "var(--color-brand-purple)" }}
                      >
                        {i + 1}
                      </div>
                      <div className="pt-1">
                        <h3 className="font-semibold text-base mb-1" style={{ color: "#1a1a2e" }}>
                          {isAr ? step.ar.title : step.en.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                          {isAr ? step.ar.desc : step.en.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 my-8" />

                {/* Book CTA inline */}
                <Link
                  href={`/${locale}/book/riyadh?service=${service.slug}`}
                  className="flex items-center justify-between w-full px-6 py-4 rounded-2xl font-semibold text-sm text-white transition-all hover:opacity-90 group"
                  style={{ background: "var(--color-brand-purple)" }}
                >
                  <span>{isAr ? `احجز: ${service.name.ar}` : `Book: ${service.name.en}`}</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>

                {/* MOH notice */}
                <p className="flex items-start gap-1.5 text-xs mt-4 leading-relaxed" style={{ color: "#9CA3AF" }}>
                  <Shield size={12} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-brand-green)" }} />
                  {isAr
                    ? "يُجرى التقييم والعلاج بواسطة أخصائي علاج طبيعي مرخص وفق لوائح وزارة الصحة السعودية."
                    : "Assessment and treatment conducted by a licensed physiotherapy specialist under Saudi Ministry of Health regulations."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <BookingCTABand locale={locale} title={cta("title")} bookText={cta("book")} whatsappText={cta("whatsapp")} />
      </main>
      <Footer locale={locale} t={footerT} nav={navForFooter} />
      <WhatsAppButton locale={locale} />
      <ChatbotWidget locale={locale} />
    </>
  );
}
