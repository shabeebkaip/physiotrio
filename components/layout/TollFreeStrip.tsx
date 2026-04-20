import { Phone, Mail, MapPin } from "lucide-react";

export function TollFreeStrip({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="fixed top-0 left-0 right-0 w-full hidden md:flex items-center justify-between py-2 px-6 lg:px-12 text-[11px] text-white/80 font-medium z-[60]"
      style={{ background: "#0f2d1f", height: "42px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Left: Contact Info */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
          <Phone size={12} className="text-brand-green" />
          <a href="tel:8001000091">800 100 0091</a>
        </div>
        <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
          <Mail size={12} className="text-brand-green" />
          <a href="mailto:info@physiotrio.com">info@physiotrio.com</a>
        </div>
        <div className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
          <MapPin size={12} className="text-brand-green" />
          <span>{isAr ? "حي العليا، طريق الملك فهد، الرياض" : "Al Olaya, King Fahd Rd, Riyadh"}</span>
        </div>
      </div>

      {/* Right: Social Links */}
      <div className="flex items-center gap-4">
        {/* Social links removed due to missing icons in current lucide version */}
      </div>
    </div>
  );
}
