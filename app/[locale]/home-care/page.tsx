import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { HomeCareContent } from "./HomeCareContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "الرعاية المنزلية — فيزيوتريو" : "Home Care — PhysioTrio",
    description: locale === "ar"
      ? "خدمة العلاج الطبيعي المنزلي في مكة المكرمة من فيزيوتريو، وفي الرياض والمدن الأخرى من فيتاليتي"
      : "Home physiotherapy in Makkah by PhysioTrio, and in Riyadh & other cities through Vitality",
  };
}

export default async function HomeCarePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const nav    = await getTranslations("nav");
  const footer = await getTranslations("footer");
  const cta    = await getTranslations("cta");

  const navT = {
    home: nav("home"), services: nav("services"), about: nav("about"),
    packages: nav("packages"), news: nav("news"), contact: nav("contact"),
    homeCare: nav("homeCare"), bookNow: nav("bookNow"),
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
      <Navbar locale={locale} translations={navT} />
      <main>
        <HomeCareContent locale={locale} />
        <BookingCTABand locale={locale} title={cta("title")} bookText={cta("book")} whatsappText={cta("whatsapp")} />
      </main>
      <Footer locale={locale} t={footerT} nav={navForFooter} />
      <WhatsAppButton locale={locale} />
      <ChatbotWidget locale={locale} />
    </>
  );
}
