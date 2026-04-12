import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TollFreeStrip } from "@/components/layout/TollFreeStrip";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { CheckCircle2, MapPin, Shield, Clock } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "الرعاية المنزلية — فيزيوتريو" : "Home Care — PhysioTrio",
    description: locale === "ar"
      ? "خدمة العلاج الطبيعي المنزلي في الرياض ومكة المكرمة — معالج مرخص يصل إليك"
      : "Home physiotherapy service in Riyadh and Makkah — a licensed therapist comes to you",
  };
}

const steps = [
  {
    en: { title: "Book Online", desc: "Select Home Care, choose your city, preferred therapist, date and time — all in under 3 minutes." },
    ar: { title: "احجز عبر الإنترنت", desc: "اختر الرعاية المنزلية ومدينتك والمعالج المفضل والتاريخ والوقت — كل ذلك في أقل من 3 دقائق." },
  },
  {
    en: { title: "Therapist Arrives", desc: "Your MOH-licensed therapist arrives at your home with all necessary equipment, on time." },
    ar: { title: "وصول المعالج", desc: "يصل معالجك المرخص من وزارة الصحة إلى منزلك بجميع المعدات اللازمة، في الوقت المحدد." },
  },
  {
    en: { title: "Treatment at Home", desc: "Receive professional physiotherapy in your own space. A personalised plan is created and updated each visit." },
    ar: { title: "العلاج في المنزل", desc: "احصل على علاج طبيعي احترافي في مساحتك الخاصة. يتم إنشاء خطة شخصية وتحديثها في كل زيارة." },
  },
];

const benefits = [
  { en: "No travel — treatment in your home", ar: "لا حاجة للتنقل — العلاج في منزلك" },
  { en: "Same MOH-licensed therapists from our clinics", ar: "نفس المعالجين المرخصين من عياداتنا" },
  { en: "All equipment brought by the therapist", ar: "جميع المعدات يحضرها المعالج" },
  { en: "Ideal for post-surgical & elderly patients", ar: "مثالي لمرضى ما بعد الجراحة وكبار السن" },
  { en: "Private, comfortable environment", ar: "بيئة خاصة ومريحة" },
  { en: "Flexible scheduling including evenings", ar: "جدولة مرنة تشمل المساء" },
];

export default async function HomeCarePage({ params }: { params: Promise<{ locale: string }> }) {
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
      <main>
        {/* Hero */}
        <section className="pt-36 pb-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #077688 0%, #4caf50 100%)" }}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
              {locale === "ar" ? "الرعاية المنزلية" : "Home Care"}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              {locale === "ar" ? "العلاج يأتيك في المنزل" : "Treatment Comes to You"}
            </h1>
            <p className="text-xl font-light max-w-2xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.85)" }}>
              {locale === "ar"
                ? "معالج طبيعي مرخص من وزارة الصحة يزور منزلك في الرياض أو مكة المكرمة — بجميع المعدات اللازمة."
                : "An MOH-licensed physiotherapist visits your home in Riyadh or Makkah — with all necessary equipment."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`/${locale}/book/riyadh?service=home-care`}
                className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
                style={{ background: "#0d0820", color: "white" }}
              >
                {locale === "ar" ? "احجز زيارة منزلية" : "Book Home Visit"}
              </Link>
              <a
                href="https://wa.me/966500000001"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "2px solid rgba(255,255,255,0.5)" }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Coverage Areas */}
        <section className="py-10" style={{ background: "#0d0820" }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6">
            {["Riyadh / الرياض", "Makkah / مكة المكرمة"].map((city) => (
              <div key={city} className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#4caf50" }}>
                <MapPin size={16} />
                <span className="text-white">{city}</span>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20" style={{ background: "#f8fafb" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-extrabold mb-3" style={{ color: "#0d0820" }}>
                {locale === "ar" ? "كيف يعمل؟" : "How It Works"}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-white font-black text-xl" style={{ background: "linear-gradient(135deg, #077688, #4caf50)" }}>
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: "#077688" }}>
                    {locale === "ar" ? step.ar.title : step.en.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "#666" }}>
                    {locale === "ar" ? step.ar.desc : step.en.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20" style={{ background: "white" }}>
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold mb-8" style={{ color: "#0d0820" }}>
                {locale === "ar" ? "لماذا الرعاية المنزلية؟" : "Why Home Care?"}
              </h2>
              <div className="space-y-4">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} style={{ color: "#4caf50" }} className="flex-shrink-0" />
                    <span className="text-sm font-medium" style={{ color: "#444" }}>
                      {locale === "ar" ? b.ar : b.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl" style={{ background: "rgba(7,118,136,0.06)", border: "1px solid rgba(7,118,136,0.15)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={20} style={{ color: "#077688" }} />
                  <h3 className="font-bold" style={{ color: "#077688" }}>
                    {locale === "ar" ? "معالجون مرخصون" : "Licensed Therapists"}
                  </h3>
                </div>
                <p className="text-sm font-light" style={{ color: "#555" }}>
                  {locale === "ar"
                    ? "جميع معالجي الرعاية المنزلية مرخصون من وزارة الصحة السعودية ومدربون على بروتوكولات العلاج في المنزل."
                    : "All home care therapists are MOH-licensed and trained in home treatment protocols."}
                </p>
              </div>
              <div className="p-6 rounded-2xl" style={{ background: "rgba(76,175,80,0.06)", border: "1px solid rgba(76,175,80,0.15)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={20} style={{ color: "#4caf50" }} />
                  <h3 className="font-bold" style={{ color: "#388e3c" }}>
                    {locale === "ar" ? "مثالي لـ" : "Ideal For"}
                  </h3>
                </div>
                <p className="text-sm font-light" style={{ color: "#555" }}>
                  {locale === "ar"
                    ? "مرضى ما بعد الجراحة، كبار السن، المرضى الذين يعانون من محدودية في الحركة، الأمهات بعد الولادة."
                    : "Post-surgical patients, elderly patients, those with limited mobility, post-natal mothers."}
                </p>
              </div>
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
