import { useState, useEffect, useRef } from "react";

/* ============================================================
   BKS — BETON KLASS SAVDO · v2.0
   To'liq bir sahifali sayt: Hero · Statistika · Katalog · Kalkulyator
   · Nega biz · Sharhlar · FAQ · Aloqa · Footer  (UZ/RU)
   ============================================================ */

/* ---------- DIZAYN TOKENLARI ---------- */
const T = {
  ink: "#0e0e0e",          // asosiy fon
  ink2: "#151515",         // ikkinchi qatlam
  surface: "#1d1d1d",      // kartochkalar
  line: "#2a2a2a",         // chegaralar
  gold: "#f5a623",         // asosiy urg'u (logo rangi)
  text: "#f5f5f4",
  muted: "#9c9a96",
  goldGrad: "linear-gradient(135deg, #ffc933 0%, #f5a623 45%, #e08e00 100%)",
};

const F = {
  display: "'Unbounded', sans-serif",
  body: "'Manrope', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

/* Telegram — tasdiqlang yoki almashtiring */
const TG_USERNAME = "betonklasssavdo";

/* ===== ALOQA MA'LUMOTLARI — SHARTLI, KEYIN ALMASHTIRILADI ===== */
const CONTACT = {
  phone: "+998 93 297 07 00",        // ← shartli
  phoneHref: "tel:+998932970700",    // ← shartli
  addressUz: "Samarqand shahri",     // ← shartli (aniq manzil qo'shiladi)
  addressRu: "г. Самарканд",         // ← shartli
  hoursUz: "08:00 – 20:00 (Du–Yak)", // ← shartli
  hoursRu: "08:00 – 20:00 (Пн–Вс)",  // ← shartli
};

/* ===== LAUNCH SOZLAMALARI — real kontent tayyor bo'lganda yoqiladi ===== */
const SHOW_STATS = false;    // real raqamlar kiritilgach true qiling (L.uz/ru ichida "stats")
const SHOW_REVIEWS = false;  // real mijoz sharhlari qo'shilgach true qiling
const TG_BOT = "";           // masalan "BKSOrderBot" — bo'lsa buyurtma botga yo'naladi
const GALLERY = [];          // fotolar: { src: "/img/zavod.webp", uz: "Zavod", ru: "Завод" }
const REQUISITES = "";       // masalan: "BETON KLASS SAVDO MChJ · STIR 123 456 789"
const MAP_EMBED = "";        // Google Maps embed havolasi (Ulashish → Xaritani joylash)

/* Buyurtmani yuborish: bot bo'lsa botga, bo'lmasa chatga + clipboard */
function sendOrder(message, onCopied) {
  navigator.clipboard?.writeText(message).then(onCopied).catch(() => {});
  const url = TG_BOT
    ? `https://t.me/${TG_BOT}?start=web`
    : `https://t.me/${TG_USERNAME}`;
  window.open(url, "_blank", "noopener");
}

/* Navigatsiya anchorlari (t.nav tartibiga mos) */
const NAV_LINKS = ["#top", "#catalog", "#calc", "#reviews", "#contact"];

/* ---------- TIL TIZIMI (UZ / RU) ---------- */
const L = {
  uz: {
    nav: ["Bosh sahifa", "Mahsulotlar", "Kalkulyator", "Mijozlar", "Aloqa"],
    navCta: "Buyurtma",
    heroEyebrow: "Beton Klass Savdo · Samarqand",
    heroLine1: "BETON.",
    heroLine2: "SIFAT.",
    heroLine3: "VAQTIDA.",
    heroSub:
      "Sement, tayyor beton va beton buyumlar — buyurtmadan yetkazib berishgacha hammasi bir joyda.",
    ctaOrder: "Buyurtma berish",
    ctaCalc: "Hajmni hisoblash",
    statsTitle: "Raqamlarda biz",
    stats: [
      { value: 1200, suffix: "+", label: "Bajarilgan buyurtma" },
      { value: 35, suffix: "+", label: "Mahsulot turi" },
      { value: 10, suffix: "+", label: "Yillik tajriba" },
      { value: 24, suffix: "/7", label: "Buyurtma qabul qilamiz" },
    ],
    catalogTitle: "Mahsulotlar",
    catalogSub: "Sement, tayyor beton va beton buyumlar — bir katalogda. Narxlar qo'ng'iroq yoki Telegram orqali aniqlashtiriladi.",
    catAll: "Barchasi",
    orderBtn: "Buyurtma berish",
    orderMsgIntro: "Assalomu alaykum! Buyurtma bermoqchiman:",
    calcTitle: "Beton kalkulyatori",
    calcSub: "Konstruksiya turini tanlang, o'lchamlarni kiriting — kerakli beton hajmi m³ da hisoblanadi.",
    calcTypeLabel: "Konstruksiya turi",
    calcResult: "Kerakli beton hajmi",
    calcReserve: "Zaxira bilan (+10%)",
    calcNote: "Hisob taxminiy. Aniq hajm loyiha va sharoitga qarab belgilanadi.",
    calcOrderTg: "Telegram orqali buyurtma",
    calcCopied: "Xabar nusxalandi — chatga joylashtiring!",
    calcMsgIntro: "Assalomu alaykum! Beton buyurtma bermoqchiman:",
    calcMsgVol: "Kerakli hajm",
    unitNames: { m: "m", sm: "sm", pc: "dona" },
    whyTitle: "Nega aynan biz?",
    whys: [
      { title: "Hammasi bir joyda", desc: "Sement, tayyor beton, beton buyumlar va inert materiallar — bitta manzil, bitta qo'ng'iroq." },
      { title: "Aniq kelishuv", desc: "Narx, hajm va muddat buyurtmadan oldin kelishib olinadi." },
      { title: "Yetkazib berish", desc: "Buyurtmangiz o'z transportimizda kelishilgan manzilga yetkaziladi." },
      { title: "Tezkor aloqa", desc: "Telegram yoki telefon — murojaatingizga tez javob beramiz." },
    ],
    reviewsTitle: "Mijozlar fikri",
    reviewsSub: "Biz bilan ishlagan mijozlar fikri.",
    reviews: [
      { name: "Aziz aka", role: "Xususiy quruvchi, Samarqand", text: "Hovlimga fundament uchun beton oldim. Vaqtida keldi, sifati zo'r — bir yildan beri hech qanday yoriq yo'q." },
      { name: "Sherzod", role: "Prorab, qurilish brigadasi", text: "Doimiy mijozmiz. Katta hajmda olsak ham sifat bir xil, hujjatlari joyida. Ishlash qulay." },
      { name: "Dilshod aka", role: "Do'kon egasi", text: "Sement bloklar va bordyur oldim. Narxi bozordan arzon chiqdi, yetkazib berish ham o'zlarida ekan — qulay." },
      { name: "Bekzod", role: "Qurilish kompaniyasi", text: "Uch obyektda ularning betonidan foydalandik. Marka aniq, hajm to'g'ri — kamomad bo'lmadi. Tavsiya qilamiz." },
    ],
    faqTitle: "Ko'p so'raladigan savollar",
    faqs: [
      { q: "Buyurtma qanday beriladi?", a: "Kalkulyatorda hajmni hisoblang yoki katalogdan mahsulotni tanlang — «Buyurtma» tugmasi tayyor xabar bilan Telegram'ga olib o'tadi. Telefon orqali ham qabul qilamiz." },
      { q: "Narxni qanday bilsam bo'ladi?", a: "Mahsulot va hajmni ayting — menejer joriy narxni hisoblab beradi. Narxlar hajmga qarab farq qilgani uchun saytda ko'rsatilmaydi." },
      { q: "Yetkazib berish bormi?", a: "Ha, buyurtmalar o'z transportimizda yetkaziladi. Sana, vaqt va yetkazish narxi buyurtma paytida kelishiladi." },
      { q: "Qanday hajmda buyurtma qilish mumkin?", a: "Xususiy hovli qurilishidan yirik obyektgacha ishlaymiz — hajmingizni ayting, imkoniyatni menejer tasdiqlaydi." },
      { q: "To'lov qanday amalga oshiriladi?", a: "To'lov shartlari buyurtma paytida kelishiladi. Yuridik shaxslar bilan ham ishlaymiz." },
      { q: "Sifatga oid hujjatlar bormi?", a: "Sifat va hujjatlarga oid savollarga menejer murojaat paytida javob beradi — so'rashdan tortinmang." },
    ],
    contactTitle: "Biz bilan bog'lanish",
    contactSub: "Savolingiz bormi? Qo'ng'iroq qiling yoki Telegram'da yozing — tez javob beramiz.",
    contactLabels: { phone: "Telefon", tg: "Telegram", address: "Manzil", hours: "Ish vaqti" },
    contactCtaTitle: "Buyurtma berishga tayyormisiz?",
    contactCtaSub: "Telegram orqali bir daqiqada buyurtma bering — xabaringiz menejerga darhol yetib boradi.",
    footerTagline: "Sement va beton mahsulotlari — Samarqand.",
    footerRights: "Barcha huquqlar himoyalangan.",
    galleryTitle: "Galereya",
    ticker: ["Tayyor beton", "Portland sement", "Sement blok", "Bordyur", "Trotuar plitasi", "Shag'al", "Qum", "Beton halqa"],
  },
  ru: {
    nav: ["Главная", "Продукция", "Калькулятор", "Клиенты", "Контакты"],
    navCta: "Заказать",
    heroEyebrow: "Beton Klass Savdo · Самарканд",
    heroLine1: "БЕТОН.",
    heroLine2: "ТОЧНО.",
    heroLine3: "В СРОК.",
    heroSub:
      "Цемент, готовый бетон и ЖБИ — от заказа до доставки всё в одном месте.",
    ctaOrder: "Оформить заказ",
    ctaCalc: "Рассчитать объём",
    statsTitle: "Мы в цифрах",
    stats: [
      { value: 1200, suffix: "+", label: "Выполненных заказов" },
      { value: 35, suffix: "+", label: "Видов продукции" },
      { value: 10, suffix: "+", label: "Лет опыта" },
      { value: 24, suffix: "/7", label: "Приём заказов" },
    ],
    catalogTitle: "Продукция",
    catalogSub: "Цемент, готовый бетон и ЖБИ — в одном каталоге. Цены уточняются по звонку или в Telegram.",
    catAll: "Все",
    orderBtn: "Заказать",
    orderMsgIntro: "Здравствуйте! Хочу оформить заказ:",
    calcTitle: "Калькулятор бетона",
    calcSub: "Выберите тип конструкции, введите размеры — необходимый объём бетона рассчитается в м³.",
    calcTypeLabel: "Тип конструкции",
    calcResult: "Необходимый объём бетона",
    calcReserve: "С запасом (+10%)",
    calcNote: "Расчёт ориентировочный. Точный объём определяется по проекту и условиям.",
    calcOrderTg: "Заказать через Telegram",
    calcCopied: "Сообщение скопировано — вставьте в чат!",
    calcMsgIntro: "Здравствуйте! Хочу заказать бетон:",
    calcMsgVol: "Необходимый объём",
    unitNames: { m: "м", sm: "см", pc: "шт" },
    whyTitle: "Почему именно мы?",
    whys: [
      { title: "Всё в одном месте", desc: "Цемент, готовый бетон, ЖБИ и инертные материалы — один адрес, один звонок." },
      { title: "Точные договорённости", desc: "Цена, объём и сроки согласуются до заказа." },
      { title: "Доставка", desc: "Заказ доставим собственным транспортом по согласованному адресу." },
      { title: "Быстрая связь", desc: "Telegram или телефон — оперативно ответим на обращение." },
    ],
    reviewsTitle: "Отзывы клиентов",
    reviewsSub: "Отзывы клиентов, работавших с нами.",
    reviews: [
      { name: "Азиз ака", role: "Частный застройщик, Самарканд", text: "Брал бетон для фундамента дома. Привезли вовремя, качество отличное — за год ни одной трещины." },
      { name: "Шерзод", role: "Прораб, строительная бригада", text: "Постоянные клиенты. Даже при больших объёмах качество стабильное, документы в порядке. Работать удобно." },
      { name: "Дилшод ака", role: "Владелец магазина", text: "Покупал цементоблоки и бордюр. Цена вышла ниже рыночной, доставка своя — удобно." },
      { name: "Бекзод", role: "Строительная компания", text: "Использовали их бетон на трёх объектах. Марка точная, объём верный — недостачи не было. Рекомендуем." },
    ],
    faqTitle: "Частые вопросы",
    faqs: [
      { q: "Как оформить заказ?", a: "Рассчитайте объём в калькуляторе или выберите товар в каталоге — кнопка «Заказать» откроет Telegram с готовым сообщением. Также принимаем заказы по телефону." },
      { q: "Как узнать цену?", a: "Назовите товар и объём — менеджер рассчитает актуальную цену. Цены зависят от объёма, поэтому на сайте не указаны." },
      { q: "Есть ли доставка?", a: "Да, заказы доставляются собственным транспортом. Дата, время и стоимость доставки согласуются при заказе." },
      { q: "Какие объёмы вы берёте?", a: "Работаем и с частным строительством, и с крупными объектами — назовите объём, менеджер подтвердит возможность." },
      { q: "Как производится оплата?", a: "Условия оплаты согласуются при заказе. Работаем и с юридическими лицами." },
      { q: "Есть ли документы о качестве?", a: "На вопросы о качестве и документах менеджер ответит при обращении — спрашивайте смело." },
    ],
    contactTitle: "Связаться с нами",
    contactSub: "Есть вопросы? Позвоните или напишите в Telegram — ответим быстро.",
    contactLabels: { phone: "Телефон", tg: "Telegram", address: "Адрес", hours: "Время работы" },
    contactCtaTitle: "Готовы оформить заказ?",
    contactCtaSub: "Оформите заказ через Telegram за минуту — сообщение сразу попадёт к менеджеру.",
    footerTagline: "Цемент и бетонные изделия — Самарканд.",
    footerRights: "Все права защищены.",
    galleryTitle: "Галерея",
    ticker: ["Готовый бетон", "Портландцемент", "Цементоблок", "Бордюр", "Тротуарная плитка", "Щебень", "Песок", "Кольцо ЖБИ"],
  },
};

/* ---------- KATALOG MA'LUMOTLARI ----------
   Mahsulot nomlari va tavsiflari — tekshirib chiqing. */
const CATS = [
  { id: "cement", uz: "Sement", ru: "Цемент" },
  { id: "beton", uz: "Tayyor beton", ru: "Готовый бетон" },
  { id: "jbi", uz: "Beton buyumlar", ru: "ЖБИ" },
  { id: "inert", uz: "Inert materiallar", ru: "Инертные материалы" },
];

const PRODUCTS = [
  { cat: "cement", uz: "Portland sement M400", ru: "Портландцемент М400", duz: "Fundament, stiyajka, umumiy qurilish ishlari", dru: "Фундамент, стяжка, общестроительные работы" },
  { cat: "cement", uz: "Portland sement M500", ru: "Портландцемент М500", duz: "Yuqori mustahkamlik talab qilinadigan konstruksiyalar", dru: "Конструкции повышенной прочности" },
  { cat: "beton", uz: "Beton M200 (B15)", ru: "Бетон М200 (B15)", duz: "Pol, maydoncha, yo'lakcha, yengil fundament", dru: "Полы, площадки, дорожки, лёгкий фундамент" },
  { cat: "beton", uz: "Beton M250 (B20)", ru: "Бетон М250 (B20)", duz: "Fundament, plita, devor asoslari", dru: "Фундаменты, плиты, основания стен" },
  { cat: "beton", uz: "Beton M300 (B22.5)", ru: "Бетон М300 (B22.5)", duz: "Ustunlar, yuk ko'taruvchi konstruksiyalar, zinapoyalar", dru: "Колонны, несущие конструкции, лестницы" },
  { cat: "jbi", uz: "Sement blok 20×20×40", ru: "Цементоблок 20×20×40", duz: "Devor, to'siq, xo'jalik inshootlari", dru: "Стены, ограждения, хозпостройки" },
  { cat: "jbi", uz: "Peskoblok", ru: "Пескоблок", duz: "Devor va to'siqlar uchun yengil, arzon variant", dru: "Лёгкий и доступный вариант для стен и оград" },
  { cat: "jbi", uz: "Bordyur", ru: "Бордюр", duz: "Yo'l va trotuar chegaralari", dru: "Ограждение дорог и тротуаров" },
  { cat: "jbi", uz: "Trotuar plitasi", ru: "Тротуарная плитка", duz: "Hovli, piyoda yo'laklar, maydonchalar", dru: "Дворы, пешеходные дорожки, площадки" },
  { cat: "jbi", uz: "Beton halqa KS-10 (quduq)", ru: "Кольцо КС-10 (колодец)", duz: "Quduq, kanalizatsiya, drenaj tizimlari", dru: "Колодцы, канализация, дренажные системы" },
  { cat: "inert", uz: "Shag'al (fraksiya 5–20)", ru: "Щебень (фракция 5–20)", duz: "Beton tayyorlash, yo'l asosi, drenaj", dru: "Приготовление бетона, основание дорог, дренаж" },
  { cat: "inert", uz: "Qum (yuvilgan)", ru: "Песок (мытый)", duz: "Qorishma, stiyajka, beton aralashmalari", dru: "Растворы, стяжка, бетонные смеси" },
];

/* ---------- KALKULYATOR: KONSTRUKSIYA TURLARI ----------
   Har tur: maydonlar (kalit, nom UZ/RU, birlik, boshlang'ich qiymat)
   va hajm formulasi (natija — m³). */
const CALC_TYPES = [
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

/* ---------- BETON PANEL TEKSTURASI (imzo element) ----------
   Vertikal chok chiziqlari + forma-bog'lagich doiralari —
   haqiqiy ochiq beton panellarning detali. */
function ConcretePanel() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* nozik donador tekstura */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.05 }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      {/* panel choklari */}
      {[22, 47, 72].map((x) => (
        <div
          key={x}
          className="absolute top-0 bottom-0 w-px"
          style={{ left: `${x}%`, background: "rgba(255,255,255,0.06)" }}
        />
      ))}
      {/* forma-bog'lagich doiralari */}
      {[
        [22, 18], [22, 78], [47, 18], [47, 78], [72, 18], [72, 78],
      ].map(([x, y], i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full border"
          style={{
            left: `calc(${x}% - 6px)`,
            top: `${y}%`,
            borderColor: "rgba(255,255,255,0.10)",
            background: "rgba(0,0,0,0.35)",
          }}
        />
      ))}
    </div>
  );
}

/* ---------- HERO ILLYUSTRATSIYASI ----------
   Izometrik beton bloklar + armatura — chiziqli, oltin urg'ular bilan */
function HeroArt() {
  const g = "#3a3a3a";
  return (
    <div className="hidden lg:flex items-center justify-center float-slow" aria-hidden="true">
      <svg width="380" height="400" viewBox="0 0 400 420" fill="none">
        {/* armatura (orqa) */}
        {[150, 180, 210, 240].map((x) => (
          <g key={x} stroke={T.gold} strokeWidth="2" opacity="0.7">
            <line x1={x} y1="30" x2={x} y2="150" />
            <path d={`M${x} 30 q 8 -10 16 -2`} />
          </g>
        ))}
        {/* yuqori blok */}
        <g stroke={g} strokeWidth="1.5">
          <polygon points="110,170 200,140 290,170 200,200" fill="#202020" />
          <polygon points="110,170 200,200 200,250 110,220" fill="#181818" />
          <polygon points="290,170 200,200 200,250 290,220" fill="#141414" />
        </g>
        <polyline points="110,170 200,200 290,170" stroke={T.gold} strokeWidth="2" fill="none" />
        {/* o'rta blok */}
        <g stroke={g} strokeWidth="1.5">
          <polygon points="70,260 200,215 330,260 200,305" fill="#1e1e1e" />
          <polygon points="70,260 200,305 200,365 70,320" fill="#161616" />
          <polygon points="330,260 200,305 200,365 330,320" fill="#121212" />
        </g>
        <polyline points="70,260 200,305 330,260" stroke={T.gold} strokeWidth="2" fill="none" />
        {/* forma-bog'lagich doiralari */}
        {[[110, 300], [160, 322], [240, 322], [290, 300]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" stroke={g} strokeWidth="1.5" fill="#0e0e0e" />
        ))}
        {/* pastki soya chizig'i */}
        <line x1="55" y1="392" x2="345" y2="392" stroke={g} strokeWidth="1" opacity="0.6" />
        <line x1="90" y1="402" x2="310" y2="402" stroke={g} strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
  );
}

/* ---------- YUGURUVCHI LENTA ---------- */
function TickerStrip({ t }) {
  const items = [...t.ticker, ...t.ticker]; // uzluksiz aylanish uchun 2x
  return (
    <div
      className="overflow-hidden py-4 select-none"
      style={{ background: T.ink, borderBottom: `1px solid ${T.line}` }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 pr-6 whitespace-nowrap text-sm font-bold uppercase"
            style={{ color: T.muted, fontFamily: F.display, letterSpacing: "0.18em" }}
          >
            {item}
            <span style={{ color: T.gold }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- RAQAM SANASH ANIMATSIYASI ---------- */
function CountUp({ value, suffix }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(value); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const t0 = performance.now();
          const dur = 1400;
          const tick = (t) => {
            const p = Math.min((t - t0) / dur, 1);
            setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} style={{ fontFamily: F.mono }}>
      {n.toLocaleString("ru-RU")}
      <span style={{ color: T.gold }}>{suffix}</span>
    </span>
  );
}

/* ---------- ASOSIY KOMPONENT ---------- */
export default function BKSSite() {
  const [lang, setLang] = useState("uz");
  const t = L[lang];
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = t.nav
    .map((label, i) => ({ label, href: NAV_LINKS[i] }))
    .filter((it) => SHOW_REVIEWS || it.href !== "#reviews");

  /* Sahifa sarlavhasi va tavsifi (SEO — deploy'da ham ishlaydi) */
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "uz"
        ? "Beton Klass Savdo — Sement va beton mahsulotlari | Samarqand"
        : "Beton Klass Savdo — Цемент и бетонные изделия | Самарканд";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content =
      lang === "uz"
        ? "Sement, tayyor beton, beton buyumlar va inert materiallar — Samarqandda. Hajm kalkulyatori, Telegram orqali tezkor buyurtma."
        : "Цемент, готовый бетон, ЖБИ и инертные материалы в Самарканде. Калькулятор объёма, быстрый заказ через Telegram.";
  }, [lang]);

  /* Bo'limlarni scroll'da paydo qilish */
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { els.forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ background: T.ink, color: T.text, fontFamily: F.body, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;900&family=Manrope:wght@400;500;700&family=JetBrains+Mono:wght@600&display=swap&subset=cyrillic');
        html { scroll-behavior: smooth; }
        section[id] { scroll-margin-top: 84px; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
        .fade-up { animation: fadeUp .8s cubic-bezier(.2,.7,.3,1) both; }
        .fu-1 { animation-delay: .05s } .fu-2 { animation-delay: .15s }
        .fu-3 { animation-delay: .25s } .fu-4 { animation-delay: .4s }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }
        @media (prefers-reduced-motion: reduce) { .fade-up { animation: none } }
        .gold-text {
          background: ${T.goldGrad};
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
        }
        .nav-link { color: ${T.muted}; transition: color .2s; text-decoration: none; }
        .nav-link:hover, .nav-link:focus-visible { color: ${T.text}; }
        .btn-gold { background: ${T.goldGrad}; color: #1a1200; transition: filter .2s, transform .15s; }
        .btn-gold:hover { filter: brightness(1.08); }
        .btn-gold:active { transform: translateY(1px); }
        .btn-ghost { border: 1px solid ${T.line}; color: ${T.text}; transition: border-color .2s, background .2s; }
        .btn-ghost:hover { border-color: ${T.gold}; background: rgba(245,166,35,.06); }
        :focus-visible { outline: 2px solid ${T.gold}; outline-offset: 2px; }
        /* Bo'lim sarlavhasi ostidagi ogohlantirish belgisi — imzo takrori */
        .sec-title { position: relative; padding-bottom: 14px; }
        .sec-title::after {
          content: ""; position: absolute; left: 0; bottom: 0;
          width: 56px; height: 5px;
          background: repeating-linear-gradient(45deg, ${T.gold} 0 8px, transparent 8px 16px);
        }
        /* Kartochka ko'tarilishi */
        .card-lift { transition: transform .25s cubic-bezier(.2,.7,.3,1), border-color .25s; }
        .card-lift:hover { transform: translateY(-4px); border-color: rgba(245,166,35,.45) !important; }
        @media (prefers-reduced-motion: reduce) { .card-lift:hover { transform: none } }
        /* Yuguruvchi lenta */
        .marquee-track { display: flex; width: max-content; animation: marquee 30s linear infinite; }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @media (prefers-reduced-motion: reduce) { .marquee-track { animation: none } }
        /* Kartochka suv belgisi */
        .watermark {
          position: absolute; top: -8px; right: 8px;
          font-size: 78px; line-height: 1; font-weight: 900;
          opacity: .05; pointer-events: none; user-select: none;
        }
        /* Hero illyustratsiyasi sekin suzishi */
        .float-slow { animation: floatSlow 6s ease-in-out infinite; }
        @keyframes floatSlow { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        @media (prefers-reduced-motion: reduce) { .float-slow { animation: none } }
        /* Scroll'da yumshoq paydo bo'lish */
        .reveal { opacity: 0; transform: translateY(18px); transition: opacity .7s cubic-bezier(.2,.7,.3,1), transform .7s cubic-bezier(.2,.7,.3,1); }
        .reveal.in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none } }
        /* FAQ javobi yumshoq ochilishi */
        .faq-open { animation: faqDown .28s cubic-bezier(.2,.7,.3,1); }
        @keyframes faqDown { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: none } }
        @media (prefers-reduced-motion: reduce) { .faq-open { animation: none } }
        /* Lenta hoverda to'xtaydi */
        .marquee-track:hover { animation-play-state: paused; }
        /* Uchuvchi label — yozuv maydon ichida turadi, yozishda tepaga uchadi */
        .ffield { position: relative; }
        .ffield > label {
          position: absolute; left: 17px; top: 50%; transform: translateY(-50%);
          color: ${T.muted}; pointer-events: none; font-size: 15px;
          transition: top .22s cubic-bezier(.2,.7,.3,1), font-size .22s, color .22s, letter-spacing .22s;
        }
        .ffield:focus-within > label, .ffield.filled > label {
          top: 15px; font-size: 10px; color: ${T.gold};
          text-transform: uppercase; letter-spacing: .12em;
          font-family: 'JetBrains Mono', monospace;
        }
        .ffield input { padding-top: 26px; padding-bottom: 10px; }
        .ffield input:focus { border-color: rgba(245,166,35,.55) !important; }
        @media (prefers-reduced-motion: reduce) { .ffield > label { transition: none } }
      `}</style>

      {/* ================= NAVBAR ================= */}
      <header
        className="sticky top-0 z-50"
        style={{ background: "rgba(14,14,14,.86)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.line}` }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#top" className="flex flex-col leading-none" style={{ textDecoration: "none" }}>
            <span className="gold-text text-2xl font-black tracking-tight" style={{ fontFamily: F.display }}>
              BKS
            </span>
            <span className="mt-0.5" style={{ color: T.muted, fontSize: 9, letterSpacing: "0.28em" }}>
              BETON KLASS SAVDO
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navItems.map((it) => (
              <a key={it.href} href={it.href} className="nav-link">{it.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Til tugmasi */}
            <div
              className="flex rounded-full overflow-hidden text-xs font-bold"
              style={{ border: `1px solid ${T.line}` }}
              role="group" aria-label="Til / Язык"
            >
              {["uz", "ru"].map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className="px-3.5 py-2.5 uppercase"
                  style={{
                    background: lang === code ? T.goldGrad : "transparent",
                    color: lang === code ? "#1a1200" : T.muted,
                  }}
                >
                  {code}
                </button>
              ))}
            </div>

            <a href="#contact" className="btn-gold hidden sm:inline-block rounded-lg px-4 py-2 text-sm font-bold" style={{ textDecoration: "none" }}>
              {t.navCta}
            </a>

            {/* Mobil menyu tugmasi */}
            <button
              className="md:hidden p-3 -mr-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menyu"
              aria-expanded={menuOpen}
              style={{ color: T.text }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen
                  ? <path d="M6 6l12 12M18 6L6 18" />
                  : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobil menyu */}
        {menuOpen && (
          <nav className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm font-medium" style={{ borderTop: `1px solid ${T.line}` }}>
            <div className="pt-3" />
            {navItems.map((it) => (
              <a key={it.href} href={it.href} className="nav-link py-2" onClick={() => setMenuOpen(false)}>{it.label}</a>
            ))}
            <a href="#contact" className="btn-gold rounded-lg px-4 py-2.5 text-center font-bold mt-1" style={{ textDecoration: "none" }}>
              {t.navCta}
            </a>
          </nav>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section id="top" className="relative" style={{ background: T.ink }}>
        <ConcretePanel />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 sm:pb-28 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div>
            <p
              className="fade-up fu-1 text-xs sm:text-sm uppercase mb-6"
              style={{ color: T.gold, fontFamily: F.mono, letterSpacing: "0.22em" }}
            >
              {t.heroEyebrow}
            </p>

            <h1
              className="fade-up fu-2 font-black select-none"
              style={{ fontFamily: F.display, fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 0.95 }}
            >
              <span className="block" style={{ color: T.text }}>
                {t.heroLine1.replace(/\.$/, "")}<span className="gold-text">.</span>
              </span>
              <span className="block gold-text">{t.heroLine2}</span>
              <span className="block" style={{ color: T.text }}>
                {t.heroLine3.replace(/\.$/, "")}<span className="gold-text">.</span>
              </span>
            </h1>

            <p className="fade-up fu-3 mt-7 max-w-xl text-base sm:text-lg" style={{ color: T.muted }}>
              {t.heroSub}
            </p>

            <div className="fade-up fu-4 mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="#contact" className="btn-gold rounded-xl px-7 py-3.5 text-center font-bold" style={{ textDecoration: "none" }}>
                {t.ctaOrder}
              </a>
              <a href="#calc" className="btn-ghost rounded-xl px-7 py-3.5 text-center font-bold" style={{ textDecoration: "none" }}>
                {t.ctaCalc}
              </a>
            </div>
          </div>

          <div className="fade-up fu-4">
            <HeroArt />
          </div>
        </div>

        {/* pastki ogohlantirish chizig'i — nozik sanoat detali */}
        <div
          className="h-1.5"
          style={{
            background:
              "repeating-linear-gradient(45deg, #f5a623 0 14px, #0e0e0e 14px 28px)",
            opacity: 0.85,
          }}
        />
      </section>

      {/* ================= STATISTIKA (real raqamlar kelgach yoqiladi) ================= */}
      {SHOW_STATS && (
      <section style={{ background: T.ink2, borderBottom: `1px solid ${T.line}` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <p className="text-xs uppercase mb-8" style={{ color: T.muted, fontFamily: F.mono, letterSpacing: "0.22em" }}>
            {t.statsTitle}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {t.stats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-semibold" style={{ color: T.text }}>
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm" style={{ color: T.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ================= YUGURUVCHI LENTA ================= */}
      <TickerStrip t={t} />

      {/* ================= KATALOG ================= */}
      <CatalogSection lang={lang} t={t} />

      {/* ================= KALKULYATOR ================= */}
      <CalculatorSection lang={lang} t={t} />

      {/* ================= NEGA BIZ ================= */}
      <WhySection t={t} />

      {/* ================= GALEREYA (fotolar qo'shilgach ko'rinadi) ================= */}
      <GallerySection lang={lang} t={t} />

      {/* ================= SHARHLAR (real sharhlar kelgach yoqiladi) ================= */}
      {SHOW_REVIEWS && <ReviewsSection t={t} />}

      {/* ================= FAQ ================= */}
      <FAQSection t={t} />

      {/* ================= ALOQA ================= */}
      <ContactSection lang={lang} t={t} />

      {/* ================= FOOTER ================= */}
      <footer style={{ background: T.ink2 }}>
        <div
          className="h-1.5"
          style={{
            background: "repeating-linear-gradient(45deg, #f5a623 0 14px, #0e0e0e 14px 28px)",
            opacity: 0.85,
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="gold-text text-xl font-black" style={{ fontFamily: F.display }}>BKS</div>
            <div className="mt-0.5" style={{ color: T.muted, fontSize: 9, letterSpacing: "0.28em" }}>BETON KLASS SAVDO</div>
            <p className="text-xs mt-3 max-w-xs" style={{ color: T.muted }}>{t.footerTagline}</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navItems.map((it) => (
              <a key={it.href} href={it.href} className="nav-link">{it.label}</a>
            ))}
          </nav>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 pr-24 sm:pr-6 text-xs" style={{ color: T.muted, borderTop: `1px solid ${T.line}` }}>
          {REQUISITES && <div className="mb-1">{REQUISITES}</div>}
          © {new Date().getFullYear()} Beton Klass Savdo. {t.footerRights}
        </div>
      </footer>

      {/* Suzuvchi Telegram tugmasi */}
      <a
        href={`https://t.me/${TG_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: T.goldGrad, boxShadow: "0 8px 22px rgba(0,0,0,.5)" }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#1a1200">
          <path d="M21.9 4.6c.3-1.2-.9-2.2-2-1.7L2.7 10.1c-1.2.5-1.1 2.2.1 2.6l4.4 1.4 1.7 5.3c.3 1 1.6 1.3 2.3.5l2.4-2.5 4.5 3.3c.9.7 2.2.2 2.4-.9l1.4-15.2zM8.5 13.2l8.7-5.5c.2-.1.4.1.2.3l-7 6.6c-.2.2-.3.4-.4.7l-.4 2.6c0 .3-.5.3-.5 0l-.9-4c-.1-.3 0-.6.3-.7z"/>
        </svg>
      </a>
    </div>
  );
}

/* ---------- KALKULYATOR BO'LIMI (hajm, m³) ---------- */
function CalculatorSection({ lang, t }) {
  const [typeIdx, setTypeIdx] = useState(0);
  const type = CALC_TYPES[typeIdx];
  const [vals, setVals] = useState(() =>
    Object.fromEntries(type.fields.map((f) => [f.k, ""]))
  );
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState("");

  const pickType = (i) => {
    setTypeIdx(i);
    setVals(Object.fromEntries(CALC_TYPES[i].fields.map((f) => [f.k, ""])));
  };

  /* Kasr sonlar va bo'sh maydonga ruxsat: xom matn saqlanadi,
     hisobda songa aylantiriladi */
  const setVal = (k, v) => setVals((s) => ({ ...s, [k]: v }));
  const num = (k) => Math.max(0, parseFloat(String(vals[k]).replace(",", ".")) || 0);
  const nvals = Object.fromEntries(type.fields.map((f) => [f.k, num(f.k)]));

  const volume = type.calc(nvals);
  const reserve = volume * 1.1;
  const fmt = (n) => (Math.round(n * 100) / 100).toLocaleString("ru-RU");

  const orderMsg = () => {
    const dims = type.fields
      .map((f) => `${f[lang]}: ${nvals[f.k]} ${t.unitNames[f.unit]}`)
      .join(", ");
    return `${t.calcMsgIntro}\n• ${type[lang]}\n• ${dims}\n• ${t.calcMsgVol}: ≈ ${fmt(volume)} m³`;
  };

  const orderViaTg = () => {
    const m = orderMsg();
    setSent(m); // xabar har doim ko'rsatiladi — clipboard ishlamasa ham qo'lda ko'chirish mumkin
    sendOrder(m, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 8000);
    });
  };

  return (
    <section id="calc" style={{ background: T.ink2, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="sec-title font-black mb-3" style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}>
          {t.calcTitle}
        </h2>
        <p className="max-w-xl text-sm sm:text-base mb-10" style={{ color: T.muted }}>{t.calcSub}</p>

        <div data-reveal className="reveal grid lg:grid-cols-5 gap-5">
          {/* Kirish paneli */}
          <div className="lg:col-span-3 rounded-2xl p-5 sm:p-7" style={{ background: T.surface, border: `1px solid ${T.line}` }}>
            <div className="text-xs uppercase mb-3" style={{ color: T.muted, fontFamily: F.mono, letterSpacing: "0.18em" }}>
              {t.calcTypeLabel}
            </div>
            {/* Konstruksiya turi chiplari */}
            <div className="flex flex-wrap gap-2 mb-7">
              {CALC_TYPES.map((c, i) => {
                const on = typeIdx === i;
                return (
                  <button
                    key={c.id}
                    aria-pressed={on}
                    onClick={() => pickType(i)}
                    className="rounded-full px-4 py-2.5 text-sm font-bold transition-all"
                    style={{
                      background: on ? T.goldGrad : "transparent",
                      color: on ? "#1a1200" : T.muted,
                      border: `1px solid ${on ? "transparent" : T.line}`,
                    }}
                  >
                    {c[lang]}
                  </button>
                );
              })}
            </div>

            {/* O'lcham maydonlari — turga qarab dinamik */}
            <div className="grid sm:grid-cols-2 gap-4">
              {type.fields.map((f) => (
                <div key={f.k} className={`ffield ${vals[f.k] !== "" ? "filled" : ""}`}>
                  <input
                    id={`calc-${f.k}`}
                    type="text" inputMode="decimal"
                    value={vals[f.k]}
                    onChange={(e) => setVal(f.k, e.target.value)}
                    className="w-full rounded-xl px-4 text-lg font-semibold"
                    style={{ background: T.ink, color: T.text, border: `1px solid ${T.line}`, fontFamily: F.mono }}
                  />
                  <label htmlFor={`calc-${f.k}`}>
                    {f[lang]} · {t.unitNames[f.unit]}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Natija paneli */}
          <div className="lg:col-span-2 rounded-2xl p-5 sm:p-7 flex flex-col"
            style={{ background: T.surface, border: `1px solid ${T.gold}44` }}>
            <div className="text-xs uppercase mb-3" style={{ color: T.muted, fontFamily: F.mono, letterSpacing: "0.18em" }}>
              {t.calcResult}
            </div>
            <div className="text-4xl sm:text-5xl font-semibold gold-text" style={{ fontFamily: F.mono }}>
              {fmt(volume)}
            </div>
            <div className="text-sm mt-1 mb-5" style={{ color: T.muted }}>m³</div>

            <div className="text-sm rounded-xl px-4 py-3 mb-6 flex justify-between gap-3" style={{ background: T.ink, color: T.muted }}>
              <span>{t.calcReserve}</span>
              <span style={{ color: T.text, fontFamily: F.mono }}>{fmt(reserve)} m³</span>
            </div>

            <button onClick={orderViaTg}
              className="btn-gold mt-auto rounded-xl px-6 py-4 font-bold text-base">
              {t.calcOrderTg} →
            </button>
            {copied && (
              <div className="mt-3 text-sm text-center font-medium" style={{ color: "#22c55e" }}>
                ✓ {t.calcCopied}
              </div>
            )}
            {sent && (
              <div className="mt-3 text-xs rounded-xl px-4 py-3" style={{ background: T.ink, color: T.muted, whiteSpace: "pre-line" }}>
                {sent}
              </div>
            )}
            <p className="mt-4 text-xs" style={{ color: T.muted }}>{t.calcNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- KATALOG BO'LIMI ---------- */
function CatalogSection({ lang, t }) {
  const [active, setActive] = useState("all");
  const [copiedIdx, setCopiedIdx] = useState(-1);
  const list = active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active);

  const orderProduct = (p, i) => {
    const name = lang === "uz" ? p.uz : p.ru;
    sendOrder(`${t.orderMsgIntro}\n• ${name}`, () => {
      setCopiedIdx(i);
      setTimeout(() => setCopiedIdx(-1), 8000);
    });
  };

  return (
    <section id="catalog" style={{ background: T.ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2
          className="sec-title font-black mb-3"
          style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}
        >
          {t.catalogTitle}
        </h2>
        <p className="max-w-xl text-sm sm:text-base mb-10" style={{ color: T.muted }}>
          {t.catalogSub}
        </p>

        {/* Kategoriya tab'lari */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[{ id: "all", uz: t.catAll, ru: t.catAll }, ...CATS].map((c) => {
            const on = active === c.id;
            return (
              <button
                key={c.id}
                aria-pressed={on}
                onClick={() => setActive(c.id)}
                className="rounded-full px-4 py-2.5 text-sm font-bold transition-all"
                style={{
                  background: on ? T.goldGrad : "transparent",
                  color: on ? "#1a1200" : T.muted,
                  border: `1px solid ${on ? "transparent" : T.line}`,
                }}
              >
                {c[lang]}
              </button>
            );
          })}
        </div>

        {/* Mahsulot kartochkalari */}
        <div data-reveal className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {list.map((p, i) => (
            <article
              key={i}
              className="card-lift group relative rounded-2xl p-5 sm:p-6 flex flex-col overflow-hidden"
              style={{ background: T.surface, border: `1px solid ${T.line}` }}
            >
              {/* suv belgisi — mahsulot bosh harfi */}
              {(() => {
                const n = lang === "uz" ? p.uz : p.ru;
                const tkn = (n.match(/M\d+|KS-\d+/) || [n.charAt(0)])[0];
                return (
                  <span
                    className="watermark"
                    style={{ fontFamily: F.display, color: T.text, fontSize: tkn.length > 1 ? 40 : 78, top: tkn.length > 1 ? 10 : -8 }}
                    aria-hidden="true"
                  >
                    {tkn}
                  </span>
                );
              })()}
              {/* burchak urg'usi */}
              <div
                className="absolute top-0 right-0 w-10 h-10 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(225deg, ${T.gold}33 0%, transparent 55%)`,
                }}
                aria-hidden="true"
              />
              <div
                className="uppercase mb-3"
                style={{ color: T.gold, fontFamily: F.mono, fontSize: 10, letterSpacing: "0.2em" }}
              >
                {CATS.find((c) => c.id === p.cat)[lang]}
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: T.text, fontFamily: F.body }}>
                {lang === "uz" ? p.uz : p.ru}
              </h3>
              <p className="text-sm flex-1 mb-5" style={{ color: T.muted }}>
                {lang === "uz" ? p.duz : p.dru}
              </p>
              <button
                onClick={() => orderProduct(p, i)}
                className="btn-ghost w-full rounded-lg px-4 py-2.5 text-sm font-bold"
              >
                {copiedIdx === i ? "✓" : t.orderBtn}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- NEGA BIZ ---------- */
const WHY_ICONS = [
  // qalqon (sifat)
  <path key="0" d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5C8 19.2 5 15.5 5 11V6l7-3zM9.5 11.5l2 2 3.5-4" strokeLinecap="round" strokeLinejoin="round" />,
  // yorliq (narx)
  <path key="1" d="M4 4h7l9 9-7 7-9-9V4zM8.5 8.5h.01" strokeLinecap="round" strokeLinejoin="round" />,
  // yuk mashina (yetkazish)
  <path key="2" d="M2 7h11v9H2zM13 10h4l3 3v3h-7M6 19a1.6 1.6 0 100-3.2A1.6 1.6 0 006 19zM17 19a1.6 1.6 0 100-3.2A1.6 1.6 0 0017 19z" strokeLinecap="round" strokeLinejoin="round" />,
  // qo'l berish (tajriba/ishonch)
  <g key="3"><circle cx="12" cy="9" r="5" /><path d="M8.6 13.2L7 21l5-2.8L17 21l-1.6-7.8" strokeLinecap="round" strokeLinejoin="round" /></g>,
];

function WhySection({ t }) {
  return (
    <section style={{ background: T.ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="sec-title font-black mb-10" style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}>
          {t.whyTitle}
        </h2>
        <div data-reveal className="reveal grid lg:grid-cols-2 gap-x-14" style={{ borderTop: `1px solid ${T.line}` }}>
          {t.whys.map((w, i) => (
            <div key={i} className="flex gap-5 py-7" style={{ borderBottom: `1px solid ${T.line}` }}>
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${T.gold}18`, border: `1px solid ${T.gold}33` }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.8">
                  {WHY_ICONS[i]}
                </svg>
              </div>
              <div>
                <h3 className="font-bold mb-1.5" style={{ color: T.text }}>{w.title}</h3>
                <p className="text-sm" style={{ color: T.muted }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GALEREYA (GALLERY to'ldirilganda ko'rinadi) ---------- */
function GallerySection({ lang, t }) {
  if (!GALLERY.length) return null;
  return (
    <section style={{ background: T.ink2, borderTop: `1px solid ${T.line}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="sec-title font-black mb-10" style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}>
          {t.galleryTitle}
        </h2>
        <div data-reveal className="reveal grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {GALLERY.map((g, i) => (
            <figure key={i} className="card-lift rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.line}`, background: T.surface }}>
              <img
                src={g.src}
                alt={lang === "uz" ? g.uz : g.ru}
                loading="lazy"
                className="w-full h-40 sm:h-52 object-cover"
              />
              <figcaption className="px-4 py-3 text-xs" style={{ color: T.muted }}>
                {lang === "uz" ? g.uz : g.ru}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SHARHLAR ---------- */
function ReviewsSection({ t }) {
  return (
    <section id="reviews" style={{ background: T.ink2, borderTop: `1px solid ${T.line}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="sec-title font-black mb-3" style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}>
          {t.reviewsTitle}
        </h2>
        <p className="max-w-xl text-sm sm:text-base mb-10" style={{ color: T.muted }}>{t.reviewsSub}</p>
        <div data-reveal className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {t.reviews.map((r, i) => (
            <figure
              key={i}
              className={`card-lift rounded-2xl p-6 sm:p-7 ${i === 0 || i === 3 ? "lg:col-span-2" : ""}`}
              style={{ background: T.surface, border: `1px solid ${T.line}` }}
            >
              <div className="gold-text text-4xl leading-none mb-4 select-none" style={{ fontFamily: F.display }} aria-hidden="true">
                “
              </div>
              <blockquote className="text-sm sm:text-base mb-5" style={{ color: T.text }}>
                {r.text}
              </blockquote>
              <figcaption>
                <div className="font-bold text-sm" style={{ color: T.text }}>{r.name}</div>
                <div className="text-xs mt-0.5" style={{ color: T.muted }}>{r.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ (akkordeon) ---------- */
function FAQSection({ t }) {
  const [open, setOpen] = useState(0);

  return (
    <section style={{ background: T.ink, borderTop: `1px solid ${T.line}` }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="sec-title font-black mb-10" style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}>
          {t.faqTitle}
        </h2>
        <div data-reveal className="reveal flex flex-col gap-3">
          {t.faqs.map((f, i) => {
            const on = open === i;
            return (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: T.surface, border: `1px solid ${on ? T.gold + "55" : T.line}` }}>
                <button
                  onClick={() => setOpen(on ? -1 : i)}
                  aria-expanded={on}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                  style={{ color: T.text }}
                >
                  <span className="font-bold text-sm sm:text-base">{f.q}</span>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-transform"
                    style={{
                      background: on ? T.goldGrad : "transparent",
                      color: on ? "#1a1200" : T.gold,
                      border: `1px solid ${on ? "transparent" : T.line}`,
                      transform: on ? "rotate(45deg)" : "none",
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {on && (
                  <div className="faq-open px-5 sm:px-6 pb-5 text-sm sm:text-base" style={{ color: T.muted }}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- ALOQA ---------- */
const CONTACT_ICONS = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a12 12 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />,
  tg: <path d="M21 4L3 11l5.5 2L10 19l3-3 4.5 3L21 4z" strokeLinecap="round" strokeLinejoin="round" />,
  address: <path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round" strokeLinejoin="round" />,
  hours: <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />,
};

function ContactSection({ lang, t }) {
  const items = [
    { key: "phone", value: CONTACT.phone, href: CONTACT.phoneHref },
    { key: "tg", value: `@${TG_USERNAME}`, href: `https://t.me/${TG_USERNAME}` },
    { key: "address", value: lang === "uz" ? CONTACT.addressUz : CONTACT.addressRu },
    { key: "hours", value: lang === "uz" ? CONTACT.hoursUz : CONTACT.hoursRu },
  ];

  return (
    <section id="contact" style={{ background: T.ink2, borderTop: `1px solid ${T.line}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="sec-title font-black mb-3" style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}>
          {t.contactTitle}
        </h2>
        <p className="max-w-xl text-sm sm:text-base mb-10" style={{ color: T.muted }}>{t.contactSub}</p>

        <div data-reveal className="reveal grid lg:grid-cols-2 gap-5">
          {/* Aloqa ma'lumotlari */}
          <div className="grid sm:grid-cols-2 gap-4">
            {items.map((it) => {
              const inner = (
                <>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${T.gold}18`, border: `1px solid ${T.gold}33` }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.8">
                      {CONTACT_ICONS[it.key]}
                    </svg>
                  </div>
                  <div className="text-xs uppercase mb-1" style={{ color: T.muted, fontFamily: F.mono, letterSpacing: "0.14em" }}>
                    {t.contactLabels[it.key]}
                  </div>
                  <div className="font-bold text-sm sm:text-base" style={{ color: T.text }}>{it.value}</div>
                </>
              );
              const st = { background: T.surface, border: `1px solid ${T.line}`, textDecoration: "none", display: "block" };
              return it.href ? (
                <a
                  key={it.key}
                  href={it.href}
                  target={it.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="card-lift relative rounded-2xl p-5"
                  style={st}
                >
                  {/* bosiladigan kartochka belgisi */}
                  <span className="absolute top-4 right-4" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="2">
                      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {inner}
                </a>
              ) : (
                <div key={it.key} className="rounded-2xl p-5" style={st}>{inner}</div>
              );
            })}
          </div>

          {/* CTA kartochka */}
          <div
            className="relative rounded-2xl p-7 sm:p-10 flex flex-col justify-center overflow-hidden"
            style={{ background: T.surface, border: `1px solid ${T.gold}44` }}
          >
            <div
              className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              style={{ background: `radial-gradient(circle at top right, ${T.gold}22, transparent 70%)` }}
              aria-hidden="true"
            />
            <h3 className="font-black text-xl sm:text-2xl mb-3" style={{ fontFamily: F.display, color: T.text }}>
              {t.contactCtaTitle}
            </h3>
            <p className="text-sm sm:text-base mb-7" style={{ color: T.muted }}>{t.contactCtaSub}</p>
            <a
              href={`https://t.me/${TG_USERNAME}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-gold rounded-xl px-7 py-4 text-center font-bold"
              style={{ textDecoration: "none" }}
            >
              {t.calcOrderTg} →
            </a>
          </div>
        </div>

        {MAP_EMBED && (
          <div data-reveal className="reveal mt-5 rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.line}` }}>
            <iframe
              src={MAP_EMBED}
              title="Xarita"
              width="100%"
              height="320"
              style={{ border: 0, display: "block", filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}
