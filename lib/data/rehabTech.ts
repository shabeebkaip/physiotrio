export interface RehabTech {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  image?: string;
}

export const rehabTechnologies: RehabTech[] = [
  {
    id: "free-weights",
    name: { en: "Free Weights & Strength Training Equipment", ar: "أجهزة الأوزان الحرة وتمارين القوة" },
    description: {
      en: "A comprehensive range of free weights and strength training machines designed to build muscle strength, support post-injury recovery, and improve overall physical performance.",
      ar: "مجموعة شاملة من أجهزة الأوزان الحرة وتمارين القوة المصممة لبناء قوة العضلات ودعم التعافي بعد الإصابة وتحسين الأداء البدني العام.",
    },
  },
  {
    id: "cable-machines",
    name: { en: "Cable Resistance Machines", ar: "أجهزة الكابلات المقاومة" },
    description: {
      en: "Advanced cable resistance machines that provide smooth, controlled resistance across a full range of motion — ideal for functional rehabilitation and progressive strengthening.",
      ar: "أجهزة كابلات مقاومة متقدمة توفر مقاومة سلسة ومتحكمًا بها عبر نطاق كامل من الحركة — مثالية لإعادة التأهيل الوظيفي والتقوية التدريجية.",
    },
  },
  {
    id: "balance-coordination",
    name: { en: "Balance & Coordination Training Equipment", ar: "أجهزة التوازن والتناسق الحركي" },
    description: {
      en: "Specialized equipment targeting balance, proprioception, and neuromuscular coordination — essential for injury prevention, post-surgical rehab, and neurological recovery.",
      ar: "معدات متخصصة تستهدف التوازن والإحساس العميق والتناسق العصبي العضلي — ضرورية للوقاية من الإصابات وإعادة التأهيل بعد الجراحة والتعافي العصبي.",
    },
  },
  {
    id: "anti-gravity-treadmill",
    name: { en: "Anti-Gravity Treadmill", ar: "جهاز السير المضاد للجاذبية" },
    description: {
      en: "A cutting-edge treadmill that reduces body weight loading during walking and running, enabling earlier and less painful rehabilitation after injuries or surgery.",
      ar: "جهاز سير متطور يقلل الحمل الوزني على الجسم أثناء المشي والجري، مما يتيح إعادة تأهيل مبكرة وأقل إيلامًا بعد الإصابات أو الجراحة.",
    },
  },
  {
    id: "dry-needling",
    name: { en: "Dry Needling", ar: "الإبر الجافة" },
    description: {
      en: "A targeted technique using fine needles to release trigger points, reduce muscle tension, and alleviate chronic pain — performed by certified physiotherapists.",
      ar: "تقنية مستهدفة تستخدم إبرًا رفيعة لتحرير نقاط الإثارة وتقليل توتر العضلات وتخفيف الآلام المزمنة — تُجرى بواسطة معالجين فيزيائيين معتمدين.",
    },
  },
  {
    id: "dry-cupping",
    name: { en: "Dry Cupping Therapy", ar: "الحجامة الجافة" },
    description: {
      en: "Traditional therapeutic cupping adapted for modern physiotherapy — promotes blood circulation, relieves muscle tightness, and accelerates recovery from musculoskeletal conditions.",
      ar: "الحجامة العلاجية التقليدية المدمجة في العلاج الفيزيائي الحديث — تعزز الدورة الدموية وتخفف شد العضلات وتسرع التعافي من الحالات العضلية الهيكلية.",
    },
  },
  {
    id: "therapeutic-exercises",
    name: { en: "Therapeutic Exercises", ar: "التمارين العلاجية" },
    description: {
      en: "Structured, evidence-based exercise programs tailored to each patient's condition — designed to restore movement, build strength, and prevent recurrence.",
      ar: "برامج تمارين منظمة وقائمة على الأدلة مصممة خصيصًا لحالة كل مريض — تهدف إلى استعادة الحركة وبناء القوة ومنع تكرار الإصابة.",
    },
  },
  {
    id: "electrotherapy",
    name: { en: "Electrotherapy", ar: "العلاج الكهربائي" },
    description: {
      en: "Advanced electrotherapy modalities including TENS, ultrasound, and laser therapy — used to reduce pain, decrease inflammation, and stimulate tissue healing.",
      ar: "أساليب العلاج الكهربائي المتقدمة بما في ذلك TENS والموجات فوق الصوتية والعلاج بالليزر — تُستخدم لتقليل الألم وخفض الالتهابات وتحفيز التئام الأنسجة.",
    },
  },
  {
    id: "functional-strength",
    name: { en: "Functional Strength Training Equipment", ar: "أجهزة التدريب الوظيفي للقوة" },
    description: {
      en: "Purpose-built equipment for functional movement training that mirrors real-life activities — bridging the gap between clinical rehabilitation and full return to sport or daily life.",
      ar: "معدات مخصصة لتدريب الحركة الوظيفية التي تحاكي أنشطة الحياة اليومية — تجسر الفجوة بين إعادة التأهيل السريري والعودة الكاملة للرياضة أو الحياة اليومية.",
    },
  },
];
