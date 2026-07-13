import { T, F } from "../theme.js";

/* ---------- QANDAY ISHLAYMIZ (jarayon qadamlari) ---------- */
export function ProcessSection({ t }) {
  return (
    <section style={{ background: T.ink, borderTop: `1px solid ${T.line}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="sec-title font-black mb-3" style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}>
          {t.processTitle}
        </h2>
        <p className="max-w-xl text-sm sm:text-base mb-10" style={{ color: T.muted }}>{t.processSub}</p>
        <div data-reveal className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {t.process.map((p, i) => (
            <div
              key={i}
              className="card-lift relative rounded-2xl p-5 sm:p-6 overflow-hidden"
              style={{ background: T.surface, border: `1px solid ${T.line}` }}
            >
              {/* qadam raqami */}
              <div className="gold-text text-4xl font-black mb-4 select-none" style={{ fontFamily: F.mono }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              {/* keyingi qadamga strelka (oxirgisidan tashqari) */}
              {i < t.process.length - 1 && (
                <span className="absolute top-6 right-5 hidden lg:block" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="2" opacity="0.55">
                    <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
              <h3 className="font-bold mb-1.5" style={{ color: T.text }}>{p.title}</h3>
              <p className="text-sm" style={{ color: T.muted }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
