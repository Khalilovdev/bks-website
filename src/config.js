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
/* Xarita: "Beton Klass Savdo" MChJ joyiga bog'langan Google Maps embed (Samarqand) */
export const MAP_COORDS = { lat: 39.7182383, lng: 66.9560666 };
export const MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.362747371893!2d66.95382963487064!3d39.71814749300483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d19fbe681496f%3A0xf54e34722f691686!2s%22Beton%20Klass%20Savdo%22%20MCHJ!5e1!3m2!1sen!2s!4v1783922808614!5m2!1sen!2s";

/* To'liq avtomat forma: serverless endpoint (serverless/telegram-worker.js ni
   deploy qilib URL'ini shu yerga yozing). Bo'sh bo'lsa — Telegram chat oqimi. */
export const ORDER_ENDPOINT = "";

/* Navigatsiya anchorlari (t.nav tartibiga mos) */
export const NAV_LINKS = ["#top", "#catalog", "#calc", "#reviews", "#contact"];
