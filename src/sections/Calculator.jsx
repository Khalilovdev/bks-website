import { useState } from "react";
import { T, F, goldA } from "../theme.js";
import { CALC_TYPES } from "../data/calc.js";
import { sendOrder } from "../lib/order.js";

/* ---------- KALKULYATOR BO'LIMI (hajm, m³) ---------- */
export function CalculatorSection({ lang, t }) {
  const [typeIdx, setTypeIdx] = useState(0);
  const type = CALC_TYPES[typeIdx];
  const [vals, setVals] = useState(() =>
    Object.fromEntries(type.fields.map((f) => [f.k, ""]))
  );
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState("");

  const pickType = (i) => {
    setTypeIdx(i);
    setVals(Object.fromEntries(CALC_TYPES[i].fields.map((f) => [f.k, ""])));
  };

  /* Kasr sonlar va bo'sh maydonga ruxsat: xom matn saqlanadi,
     hisobda songa aylantiriladi */
  const setVal = (k, v) => setVals((s) => ({ ...s, [k]: v }));
  const num = (k) => Math.max(0, parseFloat(String(vals[k]).replace(",", ".")) || 0);
  const nvals = Object.fromEntries(type.fields.map((f) => [f.k, num(f.k)]));

  const volume = type.calc(nvals);
  const reserve = volume * 1.1;
  const fmt = (n) => (Math.round(n * 100) / 100).toLocaleString("ru-RU");

  const orderMsg = () => {
    const dims = type.fields
      .map((f) => `${f[lang]}: ${nvals[f.k]} ${t.unitNames[f.unit]}`)
      .join(", ");
    return `${t.calcMsgIntro}\n• ${type[lang]}\n• ${dims}\n• ${t.calcMsgVol}: ≈ ${fmt(volume)} m³`;
  };

  const orderViaTg = () => {
    const m = orderMsg();
    setSent(m); // xabar har doim ko'rsatiladi — clipboard ishlamasa ham qo'lda ko'chirish mumkin
    sendOrder(m, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 8000);
    });
  };

  return (
    <section id="calc" style={{ background: T.ink2, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="sec-title font-black mb-3" style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}>
          {t.calcTitle}
        </h2>
        <p className="max-w-xl text-sm sm:text-base mb-10" style={{ color: T.muted }}>{t.calcSub}</p>

        <div data-reveal className="reveal grid lg:grid-cols-5 gap-5">
          {/* Kirish paneli */}
          <div className="lg:col-span-3 rounded-2xl p-5 sm:p-7" style={{ background: T.surface, border: `1px solid ${T.line}` }}>
            <div className="text-xs uppercase mb-3" style={{ color: T.muted, fontFamily: F.mono, letterSpacing: "0.18em" }}>
              {t.calcTypeLabel}
            </div>
            {/* Konstruksiya turi chiplari */}
            <div className="flex flex-wrap gap-2 mb-7">
              {CALC_TYPES.map((c, i) => {
                const on = typeIdx === i;
                return (
                  <button
                    key={c.id}
                    aria-pressed={on}
                    onClick={() => pickType(i)}
                    className="rounded-full px-4 py-2.5 text-sm font-bold transition-all"
                    style={{
                      background: on ? T.goldGrad : "transparent",
                      color: on ? "#1a1200" : T.muted,
                      border: `1px solid ${on ? "transparent" : T.line}`,
                    }}
                  >
                    {c[lang]}
                  </button>
                );
              })}
            </div>

            {/* O'lcham maydonlari — turga qarab dinamik */}
            <div className="grid sm:grid-cols-2 gap-4">
              {type.fields.map((f) => (
                <div key={f.k} className={`ffield ${vals[f.k] !== "" ? "filled" : ""}`}>
                  <input
                    id={`calc-${f.k}`}
                    type="text" inputMode="decimal"
                    value={vals[f.k]}
                    onChange={(e) => setVal(f.k, e.target.value)}
                    className="w-full rounded-xl px-4 text-lg font-semibold"
                    style={{ background: T.ink, color: T.text, border: `1px solid ${T.line}`, fontFamily: F.mono }}
                  />
                  <label htmlFor={`calc-${f.k}`}>
                    {f[lang]} · {t.unitNames[f.unit]}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Natija paneli */}
          <div className="lg:col-span-2 rounded-2xl p-5 sm:p-7 flex flex-col"
            style={{ background: T.surface, border: `1px solid ${goldA(27)}` }}>
            <div className="text-xs uppercase mb-3" style={{ color: T.muted, fontFamily: F.mono, letterSpacing: "0.18em" }}>
              {t.calcResult}
            </div>
            <div className="text-4xl sm:text-5xl font-semibold gold-text" style={{ fontFamily: F.mono }}>
              {fmt(volume)}
            </div>
            <div className="text-sm mt-1 mb-5" style={{ color: T.muted }}>m³</div>

            <div className="text-sm rounded-xl px-4 py-3 mb-6 flex justify-between gap-3" style={{ background: T.ink, color: T.muted }}>
              <span>{t.calcReserve}</span>
              <span style={{ color: T.text, fontFamily: F.mono }}>{fmt(reserve)} m³</span>
            </div>

            <button onClick={orderViaTg}
              disabled={volume <= 0}
              className="btn-gold mt-auto rounded-xl px-6 py-4 font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed">
              {t.calcOrderTg} →
            </button>
            {copied && (
              <div className="mt-3 text-sm text-center font-medium" style={{ color: "var(--success)" }}>
                ✓ {t.calcCopied}
              </div>
            )}
            {sent && (
              <div className="mt-3 text-xs rounded-xl px-4 py-3" style={{ background: T.ink, color: T.muted, whiteSpace: "pre-line" }}>
                {sent}
              </div>
            )}
            <p className="mt-4 text-xs" style={{ color: T.muted }}>{t.calcNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
