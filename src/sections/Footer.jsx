import { T, F } from "../theme.js";
import { REQUISITES } from "../config.js";

/* ---------- FOOTER ---------- */
export function Footer({ t, navItems }) {
  return (
    <footer style={{ background: T.ink2 }}>
      <div
        className="h-1.5"
        style={{
          background: "repeating-linear-gradient(45deg, var(--gold) 0 14px, var(--ink) 14px 28px)",
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
  );
}
