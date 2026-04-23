import Link from "next/link";
import Image from "next/image";
import type { NewsPost } from "@/lib/data/news";
import { ArrowRight, Calendar } from "lucide-react";

interface LatestNewsProps {
  locale: string;
  posts: NewsPost[];
}

function formatDate(dateStr: string, isAr: boolean) {
  return new Date(dateStr).toLocaleDateString(isAr ? "ar-SA" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function LatestNews({ locale, posts }: LatestNewsProps) {
  const isAr = locale === "ar";
  const display = posts.slice(0, 3);
  const featured = display[0];
  const secondary = display.slice(1, 3);

  if (!featured) return null;

  const featuredHref = `/${locale}/news/${featured.slug}`;

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#f8f9fb" }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2 block"
              style={{ color: "var(--color-brand-purple)" }}
            >
              {isAr ? "الأخبار والفعاليات" : "News & Events"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {isAr ? "آخر الأخبار" : "Latest News"}
            </h2>
          </div>
          <Link
            href={`/${locale}/news`}
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: "var(--color-brand-purple)" }}
          >
            {isAr ? "جميع الأخبار" : "View All"}
            <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
          </Link>
        </div>

        {/* Editorial layout */}
        <div className="grid lg:grid-cols-5 gap-4">

          {/* Featured article — spans 3 cols */}
          <Link
            href={featuredHref}
            className="group relative rounded-2xl overflow-hidden lg:col-span-3 flex flex-col"
            style={{ minHeight: "360px", background: "#0f2b3d" }}
          >
            <Image
              src={featured.image}
              alt={isAr ? featured.title.ar : featured.title.en}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
              unoptimized
            />
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(7,20,30,0.92) 0%, rgba(7,20,30,0.4) 55%, transparent 100%)",
              }}
            />
            {/* Text */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 self-start"
                style={{ background: "var(--color-brand-green)", color: "white" }}
              >
                {isAr ? featured.category.ar : featured.category.en}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white leading-snug mb-2">
                {isAr ? featured.title.ar : featured.title.en}
              </h3>
              <span className="flex items-center gap-1.5 text-xs text-white/50">
                <Calendar size={10} />
                {formatDate(featured.date, isAr)}
              </span>
            </div>
          </Link>

          {/* Secondary articles — spans 2 cols */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {secondary.map((post) => {
              const href = `/${locale}/news/${post.slug}`;
              return (
                <Link
                  key={post.slug}
                  href={href}
                  className="group flex gap-4 bg-white rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-md transition-all duration-200 overflow-hidden flex-1"
                  style={{ minHeight: "160px" }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-32 shrink-0" style={{ background: "#e5e7eb" }}>
                    <Image
                      src={post.image}
                      alt={isAr ? post.title.ar : post.title.en}
                      fill
                      className="object-cover"
                      sizes="128px"
                      unoptimized
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-center py-4 pr-4 gap-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: "var(--color-brand-green)" }}
                      >
                        {isAr ? post.category.ar : post.category.en}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <Calendar size={10} />
                        {formatDate(post.date, isAr)}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-3 group-hover:text-brand-purple transition-colors">
                      {isAr ? post.title.ar : post.title.en}
                    </h3>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold mt-auto"
                      style={{ color: "var(--color-brand-purple)" }}
                    >
                      {isAr ? "اقرأ المزيد" : "Read More"}
                      <ArrowRight size={11} className={isAr ? "rotate-180" : ""} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
