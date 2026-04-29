import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Providers } from "@/components/providers/Providers";
import "../globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const locales = ["en", "ar"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      template: "%s | PhysioTrio",
      default: locale === "ar" ? "فيزيوتريو - مركز العلاج الطبيعي" : "PhysioTrio - Premium Physiotherapy Center",
    },
    description:
      locale === "ar"
        ? "مركز العلاج الطبيعي المتميز في الرياض ومكة المكرمة والدمام. جزء من بورجيل القابضة."
        : "Premium physiotherapy center across Riyadh, Makkah & Dammam. A Burjeel Holdings Company.",
    keywords: ["physiotherapy", "physiotherapy saudi arabia", "علاج طبيعي", "فيزيوتريو"],
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      siteName: "PhysioTrio",
    },
    alternates: {
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${outfit.variable} ${cairo.variable}`}
    >
      <body
        className={
          locale === "ar"
            ? "font-arabic antialiased"
            : "font-display antialiased"
        }
        style={{
          fontFamily:
            locale === "ar"
              ? "var(--font-cairo), sans-serif"
              : "var(--font-outfit), sans-serif",
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
