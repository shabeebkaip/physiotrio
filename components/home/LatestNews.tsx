"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/data/blog";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

interface LatestNewsProps { locale: string; posts: BlogPost[]; }

export function LatestNews({ locale, posts }: LatestNewsProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const displayPosts = posts.slice(0, 3);

  useGSAP(() => {
    gsap.fromTo(".news-hdr", 
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
      }
    );
    gsap.fromTo(".news-card", 
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 88%", toggleActions: "play none none none" },
      }
    );
    // Force refresh to handle dynamic layout shifts
    setTimeout(() => ScrollTrigger.refresh(), 500);
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-28" style={{ background: "#fff" }}>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* Header row */}
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 ${isAr ? "sm:flex-row-reverse" : ""}`}>
          <div className={isAr ? "text-right" : "text-left"}>
            <span className="news-hdr inline-block text-xs font-bold uppercase tracking-[0.20em] px-5 py-2 rounded-full mb-5"
              style={{ background: "rgba(76,175,80,0.12)", color: "#388e3c", border: "1px solid rgba(76,175,80,0.22)" }}>
              {isAr ? "المقالات والأخبار" : "Blog & Articles"}
            </span>
            <h2 className="news-hdr text-4xl sm:text-5xl font-black leading-tight" style={{ color: "#0f2d1f" }}>
              {isAr ? "أحدث القصص والأخبار" : "Latest Stories & News"}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="news-hdr shrink-0 inline-flex items-center gap-2 group px-8 py-4 rounded-full font-bold text-sm transition-all duration-300"
            style={{ color: "#0f2d1f", border: "1.5px solid #0f2d1f" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="#0f2d1f"; el.style.color="#fff"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="transparent"; el.style.color="#0f2d1f"; }}
          >
            {isAr ? "جميع الأخبار" : "View All News"}
            <ArrowRight size={18} className={`transition-transform duration-300 group-hover:translate-x-1 ${isAr ? "-scale-x-100" : ""}`} />
          </Link>
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, i) => {
            const date = new Date(post.date).toLocaleDateString(isAr ? "ar-SA" : "en-US", { month: "long", day: "numeric", year: "numeric" });
            return (
              <article key={post.slug} className="news-card group flex flex-col rounded-[2rem] overflow-hidden transition-all duration-500 bg-white"
                style={{ border: "1px solid #E6EEEC" }}
                onMouseEnter={e => { 
                  const el = e.currentTarget as HTMLElement; 
                  el.style.boxShadow="0 25px 50px rgba(15, 45, 31, 0.08)"; 
                  el.style.transform="translateY(-10px)"; 
                }}
                onMouseLeave={e => { 
                  const el = e.currentTarget as HTMLElement; 
                  el.style.boxShadow="none"; 
                  el.style.transform="translateY(0)"; 
                }}
              >
                {/* Image */}
                <Link href={`/${locale}/blog/${post.slug}`} className="block relative overflow-hidden h-64">
                  <Image
                    src={post.image} alt={isAr ? post.title.ar : post.title.en}
                    fill className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width:768px) 100vw, 33vw"
                    unoptimized
                  />
                  {/* Date badge floats on image bottom-right */}
                  <div 
                    className={`absolute bottom-6 ${isAr ? "left-6" : "right-6"} bg-white px-4 py-2 rounded-full font-black text-xs uppercase tracking-wider`}
                    style={{ color: "#0f2d1f", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
                  >
                    {date}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-8 sm:p-10 flex flex-col flex-1">
                   <div className="flex items-center gap-2 mb-4">
                     <span className="w-1.5 h-6 rounded-full bg-brand-green"></span>
                     <span className="text-xs font-black uppercase tracking-widest text-brand-green">
                       {isAr ? post.category.ar : post.category.en}
                     </span>
                   </div>

                   <h3 className="text-xl font-black leading-snug mb-8 group-hover:text-brand-purple transition-colors duration-300 flex-1" style={{ color: "#0f2d1f" }}>
                    <Link href={`/${locale}/blog/${post.slug}`}>{isAr ? post.title.ar : post.title.en}</Link>
                  </h3>
                  
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-3 self-start text-sm font-black transition-colors duration-300 group-hover:gap-5"
                    style={{ color: "#0f2d1f" }}
                  >
                    {isAr ? "اقرأ المزيد" : "Read More"}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 group-hover:bg-[#0f2d1f] group-hover:border-[#0f2d1f] transition-all">
                      <ArrowRight size={14} className={`group-hover:text-white ${isAr ? "-scale-x-100" : ""}`} />
                    </div>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
