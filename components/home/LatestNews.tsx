"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/data/blog";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface LatestNewsProps {
  locale: string;
  posts: BlogPost[];
}

export function LatestNews({ locale, posts }: LatestNewsProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  
  // We need up to 4 posts to fill the layout: 1 large left, 2 small middle, 1 large right.
  const displayPosts = posts.slice(0, 4);

  useGSAP(() => {
    // Header anm
    gsap.fromTo(
      ".news-header-anim",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      }
    );

    // Cards staggered entrance
    gsap.fromTo(
      ".news-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: { trigger: ".news-grid-container", start: "top 85%" }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="news-header-anim flex items-center justify-between mb-16 pb-6 border-b border-gray-200">
          <div>
            <span className="inline-block text-sm font-bold uppercase tracking-widest mb-3 px-4 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple">
              {isAr ? "المدونة" : "Blog & Articles"}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0B162C]">
              {isAr ? "أحدث الأخبار" : "Latest News"}
            </h2>
          </div>
          <Link 
            href={`/${locale}/blog`}
            className="flex items-center gap-2 px-6 py-3 border-2 border-brand-purple text-brand-purple rounded-full font-bold hover:bg-brand-purple hover:text-white transition-colors"
          >
            {isAr ? "جميع الأخبار" : "View All"}
          </Link>
        </div>

        {/* 3-Column Grid representing the provided design */}
        <div className="news-grid-container grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          
          {/* Left Column - Large Image Card */}
          <div className="flex flex-col">
            {displayPosts[0] && <LargeNewsCard post={displayPosts[0]} isAr={isAr} locale={locale} borderRadiusClass="rounded-tl-[60px] rounded-br-[60px] rounded-tr-xl rounded-bl-xl" />}
          </div>

          {/* Middle Column - Two stacked text-only cards */}
          <div className="flex flex-col gap-12 justify-center py-4">
            {displayPosts[1] && <SmallNewsCard post={displayPosts[1]} isAr={isAr} locale={locale} />}
            {displayPosts[2] && <SmallNewsCard post={displayPosts[2]} isAr={isAr} locale={locale} />}
          </div>

          {/* Right Column - Large Image Card */}
          <div className="flex flex-col">
             {displayPosts[3] && <LargeNewsCard post={displayPosts[3]} isAr={isAr} locale={locale} borderRadiusClass="rounded-tr-[60px] rounded-bl-[60px] rounded-tl-xl rounded-br-xl" />}
          </div>

        </div>

      </div>
    </section>
  );
}

// ── Large Card with Image ──────────────────────────────────────────────
function LargeNewsCard({ post, isAr, locale, borderRadiusClass = "rounded-2xl" }: { post: BlogPost; isAr: boolean; locale: string; borderRadiusClass?: string }) {
  const formattedDate = new Date(post.date).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    month: "long", day: "numeric", year: "numeric"
  });

  return (
    <div className="news-card flex flex-col group opacity-0">
      <Link href={`/${locale}/blog/${post.slug}`} className="block">
        <div className={`relative w-full aspect-[4/3] ${borderRadiusClass} overflow-hidden mb-6`} style={{ transform: "translateZ(0)" }}>
          <Image 
            src={post.image} 
            alt={isAr ? post.title.ar : post.title.en} 
            fill 
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.12]" 
          />
          {/* Category Pill over image */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:left-4">
             <span className="px-5 py-2 bg-white text-xs font-bold rounded-tl-full rounded-br-full rounded-tr-md rounded-bl-md shadow-md text-brand-purple">
               {isAr ? post.category.ar : post.category.en}
             </span>
          </div>
        </div>
        
        <p className="text-sm font-bold mb-3 text-gray-500 uppercase tracking-widest">{formattedDate}</p>
        <h3 className="text-2xl font-black leading-snug mb-4 text-[#0B162C] group-hover:text-brand-purple transition-colors">
          {isAr ? post.title.ar : post.title.en}
        </h3>
        
        <p className="text-sm font-bold text-gray-400 group-hover:text-brand-purple transition-colors">
          {isAr ? "اقرأ المزيد ←" : "Read More →"}
        </p>
      </Link>
    </div>
  );
}

// ── Small Text-Only Card ─────────────────────────────────────────────
function SmallNewsCard({ post, isAr, locale }: { post: BlogPost; isAr: boolean; locale: string }) {
  const formattedDate = new Date(post.date).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    month: "long", day: "numeric", year: "numeric"
  });

  return (
    <div className="news-card flex flex-col group opacity-0 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link href={`/${locale}/blog/${post.slug}`} className="block">
        <p className="text-sm font-bold mb-3 text-brand-green uppercase tracking-widest">{formattedDate}</p>
        <h3 className="text-xl font-black leading-snug mb-4 text-[#0B162C] group-hover:text-brand-purple transition-colors">
          {isAr ? post.title.ar : post.title.en}
        </h3>
        <p className="text-sm font-bold text-gray-400 group-hover:text-brand-purple transition-colors">
          {isAr ? "اقرأ المزيد ←" : "Read More →"}
        </p>
      </Link>
    </div>
  );
}
