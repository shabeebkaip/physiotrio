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
import { CheckCircle2, Clock, Users } from "lucide-react";

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
    home: nav("home"), services: nav("services"), branches: nav("branches"),
    team: nav("team"), about: nav("about"), offers: nav("offers"),
    blog: nav("blog"), contact: nav("contact"), bookNow: nav("bookNow"), homeCare: nav("homeCare"),
  };
  const footerT = {
    tagline: footer("tagline"), parent: footer("parent"), quickLinks: footer("quickLinks"),
    branchesTitle: footer("branchesTitle"), contact: footer("contact"), rights: footer("rights"),
    privacy: footer("privacy"), terms: footer("terms"), proudly: footer("proudly"),
  };
  const navForFooter = {
    home: nav("home"), services: nav("services"), branches: nav("branches"),
    team: nav("team"), about: nav("about"), offers: nav("offers"),
    blog: nav("blog"), faq: nav("faq"), contact: nav("contact"),
  };

  const steps = [
    {
      en: { title: "Initial Consultation", desc: "We assess your condition, medical history, and goals to create a personalized treatment plan." },
      ar: { title: "الاستشارة الأولية", desc: "نقيّم حالتك وتاريخك الطبي وأهدافك لإنشاء خطة علاجية مخصصة." },
    },
    {
      en: { title: "Assessment", desc: "A comprehensive physical assessment to identify the root cause and areas requiring treatment." },
      ar: { title: "التقييم", desc: "تقييم جسدي شامل لتحديد السبب الجذري والمناطق التي تحتاج علاجاً." },
    },
    {
      en: { title: "Treatment & Recovery", desc: "Targeted evidence-based treatment with continuous monitoring and adjustment of your program." },
      ar: { title: "العلاج والتعافي", desc: "علاج مستهدف قائم على الأدلة مع مراقبة مستمرة وتعديل برنامجك." },
    },
  ];

  return (
    <>
      <TollFreeStrip locale={locale} />
      <Navbar locale={locale} translations={navT} />
      <main>
        {/* Hero */}
        <section className="pt-36 pb-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #077688 0%, #4caf50 100%)" }}>
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {service.privateService && (
                <span className="inline-block text-xs px-3 py-1 rounded-full mb-4 font-semibold" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                  {locale === "ar" ? "🔒 خدمة خاصة للسيدات" : "🔒 Women Only Service"}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                {locale === "ar" ? service.name.ar : service.name.en}
              </h1>
              <p className="text-lg text-white/85 font-light mb-8 leading-relaxed">
                {locale === "ar" ? service.shortDesc.ar : service.shortDesc.en}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                  <Clock size={16} />
                  {service.durationMinutes} {locale === "ar" ? "دقيقة / جلسة" : "min / session"}
                </div>
                {service.sessionFrequency && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                    <Users size={16} />
                    {locale === "ar" ? service.sessionFrequency.ar : service.sessionFrequency.en}
                  </div>
                )}
              </div>
              <Link
                href={`/${locale}/book/riyadh?service=${service.slug}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
                style={{ background: "#0d0820", color: "white" }}
              >
                {locale === "ar" ? "احجز هذه الخدمة" : "Book This Service"}
              </Link>
            </div>
            {service.image && (
              <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden">
                <Image src={service.image} alt={locale === "ar" ? service.name.ar : service.name.en} fill className="object-cover" unoptimized />
              </div>
            )}
          </div>
        </section>

        {/* Conditions */}
        <section className="py-20" style={{ background: "#f8fafb" }}>
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold mb-6" style={{ color: "#077688" }}>
                {locale === "ar" ? "الحالات التي نعالجها" : "Conditions We Treat"}
              </h2>
              <div className="space-y-3">
                {(locale === "ar" ? service.conditions.ar : service.conditions.en).map((condition, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "white", border: "1px solid rgba(7,118,136,0.08)" }}>
                    <CheckCircle2 size={18} style={{ color: "#4caf50" }} className="flex-shrink-0" />
                    <span className="text-sm font-medium" style={{ color: "#333" }}>{condition}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold mb-6" style={{ color: "#077688" }}>
                {locale === "ar" ? "كيف يعمل" : "How It Works"}
              </h2>
              <div className="space-y-5">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ background: "#077688" }}>
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold mb-1" style={{ color: "#077688" }}>
                        {locale === "ar" ? step.ar.title : step.en.title}
                      </h3>
                      <p className="text-sm font-light" style={{ color: "#666" }}>
                        {locale === "ar" ? step.ar.desc : step.en.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 rounded-2xl" style={{ background: "rgba(7,118,136,0.06)", border: "1px solid rgba(7,118,136,0.15)" }}>
                <p className="text-sm font-semibold mb-2" style={{ color: "#077688" }}>
                  {locale === "ar" ? "من هذه الخدمة له؟" : "Who is this for?"}
                </p>
                <p className="text-sm font-light" style={{ color: "#555" }}>
                  {locale === "ar" ? service.targetPatients.ar : service.targetPatients.en}
                </p>
              </div>

              {/* MOH disclaimer */}
              <p className="text-xs mt-4 font-light" style={{ color: "#999" }}>
                {locale === "ar"
                  ? "يُجرى التقييم والعلاج بواسطة أخصائي علاج طبيعي مرخص وفق لوائح وزارة الصحة السعودية."
                  : "Assessment and treatment conducted by a licensed physiotherapy specialist under Saudi Ministry of Health regulations."}
              </p>
            </div>
          </div>
        </section>

        {/* Sticky Book CTA */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden lg:block">
          <Link
            href={`/${locale}/book/riyadh?service=${service.slug}`}
            className="px-8 py-3.5 rounded-full font-bold text-white shadow-xl transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #077688, #4caf50)", boxShadow: "0 8px 32px rgba(7,118,136,0.4)" }}
          >
            {locale === "ar" ? `احجز: ${service.name.ar}` : `Book: ${service.name.en}`}
          </Link>
        </div>

        <BookingCTABand locale={locale} title={cta("title")} bookText={cta("book")} whatsappText={cta("whatsapp")} />
      </main>
      <Footer locale={locale} t={footerT} nav={navForFooter} />
      <WhatsAppButton locale={locale} />
      <ChatbotWidget locale={locale} />
    </>
  );
}
