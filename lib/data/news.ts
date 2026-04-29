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
    slug: "world-health-day-gcc",
    category: { en: "Community", ar: "مجتمع" },
    title: {
      en: "PhysioTrio Participates in World Health Day to Promote Physiotherapy Awareness",
      ar: "فيزيوتريو تشارك في اليوم العالمي للصحة لتعزيز الوعي بالعلاج الطبيعي",
    },
    excerpt: {
      en: "PhysioTrio participated in World Health Day through an educational event at the GCC General Secretariat, where specialists provided health consultations and awareness sessions on the importance of physiotherapy in injury prevention and quality of life.",
      ar: "شاركت فيزيوتريو في فعاليات اليوم العالمي للصحة بفعالية توعوية في الأمانة العامة لمجلس التعاون الخليجي، قدّم خلالها متخصصو المركز استشارات صحية وجلسات توعوية حول أهمية العلاج الطبيعي في الوقاية من الإصابات وتحسين جودة الحياة.",
    },
    image: "https://physiotrio.sa/api/files/uploads/1776421545659-WhatsApp%20Image%202026-04-17%20at%201.25.13%20PM.jpeg",
    date: "2026-04-17",
    readMinutes: 2,
    featured: true,
  },
  {
    id: "2",
    slug: "burjeel-leadership-innovation-ksa",
    category: { en: "Leadership", ar: "قيادة" },
    title: {
      en: "Burjeel's Leadership Drives Healthcare Innovation in Saudi Arabia",
      ar: "قيادة برجيل تقود الابتكار في القطاع الصحي بالمملكة العربية السعودية",
    },
    excerpt: {
      en: "Dr. Shamsheer Vayalil, Founder and Chairman of Burjeel Arabia, met with H.E. Mr. Fahd Al-Saif, Minister of Investment of Saudi Arabia, to discuss a pioneering initiative supporting patients with complex medical conditions through advanced healthcare solutions aligned with Vision 2030.",
      ar: "التقى الدكتور شمشير فيايليل، مؤسس ورئيس مجلس إدارة برجيل القابضة، بمعالي السيد فهد الصايغ، وزير الاستثمار بالمملكة العربية السعودية، لمناقشة مبادرة رائدة لدعم مرضى الحالات المعقدة من خلال حلول رعاية صحية متقدمة تتوافق مع رؤية 2030.",
    },
    image: "https://physiotrio.sa/api/files/uploads/1775292584928-WhatsApp%20Image%202026-04-01%20at%2012.23.14%20PM.jpeg",
    date: "2026-04-04",
    readMinutes: 2,
  },
  {
    id: "3",
    slug: "burjeel-arabia-eid-celebration",
    category: { en: "Company News", ar: "أخبار الشركة" },
    title: {
      en: "Burjeel Arabia Celebrates Eid Al-Fitr with Its Employees",
      ar: "برجيل العربية تحتفل بعيد الفطر المبارك مع موظفيها",
    },
    excerpt: {
      en: "Burjeel Arabia marked Eid Al-Fitr with a gathering for exchanging greetings, attended by CEO Mr. Abdulmohsen Al-Hamad Al-Ashry, who congratulated employees and expressed appreciation for their dedication and contributions.",
      ar: "احتفلت برجيل العربية بعيد الفطر المبارك بتجمع لتبادل التهاني، بحضور الرئيس التنفيذي السيد عبدالمحسن الحمد العاشري، الذي هنأ الموظفين وأعرب عن تقديره لجهودهم وإسهاماتهم.",
    },
    image: "https://physiotrio.sa/api/files/uploads/1774432635647-1.jpg.jpeg",
    date: "2026-03-25",
    readMinutes: 2,
  },
  {
    id: "4",
    slug: "burjeel-ramadan-gathering",
    category: { en: "Events", ar: "فعاليات" },
    title: {
      en: "Burjeel Arabia and Its Subsidiaries Celebrate a Joyful Ramadan Gathering",
      ar: "برجيل العربية وشركاتها التابعة تحتفل بسهرة رمضانية بهيجة",
    },
    excerpt: {
      en: "Burjeel Arabia and subsidiaries including PhysioTrio, Vitalite Home Care, and others hosted a special Ramadan evening with strategic partners, featuring a speech by CEO Mr. Abdulmohsen Al-Hamad Al-Ashry highlighting key achievements and future plans.",
      ar: "استضافت برجيل العربية وشركاتها التابعة بما فيها فيزيوتريو وفيتاليت للرعاية المنزلية وغيرها سهرة رمضانية مميزة مع الشركاء الاستراتيجيين، تضمنت كلمة للرئيس التنفيذي السيد عبدالمحسن الحمد العاشري استعرض فيها أبرز الإنجازات وخطط المرحلة القادمة.",
    },
    image: "https://physiotrio.sa/api/files/uploads/1774429338259-GATHERING%20OF%20SHOUR%20BURJEEL%20JPG.jpg.jpeg",
    date: "2026-03-16",
    readMinutes: 3,
  },
  {
    id: "5",
    slug: "burjeel-honors-physiotrio-specialists-2025",
    category: { en: "Company News", ar: "أخبار الشركة" },
    title: {
      en: "Burjeel Arabia Honors Outstanding Physiotherapy Specialists at PhysioTrio for 2025",
      ar: "برجيل العربية تكرّم المتخصصين المتميزين في العلاج الطبيعي بفيزيوتريو لعام 2025",
    },
    excerpt: {
      en: "In the presence of CEO Mr. Abdul Mohsen Al-Hammad Al-Ashri and Operations Director Mr. Ahmed Alojaiman, Burjeel Arabia honored top PhysioTrio physiotherapy specialists for their exceptional performance and contributions throughout 2025.",
      ar: "بحضور الرئيس التنفيذي السيد عبدالمحسن الحمد العاشري والمدير التشغيلي السيد أحمد العجيمان، كرّمت برجيل العربية أبرز متخصصي العلاج الطبيعي في فيزيوتريو تقديراً لأدائهم المتميز وإسهاماتهم الاستثنائية طوال عام 2025.",
    },
    image: "https://physiotrio.sa/api/files/uploads/1769436466024-WhatsApp%20Image%202026-01-26%20at%204.17.31%20PM%20(4).jpeg",
    date: "2026-01-26",
    readMinutes: 2,
  },
  {
    id: "6",
    slug: "physiotrio-global-health-exhibition-2025",
    category: { en: "Events", ar: "فعاليات" },
    title: {
      en: "PhysioTrio Participates in the Global Health Exhibition 2025",
      ar: "فيزيوتريو تشارك في المعرض الصحي العالمي 2025",
    },
    excerpt: {
      en: "PhysioTrio, a specialized center under Burjeel Arabia, participated in the Global Health Exhibition 2025, showcasing the latest technologies integrated into their physical therapy services, reflecting their commitment to advancing rehabilitation and enhancing patient outcomes.",
      ar: "شاركت فيزيوتريو، المركز المتخصص التابع لبرجيل العربية، في المعرض الصحي العالمي 2025، وعرضت أحدث التقنيات المدمجة في خدمات العلاج الطبيعي، مما يعكس التزامها بتطوير خدمات إعادة التأهيل وتحسين نتائج المرضى.",
    },
    image: "https://physiotrio.sa/api/files/uploads/1765090800327-images%20(1).jpg",
    date: "2025-11-02",
    readMinutes: 3,
  },
];
