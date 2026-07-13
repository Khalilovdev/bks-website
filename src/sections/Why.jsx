import { T, F, goldA } from "../theme.js";

/* ---------- NEGA BIZ ---------- */
const WHY_ICONS = [
  // qalqon (sifat)
  <path key="0" d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5C8 19.2 5 15.5 5 11V6l7-3zM9.5 11.5l2 2 3.5-4" strokeLinecap="round" strokeLinejoin="round" />,
  // yorliq (narx)
  <path key="1" d="M4 4h7l9 9-7 7-9-9V4zM8.5 8.5h.01" strokeLinecap="round" strokeLinejoin="round" />,
  // yuk mashina (yetkazish)
  <path key="2" d="M2 7h11v9H2zM13 10h4l3 3v3h-7M6 19a1.6 1.6 0 100-3.2A1.6 1.6 0 006 19zM17 19a1.6 1.6 0 100-3.2A1.6 1.6 0 0017 19z" strokeLinecap="round" strokeLinejoin="round" />,
  // qo'l berish (tajriba/ishonch)
  <g key="3"><circle cx="12" cy="9" r="5" /><path d="M8.6 13.2L7 21l5-2.8L17 21l-1.6-7.8" strokeLinecap="round" strokeLinejoin="round" /></g>,
];

export function WhySection({ t }) {
  return (
    <section style={{ background: T.ink2, borderTop: `1px solid ${T.line}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="sec-title font-black mb-10" style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}>
          {t.whyTitle}
        </h2>
        <div data-reveal className="reveal grid lg:grid-cols-2 gap-x-14" style={{ borderTop: `1px solid ${T.line}` }}>
          {t.whys.map((w, i) => (
            <div key={i} className="flex gap-5 py-7" style={{ borderBottom: `1px solid ${T.line}` }}>
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: goldA(9), border: `1px solid ${goldA(20)}` }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.8">
                  {WHY_ICONS[i]}
                </svg>
              </div>
              <div>
                <h3 className="font-bold mb-1.5" style={{ color: T.text }}>{w.title}</h3>
                <p className="text-sm" style={{ color: T.muted }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
