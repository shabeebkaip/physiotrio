import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Dumbbell, Brain, Hand, Baby, Leaf, Zap, ArrowRight,
  Activity, MoveUp, Stethoscope, LucideIcon, Lock,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TollFreeStrip } from "@/components/layout/TollFreeStrip";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { services } from "@/lib/data/services";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "خدماتنا — فيزيوتريو" : "Our Services — PhysioTrio",
    description: locale === "ar"
      ? "9 تخصصات في العلاج الطبيعي وإعادة التأهيل في الرياض ومكة المكرمة"
      : "9 physiotherapy specialties across Riyadh and Makkah",
  };
}

// ─── Icon map (lucide-react) ──────────────────────────────────────────────────

const serviceIconMap: Record<string, LucideIcon> = {
  bone: Stethoscope,
  run: Dumbbell,
  brain: Brain,
  hands: Hand,
  child: Baby,
  spine: Activity,
  lotus: Leaf,
  "arrow-up": MoveUp,
  zap: Zap,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const nav = await getTranslations("nav");
  const footer = await getTranslations("footer");
  const cta = await getTranslations("cta");

  const navT = {
    home: nav("home"), services: nav("services"), about: nav("about"),
    packages: nav("packages"), news: nav("news"), contact: nav("contact"), homeCare: nav("homeCare"), bookNow: nav("bookNow"),
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

  return (
    <>
      <TollFreeStrip locale={locale} />
      <Navbar locale={locale} translations={navT} />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden flex flex-col justify-end" style={{ height: "70vh", minHeight: "420px" }}>
          {/* Background photo */}
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=85&fit=crop"
            alt="PhysioTrio Services"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(10,20,30,0.85) 0%, rgba(10,20,30,0.45) 60%, rgba(10,20,30,0.2) 100%)" }}
          />

          {/* Content — bottom aligned */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 md:pb-20 w-full">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.15)", color: "white", backdropFilter: "blur(8px)" }}
            >
              {isAr ? "خدماتنا" : "Our Services"}
            </span>
            <h1
              className="font-bold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              {isAr ? "ما نعالجه" : "What We Treat"}
            </h1>
            <p
              className="text-lg md:text-xl max-w-xl"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {isAr
                ? "٩ تخصصات متخصصة. عيادة واحدة موثوقة. نهج قائم على الأدلة لكل مريض."
                : "9 specialist services. One trusted clinic. Evidence-based approach for every patient."}
            </p>
          </div>
        </section>

        {/* ── Services Grid ─────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">

            {/* Section header */}
            <div className="mb-12">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
                style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
              >
                {isAr ? "التخصصات" : "Specialties"}
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold mb-3"
                style={{ color: "#1a1a2e" }}
              >
                {isAr ? "خدماتنا الطبية" : "All Services"}
              </h2>
              <p className="text-base max-w-xl" style={{ color: "#6B7280" }}>
                {isAr
                  ? "اختر التخصص المناسب لك وابدأ رحلة تعافيك مع فريقنا المتخصص"
                  : "Choose the right specialty and begin your recovery journey with our expert team"}
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service) => {
                const Icon = serviceIconMap[service.icon] ?? Activity;
                const name = isAr ? service.name.ar : service.name.en;
                const desc = isAr ? service.shortDesc.ar : service.shortDesc.en;

                return (
                  <Link
                    key={service.id}
                    href={`/${locale}/services/${service.slug}`}
                    className="group block bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:bg-brand-purple hover:border-brand-purple hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Icon box */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 bg-[rgba(var(--color-brand-purple-rgb),0.08)] group-hover:bg-white/20"
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.5}
                        className="transition-colors duration-300 text-[var(--color-brand-purple)] group-hover:text-white"
                      />
                    </div>

                    {/* Women only badge */}
                    {service.privateService && (
                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 transition-colors duration-300 bg-[rgba(var(--color-brand-green-rgb),0.1)] text-[var(--color-brand-green-dark)] group-hover:bg-white/20 group-hover:text-white"
                      >
                        <Lock size={10} />
                        {isAr ? "خدمة خاصة للسيدات" : "Women Only"}
                      </span>
                    )}

                    {/* Name */}
                    <h2
                      className="text-lg font-bold mb-2 leading-snug transition-colors duration-300 text-[#1a1a2e] group-hover:text-white"
                    >
                      {name}
                    </h2>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-5 transition-colors duration-300 text-[#6B7280] group-hover:text-white/80"
                    >
                      {desc}
                    </p>

                    {/* Footer row */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-300 bg-[#F1F5F9] text-[var(--color-brand-purple)] group-hover:bg-white/20 group-hover:text-white"
                      >
                        {service.durationMinutes} {isAr ? "دقيقة" : "min"}
                      </span>
                      <span
                        className="flex items-center gap-1 text-sm font-semibold transition-colors duration-300 text-[var(--color-brand-purple)] group-hover:text-white"
                      >
                        {isAr ? "اعرف أكثر" : "Learn More"}
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
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
