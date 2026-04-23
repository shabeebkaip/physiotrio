"use client";

import Image from "next/image";

interface CenterGalleryProps {
  locale: string;
}

const GALLERY = [
  {
    src: "/center-images/DSC07454.jpg",
    alt: "PhysioTrio entrance — Riyadh",
    span: "col-span-2",
    aspectRatio: "21/9",
  },
  {
    src: "/center-images/DSC07546.jpg",
    alt: "PhysioTrio sports rehabilitation gym",
    span: "col-span-1",
    aspectRatio: "4/3",
  },
  {
    src: "/center-images/DSC07303.jpg",
    alt: "PhysioTrio women's physiotherapy session",
    span: "col-span-1",
    aspectRatio: "4/3",
  },
  {
    src: "/center-images/DSC07771.jpg",
    alt: "PhysioTrio sports injury assessment",
    span: "col-span-1",
    aspectRatio: "4/3",
  },
  {
    src: "/center-images/DSC07439.jpg",
    alt: "PhysioTrio electrotherapy treatment",
    span: "col-span-1",
    aspectRatio: "4/3",
  },
];

export function CenterGallery({ locale }: CenterGalleryProps) {
  const isAr = locale === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="py-16 bg-[#F8F9FA]"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-purple mb-2 block">
            {isAr ? "مركزنا" : "Inside Our Center"}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {isAr ? "أحدث مرافق العلاج الطبيعي" : "State-of-the-Art Facilities"}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Large banner image - full width on mobile, spans 2 cols on md */}
          <div
            className="col-span-2 md:col-span-4 relative overflow-hidden rounded-2xl bg-gray-200"
            style={{ aspectRatio: "21/7" }}
          >
            <Image
              src="/center-images/DSC07454.jpg"
              alt="PhysioTrio clinic entrance — Riyadh"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>

          {/* 4 smaller images */}
          {[
            { src: "/center-images/DSC07546.jpg", alt: "Sports rehabilitation gym" },
            { src: "/center-images/DSC07286.jpg", alt: "Women's physiotherapy session" },
            { src: "/center-images/DSC07771.jpg", alt: "Sports injury knee assessment" },
            { src: "/center-images/DSC07444.jpg", alt: "Private treatment room" },
          ].map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl bg-gray-200"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
