/* ---------- KALKULYATOR: KONSTRUKSIYA TURLARI ----------
   Har tur: maydonlar (kalit, nom UZ/RU, birlik, boshlang'ich qiymat)
   va hajm formulasi (natija — m³). */
export const CALC_TYPES = [
  {
    id: "slab", uz: "Plita", ru: "Плита",
    fields: [
      { k: "L", uz: "Uzunlik", ru: "Длина", unit: "m" },
      { k: "W", uz: "Kenglik", ru: "Ширина", unit: "m" },
      { k: "H", uz: "Qalinlik", ru: "Толщина", unit: "sm" },
    ],
    calc: (v) => v.L * v.W * (v.H / 100),
  },
  {
    id: "strip", uz: "Lentali fundament", ru: "Ленточный фундамент",
    fields: [
      { k: "L", uz: "Lenta uzunligi", ru: "Длина ленты", unit: "m" },
      { k: "W", uz: "Lenta kengligi", ru: "Ширина ленты", unit: "sm" },
      { k: "H", uz: "Lenta balandligi", ru: "Высота ленты", unit: "m" },
    ],
    calc: (v) => v.L * (v.W / 100) * v.H,
  },
  {
    id: "wall", uz: "Devor", ru: "Стена",
    fields: [
      { k: "L", uz: "Uzunlik", ru: "Длина", unit: "m" },
      { k: "H", uz: "Balandlik", ru: "Высота", unit: "m" },
      { k: "W", uz: "Qalinlik", ru: "Толщина", unit: "sm" },
    ],
    calc: (v) => v.L * v.H * (v.W / 100),
  },
  {
    id: "colSq", uz: "Kvadrat ustun", ru: "Квадратная колонна",
    fields: [
      { k: "A", uz: "Tomon uzunligi", ru: "Длина стороны", unit: "sm" },
      { k: "H", uz: "Balandlik", ru: "Высота", unit: "m" },
      { k: "N", uz: "Soni", ru: "Количество", unit: "pc" },
    ],
    calc: (v) => Math.pow(v.A / 100, 2) * v.H * v.N,
  },
  {
    id: "colRnd", uz: "Dumaloq ustun", ru: "Круглая колонна",
    fields: [
      { k: "D", uz: "Diametr", ru: "Диаметр", unit: "sm" },
      { k: "H", uz: "Balandlik", ru: "Высота", unit: "m" },
      { k: "N", uz: "Soni", ru: "Количество", unit: "pc" },
    ],
    calc: (v) => Math.PI * Math.pow(v.D / 200, 2) * v.H * v.N,
  },
  {
    id: "stairs", uz: "Zinapoya", ru: "Лестница",
    fields: [
      { k: "W", uz: "Zina kengligi", ru: "Ширина лестницы", unit: "m" },
      { k: "A", uz: "Pog'ona balandligi", ru: "Высота ступени", unit: "sm" },
      { k: "B", uz: "Pog'ona chuqurligi", ru: "Глубина ступени", unit: "sm" },
      { k: "N", uz: "Pog'onalar soni", ru: "Число ступеней", unit: "pc" },
    ],
    calc: (v) => v.W * (v.A / 100) * (v.B / 100) * (v.N * (v.N + 1)) / 2,
  },
];
