import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TollFreeStrip } from "@/components/layout/TollFreeStrip";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { blogPosts } from "@/lib/data/blog";
import { Clock } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "المدونة والأخبار — فيزيوتريو" : "Blog & News — PhysioTrio",
    description: locale === "ar"
      ? "آخر أخبار فيزيوتريو ونصائح العلاج الطبيعي وإعادة التأهيل"
      : "Latest PhysioTrio news, physiotherapy tips and rehabilitation insights",
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
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

  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <>
      <TollFreeStrip locale={locale} />
      <Navbar locale={locale} translations={navT} />
      <main>
        {/* Hero */}
        <section className="pt-36 pb-20" style={{ background: "linear-gradient(135deg, var(--color-hero-bg) 0%, var(--color-dark-surface) 60%, var(--color-dark-surface) 100%)" }}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full" style={{ background: "rgba(var(--color-brand-green-rgb),0.2)", color: "var(--color-brand-green)" }}>
              {locale === "ar" ? "المدونة والأخبار" : "Blog & News"}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              {locale === "ar" ? "آخر أخبارنا" : "Latest Updates"}
            </h1>
            <p className="text-xl font-light max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
              {locale === "ar"
                ? "نصائح صحية، أخبار الشركة، وأحدث مستجدات العلاج الطبيعي"
                : "Health tips, company news and the latest in physiotherapy"}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20" style={{ background: "var(--color-surface-light)" }}>
          <div className="max-w-7xl mx-auto px-6">
            {/* Featured Post */}
            {featured && (
              <Link
                href={`/${locale}/blog/${featured.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden mb-12 transition-all hover:-translate-y-1"
                style={{ boxShadow: "0 8px 40px rgba(var(--color-brand-purple-rgb),0.10)" }}
              >
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-72 lg:h-auto overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={locale === "ar" ? featured.title.ar : featured.title.en}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent, rgba(13,30,58,0.1))" }} />
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(var(--color-brand-green-rgb),0.1)", color: "var(--color-brand-green-dark)" }}>
                        {locale === "ar" ? featured.category.ar : featured.category.en}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(var(--color-brand-purple-rgb),0.1)", color: "var(--color-brand-purple)" }}>
                        {locale === "ar" ? "مميز" : "Featured"}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black leading-tight mb-4" style={{ color: "var(--color-hero-bg)" }}>
                      {locale === "ar" ? featured.title.ar : featured.title.en}
                    </h2>
                    <p className="text-base font-light leading-relaxed mb-6" style={{ color: "#666" }}>
                      {locale === "ar" ? featured.excerpt.ar : featured.excerpt.en}
                    </p>
                    <div className="flex items-center gap-4 text-xs" style={{ color: "#999" }}>
                      <span>{new Date(featured.date).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {featured.readMinutes} {locale === "ar" ? "دقيقة قراءة" : "min read"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
                  style={{ boxShadow: "0 4px 24px rgba(var(--color-brand-purple-rgb),0.07)" }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={locale === "ar" ? post.title.ar : post.title.en}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="h-1" style={{ background: "linear-gradient(90deg, var(--color-brand-green), var(--color-brand-purple))" }} />
                  <div className="p-6">
                    <span className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-3" style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}>
                      {locale === "ar" ? post.category.ar : post.category.en}
                    </span>
                    <h3 className="font-black text-base leading-snug mb-3" style={{ color: "var(--color-hero-bg)" }}>
                      {locale === "ar" ? post.title.ar : post.title.en}
                    </h3>
                    <p className="text-sm font-light leading-relaxed mb-4" style={{ color: "#777" }}>
                      {locale === "ar" ? post.excerpt.ar : post.excerpt.en}
                    </p>
                    <div className="flex items-center gap-3 text-xs" style={{ color: "#aaa" }}>
                      <span>{new Date(post.date).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {post.readMinutes} {locale === "ar" ? "د" : "min"}</span>
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
