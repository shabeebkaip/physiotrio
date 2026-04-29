import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TollFreeStrip } from "@/components/layout/TollFreeStrip";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { TeamContent } from "./TeamContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "فريقنا — فيزيوتريو" : "Our Team — PhysioTrio",
    description: locale === "ar" ? "50+ معالج مرخص من وزارة الصحة السعودية" : "50+ MOH-licensed physiotherapy specialists",
  };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const nav = await getTranslations("nav");
  const footer = await getTranslations("footer");
  const cta = await getTranslations("cta");

  const navT = { home: nav("home"), services: nav("services"), about: nav("about"), packages: nav("packages"), news: nav("news"), contact: nav("contact"), bookNow: nav("bookNow"), homeCare: nav("homeCare") };
  const footerT = { tagline: footer("tagline"), parent: footer("parent"), quickLinks: footer("quickLinks"), branchesTitle: footer("branchesTitle"), contact: footer("contact"), rights: footer("rights"), privacy: footer("privacy"), terms: footer("terms"), proudly: footer("proudly") };
  const navForFooter = { home: nav("home"), services: nav("services"), about: nav("about"), packages: nav("packages"), news: nav("news"), faq: nav("faq"), contact: nav("contact") };

  return (
    <>
      <TollFreeStrip locale={locale} />
      <Navbar locale={locale} translations={navT} />
      <TeamContent locale={locale} ctaBook={cta("book")} ctaWhatsapp={cta("whatsapp")} ctaTitle={cta("title")} />
      <Footer locale={locale} t={footerT} nav={navForFooter} />
      <WhatsAppButton locale={locale} />
      <ChatbotWidget locale={locale} />
    </>
  );
}
