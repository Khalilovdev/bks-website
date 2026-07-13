import { useState } from "react";
import { Link } from "react-router-dom";
import { T, F, goldA } from "../theme.js";
import { CATS, PRODUCTS } from "../data/products.js";
import { sendOrder } from "../lib/order.js";

/* ---------- KATALOG BO'LIMI ---------- */
export function CatalogSection({ lang, t }) {
  const [active, setActive] = useState("all");
  const [copiedId, setCopiedId] = useState("");
  const list = active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active);

  const orderProduct = (p) => {
    const name = lang === "uz" ? p.uz : p.ru;
    sendOrder(`${t.orderMsgIntro}\n• ${name}`, () => {
      setCopiedId(p.uz); // indeks emas, mahsulotning o'zi — tab almashsa ham adashmaydi
      setTimeout(() => setCopiedId(""), 8000);
    });
  };

  return (
    <section id="catalog" style={{ background: T.ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2
          className="sec-title font-black mb-3"
          style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}
        >
          {t.catalogTitle}
        </h2>
        <p className="max-w-xl text-sm sm:text-base mb-10" style={{ color: T.muted }}>
          {t.catalogSub}
        </p>

        {/* Kategoriya tab'lari */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[{ id: "all", uz: t.catAll, ru: t.catAll }, ...CATS].map((c) => {
            const on = active === c.id;
            return (
              <button
                key={c.id}
                aria-pressed={on}
                onClick={() => setActive(c.id)}
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

        {/* Mahsulot kartochkalari */}
        <div data-reveal className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {list.map((p, i) => (
            <article
              key={i}
              className="card-lift group relative rounded-2xl p-5 sm:p-6 flex flex-col overflow-hidden"
              style={{ background: T.surface, border: `1px solid ${T.line}` }}
            >
              {/* suv belgisi — mahsulot bosh harfi */}
              {(() => {
                const n = lang === "uz" ? p.uz : p.ru;
                const tkn = (n.match(/[MМ]\d+|[KК][SС]-\d+/) || [n.charAt(0)])[0];
                return (
                  <span
                    className="watermark"
                    style={{ fontFamily: F.display, color: T.text, fontSize: tkn.length > 1 ? 40 : 78, top: tkn.length > 1 ? 10 : -8 }}
                    aria-hidden="true"
                  >
                    {tkn}
                  </span>
                );
              })()}
              {/* burchak urg'usi */}
              <div
                className="absolute top-0 right-0 w-10 h-10 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(225deg, ${goldA(20)} 0%, transparent 55%)`,
                }}
                aria-hidden="true"
              />
              <div
                className="uppercase mb-3"
                style={{ color: T.gold, fontFamily: F.mono, fontSize: 10, letterSpacing: "0.2em" }}
              >
                {CATS.find((c) => c.id === p.cat)[lang]}
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: T.text, fontFamily: F.body }}>
                {lang === "uz" ? p.uz : p.ru}
              </h3>
              <p className="text-sm flex-1 mb-5" style={{ color: T.muted }}>
                {lang === "uz" ? p.duz : p.dru}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => orderProduct(p)}
                  className="btn-ghost flex-1 rounded-lg px-4 py-2.5 text-sm font-bold"
                >
                  {copiedId === p.uz ? "✓" : t.orderBtn}
                </button>
                <Link
                  to={`/product/${p.slug}`}
                  className="btn-ghost rounded-lg px-4 py-2.5 text-sm font-bold flex items-center"
                  style={{ textDecoration: "none" }}
                >
                  {t.detailMore} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
