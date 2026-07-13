import { useState } from "react";
import { T, F, goldA } from "../theme.js";

/* ---------- FAQ (akkordeon) ---------- */
export function FAQSection({ t }) {
  const [open, setOpen] = useState(0);

  return (
    <section style={{ background: T.ink, borderTop: `1px solid ${T.line}` }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="sec-title font-black mb-10" style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}>
          {t.faqTitle}
        </h2>
        <div data-reveal className="reveal flex flex-col gap-3">
          {t.faqs.map((f, i) => {
            const on = open === i;
            return (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: T.surface, border: `1px solid ${on ? goldA(33) : T.line}` }}>
                <button
                  onClick={() => setOpen(on ? -1 : i)}
                  aria-expanded={on}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                  style={{ color: T.text }}
                >
                  <span className="font-bold text-sm sm:text-base">{f.q}</span>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-transform"
                    style={{
                      background: on ? T.goldGrad : "transparent",
                      color: on ? "#1a1200" : T.gold,
                      border: `1px solid ${on ? "transparent" : T.line}`,
                      transform: on ? "rotate(45deg)" : "none",
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {on && (
                  <div className="faq-open px-5 sm:px-6 pb-5 text-sm sm:text-base" style={{ color: T.muted }}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
