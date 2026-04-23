import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TollFreeStrip } from "@/components/layout/TollFreeStrip";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { faqs, faqCategories } from "@/lib/data/faqs";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "الأسئلة الشائعة — فيزيوتريو" : "FAQ — PhysioTrio",
    description: locale === "ar"
      ? "إجابات على أكثر الأسئلة شيوعاً حول خدمات فيزيوتريو والحجز والتأمين والعلاج"
      : "Answers to the most common questions about PhysioTrio services, booking, insurance and treatment",
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
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

  return (
    <>
      <TollFreeStrip locale={locale} />
      <Navbar locale={locale} translations={navT} />
      <main>
        {/* Hero */}
        <section className="pt-36 pb-20 px-6" style={{ background: "linear-gradient(135deg, var(--color-hero-bg) 0%, var(--color-dark-surface) 60%, var(--color-dark-surface) 100%)" }}>
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full" style={{ background: "rgba(var(--color-brand-green-rgb),0.2)", color: "var(--color-brand-green)" }}>
              {locale === "ar" ? "الأسئلة الشائعة" : "FAQ"}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              {locale === "ar" ? "الأسئلة المتكررة" : "Frequently Asked Questions"}
            </h1>
            <p className="text-xl font-light" style={{ color: "rgba(255,255,255,0.7)" }}>
              {locale === "ar"
                ? "كل ما تحتاج معرفته عن فيزيوتريو"
                : "Everything you need to know about PhysioTrio"}
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-20 px-6" style={{ background: "var(--color-surface-light)" }}>
          <div className="max-w-4xl mx-auto">
            <FaqAccordion faqs={faqs} categories={faqCategories} locale={locale} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 text-center" style={{ background: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-green))" }}>
          <h2 className="text-3xl font-black text-white mb-4">
            {locale === "ar" ? "مستعد لبدء تعافيك؟" : "Ready to Start Your Recovery?"}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${locale}/book/riyadh`}
              className="px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
              style={{ background: "var(--color-hero-bg)", color: "white" }}
            >
              {cta("book")}
            </Link>
            <a
              href="https://wa.me/966500000001"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "2px solid rgba(255,255,255,0.5)" }}
            >
              {cta("whatsapp")}
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} t={footerT} nav={navForFooter} />
      <WhatsAppButton locale={locale} />
      <ChatbotWidget locale={locale} />
    </>
  );
}
