import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { T, F } from "./theme.js";
import { L } from "./data/i18n.js";
import { NAV_LINKS, SHOW_REVIEWS } from "./config.js";
import { SiteContext } from "./site.js";
import { Header } from "./sections/Header.jsx";
import { Footer } from "./sections/Footer.jsx";
import { FloatingButtons } from "./components/FloatingButtons.jsx";

/* ---------- LAYOUT: umumiy karkas + til/rejim holati ---------- */
export default function Layout() {
  const [lang, setLang] = useState("uz");
  const t = L[lang];
  const location = useLocation();

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

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("bks-theme", next); } catch { /* e'tiborsiz */ }
  };

  /* Navigatsiya: sahifa yo'llari (Bosh sahifa · Mahsulotlar · Kalkulyator · Aloqa) */
  const navItems = [
    { label: t.nav[0], to: "/" },
    { label: t.nav[1], to: "/products" },
    { label: t.nav[2], to: "/calculator" },
    ...(SHOW_REVIEWS ? [{ label: t.nav[3], to: "/#reviews" }] : []),
    { label: t.nav[4], to: "/#contact" },
  ];

  /* Sahifa <html lang> va sarlavha */
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "uz"
        ? "Beton Klass Savdo — Sement va beton mahsulotlari | Samarqand"
        : "Beton Klass Savdo — Цемент и бетонные изделия | Самарканд";
  }, [lang]);

  /* Marshrut o'zgarganda: hash bo'lsa o'sha bo'limga, bo'lmasa tepaga */
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  /* Scroll'da paydo bo'lish — har marshrutda qayta bog'lanadi */
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
  }, [location.pathname]);

  return (
    <SiteContext.Provider value={{ lang, setLang, t, theme, toggleTheme }}>
      <div style={{ background: T.ink, color: T.text, fontFamily: F.body, minHeight: "100vh" }}>
        <Header lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} t={t} navItems={navItems} />
        <Outlet />
        <Footer t={t} navItems={navItems} />
        <FloatingButtons t={t} />
      </div>
    </SiteContext.Provider>
  );
}
