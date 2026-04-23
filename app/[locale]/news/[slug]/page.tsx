import { notFound } from "next/navigation";
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
import { newsPosts } from "@/lib/data/news";
import { Calendar, Clock, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export async function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const isAr = locale === "ar";
  return {
    title: `${isAr ? post.title.ar : post.title.en} — PhysioTrio`,
    description: isAr ? post.excerpt.ar : post.excerpt.en,
    openGraph: { images: [{ url: post.image }] },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) notFound();

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

  const relatedPosts = newsPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  return (
    <>
      <TollFreeStrip locale={locale} />
      <Navbar locale={locale} translations={navT} />
      <main>
        {/* ── Article header ─────────────────────────────────────────────── */}
        <section className="bg-white border-b" style={{ borderColor: "#E5E7EB" }}>
          <div className="max-w-3xl mx-auto px-6 py-10" style={{ direction: isAr ? "rtl" : "ltr" }}>

            {/* Breadcrumb */}
            <Link
              href={`/${locale}/news`}
              className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors hover:opacity-70"
              style={{ color: "var(--color-brand-green)" }}
            >
              <BackIcon size={14} />
              {isAr ? "الأخبار" : "News & Blog"}
            </Link>

            {/* Category */}
            <div className="mb-3">
              <span
                className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded"
                style={{ background: "rgba(var(--color-brand-green-rgb),0.1)", color: "var(--color-brand-green-dark)" }}
              >
                {isAr ? post.category.ar : post.category.en}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-bold leading-tight mb-4" style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "#111827" }}>
              {isAr ? post.title.ar : post.title.en}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "#6B7280" }}>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {new Date(post.date).toLocaleDateString(isAr ? "ar-SA" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readMinutes} {isAr ? "دقائق قراءة" : "min read"}
              </span>
            </div>
          </div>
        </section>

        {/* ── Article image ───────────────────────────────────────────────── */}
        <section className="bg-gray-50 py-8">
          <div className="max-w-3xl mx-auto px-6">
            <div className="relative w-full rounded-xl overflow-hidden" style={{ height: "clamp(220px, 40vw, 420px)" }}>
              <Image
                src={post.image}
                alt={isAr ? post.title.ar : post.title.en}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>
          </div>
        </section>

        {/* ── Article body ────────────────────────────────────────────────── */}
        <section className="bg-white py-10">
          <div className="max-w-3xl mx-auto px-6" style={{ direction: isAr ? "rtl" : "ltr" }}>

            {/* Excerpt */}
            <p
              className="text-base leading-relaxed mb-8"
              style={{
                color: "#374151",
                borderLeft: isAr ? "none" : "3px solid var(--color-brand-green)",
                borderRight: isAr ? "3px solid var(--color-brand-green)" : "none",
                paddingLeft: isAr ? 0 : "1.25rem",
                paddingRight: isAr ? "1.25rem" : 0,
              }}
            >
              {isAr ? post.excerpt.ar : post.excerpt.en}
            </p>

            {/* External link CTA */}
            {post.externalUrl && (
              <a
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm transition-all hover:opacity-80"
                style={{
                  background: "var(--color-brand-green)",
                  color: "white",
                }}
              >
                <ExternalLink size={14} />
                {isAr ? "قراءة المقال كاملاً" : "Read Full Article"}
              </a>
            )}
          </div>
        </section>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16" style={{ background: "white" }}>
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="font-black text-xl mb-8" style={{ color: "#0f2b1f" }}>
                {isAr ? "أخبار أخرى" : "More News"}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/${locale}/news/${related.slug}`}
                    className="group flex gap-4 p-4 rounded-2xl transition-all hover:shadow-md"
                    style={{ border: "1px solid #e4f2eb", background: "#fafffe" }}
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={related.image}
                        alt={isAr ? related.title.ar : related.title.en}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <span
                        className="text-xs font-bold mb-1"
                        style={{ color: "var(--color-brand-green-dark)" }}
                      >
                        {isAr ? related.category.ar : related.category.en}
                      </span>
                      <p className="text-sm font-bold leading-snug line-clamp-2" style={{ color: "#0f2b1f" }}>
                        {isAr ? related.title.ar : related.title.en}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <BookingCTABand locale={locale} title={cta("title")} bookText={cta("book")} whatsappText={cta("whatsapp")} />
      </main>
      <Footer locale={locale} t={footerT} nav={navForFooter} />
      <WhatsAppButton locale={locale} />
      <ChatbotWidget locale={locale} />
    </>
  );
}
