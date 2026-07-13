import { useState, useEffect } from "react";
import { T, F } from "./theme.js";
import { L } from "./data/i18n.js";
import { NAV_LINKS, SHOW_STATS, SHOW_REVIEWS } from "./config.js";

import { Header } from "./sections/Header.jsx";
import { Hero } from "./sections/Hero.jsx";
import { StatsSection } from "./sections/Stats.jsx";
import { TickerStrip } from "./components/TickerStrip.jsx";
import { CatalogSection } from "./sections/Catalog.jsx";
import { CalculatorSection } from "./sections/Calculator.jsx";
import { ProcessSection } from "./sections/Process.jsx";
import { WhySection } from "./sections/Why.jsx";
import { GallerySection } from "./sections/Gallery.jsx";
import { ReviewsSection } from "./sections/Reviews.jsx";
import { FAQSection } from "./sections/FAQ.jsx";
import { ContactSection } from "./sections/Contact.jsx";
import { Footer } from "./sections/Footer.jsx";
import { FloatingButtons } from "./components/FloatingButtons.jsx";

/* ============================================================
   BKS — BETON KLASS SAVDO
   Sahifa yig'uvchisi: holat (til, rejim) + bo'limlar tartibi.
   Matnlar: src/data/i18n.js · Sozlamalar: src/config.js
   Uslublar: src/index.css · Tokenlar: src/theme.js
   ============================================================ */

export default function BKSSite() {
  const [lang, setLang] = useState("uz");
  const t = L[lang];

  /* Tungi/kunduzgi rejim: saqlangan tanlov → bo'lmasa qurilma sozlamasi */
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("bks-theme");
      if (saved === "dark" || saved === "light") return saved;
    } catch { /* localStorage yopiq bo'lishi mumkin */ }
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  /* Tanlov faqat foydalanuvchi tugmani bosganda saqlanadi —
     aks holda har tashrifda qurilma sozlamasiga ergashaveradi */
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("bks-theme", next); } catch { /* e'tiborsiz */ }
  };

  const navItems = t.nav
    .map((label, i) => ({ label, href: NAV_LINKS[i] }))
    .filter((it) => SHOW_REVIEWS || it.href !== "#reviews");

  /* Sahifa sarlavhasi va tavsifi (SEO — til almashganda yangilanadi) */
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
      <Header lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} t={t} navItems={navItems} />
      <Hero t={t} />
      {SHOW_STATS && <StatsSection t={t} />}
      <TickerStrip t={t} />
      <CatalogSection lang={lang} t={t} />
      <CalculatorSection lang={lang} t={t} />
      <ProcessSection t={t} />
      <WhySection t={t} />
      <GallerySection lang={lang} t={t} />
      {SHOW_REVIEWS && <ReviewsSection t={t} />}
      <FAQSection t={t} />
      <ContactSection lang={lang} t={t} />
      <Footer t={t} navItems={navItems} />
      <FloatingButtons t={t} />
    </div>
  );
}
