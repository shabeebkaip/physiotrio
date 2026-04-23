export interface NewsPost {
  id: string;
  slug: string;
  externalUrl?: string;
  category: { en: string; ar: string };
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  image: string;
  date: string;
  readMinutes: number;
  featured?: boolean;
}

export const newsPosts: NewsPost[] = [
  {
    id: "1",
    slug: "bupa-arabia-partnership",
    externalUrl: "https://physiotherabia.com/news/physiotherabia-announces-strategic-partnership-with-bupa-arabia-to-enhance-wellness-and-healthcare-services-across-the-kingdom/",
    category: { en: "Partnership", ar: "شراكة" },
    title: {
      en: "PhysioTrio Announces Strategic Partnership with Bupa Arabia",
      ar: "فيزيوتريو تعلن عن شراكة استراتيجية مع بوبا العربية",
    },
    excerpt: {
      en: "PhysioTrio has announced a strategic partnership with Bupa Arabia to enhance wellness, physiotherapy, and homecare services across Saudi Arabia, aligned with Vision 2030.",
      ar: "أعلنت فيزيوتريو عن شراكة استراتيجية مع بوبا العربية لتعزيز خدمات العلاج الطبيعي ورعاية المنازل في المملكة، بما يتماشى مع رؤية 2030.",
    },
    image: "https://physiotherabia.com/wp-content/uploads/2025/11/WhatsApp-Image-2025-10-28-at-9.54.18-AM-3.jpeg",
    date: "2025-11-06",
    readMinutes: 3,
    featured: true,
  },
  {
    id: "2",
    slug: "minister-global-health-exhibition-2025",
    externalUrl: "https://physiotherabia.com/news/h-e-minister-of-health-visits-physiotherabia-pavilion-at-the-global-health-exhibition-2025/",
    category: { en: "Events", ar: "فعاليات" },
    title: {
      en: "H.E. Minister of Health Visits PhysioTrio Pavilion at Global Health Exhibition 2025",
      ar: "معالي وزير الصحة يزور جناح فيزيوتريو في المعرض الصحي العالمي 2025",
    },
    excerpt: {
      en: "The PhysioTrio pavilion concluded its participation in the Global Health Exhibition 2025 with remarkable success, showcasing next-generation healthcare solutions redefining the future of care in Saudi Arabia.",
      ar: "اختتم جناح فيزيوتريو مشاركته في المعرض الصحي العالمي 2025 بنجاح لافت، حيث عرض حلول رعاية صحية من الجيل القادم تعيد تشكيل مستقبل الرعاية في المملكة.",
    },
    image: "https://physiotherabia.com/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-1.30.18-PM.jpeg",
    date: "2025-11-02",
    readMinutes: 3,
  },
  {
    id: "3",
    slug: "national-day-95",
    externalUrl: "https://physiotherabia.com/news/physiothrapia-team-celebrates-the-95th-saudi-national-day-in-the-presence-of-company-leadership/",
    category: { en: "Company News", ar: "أخبار الشركة" },
    title: {
      en: "PhysioTrio Team Celebrates the 95th Saudi National Day with Company Leadership",
      ar: "فريق فيزيوتريو يحتفل باليوم الوطني السعودي الـ 95 بحضور قيادة الشركة",
    },
    excerpt: {
      en: "In celebration of the 95th Saudi National Day, PhysioTrio hosted a special event attended by the CEO of Burjeel Arabia and COO of PhysioTrio, reflecting on the Kingdom's remarkable journey.",
      ar: "احتفاءً باليوم الوطني السعودي الـ 95، استضاف فريق فيزيوتريو حفلاً خاصاً بحضور الرئيس التنفيذي لبرجيل العربية ومدير العمليات، في استذكار لمسيرة المملكة الرائدة.",
    },
    image: "https://physiotherabia.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-24-at-4.03.41-PM-1.jpeg",
    date: "2025-09-24",
    readMinutes: 2,
  },
  {
    id: "4",
    slug: "hrh-prince-saud-meeting",
    externalUrl: "https://physiotherabia.com/news/hrh-prince-saud-bin-nayef-receives-dr-shamsheer-vayalil-and-mr-abdulmohsen-al-hammad-al-ashri/",
    category: { en: "Leadership", ar: "قيادة" },
    title: {
      en: "HRH Prince Saud bin Nayef Receives Dr. Shamsheer Vayalil and Mr. Abdulmohsen Al-Hammad Al-Ashri",
      ar: "سمو الأمير سعود بن نايف يستقبل الدكتور شمشير فيايليل والسيد عبدالمحسن الحمد العاشري",
    },
    excerpt: {
      en: "HRH Prince Saud bin Nayef, Governor of the Eastern Province, received the leadership of Burjeel Holdings, where key healthcare initiatives in the Eastern Province were presented.",
      ar: "استقبل سمو الأمير سعود بن نايف أمير المنطقة الشرقية قيادة برجيل القابضة، حيث جرى عرض المبادرات الصحية الرئيسية في المنطقة الشرقية.",
    },
    image: "https://physiotherabia.com/wp-content/uploads/2025/08/Screenshot-2025-08-27-145843.png",
    date: "2025-08-27",
    readMinutes: 2,
  },
  {
    id: "5",
    slug: "eight-new-centers-launch",
    externalUrl: "https://physiotherabia.com/news/burjeel-holdings-and-leejam-sports-company-launch-eight-new-physiotherabia-centers-in-saudi-arabia/",
    category: { en: "Expansion", ar: "توسع" },
    title: {
      en: "Burjeel Holdings and Leejam Sports Company Launch Eight New PhysioTrio Centers in Saudi Arabia",
      ar: "برجيل القابضة وليجام يطلقان ثمانية مراكز جديدة لفيزيوتريو في المملكة",
    },
    excerpt: {
      en: "The strategic partnership between Burjeel Holdings and Leejam Sports Company expands with eight new PhysioTrio centers across Riyadh and other cities, targeting 60 centers Kingdom-wide.",
      ar: "تتوسع الشراكة الاستراتيجية بين برجيل وليجام بافتتاح ثمانية مراكز جديدة لفيزيوتريو في الرياض ومدن أخرى، بهدف الوصول إلى 60 مركزاً في جميع أنحاء المملكة.",
    },
    image: "https://physiotherabia.com/wp-content/uploads/2024/03/Physiotherabia-re-Launch.jpg",
    date: "2024-03-04",
    readMinutes: 3,
  },
];
