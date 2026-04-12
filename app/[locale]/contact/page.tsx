import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TollFreeStrip } from "@/components/layout/TollFreeStrip";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { ContactContent } from "./ContactContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "اتصل بنا — فيزيوتريو" : "Contact Us — PhysioTrio",
    description: locale === "ar"
      ? "تواصل مع فيزيوتريو عبر الهاتف أو البريد الإلكتروني أو واتساب أو زيارة أحد فروعنا"
      : "Contact PhysioTrio by phone, email, WhatsApp or visit one of our branches",
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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

  return (
    <>
      <TollFreeStrip locale={locale} />
      <Navbar locale={locale} translations={navT} />
      <ContactContent
        locale={locale}
        ctaTitle={cta("title")}
        ctaBook={cta("book")}
        ctaWhatsapp={cta("whatsapp")}
      />
      <Footer locale={locale} t={footerT} nav={navForFooter} />
      <WhatsAppButton locale={locale} />
      <ChatbotWidget locale={locale} />
    </>
  );
}
