import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TollFreeStrip } from "@/components/layout/TollFreeStrip";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "الشروط والأحكام — فيزيوتريو" : "Terms & Conditions — PhysioTrio",
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const nav = await getTranslations("nav");
  const footer = await getTranslations("footer");

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

  const isAr = locale === "ar";

  return (
    <>
      <TollFreeStrip locale={locale} />
      <Navbar locale={locale} translations={navT} />
      <main>
        {/* Hero */}
        <section className="pt-36 pb-16 px-6" style={{ background: "linear-gradient(135deg, #0d0820 0%, #1a0d2e 100%)" }}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
            </h1>
            <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
              {isAr ? "آخر تحديث: يناير 2025" : "Last updated: January 2025"}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-6" style={{ background: "#f8fafb" }}>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10" style={{ boxShadow: "0 4px 24px rgba(7,118,136,0.06)" }}>
            <div className="prose max-w-none">
              {isAr ? (
                <div className="space-y-8 text-right" dir="rtl">
                  <Section title="١. قبول الشروط" body="باستخدام خدمات فيزيوتريو أو حجز موعد، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق، يرجى عدم استخدام خدماتنا." />
                  <Section title="٢. الخدمات" body="يقدم فيزيوتريو خدمات العلاج الطبيعي وإعادة التأهيل في المملكة العربية السعودية. تخضع جميع الخدمات للوائح وزارة الصحة السعودية." />
                  <Section title="٣. سياسة الإلغاء" body="يجب إلغاء المواعيد أو إعادة جدولتها قبل 24 ساعة على الأقل لتجنب رسوم الإلغاء. الإلغاء المتأخر أو عدم الحضور قد يستلزم رسوماً تعادل جلسة واحدة." />
                  <Section title="٤. المدفوعات" body="تُستحق المدفوعات في وقت الخدمة. للباقات، يتوفر خيار التقسيط عبر تمارا وتابي وفقاً لشروطهم. لا تُعاد الرسوم المدفوعة إلا في حالات استثنائية." />
                  <Section title="٥. التأمين الصحي" body="نقبل شركات التأمين المدرجة على موقعنا. العميل مسؤول عن التحقق من تغطيته مع شركة التأمين قبل الجلسة. أي مبالغ غير مغطاة تُستحق من المريض مباشرة." />
                  <Section title="٦. المسؤولية الطبية" body="يقدم فيزيوتريو خدمات العلاج الطبيعي القائمة على الأدلة من قبل متخصصين مرخصين. نحن لسنا مسؤولين عن نتائج علاجية محددة حيث تختلف النتائج من مريض لآخر." />
                  <Section title="٧. القانون المعمول به" body="تخضع هذه الشروط لقوانين المملكة العربية السعودية." />
                  <Section title="٨. التواصل" body="للاستفسارات: legal@physiotrio.com | +966-11-XXX-XXXX" />
                </div>
              ) : (
                <div className="space-y-8">
                  <Section title="1. Acceptance of Terms" body="By using PhysioTrio services or booking an appointment, you agree to these Terms & Conditions. If you do not agree, please do not use our services." />
                  <Section title="2. Services" body="PhysioTrio provides physiotherapy and rehabilitation services in the Kingdom of Saudi Arabia. All services are subject to Saudi Ministry of Health regulations." />
                  <Section title="3. Cancellation Policy" body="Appointments must be cancelled or rescheduled at least 24 hours in advance to avoid cancellation fees. Late cancellations or no-shows may incur a fee equivalent to one session." />
                  <Section title="4. Payments" body="Payments are due at the time of service. For packages, instalment options are available via Tamara and Tabby subject to their terms. Fees paid are non-refundable except in exceptional circumstances." />
                  <Section title="5. Health Insurance" body="We accept insurance providers listed on our website. Patients are responsible for verifying their coverage with their insurer prior to the session. Any uncovered amounts are due directly from the patient." />
                  <Section title="6. Medical Liability" body="PhysioTrio provides evidence-based physiotherapy services delivered by licensed specialists. We are not liable for specific treatment outcomes as results vary between patients." />
                  <Section title="7. Governing Law" body="These Terms are governed by the laws of the Kingdom of Saudi Arabia." />
                  <Section title="8. Contact" body="For enquiries: legal@physiotrio.com | +966-11-XXX-XXXX" />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} t={footerT} nav={navForFooter} />
      <WhatsAppButton locale={locale} />
    </>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#077688", marginBottom: "0.5rem" }}>{title}</h2>
      <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "#555" }}>{body}</p>
    </div>
  );
}
