"use client";

import { useRef } from "react";
import { ShieldCheck, Activity, Clock, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

interface WhyPhysioTrioProps {
  locale: string;
  t: {
    title: string; body1: string; body2: string;
    feature1Title: string; feature1Desc: string;
    feature2Title: string; feature2Desc: string;
    feature3Title: string; feature3Desc: string;
    feature4Title: string; feature4Desc: string;
    bookAppointment: string;
  };
}

export function WhyPhysioTrio({ locale, t }: WhyPhysioTrioProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  const bullets = [
    { icon: ShieldCheck, title: t.feature1Title, desc: t.feature1Desc },
    { icon: Activity,    title: t.feature2Title, desc: t.feature2Desc },
    { icon: Clock,       title: t.feature3Title, desc: t.feature3Desc },
    { icon: Users,       title: t.feature4Title, desc: t.feature4Desc },
  ];

  useGSAP(() => {
    gsap.fromTo(".why-img-col", 
      { opacity: 0, x: isAr ? 60 : -60 },
      {
        opacity: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      }
    );
    gsap.fromTo(".why-hdr", 
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      }
    );
    gsap.fromTo(".why-bullet", 
      { opacity: 0, x: isAr ? -30 : 30 },
      {
        opacity: 1, x: 0, duration: 0.55, stagger: 0.10, ease: "power3.out",
        scrollTrigger: { trigger: ".why-bullets", start: "top 84%", toggleActions: "play none none none" },
      }
    );
    setTimeout(() => ScrollTrigger.refresh(), 500);
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: "#f4fbf7" }}
    >
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        <div className={`flex flex-col lg:flex-row gap-16 items-center ${isAr ? "lg:flex-row-reverse" : ""}`}>

          {/* ── Image column with Physiocare asymmetric border radius ── */}
          <div className="why-img-col relative w-full lg:w-[44%] shrink-0">
            {/* Main image — asymmetric corners */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "4/5",
                borderRadius: isAr
                  ? "60px 0px 60px 0px"
                  : "0px 60px 0px 60px",
                boxShadow: "0 32px 80px rgba(15,45,31,0.18)",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                alt="PhysioTrio therapy session"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 44vw"
                unoptimized
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(15,45,31,0.28) 100%)" }}
              />
            </div>

            {/* Years badge — floats top */}
            <div
              className={`absolute top-8 ${isAr ? "left-0 -translate-x-1/3" : "right-0 translate-x-1/3"} px-6 py-5 rounded-2xl`}
              style={{ background: "#880772", boxShadow: "0 16px 40px rgba(136,7,114,0.45)" }}
            >
              <div className="text-3xl font-black text-white leading-none text-center">22+</div>
              <div className="text-xs font-semibold text-white/70 uppercase tracking-wider text-center mt-1">{isAr ? "سنة خبرة" : "Years Exp"}</div>
            </div>

            {/* Patients badge — floats bottom */}
            <div
              className={`absolute bottom-8 ${isAr ? "right-0 translate-x-1/3" : "left-0 -translate-x-1/3"} px-6 py-4 rounded-2xl bg-white`}
              style={{ boxShadow: "0 16px 48px rgba(136,7,114,0.18)", border: "1px solid rgba(136,7,114,0.10)" }}
            >
              <div className="text-3xl font-black leading-none text-center" style={{ color: "#4caf50" }}>10K+</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-center mt-1" style={{ color: "#4a6b59" }}>
                {isAr ? "مريض سعيد" : "Happy Patients"}
              </div>
            </div>

            {/* Decorative dot cluster */}
            <div
              className="absolute -bottom-8 pointer-events-none hidden lg:block"
              style={{
                width: "120px", height: "120px",
                [isAr ? "right" : "left"]: "-30px",
                backgroundImage: "radial-gradient(circle, rgba(136,7,114,0.22) 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
              }}
            />
          </div>

          {/* ── Content ── */}
          <div className={`w-full lg:w-[56%] ${isAr ? "text-right" : "text-left"}`}>
            <span
              className="why-hdr inline-block text-xs font-bold uppercase tracking-[0.20em] px-5 py-2 rounded-full mb-5"
              style={{ background: "rgba(76,175,80,0.12)", color: "#388e3c", border: "1px solid rgba(76,175,80,0.22)" }}
            >
              {isAr ? "لماذا فيزيوتريو" : "Why Choose Us"}
            </span>

            <h2 className="why-hdr text-4xl sm:text-5xl font-black leading-tight mb-6" style={{ color: "#0f2d1f" }}>
              {isAr ? "نحن الأفضل في العلاج الطبيعي" : "We Are The Best For Physiotherapy"}
            </h2>
            <p className="why-hdr text-base leading-relaxed mb-10 text-gray-500 font-medium">{t.body1}</p>

            {/* Feature Bullets in 2-column grid */}
            <div className="why-bullets grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-12">
              {[
                { title: isAr ? "استراتيجيات التغذية" : "Nutrition Strategies" },
                { title: isAr ? "كن استباقيًا" : "Be Pro Active" },
                { title: isAr ? "روتين التمرين" : "Workout Routines" },
                { title: isAr ? "الدعم والتحفيز" : "Support & Motivation" },
              ].map((b, i) => (
                <div
                  key={i}
                  className={`why-bullet flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: "#4caf50" }}>
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <span className="text-base font-bold text-[#0f2d1f]">{b.title}</span>
                </div>
              ))}
            </div>

            {/* CTA & Expert Profile Row */}
            <div className={`flex flex-col sm:flex-row items-center gap-8 ${isAr ? "sm:flex-row-reverse" : ""}`}>
              <Link
                href={`/${locale}/book/riyadh`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base text-white transition-all duration-300 hover:-translate-y-1"
                style={{ background: "#0f2d1f", boxShadow: "0 8px 30px rgba(15, 45, 31, 0.25)" }}
              >
                {t.bookAppointment}
                <ArrowRight size={18} className={isAr ? "-scale-x-100" : ""} />
              </Link>
              
              {/* Mock Specialist Profile */}
              <div className={`flex items-center gap-4 ${isAr ? "flex-row-reverse text-right" : "text-left"}`}>
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-green/20 relative">
                  <Image 
                    src="https://images.unsplash.com/photo-1559839734-2b71f1536783?w=100&q=80" 
                    alt="Specialist" 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="text-base font-black leading-none mb-1" style={{ color: "#0f2d1f" }}>
                    {isAr ? "د. سامي الأحمد" : "Dr. Sami Al-Ahmad"}
                  </h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-green">
                    {isAr ? "أخصائي علاج طبيعي" : "Physiotherapy Specialist"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
