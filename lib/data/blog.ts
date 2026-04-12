export interface BlogPost {
  id: string;
  slug: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  category: { en: string; ar: string };
  date: string;
  readMinutes: number;
  image: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "strategic-partnership-bupa-arabia",
    title: {
      en: "PhysioTrio Announces Strategic Partnership with Bupa Arabia",
      ar: "فيزيوتريو تُعلن عن شراكة استراتيجية مع بوبا العربية",
    },
    excerpt: {
      en: "PhysioTrio has announced a strategic partnership with Bupa Arabia to enhance wellness and healthcare services across the Kingdom of Saudi Arabia.",
      ar: "أعلنت فيزيوتريو عن شراكة استراتيجية مع بوبا العربية لتعزيز خدمات العافية والرعاية الصحية.",
    },
    category: { en: "News", ar: "أخبار" },
    date: "2025-11-06",
    readMinutes: 3,
    image: "https://physiotherabia.com/wp-content/uploads/2025/11/WhatsApp-Image-2025-10-28-at-9.54.18-AM-3.jpeg",
    featured: true,
  },
  {
    id: "2",
    slug: "minister-of-health-visits-physiotrio-global-health-exhibition",
    title: {
      en: "H.E. Minister of Health Visits PhysioTrio at the Global Health Exhibition 2025",
      ar: "معالي وزير الصحة يزور جناح فيزيوتريو في المعرض الصحي العالمي 2025",
    },
    excerpt: {
      en: "The PhysioTrio pavilion concluded its participation in the Global Health Exhibition 2025 with remarkable success, receiving a visit from the Minister of Health.",
      ar: "اختتم جناح فيزيوتريو مشاركته في المعرض الصحي العالمي 2025 بنجاح باهر، إذ تشرف باستقبال معالي وزير الصحة.",
    },
    category: { en: "News", ar: "أخبار" },
    date: "2025-11-02",
    readMinutes: 2,
    image: "https://physiotherabia.com/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-1.30.18-PM.jpeg",
    featured: false,
  },
  {
    id: "3",
    slug: "physiotrio-celebrates-saudi-national-day-95",
    title: {
      en: "PhysioTrio Team Celebrates the 95th Saudi National Day",
      ar: "فريق فيزيوتريو يحتفل باليوم الوطني السعودي الـ95",
    },
    excerpt: {
      en: "In celebration of the 95th Saudi National Day, PhysioTrio hosted a special event attended by company leadership, honoring the Kingdom's remarkable progress.",
      ar: "احتفاءً باليوم الوطني السعودي الـ95، استضافت فيزيوتريو فعالية خاصة حضرها قيادة الشركة.",
    },
    category: { en: "Events", ar: "فعاليات" },
    date: "2025-09-24",
    readMinutes: 2,
    image: "https://physiotherabia.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-24-at-4.03.41-PM-1.jpeg",
    featured: false,
  },
  {
    id: "4",
    slug: "prince-saud-bin-nayef-meets-burjeel-leadership",
    title: {
      en: "HRH Prince Saud bin Nayef Receives Burjeel Holdings Leadership",
      ar: "صاحب السمو الأمير سعود بن نايف يستقبل قيادة مجموعة برجيل",
    },
    excerpt: {
      en: "In a meeting reflecting leadership's support for the healthcare sector, Burjeel Holdings was honored to meet HRH Prince Saud bin Nayef.",
      ar: "في لقاء يعكس دعم القيادة للقطاع الصحي، تشرفت مجموعة برجيل القابضة باستقبال صاحب السمو الأمير سعود بن نايف.",
    },
    category: { en: "News", ar: "أخبار" },
    date: "2025-08-27",
    readMinutes: 2,
    image: "https://physiotherabia.com/wp-content/uploads/2025/08/Screenshot-2025-08-27-145843.png",
    featured: false,
  },
  {
    id: "5",
    slug: "guide-treating-common-sports-injuries",
    title: {
      en: "Comprehensive Guide to Treating Common Sports Injuries",
      ar: "دليل شامل لعلاج إصابات الرياضة الشائعة",
    },
    excerpt: {
      en: "Sports injuries are common among athletes and active individuals. Learn the best evidence-based techniques for recovery and prevention from our specialist team.",
      ar: "الإصابات الرياضية شائعة بين الرياضيين والأفراد النشطين. تعرف على أفضل تقنيات التعافي والوقاية.",
    },
    category: { en: "Health Tips", ar: "نصائح صحية" },
    date: "2023-08-15",
    readMinutes: 6,
    image: "https://physiotherabia.com/wp-content/uploads/2023/08/Sports-Rehabilitation.jpg",
    featured: false,
  },
];
