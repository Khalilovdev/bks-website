import { useState } from "react";
import { T, F } from "../theme.js";

/* ---------- NAVBAR (logo, navigatsiya, til, rejim, CTA) ---------- */
export function Header({ lang, setLang, theme, toggleTheme, t, navItems }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: "var(--nav-bg)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.line}` }}
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
                aria-pressed={lang === code}
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

          {/* Tungi/kunduzgi rejim tugmasi */}
          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? (lang === "uz" ? "Kunduzgi rejim" : "Дневной режим")
                : (lang === "uz" ? "Tungi rejim" : "Ночной режим")
            }
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ border: `1px solid ${T.line}`, color: T.muted }}
          >
            {theme === "dark" ? (
              /* quyosh — kunduzgiga o'tish */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3L19 19M19 5l-1.7 1.7M6.7 17.3L5 19" />
              </svg>
            ) : (
              /* oy — tungiga o'tish */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.4 14.2A8.4 8.4 0 019.8 3.6a8.4 8.4 0 1010.6 10.6z" />
              </svg>
            )}
          </button>

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
  );
}
