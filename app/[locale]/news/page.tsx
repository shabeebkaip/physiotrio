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
import { Clock, ArrowRight, Newspaper } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "الأخبار — فيزيوتريو" : "News — PhysioTrio",
    description: locale === "ar"
      ? "آخر أخبار فيزيوتريو وفعالياتها ومستجدات العلاج الطبيعي في المملكة العربية السعودية"
      : "Latest PhysioTrio news, events and physiotherapy updates across Saudi Arabia",
  };
}

// Category colour palette
const CAT_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  Community:      { bg: "rgba(76,175,80,0.08)",   text: "#2d6a4f",                        border: "rgba(76,175,80,0.2)" },
  Leadership:     { bg: "rgba(136,7,114,0.08)",   text: "var(--color-brand-purple)",      border: "rgba(136,7,114,0.2)" },
  "Company News": { bg: "rgba(245,158,11,0.09)",  text: "#92400e",                        border: "rgba(245,158,11,0.2)" },
  Events:         { bg: "rgba(59,130,246,0.08)",  text: "#1e40af",                        border: "rgba(59,130,246,0.2)" },
};
const DEFAULT_STYLE = { bg: "rgba(107,114,128,0.08)", text: "#374151", border: "rgba(107,114,128,0.2)" };

function catStyle(en: string) { return CAT_STYLE[en] ?? DEFAULT_STYLE; }

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const nav     = await getTranslations("nav");
  const footer  = await getTranslations("footer");
  const cta     = await getTranslations("cta");
  const isAr    = locale === "ar";

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

  const featured = newsPosts.find((p) => p.featured);
  const rest     = newsPosts.filter((p) => !p.featured);

  return (
    <>
      <Navbar locale={locale} translations={navT} />
      <main>

        {/* ── Clinical light header ───────────────────────────────────── */}
        <section
          className="pt-36 pb-12"
          style={{ background: "#ffffff", borderBottom: "1px solid #eef2f6" }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">

              {/* Left: title block */}
              <div>
                <span
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)" }}
                >
                  <Newspaper size={11} strokeWidth={2.5} />
                  {isAr ? "الأخبار والمستجدات" : "News & Updates"}
                </span>
                <h1
                  className="font-black leading-tight mb-3"
                  style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#111827" }}
                >
                  {isAr ? "آخر أخبارنا وفعالياتنا" : "Latest News & Updates"}
                </h1>
                <p className="text-sm max-w-xl" style={{ color: "#6B7280" }}>
                  {isAr
                    ? "تابع أحدث أخبار فيزيوتريو وشراكاتها وفعالياتها في المملكة العربية السعودية"
                    : "Stay updated with PhysioTrio's latest news, partnerships, and events across Saudi Arabia"}
                </p>
              </div>

              {/* Right: post count */}
              <div className="text-right shrink-0">
                <p className="text-3xl font-black" style={{ color: "#111827" }}>{newsPosts.length}</p>
                <p className="text-xs" style={{ color: "#9CA3AF" }}>{isAr ? "مقال" : "articles"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Posts ───────────────────────────────────────────────────── */}
        <section className="py-12" style={{ background: "#f8fafc" }}>
          <div className="max-w-7xl mx-auto px-6">

            {/* Featured post */}
            {featured && (() => {
              const cs = catStyle(featured.category.en);
              return (
                <Link
                  href={`/${locale}/news/${featured.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden mb-10 transition-all hover:-translate-y-1"
                  style={{ border: "1px solid #eef2f6", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
                >
                  <div className="grid lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <Image
                        src={featured.image}
                        alt={isAr ? featured.title.ar : featured.title.en}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      {/* Tags */}
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{ background: cs.bg, color: cs.text, border: `1px solid ${cs.border}` }}
                        >
                          {isAr ? featured.category.ar : featured.category.en}
                        </span>
                        <span
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{ background: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)", border: "1px solid rgba(136,7,114,0.15)" }}
                        >
                          {isAr ? "مميز" : "Featured"}
                        </span>
                      </div>

                      <h2
                        className="font-black leading-snug mb-3"
                        style={{ fontSize: "clamp(18px, 2vw, 26px)", color: "#111827" }}
                      >
                        {isAr ? featured.title.ar : featured.title.en}
                      </h2>

                      <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B7280" }}>
                        {isAr ? featured.excerpt.ar : featured.excerpt.en}
                      </p>

                      {/* Meta + CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs" style={{ color: "#9CA3AF" }}>
                          <span>
                            {new Date(featured.date).toLocaleDateString(
                              isAr ? "ar-SA" : "en-US",
                              { year: "numeric", month: "long", day: "numeric" }
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {featured.readMinutes} {isAr ? "دقيقة" : "min read"}
                          </span>
                        </div>
                        <span
                          className="inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5"
                          style={{ color: "var(--color-brand-purple)" }}
                        >
                          {isAr ? "اقرأ المزيد" : "Read more"}
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })()}

            {/* Section label */}
            {rest.length > 0 && (
              <p
                className="text-xs font-bold uppercase tracking-widest mb-6"
                style={{ color: "#9CA3AF" }}
              >
                {isAr ? "المزيد من الأخبار" : "More Stories"}
              </p>
            )}

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post) => {
                const cs = catStyle(post.category.en);
                return (
                  <Link
                    key={post.id}
                    href={`/${locale}/news/${post.slug}`}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
                    style={{ border: "1px solid #eef2f6", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden shrink-0">
                      <Image
                        src={post.image}
                        alt={isAr ? post.title.ar : post.title.en}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    </div>

                    {/* Accent bar */}
                    <div
                      className="h-0.5 shrink-0"
                      style={{ background: "linear-gradient(90deg, var(--color-brand-purple), var(--color-brand-green))" }}
                    />

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <span
                        className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-3 self-start"
                        style={{ background: cs.bg, color: cs.text, border: `1px solid ${cs.border}` }}
                      >
                        {isAr ? post.category.ar : post.category.en}
                      </span>

                      <h3
                        className="font-black text-sm leading-snug mb-2 flex-1"
                        style={{ color: "#111827" }}
                      >
                        {isAr ? post.title.ar : post.title.en}
                      </h3>

                      <p
                        className="text-xs leading-relaxed mb-4"
                        style={{
                          color: "#6B7280",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {isAr ? post.excerpt.ar : post.excerpt.en}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs pt-3" style={{ borderTop: "1px solid #f3f4f6", color: "#9CA3AF" }}>
                        <span>
                          {new Date(post.date).toLocaleDateString(
                            isAr ? "ar-SA" : "en-US",
                            { year: "numeric", month: "short", day: "numeric" }
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {post.readMinutes} {isAr ? "د" : "min"}
                        </span>
                      </div>
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
