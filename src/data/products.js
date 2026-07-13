/* ---------- KATALOG MA'LUMOTLARI ----------
   Har mahsulotning slug'i bor (detal sahifa uchun: /product/:slug).
   Beton markalarida recipe — 1 m³ tarkibi (taxminiy, GOST asosida). */
export const CATS = [
  { id: "cement", uz: "Sement", ru: "Цемент" },
  { id: "beton", uz: "Tayyor beton", ru: "Готовый бетон" },
  { id: "jbi", uz: "Beton buyumlar", ru: "ЖБИ" },
  { id: "inert", uz: "Inert materiallar", ru: "Инертные материалы" },
];

/* Beton 1 m³ tarkibi — taxminiy retsept (cem = sement markasi, kg/l) */
const R = (cem, cemKg, sandKg, gravelKg, waterL) => ({ cem, cemKg, sandKg, gravelKg, waterL });

export const PRODUCTS = [
  { cat: "cement", slug: "portland-m400", uz: "Portland sement M400", ru: "Портландцемент М400", duz: "Fundament, stiyajka, umumiy qurilish ishlari", dru: "Фундамент, стяжка, общестроительные работы" },
  { cat: "cement", slug: "portland-m500", uz: "Portland sement M500", ru: "Портландцемент М500", duz: "Yuqori mustahkamlik talab qilinadigan konstruksiyalar", dru: "Конструкции повышенной прочности" },
  { cat: "beton", slug: "m100", uz: "Beton M100 (B7.5)", ru: "Бетон М100 (B7.5)", duz: "Tayyorgarlik qatlami, beton yostiq, yo'l asosi", dru: "Подготовительный слой, подбетонка, основание дорог", recipe: R("M400", 210, 800, 1200, 180) },
  { cat: "beton", slug: "m150", uz: "Beton M150 (B12.5)", ru: "Бетон М150 (B12.5)", duz: "Yo'lakcha, stiyajka, yengil konstruksiyalar", dru: "Дорожки, стяжка, лёгкие конструкции", recipe: R("M400", 235, 780, 1190, 180) },
  { cat: "beton", slug: "m200", uz: "Beton M200 (B15)", ru: "Бетон М200 (B15)", duz: "Pol, maydoncha, yo'lakcha, yengil fundament", dru: "Полы, площадки, дорожки, лёгкий фундамент", recipe: R("M400", 285, 750, 1180, 185) },
  { cat: "beton", slug: "m250", uz: "Beton M250 (B20)", ru: "Бетон М250 (B20)", duz: "Fundament, plita, devor asoslari", dru: "Фундаменты, плиты, основания стен", recipe: R("M400", 330, 720, 1150, 185) },
  { cat: "beton", slug: "m300", uz: "Beton M300 (B22.5)", ru: "Бетон М300 (B22.5)", duz: "Monolit, ustunlar, zinapoyalar", dru: "Монолит, колонны, лестницы", recipe: R("M400", 380, 700, 1120, 185) },
  { cat: "beton", slug: "m350", uz: "Beton M350 (B25)", ru: "Бетон М350 (B25)", duz: "Yuk ko'taruvchi konstruksiyalar, plitalar, hovuzlar", dru: "Несущие конструкции, плиты перекрытий, бассейны", recipe: R("M500", 400, 680, 1100, 185) },
  { cat: "beton", slug: "m400", uz: "Beton M400 (B30)", ru: "Бетон М400 (B30)", duz: "Ko'p qavatli binolar, ko'prik konstruksiyalari", dru: "Многоэтажные здания, мостовые конструкции", recipe: R("M500", 430, 660, 1080, 190) },
  { cat: "beton", slug: "m450", uz: "Beton M450 (B35)", ru: "Бетон М450 (B35)", duz: "Gidrotexnik inshootlar, to'g'onlar", dru: "Гидротехнические сооружения, дамбы", recipe: R("M500", 460, 640, 1060, 190) },
  { cat: "beton", slug: "m500", uz: "Beton M500 (B40)", ru: "Бетон М500 (B40)", duz: "Maxsus mustahkam konstruksiyalar, kolonnalar", dru: "Особо прочные конструкции, колонны", recipe: R("M500", 490, 620, 1050, 190) },
  { cat: "beton", slug: "m600", uz: "Beton M600 (B45)", ru: "Бетон М600 (B45)", duz: "Og'ir yuklamali sanoat inshootlari", dru: "Промышленные объекты с высокой нагрузкой", recipe: R("M500", 520, 600, 1040, 195) },
  { cat: "beton", slug: "m700", uz: "Beton M700 (B50)", ru: "Бетон М700 (B50)", duz: "Infratuzilma va maxsus obyektlar", dru: "Инфраструктурные и специальные объекты", recipe: R("M500", 560, 580, 1030, 195) },
  { cat: "beton", slug: "m800", uz: "Beton M800 (B60)", ru: "Бетон М800 (B60)", duz: "Eng yuqori mustahkamlik talab qilinadigan obyektlar", dru: "Объекты с максимальными требованиями к прочности", recipe: R("M500", 600, 560, 1020, 200) },
  { cat: "jbi", slug: "sement-blok", uz: "Sement blok 20×20×40", ru: "Цементоблок 20×20×40", duz: "Devor, to'siq, xo'jalik inshootlari", dru: "Стены, ограждения, хозпостройки" },
  { cat: "jbi", slug: "peskoblok", uz: "Peskoblok", ru: "Пескоблок", duz: "Devor va to'siqlar uchun yengil, arzon variant", dru: "Лёгкий и доступный вариант для стен и оград" },
  { cat: "jbi", slug: "bordyur", uz: "Bordyur", ru: "Бордюр", duz: "Yo'l va trotuar chegaralari", dru: "Ограждение дорог и тротуаров" },
  { cat: "jbi", slug: "trotuar-plitasi", uz: "Trotuar plitasi", ru: "Тротуарная плитка", duz: "Hovli, piyoda yo'laklar, maydonchalar", dru: "Дворы, пешеходные дорожки, площадки" },
  { cat: "jbi", slug: "halqa-ks10", uz: "Beton halqa KS-10 (quduq)", ru: "Кольцо КС-10 (колодец)", duz: "Quduq, kanalizatsiya, drenaj tizimlari", dru: "Колодцы, канализация, дренажные системы" },
  { cat: "inert", slug: "shagal", uz: "Shag'al (fraksiya 5–20)", ru: "Щебень (фракция 5–20)", duz: "Beton tayyorlash, yo'l asosi, drenaj", dru: "Приготовление бетона, основание дорог, дренаж" },
  { cat: "inert", slug: "qum", uz: "Qum (yuvilgan)", ru: "Песок (мытый)", duz: "Qorishma, stiyajka, beton aralashmalari", dru: "Растворы, стяжка, бетонные смеси" },
];

/* slug bo'yicha topish — detal sahifa uchun */
export const productBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);
