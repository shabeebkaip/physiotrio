import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { newsPosts } from "@/lib/data/news";
import { Clock, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "الأخبار والمدونة — فيزيوتريو" : "News & Blog — PhysioTrio",
    description: locale === "ar"
      ? "آخر أخبار فيزيوتريو وفعالياتها ومستجدات العلاج الطبيعي في المملكة العربية السعودية"
      : "Latest PhysioTrio news, events and physiotherapy updates across Saudi Arabia",
  };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const nav = await getTranslations("nav");
  const footer = await getTranslations("footer");
  const cta = await getTranslations("cta");
  const isAr = locale === "ar";

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

  const featured = newsPosts.find((p) => p.featured);
  const rest = newsPosts.filter((p) => !p.featured);

  return (
    <>
      <Navbar locale={locale} translations={navT} />
      <main>
        {/* Hero */}
        <section className="pt-36 pb-20" style={{ background: "linear-gradient(135deg, #0f2b1f 0%, #1a3d2b 60%, #0f2b1f 100%)" }}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(var(--color-brand-green-rgb),0.2)", color: "var(--color-brand-green)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-green)" }} />
              {isAr ? "الأخبار والمدونة" : "News & Blog"}
            </span>
            <h1 className="font-black text-white mb-4 leading-tight" style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
              {isAr ? "آخر أخبارنا وفعالياتنا" : "Latest News & Updates"}
            </h1>
            <p className="text-lg font-light max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
              {isAr
                ? "تابع أحدث أخبار فيزيوتريو وشراكاتها وفعالياتها في المملكة العربية السعودية"
                : "Stay updated with PhysioTrio's latest news, partnerships, and events across Saudi Arabia"}
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="py-20" style={{ background: "#f6fdf9" }}>
          <div className="max-w-7xl mx-auto px-6">

            {/* Featured */}
            {featured && (
              <Link
                href={`/${locale}/news/${featured.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden mb-12 transition-all hover:-translate-y-1"
                style={{ boxShadow: "0 8px 40px rgba(var(--color-brand-green-rgb),0.10)", border: "1px solid #e4f2eb" }}
              >
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-72 lg:h-auto overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={isAr ? featured.title.ar : featured.title.en}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{ background: "rgba(var(--color-brand-green-rgb),0.1)", color: "var(--color-brand-green-dark)" }}
                      >
                        {isAr ? featured.category.ar : featured.category.en}
                      </span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(var(--color-brand-green-rgb),0.15)", color: "var(--color-brand-green-dark)" }}
                      >
                        {isAr ? "مميز" : "Featured"}
                      </span>
                    </div>
                    <h2 className="font-black leading-tight mb-4" style={{ fontSize: "clamp(20px, 2vw, 28px)", color: "#0f2b1f" }}>
                      {isAr ? featured.title.ar : featured.title.en}
                    </h2>
                    <p className="text-base leading-relaxed mb-6" style={{ color: "#4B7563" }}>
                      {isAr ? featured.excerpt.ar : featured.excerpt.en}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs" style={{ color: "#6B7280" }}>
                        <span>{new Date(featured.date).toLocaleDateString(isAr ? "ar-SA" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {featured.readMinutes} {isAr ? "دقيقة قراءة" : "min read"}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-3" style={{ color: "var(--color-brand-green-dark)" }}>
                        {isAr ? "اقرأ المزيد" : "Read more"}
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/news/${post.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
                  style={{ boxShadow: "0 4px 24px rgba(var(--color-brand-green-rgb),0.07)", border: "1px solid #e4f2eb" }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={isAr ? post.title.ar : post.title.en}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="h-1" style={{ background: "linear-gradient(90deg, var(--color-brand-green), var(--color-brand-purple))" }} />
                  <div className="p-6">
                    <span
                      className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-3"
                      style={{ background: "rgba(var(--color-brand-green-rgb),0.1)", color: "var(--color-brand-green-dark)" }}
                    >
                      {isAr ? post.category.ar : post.category.en}
                    </span>
                    <h3 className="font-black text-base leading-snug mb-3" style={{ color: "#0f2b1f" }}>
                      {isAr ? post.title.ar : post.title.en}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#4B7563" }}>
                      {isAr ? post.excerpt.ar : post.excerpt.en}
                    </p>
                    <div className="flex items-center justify-between text-xs" style={{ color: "#6B7280" }}>
                      <span>{new Date(post.date).toLocaleDateString(isAr ? "ar-SA" : "en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readMinutes} {isAr ? "د" : "min"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
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
