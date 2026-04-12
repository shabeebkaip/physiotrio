export interface Insurer {
  id: string;
  name: string;
  nameAr: string;
  logo?: string;
}

export const insurers: Insurer[] = [
  { id: "bupa", name: "Bupa Arabia", nameAr: "بوبا العربية" },
  { id: "tawuniya", name: "Tawuniya", nameAr: "التعاونية" },
  { id: "mednet", name: "MedNet", nameAr: "ميدنت" },
  { id: "axa", name: "AXA Cooperative", nameAr: "اكسا التعاونية" },
  { id: "next-axa", name: "NEXT by AXA", nameAr: "نكست بواسطة اكسا" },
  { id: "al-rajhi", name: "Al Rajhi Takaful", nameAr: "الراجحي للتكافل" },
  { id: "gig", name: "GIG Gulf", nameAr: "جي آي جي الخليج" },
  { id: "daman", name: "Daman", nameAr: "ضمان" },
  { id: "oman", name: "Oman Insurance", nameAr: "التأمين العماني" },
  { id: "walaa", name: "Walaa", nameAr: "ولاء" }
];
