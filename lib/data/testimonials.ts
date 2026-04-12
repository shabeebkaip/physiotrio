export interface Testimonial {
  id: string;
  quote: { en: string; ar: string };
  name: { en: string; ar: string };
  role?: { en: string; ar: string };
  branch: { en: string; ar: string };
  stars: number;
  service?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: {
      en: "After my ACL surgery, I was worried about my recovery timeline. The PhysioTrio team in Riyadh had me back on the field in record time. The Lokomat® sessions were a game changer.",
      ar: "بعد عملية الرباط الصليبي، كنت قلقاً على الجدول الزمني لتعافيي. أعادني فريق فيزيوتريو في الرياض إلى الميدان في وقت قياسي. كانت جلسات لوكومات® نقطة تحول.",
    },
    name: { en: "Ahmed Al-Ghamdi", ar: "أحمد الغامدي" },
    role: { en: "Football Player, Riyadh", ar: "لاعب كرة قدم، الرياض" },
    branch: { en: "Riyadh", ar: "الرياض" },
    stars: 5,
    service: "sports-physiotherapy",
  },
  {
    id: "2",
    quote: {
      en: "The women's health program at PhysioTrio was exactly what I needed after my second pregnancy. The team was professional, sensitive, and incredibly skilled.",
      ar: "كان برنامج صحة المرأة في فيزيوتريو بالضبط ما احتجته بعد حملي الثاني. كان الفريق محترفاً وحساساً وماهراً بشكل لا يصدق.",
    },
    name: { en: "Nouf Al-Shahrani", ar: "نوف الشهراني" },
    role: { en: "Mother of two, Riyadh", ar: "أم لطفلين، الرياض" },
    branch: { en: "Riyadh", ar: "الرياض" },
    stars: 5,
    service: "womens-health",
  },
  {
    id: "3",
    quote: {
      en: "My father had a stroke last year. The neurological rehabilitation program at PhysioTrio Makkah brought remarkable improvement in his mobility. We are forever grateful.",
      ar: "أصيب والدي بسكتة دماغية العام الماضي. أحدث برنامج إعادة التأهيل العصبي في فيزيوتريو مكة تحسناً ملحوظاً في حركته. نحن ممتنون للأبد.",
    },
    name: { en: "Faisal Al-Zahrani", ar: "فيصل الزهراني" },
    role: { en: "Family member, Makkah", ar: "أحد أفراد الأسرة، مكة" },
    branch: { en: "Makkah", ar: "مكة المكرمة" },
    stars: 5,
    service: "neurological-rehabilitation",
  },
  {
    id: "4",
    quote: {
      en: "I've been dealing with chronic lower back pain for 5 years. After just 8 sessions of the Low Back Pain Program, I feel like a new person. The IDD therapy was incredible.",
      ar: "كنت أعاني من آلام مزمنة في أسفل الظهر لمدة 5 سنوات. بعد 8 جلسات فقط من برنامج آلام الظهر، أشعر أنني شخص جديد.",
    },
    name: { en: "Mohammed Al-Otaibi", ar: "محمد العتيبي" },
    role: { en: "Engineer, Riyadh", ar: "مهندس، الرياض" },
    branch: { en: "Riyadh", ar: "الرياض" },
    stars: 5,
    service: "manual-therapy",
  },
  {
    id: "5",
    quote: {
      en: "The home physiotherapy service was perfect for my elderly mother. The therapist was punctual, gentle, and our mother has shown incredible improvement in her walking.",
      ar: "كانت خدمة العلاج الطبيعي المنزلي مثالية لوالدتي المسنة. كان المعالج دقيقاً ولطيفاً وأظهرت والدتنا تحسناً مذهلاً في المشي.",
    },
    name: { en: "Sara Al-Harthi", ar: "سارة الحارثي" },
    role: { en: "Daughter, Riyadh", ar: "ابنة، الرياض" },
    branch: { en: "Riyadh", ar: "الرياض" },
    stars: 5,
    service: "geriatric-physiotherapy",
  },
  {
    id: "6",
    quote: {
      en: "Booking online was so easy. I selected my branch, service, and therapist in minutes. The SMS confirmation arrived instantly and the whole experience was world-class.",
      ar: "كان الحجز عبر الإنترنت سهلاً جداً. اخترت فرعي وخدمتي ومعالجي في دقائق. وصل تأكيد الرسالة النصية فوراً وكانت التجربة بأكملها على مستوى عالمي.",
    },
    name: { en: "Khalid Al-Mansouri", ar: "خالد المنصوري" },
    role: { en: "Business Executive, Makkah", ar: "مدير تنفيذي، مكة" },
    branch: { en: "Makkah", ar: "مكة المكرمة" },
    stars: 5,
    service: "physiotherapy",
  },
  {
    id: "7",
    quote: {
      en: "My son has autism and finding the right pediatric physiotherapist was a challenge. The team at PhysioTrio understood his needs perfectly. The sensory room sessions have been transformative.",
      ar: "ابني مصاب بالتوحد وكان إيجاد المعالج الطبيعي المناسب للأطفال تحدياً. فهم فريق فيزيوتريو احتياجاته تماماً. كانت جلسات غرفة الحواس تحويلية.",
    },
    name: { en: "Hessa Al-Dosari", ar: "حصة الدوسري" },
    role: { en: "Mother, Riyadh", ar: "أم، الرياض" },
    branch: { en: "Riyadh", ar: "الرياض" },
    stars: 5,
    service: "pediatric-physiotherapy",
  },
  {
    id: "8",
    quote: {
      en: "The Lokomat® robotic rehabilitation sessions after my spinal cord injury were beyond anything I expected. The team's expertise and the technology gave me hope I didn't know I had.",
      ar: "كانت جلسات إعادة التأهيل الروبوتي لوكومات® بعد إصابة النخاع الشوكي أبعد مما توقعت. أعطتني خبرة الفريق والتكنولوجيا أملاً لم أعلم أنني أملكه.",
    },
    name: { en: "Turki Al-Shamrani", ar: "تركي الشمراني" },
    role: { en: "Patient, Riyadh", ar: "مريض، الرياض" },
    branch: { en: "Riyadh", ar: "الرياض" },
    stars: 5,
    service: "neurological-rehabilitation",
  },
];
