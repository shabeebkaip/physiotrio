export interface Branch {
  id: string;
  his: string | null;
  comingSoon: boolean;
  city: { en: string; ar: string };
  address: { en: string; ar: string };
  phone: string;
  whatsapp: string;
  email: string;
  hours: { en: string; ar: string };
  coordinates: { lat: number; lng: number };
  therapistCount: number;
  serviceCount: number;
  services: string[];
}

export const branches: Branch[] = [
  {
    id: "riyadh",
    his: "ecare",
    comingSoon: false,
    city: { en: "Riyadh", ar: "الرياض" },
    address: { en: "Al Olaya District, King Fahd Road, Riyadh 12211", ar: "حي العليا، طريق الملك فهد، الرياض 12211" },
    phone: "+966-11-XXX-XXXX",
    whatsapp: "+966500000001",
    email: "riyadh@physiotrio.com",
    hours: {
      en: "Sun–Thu 8:00AM–9:00PM, Fri–Sat 10:00AM–6:00PM",
      ar: "الأحد–الخميس ٨:٠٠ص–٩:٠٠م، الجمعة–السبت ١٠:٠٠ص–٦:٠٠م"
    },
    coordinates: { lat: 24.6877, lng: 46.7219 },
    therapistCount: 22,
    serviceCount: 9,
    services: ["orthopedic-rehabilitation", "sports-physiotherapy", "neurological-rehabilitation", "geriatric-physiotherapy", "pediatric-physiotherapy", "manual-therapy", "womens-health", "recovery-program", "device-based-therapy"]
  },
  {
    id: "makkah",
    his: "nixpend",
    comingSoon: false,
    city: { en: "Makkah", ar: "مكة المكرمة" },
    address: { en: "Al Zaher District, Ibrahim Al Khalil Road, Makkah 24231", ar: "حي الزاهر، طريق إبراهيم الخليل، مكة المكرمة 24231" },
    phone: "+966-12-XXX-XXXX",
    whatsapp: "+966500000002",
    email: "makkah@physiotrio.com",
    hours: {
      en: "Sun–Thu 8:00AM–9:00PM, Fri–Sat 10:00AM–6:00PM",
      ar: "الأحد–الخميس ٨:٠٠ص–٩:٠٠م، الجمعة–السبت ١٠:٠٠ص–٦:٠٠م"
    },
    coordinates: { lat: 21.3891, lng: 39.8579 },
    therapistCount: 18,
    serviceCount: 7,
    services: ["orthopedic-rehabilitation", "sports-physiotherapy", "manual-therapy", "geriatric-physiotherapy", "pediatric-physiotherapy", "recovery-program", "device-based-therapy"]
  },
  {
    id: "dammam",
    his: null,
    comingSoon: true,
    city: { en: "Dammam", ar: "الدمام" },
    address: { en: "Al Faisaliyah District, Dammam 32232", ar: "حي الفيصلية، الدمام 32232" },
    phone: "+966-13-XXX-XXXX",
    whatsapp: "+966500000003",
    email: "dammam@physiotrio.com",
    hours: {
      en: "Coming Soon",
      ar: "قريباً"
    },
    coordinates: { lat: 26.4207, lng: 50.0888 },
    therapistCount: 0,
    serviceCount: 0,
    services: []
  }
];
