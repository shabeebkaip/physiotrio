import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TollFreeStrip } from "@/components/layout/TollFreeStrip";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "سياسة الخصوصية — فيزيوتريو" : "Privacy Policy — PhysioTrio",
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
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
        <section className="pt-36 pb-16 px-6" style={{ background: "linear-gradient(135deg, var(--color-hero-bg) 0%, var(--color-dark-surface) 100%)" }}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
            </h1>
            <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
              {isAr ? "آخر تحديث: يناير 2025" : "Last updated: January 2025"}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-6" style={{ background: "var(--color-surface-light)" }}>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10" style={{ boxShadow: "0 4px 24px rgba(var(--color-brand-purple-rgb),0.06)" }}>
            <div className="prose max-w-none" style={{ color: "#444", lineHeight: "1.8" }}>
              {isAr ? (
                <div className="space-y-8 text-right" dir="rtl">
                  <Section title="١. من نحن" body="فيزيوتريو ('نحن'، 'خدماتنا') هو مركز للعلاج الطبيعي يعمل تحت مظلة مجموعة برجيل القابضة في المملكة العربية السعودية. نحن ملتزمون بحماية خصوصيتك وضمان أمان معلوماتك الشخصية." />
                  <Section title="٢. المعلومات التي نجمعها" body="نجمع المعلومات التي تقدمها عند حجز موعد، بما في ذلك: الاسم الكامل، رقم الجوال، البريد الإلكتروني، تفاصيل التأمين الصحي، والتاريخ الطبي ذات الصلة بالعلاج. قد نجمع أيضاً بيانات الاستخدام من موقعنا الإلكتروني." />
                  <Section title="٣. كيف نستخدم معلوماتك" body="نستخدم معلوماتك لـ: إدارة مواعيدك وسجلاتك الطبية، التواصل معك بشأن رعايتك، معالجة المدفوعات وطلبات التأمين، تحسين خدماتنا، والامتثال للوائح وزارة الصحة السعودية." />
                  <Section title="٤. مشاركة المعلومات" body="لا نبيع بياناتك الشخصية. قد نشارك المعلومات مع: مقدمي التأمين لمعالجة المطالبات، شركاء الرعاية الصحية داخل مجموعة برجيل، والجهات التنظيمية عند الطلب القانوني." />
                  <Section title="٥. أمان البيانات" body="نستخدم تشفير SSL ومعايير أمان الرعاية الصحية لحماية بياناتك. يتم الوصول إلى السجلات الطبية من قبل المعالجين المعتمدين فقط." />
                  <Section title="٦. حقوقك" body="يحق لك الوصول إلى بياناتك الشخصية وتصحيحها أو حذفها. لممارسة هذه الحقوق، تواصل معنا عبر: privacy@physiotrio.com" />
                  <Section title="٧. الاتصال بنا" body="للأسئلة المتعلقة بالخصوصية: privacy@physiotrio.com | +966-11-XXX-XXXX" />
                </div>
              ) : (
                <div className="space-y-8">
                  <Section title="1. Who We Are" body="PhysioTrio ('we', 'our services') is a physiotherapy center operating under Burjeel Holdings in the Kingdom of Saudi Arabia. We are committed to protecting your privacy and ensuring the security of your personal information." />
                  <Section title="2. Information We Collect" body="We collect information you provide when booking an appointment, including: full name, mobile number, email address, health insurance details, and medical history relevant to treatment. We may also collect usage data from our website." />
                  <Section title="3. How We Use Your Information" body="We use your information to: manage your appointments and medical records, communicate with you about your care, process payments and insurance claims, improve our services, and comply with Saudi Ministry of Health regulations." />
                  <Section title="4. Information Sharing" body="We do not sell your personal data. We may share information with: insurance providers for claims processing, healthcare partners within the Burjeel group, and regulatory bodies upon lawful request." />
                  <Section title="5. Data Security" body="We use SSL encryption and healthcare-grade security standards to protect your data. Medical records are accessed only by authorised therapists." />
                  <Section title="6. Your Rights" body="You have the right to access, correct, or request deletion of your personal data. To exercise these rights, contact us at: privacy@physiotrio.com" />
                  <Section title="7. Contact Us" body="For privacy-related questions: privacy@physiotrio.com | +966-11-XXX-XXXX" />
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
      <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-brand-purple)", marginBottom: "0.5rem" }}>{title}</h2>
      <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "#555" }}>{body}</p>
    </div>
  );
}
