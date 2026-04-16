import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TollFreeStrip } from "@/components/layout/TollFreeStrip";
import { StickyBookingBar } from "@/components/layout/StickyBookingBar";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { HeroSection } from "@/components/home/HeroSection";
import { InsuranceBar } from "@/components/home/InsuranceBar";
import { StatsStrip } from "@/components/home/StatsStrip";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyPhysioTrio } from "@/components/home/WhyPhysioTrio";
import { BranchesPreview } from "@/components/home/BranchesPreview";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { TeamCarousel } from "@/components/home/TeamCarousel";
import { OffersTeaser } from "@/components/home/OffersTeaser";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { LatestNews } from "@/components/home/LatestNews";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { StatsSection } from "@/components/home/StatsSection";
import { services } from "@/lib/data/services";
import { branches } from "@/lib/data/branches";
import { therapists } from "@/lib/data/therapists";
import { testimonials } from "@/lib/data/testimonials";
import { blogPosts } from "@/lib/data/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar"
      ? "فيزيوتريو — مركز العلاج الطبيعي المتميز | الرياض · مكة · الدمام"
      : "PhysioTrio — Premium Physiotherapy Center | Riyadh · Makkah · Dammam",
    description: locale === "ar"
      ? "مركز العلاج الطبيعي المتميز في المملكة العربية السعودية. جزء من مجموعة برجيل القابضة. خدمات متخصصة في الرياض ومكة المكرمة."
      : "Premium physiotherapy center in Saudi Arabia. A Burjeel Holdings Company. Specialized services in Riyadh, Makkah & Dammam.",
    keywords: [
      "physiotherapy saudi arabia",
      "علاج طبيعي الرياض",
      "physiotrio",
      "فيزيوتريو",
      "burjeel holdings",
      "physical therapy riyadh",
      "neurological rehabilitation",
    ],
    openGraph: {
      type: "website",
      images: [{ url: "https://physiotherabia.com/wp-content/uploads/2023/07/B-PH03-1.jpg" }],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("hero");
  const nav = await getTranslations("nav");
  const statsT = await getTranslations("stats");
  const servicesT = await getTranslations("services");
  const whyT = await getTranslations("why");
  const branchesT = await getTranslations("branches");
  const ctaT = await getTranslations("cta");
  const teamT = await getTranslations("team");
  const offersT = await getTranslations("offers");
  const testimonialT = await getTranslations("testimonials");
  const footerT = await getTranslations("footer");
  const insuranceT = await getTranslations("insurance");

  const heroTranslations = {
    eyebrow: t("eyebrow"),
    headline1: t("headline1"),
    headline2: t("headline2"),
    subheadline: t("subheadline"),
    bookAppointment: t("bookAppointment"),
    exploreServices: t("exploreServices"),
    trust1: t("trust1"),
    trust2: t("trust2"),
    trust3: t("trust3"),
  };

  const navTranslations = {
    home: nav("home"),
    services: nav("services"),
    branches: nav("branches"),
    team: nav("team"),
    about: nav("about"),
    offers: nav("offers"),
    blog: nav("blog"),
    contact: nav("contact"),
    bookNow: nav("bookNow"),
    homeCare: nav("homeCare"),
  };

  const statsData = [
    { value: "3", label: statsT("branches") },
    { value: "50+", label: statsT("therapists") },
    { value: "10,000+", label: statsT("patients") },
    { value: "9", label: statsT("services") },
  ];

  const whyTranslations = {
    title: whyT("title"),
    body1: whyT("body1"),
    body2: whyT("body2"),
    feature1Title: whyT("feature1Title"),
    feature1Desc: whyT("feature1Desc"),
    feature2Title: whyT("feature2Title"),
    feature2Desc: whyT("feature2Desc"),
    feature3Title: whyT("feature3Title"),
    feature3Desc: whyT("feature3Desc"),
    feature4Title: whyT("feature4Title"),
    feature4Desc: whyT("feature4Desc"),
  };

  const footerTranslations = {
    tagline: footerT("tagline"),
    parent: footerT("parent"),
    quickLinks: footerT("quickLinks"),
    branchesTitle: footerT("branchesTitle"),
    contact: footerT("contact"),
    rights: footerT("rights"),
    privacy: footerT("privacy"),
    terms: footerT("terms"),
    proudly: footerT("proudly"),
  };

  const navForFooter = {
    home: nav("home"),
    services: nav("services"),
    branches: nav("branches"),
    team: nav("team"),
    about: nav("about"),
    offers: nav("offers"),
    blog: nav("blog"),
    faq: nav("faq"),
    contact: nav("contact"),
  };

  return (
    <>
      <TollFreeStrip locale={locale} />
      <Navbar locale={locale} translations={navTranslations} />
      <main >
        <HeroSection locale={locale} t={heroTranslations} />
        <InsuranceBar label={insuranceT("label")} />
        <StatsSection locale={locale} />
        <ServicesGrid
          locale={locale}
          services={services}
          title={servicesT("title")}
          subtitle={servicesT("subtitle")}
          bookNowText={servicesT("bookNow")}
        />
        <WhyPhysioTrio locale={locale} t={whyTranslations} />
        {/* <BranchesPreview
          locale={locale}
          branches={branches}
          title={branchesT("title")}
          getDirectionsText={branchesT("getDirections")}
          bookHereText={branchesT("bookHere")}
          comingSoonText={branchesT("comingSoon")}
          therapistsText={branchesT("therapists")}
          servicesText={branchesT("services")}
        /> */}
        {/* <BookingCTABand
          locale={locale}
          title={ctaT("title")}
          bookText={ctaT("book")}
          whatsappText={ctaT("whatsapp")}
        /> */}
        <TeamCarousel
          locale={locale}
          therapists={therapists}
          title={teamT("title")}
          subtitle={teamT("subtitle")}
          bookWithText={teamT("bookWith")}
        />
        <OffersTeaser
          locale={locale}
          eyebrow={offersT("eyebrow")}
          title={offersT("title")}
          viewAllText={offersT("viewAll")}
          purchaseText={offersT("purchase")}
        />
        <BookingCTABand
          locale={locale}
          title={ctaT("title")}
          bookText={ctaT("book")}
          whatsappText={ctaT("whatsapp")}
        />
        <TestimonialsCarousel
          locale={locale}
          testimonials={testimonials}
          title={testimonialT("title")}
        />
        <LatestNews locale={locale} posts={blogPosts} />
      </main>
      <Footer locale={locale} t={footerTranslations} nav={navForFooter} />
      <StickyBookingBar
        locale={locale}
        bookText={nav("bookNow")}
      />
      <WhatsAppButton locale={locale} />
      <ChatbotWidget locale={locale} />
    </>
  );
}
