import { useState, useEffect } from "react";
import { T, F } from "../theme.js";
import { ConcretePanel } from "../components/ConcretePanel.jsx";
import { HeroArt } from "../components/HeroArt.jsx";

/* Uchinchi qatorda so'zlar navbatma-navbat aylanib turadi
   (o'z vaqtida → yetkazamiz → ishonchli). Reduced-motion'da birinchisi qoladi. */
function HeroRotate({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words]);
  return (
    <span className="hero-rotate block">
      {/* gold-text ichki so'zda bo'lishi shart — aks holda matn shaffof qoladi */}
      <span key={i} className="hero-rotate-word gold-text">{words[i]}</span>
    </span>
  );
}

/* ---------- HERO (bosh sarlavha, CTA, illyustratsiya) ---------- */
export function Hero({ t }) {
  return (
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
            className="hero-h1 fade-up fu-2 font-black select-none"
            style={{ fontFamily: F.display, lineHeight: 0.95 }}
          >
            <span className="block" style={{ color: T.text }}>
              {t.heroLine1.replace(/\.$/, "")}<span className="gold-text">.</span>
            </span>
            <span className="block" style={{ color: T.text }}>
              {t.heroLine2.replace(/\.$/, "")}<span className="gold-text">.</span>
            </span>
            <HeroRotate words={t.heroRotate} />
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
            "repeating-linear-gradient(45deg, var(--gold) 0 14px, var(--ink) 14px 28px)",
          opacity: 0.85,
        }}
      />
    </section>
  );
}
