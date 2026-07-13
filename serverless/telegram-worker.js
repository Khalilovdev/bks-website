/**
 * BKS — buyurtma formasi uchun Cloudflare Worker (bepul tarif yetadi).
 * Forma ma'lumotini to'g'ridan-to'g'ri Telegram'dagi menejerga yuboradi —
 * mijoz hech qayerga o'tmaydi, lead yo'qolmaydi.
 *
 * O'RNATISH (bir marta, ~10 daqiqa):
 * 1. Telegram'da @BotFather ga yozing → /newbot → bot nomi va username bering.
 *    Sizga TOKEN beradi (masalan: 1234567:AAE...).
 * 2. Yangi botga o'zingizdan bitta xabar yozing, so'ng brauzerda oching:
 *    https://api.telegram.org/bot<TOKEN>/getUpdates
 *    Javobdan "chat":{"id":123456789} ni toping — bu sizning CHAT_ID.
 *    (Guruhga yuborish uchun botni guruhga qo'shib, o'sha yerdan id oling.)
 * 3. dash.cloudflare.com → Workers → Create Worker → shu faylni joylashtiring.
 * 4. Worker Settings → Variables → ikkita secret qo'shing:
 *    TG_BOT_TOKEN = 1-qadamdan token,  TG_CHAT_ID = 2-qadamdan id.
 * 5. Worker URL'ini (masalan https://bks-orders.NAME.workers.dev)
 *    src/config.js dagi ORDER_ENDPOINT ga yozing va saytni qayta build qiling.
 */

const CORS = {
  "Access-Control-Allow-Origin": "*", // xohlasangiz sayt domeningiz bilan cheklang
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: CORS });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return new Response("Bad Request", { status: 400, headers: CORS });
    }

    const name = String(data.name || "").trim().slice(0, 100);
    const phone = String(data.phone || "").trim().slice(0, 30);
    if (!name || !phone) {
      return new Response("name va phone majburiy", { status: 400, headers: CORS });
    }

    const text = `🔔 Saytdan yangi buyurtma\n👤 Ism: ${name}\n📞 Tel: ${phone}\n🌐 Til: ${data.lang === "ru" ? "RU" : "UZ"}`;

    const tg = await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.TG_CHAT_ID, text }),
    });

    return new Response(tg.ok ? "ok" : "telegram error", {
      status: tg.ok ? 200 : 502,
      headers: CORS,
    });
  },
};
