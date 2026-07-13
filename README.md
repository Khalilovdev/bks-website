# BKS — Beton Klass Savdo veb-sayti

Bir sahifali korporativ sayt: React + Vite + Tailwind (build-time). UZ/RU ikki tilli, tungi/kunduzgi rejim. Tashqi resurslarga bog'liq emas — shriftlar self-host.

## Ishga tushirish
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
Natija `dist/` papkasida — istalgan static hostingga (Vercel, Netlify, GitHub Pages) joylanadi.

## Loyiha tuzilishi
```
index.html              — SEO teglar, JSON-LD, erta theme-skript, favicon
public/                 — robots.txt, sitemap.xml, og-cover.png
serverless/
  telegram-worker.js    — buyurtma formasi uchun Cloudflare Worker (ichida o'rnatish yo'riqnomasi)
src/
  main.jsx              — kirish nuqtasi, shrift importlari
  App.jsx               — sahifa yig'uvchisi (til, rejim holati)
  index.css             — Tailwind + barcha maxsus uslublar va rang tokenlari
  theme.js              — T (tokenlar), F (shriftlar), goldA()
  config.js             — ALOQA, TG_USERNAME, SHOW_*, ORDER_ENDPOINT — launch sozlamalari
  data/
    i18n.js             — barcha matnlar (UZ/RU)
    products.js         — katalog (kategoriyalar, mahsulotlar)
    calc.js             — kalkulyator konstruksiya turlari va formulalar
  lib/order.js          — Telegram buyurtma oqimi
  components/           — ConcretePanel, HeroArt, TickerStrip, CountUp, FloatingButtons
  sections/             — Header, Hero, Stats, Catalog, Calculator, Process, Why,
                          Gallery, Reviews, FAQ, Contact, Footer
```

## Launch oldidan to'ldirish kerak
- `src/config.js` → `CONTACT` — real telefon, manzil, ish vaqti; `TG_USERNAME` tasdiqlang
- `src/data/i18n.js` → `stats` — real raqamlar (yoki `config.js` da `SHOW_STATS=false`)
- `src/config.js` → `GALLERY` — fotolar: `{ src: "/img/zavod.webp", uz: "Zavod", ru: "Завод" }`
- `src/config.js` → `REQUISITES` — MChJ nomi, STIR
- `src/config.js` → `MAP_EMBED` — Google Maps embed havolasi
- Real mijoz sharhlari bo'lsa: `i18n.js` dagi `reviews` ni yangilab, `SHOW_REVIEWS=true`
- Domen ulangach: `index.html` dagi `og:url`/`og:image` qatorlarini yoqing,
  `public/robots.txt` va `public/sitemap.xml` dagi domenni almashtiring

## Buyurtma formasini to'liq avtomat qilish
Hozir forma xabarni tayyorlab Telegram'ga olib o'tadi (foydalanuvchi o'zi yuboradi).
To'liq avtomat — mijoz sahifadan chiqmasdan lead to'g'ridan-to'g'ri menejer
Telegram'iga tushishi uchun: `serverless/telegram-worker.js` faylini oching,
ichidagi 5 qadamlik yo'riqnoma bo'yicha bepul Cloudflare Worker yarating va
URL'ini `src/config.js` dagi `ORDER_ENDPOINT` ga yozing. Endpoint ishlamay
qolsa forma avtomatik eski Telegram oqimiga qaytadi.
