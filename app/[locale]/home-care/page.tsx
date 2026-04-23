import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { ExternalLink } from "lucide-react";

const VITALITY_NAVY  = "#102b5c";
const VITALITY_GOLD  = "#ba995d";
const VITALITY_LOGO  = "https://vitality.sa/api/files/uploads/1768987231289-373016008_674317974576110_4045906671374322318_n.jpg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "الرعاية المنزلية — فيزيوتريو" : "Home Care — PhysioTrio",
    description: locale === "ar"
      ? "خدمة العلاج الطبيعي المنزلي الفاخر من خلال فيتاليتي، الشريك الموثوق للرعاية المنزلية"
      : "Premium home physiotherapy service delivered through Vitality, the trusted home care partner",
  };
}

const features = [
  { en: "Home visits by certified physiotherapists",              ar: "زيارات منزلية من أخصائيي علاج طبيعي معتمدين" },
  { en: "Continuous monitoring and regular progress evaluation",  ar: "متابعة مستمرة وتقييم دوري للحالة" },
  { en: "Dedicated physiotherapist for each patient",            ar: "أخصائي مخصص لكل مريض" },
  { en: "Personalized recovery plan tailored to individual needs", ar: "خطة علاجية فردية حسب الاحتياج" },
];

export default async function HomeCarePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const nav    = await getTranslations("nav");
  const footer = await getTranslations("footer");

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

  const isAr = locale === "ar";

  return (
    <>
      <Navbar locale={locale} translations={navT} />
      <main>

        {/* ── Hero band — Vitality navy ─────────────────────────────────── */}
        <section style={{ background: VITALITY_NAVY, paddingTop: "7rem", paddingBottom: "4rem" }}>
          <div className="max-w-4xl mx-auto px-6" style={{ direction: isAr ? "rtl" : "ltr" }}>

            {/* Vitality logo */}
            <div className="mb-6">
              <Image
                src={VITALITY_LOGO}
                alt="Vitality"
                width={120}
                height={48}
                className="object-contain rounded-lg"
                unoptimized
              />
            </div>

            {/* Label */}
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: VITALITY_GOLD }}
            >
              {isAr ? "الرعاية المنزلية" : "Home Care"}
            </p>

            {/* Title */}
            <h1 className="font-bold leading-tight mb-4" style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "#ffffff" }}>
              {isAr ? "العلاج الطبيعي المنزلي الفاخر (VIP)" : "Premium Home Physiotherapy Service (VIP)"}
            </h1>

            {/* Partnership note */}
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: "rgba(186,153,93,0.15)", color: VITALITY_GOLD, border: `1px solid rgba(186,153,93,0.3)` }}
            >
              {isAr ? "مقدَّمة بالتعاون مع فيتاليتي" : "Delivered in partnership with Vitality"}
            </span>
          </div>
        </section>

        {/* ── Gold divider line ─────────────────────────────────────────── */}
        <div style={{ height: "3px", background: `linear-gradient(90deg, ${VITALITY_NAVY}, ${VITALITY_GOLD})` }} />

        {/* ── Content ──────────────────────────────────────────────────── */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6" style={{ direction: isAr ? "rtl" : "ltr" }}>

            {/* Description */}
            <div className="mb-10 space-y-4 max-w-2xl">
              <p className="text-base leading-relaxed" style={{ color: "#374151" }}>
                {isAr
                  ? "يتم تقديم خدمة العلاج الطبيعي المنزلي الفاخر من خلال فيتاليتي، الشريك الموثوق للرعاية المنزلية، لتوفير رعاية متكاملة داخل راحة منزل المريض."
                  : "This premium home physiotherapy service is delivered through Vitality, the trusted home care partner, providing comprehensive rehabilitation care in the comfort of the patient's home."}
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#374151" }}>
                {isAr
                  ? "تم تصميم هذه الخدمة لتناسب كبار السن، مرضى ما بعد العمليات الجراحية، والحالات التي تتطلب متابعة علاجية دقيقة ومستمرة، مع التركيز على تحسين الحركة وتسريع التعافي ورفع جودة الحياة."
                  : "It is designed for VIP patients, elderly individuals, and post-surgical cases requiring continuous and specialized follow-up, focusing on improving mobility, accelerating recovery, and enhancing quality of life."}
              </p>
            </div>

            {/* Features */}
            <div className="mb-12">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: VITALITY_NAVY }}>
                {isAr ? "تشمل الخدمة:" : "Features include:"}
              </h2>
              <ul className="space-y-3">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#374151" }}>
                    <span
                      className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                      style={{ background: VITALITY_GOLD }}
                    />
                    {isAr ? f.ar : f.en}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-6 border-t" style={{ borderColor: "#E5E7EB" }}>
              <p className="text-sm mb-4" style={{ color: "#6B7280" }}>
                {isAr
                  ? "لحجز أو الاستفسار عن هذه الخدمة، تفضل بزيارة موقع فيتاليتي."
                  : "To book or enquire about this service, visit the Vitality website."}
              </p>
              <a
                href="https://vitality.sa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ background: VITALITY_NAVY, color: VITALITY_GOLD }}
              >
                <ExternalLink size={15} />
                {isAr ? "زيارة موقع فيتاليتي" : "Visit Vitality Website"}
              </a>
            </div>

          </div>
        </section>

      </main>
      <Footer locale={locale} t={footerT} nav={navForFooter} />
      <WhatsAppButton locale={locale} />
      <ChatbotWidget locale={locale} />
    </>
  );
}
