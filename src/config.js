/* Telegram — tasdiqlang yoki almashtiring */
export const TG_USERNAME = "betonklasssavdo";

/* ===== ALOQA MA'LUMOTLARI — SHARTLI, KEYIN ALMASHTIRILADI ===== */
export const CONTACT = {
  phone: "+998 93 297 07 00",        // ← shartli
  phoneHref: "tel:+998932970700",    // ← shartli
  addressUz: "Samarqand shahri",     // ← shartli (aniq manzil qo'shiladi)
  addressRu: "г. Самарканд",         // ← shartli
  hoursUz: "08:00 – 20:00 (Du–Yak)", // ← shartli
  hoursRu: "08:00 – 20:00 (Пн–Вс)",  // ← shartli
};

/* ===== LAUNCH SOZLAMALARI — real kontent tayyor bo'lganda yoqiladi ===== */
export const SHOW_STATS = true;     // raqamlar shartli — realini L.uz/ru ichidagi "stats" da yangilang
export const SHOW_REVIEWS = false;  // real mijoz sharhlari qo'shilgach true qiling
export const TG_BOT = "";           // masalan "BKSOrderBot" — bo'lsa buyurtma botga yo'naladi
export const GALLERY = [];          // fotolar: { src: "/img/zavod.webp", uz: "Zavod", ru: "Завод" }
export const REQUISITES = "";       // masalan: "BETON KLASS SAVDO MChJ · STIR 123 456 789"
/* Xarita: zavod joylashuvi (39.7182383, 66.9560666 — Samarqand) */
export const MAP_COORDS = { lat: 39.7182383, lng: 66.9560666 };
export const MAP_EMBED = `https://maps.google.com/maps?q=${MAP_COORDS.lat},${MAP_COORDS.lng}&z=16&output=embed`;

/* To'liq avtomat forma: serverless endpoint (serverless/telegram-worker.js ni
   deploy qilib URL'ini shu yerga yozing). Bo'sh bo'lsa — Telegram chat oqimi. */
export const ORDER_ENDPOINT = "";

/* Navigatsiya anchorlari (t.nav tartibiga mos) */
export const NAV_LINKS = ["#top", "#catalog", "#calc", "#reviews", "#contact"];
