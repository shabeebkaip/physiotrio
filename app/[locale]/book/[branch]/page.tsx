import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, MapPin, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { branches } from "@/lib/data/branches";
import { services } from "@/lib/data/services";
import { therapists } from "@/lib/data/therapists";
import { programs } from "@/lib/data/programs";
import { packages } from "@/lib/data/packages";
import { BookingFlow } from "@/components/booking/BookingFlow";

export async function generateStaticParams() {
  const activeBranches = branches.filter((b) => !b.comingSoon);
  return activeBranches.flatMap((b) => [
    { locale: "en", branch: b.id },
    { locale: "ar", branch: b.id },
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; branch: string }> }): Promise<Metadata> {
  const { locale, branch } = await params;
  const b = branches.find((x) => x.id === branch);
  if (!b) return { title: "Book — PhysioTrio" };
  return {
    title: locale === "ar"
      ? `احجز موعد — فيزيوتريو ${b.city.ar}`
      : `Book Appointment — PhysioTrio ${b.city.en}`,
  };
}

export default async function BookPage({ params }: { params: Promise<{ locale: string; branch: string }> }) {
  const { locale, branch } = await params;
  const branchData = branches.find((b) => b.id === branch && !b.comingSoon);
  if (!branchData) notFound();

  const nav = await getTranslations("nav");
  const footer = await getTranslations("footer");

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

  const branchServices = services.filter((s) => s.branches.includes(branch));
  const branchTherapists = therapists.filter((t) => t.branches.includes(branch));
  const isAr = locale === "ar";

  return (
    <>
      <Navbar locale={locale} translations={navT} />
      <main className="pt-36 pb-20 min-h-screen" style={{ background: "#F8FAFC" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">

          {/* Page header */}
          <div className="mb-10">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
            >
              {isAr ? branchData.city.ar : branchData.city.en}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "#1a1a2e" }}>
              {isAr ? "احجز موعدك" : "Book Your Appointment"}
            </h1>
            <p className="text-base mt-1" style={{ color: "#6B7280" }}>
              {isAr ? "أقل من 3 دقائق · بدون انتظار" : "Less than 3 minutes · No waiting"}
            </p>
          </div>

          {/* Two-panel layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Left: Booking form */}
            <div className="flex-1 min-w-0">
              <BookingFlow
                locale={locale}
                branch={branchData}
                services={branchServices}
                therapists={branchTherapists}
                programs={programs}
                packages={packages}
              />
            </div>

            {/* Right: Info sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0 space-y-4 lg:sticky lg:top-36">

              {/* Branch card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-base mb-4" style={{ color: "#1a1a2e" }}>
                  {isAr ? "معلومات الفرع" : "Branch Info"}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)" }}>
                      <MapPin size={15} style={{ color: "var(--color-brand-purple)" }} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                      {isAr ? branchData.address.ar : branchData.address.en}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)" }}>
                      <Clock size={15} style={{ color: "var(--color-brand-purple)" }} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                      {isAr ? branchData.hours.ar : branchData.hours.en}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)" }}>
                      <Phone size={15} style={{ color: "var(--color-brand-purple)" }} />
                    </div>
                    <a href="tel:8001000246" dir="ltr" className="text-sm font-semibold" style={{ color: "var(--color-brand-purple)" }}>
                      800 100 0246
                    </a>
                  </div>
                </div>
              </div>

              {/* What to bring */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-base mb-4" style={{ color: "#1a1a2e" }}>
                  {isAr ? "ماذا تحضر" : "What to Bring"}
                </h3>
                <ul className="space-y-2">
                  {(isAr
                    ? ["تقارير طبية سابقة", "بطاقة الهوية الوطنية", "وثائق التأمين الصحي", "ملابس مريحة للحركة"]
                    : ["Previous medical reports", "National ID / Iqama", "Health insurance card", "Comfortable clothing"]
                  ).map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "#6B7280" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--color-brand-purple)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${branchData.whatsapp?.replace(/\D/g, "") ?? "9668001000246"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "#25D366" }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
              </a>

            </div>
          </div>
        </div>
      </main>
      <Footer locale={locale} t={footerT} nav={navForFooter} />
      <WhatsAppButton locale={locale} />
      <ChatbotWidget locale={locale} />
    </>
  );
}
