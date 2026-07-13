import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSite } from "../site.js";
import { T, F, goldA } from "../theme.js";
import { CATS, productBySlug } from "../data/products.js";
import { sendOrder } from "../lib/order.js";
import { Breadcrumb } from "../components/Breadcrumb.jsx";

/* ---------- MAHSULOT DETAL SAHIFASI (TZ 4.3) ---------- */
export default function ProductDetail() {
  const { slug } = useParams();
  const { lang, t } = useSite();
  const [copied, setCopied] = useState(false);
  const p = productBySlug(slug);

  if (!p) {
    return (
      <section style={{ background: T.ink }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="font-black text-2xl mb-4" style={{ fontFamily: F.display, color: T.text }}>{t.notFoundTitle}</h1>
          <Link to="/products" className="btn-gold inline-block rounded-xl px-6 py-3 font-bold" style={{ textDecoration: "none" }}>
            {t.catalogTitle} →
          </Link>
        </div>
      </section>
    );
  }

  const name = lang === "uz" ? p.uz : p.ru;
  const desc = lang === "uz" ? p.duz : p.dru;
  const cat = CATS.find((c) => c.id === p.cat);
  const tags = desc.split(/,\s*/); // qo'llanish sohalari
  const tkn = (name.match(/[MМ]\d+|[KК][SС]-\d+/) || [name.charAt(0)])[0];

  const order = () => {
    sendOrder(`${t.orderMsgIntro}\n• ${name}`, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 8000);
    });
  };

  const recipeRows = p.recipe && [
    { label: `${t.recipeCement} (${p.recipe.cem})`, val: `${p.recipe.cemKg} kg` },
    { label: t.recipeSand, val: `${p.recipe.sandKg} kg` },
    { label: t.recipeGravel, val: `${p.recipe.gravelKg} kg` },
    { label: t.recipeWater, val: `${p.recipe.waterL} l` },
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6" style={{ background: T.ink }}>
        <Breadcrumb items={[{ label: t.crumbHome, to: "/" }, { label: t.catalogTitle, to: "/products" }, { label: name }]} />
      </div>

      <section style={{ background: T.ink }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Rasm o'rni — marka suv belgili karta (real foto qo'shilishi mumkin) */}
          <div
            className="relative rounded-3xl overflow-hidden flex items-center justify-center"
            style={{ background: T.surface, border: `1px solid ${T.line}`, minHeight: 280, aspectRatio: "4 / 3" }}
          >
            <span className="font-black select-none" aria-hidden="true"
              style={{ fontFamily: F.display, fontSize: "clamp(3rem, 12vw, 7rem)", color: T.text, opacity: 0.12 }}>
              {tkn}
            </span>
            <span className="absolute bottom-4 left-5 uppercase" style={{ color: T.gold, fontFamily: F.mono, fontSize: 11, letterSpacing: "0.2em" }}>
              {cat[lang]}
            </span>
          </div>

          {/* Ma'lumot */}
          <div>
            <h1 className="font-black mb-5" style={{ fontFamily: F.display, fontSize: "clamp(1.8rem, 5vw, 3rem)", color: T.text, lineHeight: 1.05 }}>
              {name}
            </h1>
            <div className="text-xs uppercase mb-3" style={{ color: T.muted, fontFamily: F.mono, letterSpacing: "0.18em" }}>
              {t.detailApply}
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag, i) => (
                <span key={i} className="rounded-full px-3.5 py-1.5 text-sm font-medium"
                  style={{ background: goldA(9), color: T.text, border: `1px solid ${goldA(20)}` }}>
                  {tag}
                </span>
              ))}
            </div>
            <button onClick={order} className="btn-gold rounded-xl px-7 py-4 font-bold text-base w-full sm:w-auto">
              {copied ? `✓ ${t.calcCopied}` : `${t.detailBuy} →`}
            </button>
          </div>
        </div>

        {/* Beton tarkibi (retsept) — faqat beton markalarida */}
        {recipeRows && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
            <div className="rounded-2xl overflow-hidden" style={{ background: T.ink2, border: `1px solid ${T.line}` }}>
              <div className="px-5 sm:px-7 py-5" style={{ borderBottom: `1px solid ${T.line}` }}>
                <h2 className="font-black" style={{ fontFamily: F.display, fontSize: "clamp(1.2rem, 3vw, 1.7rem)", color: T.text }}>
                  {t.recipeTitle}
                </h2>
              </div>
              <table className="w-full text-sm sm:text-base">
                <tbody>
                  {recipeRows.map((r, i) => (
                    <tr key={i} style={{ borderBottom: i < recipeRows.length - 1 ? `1px solid ${T.line}` : "none" }}>
                      <td className="px-5 sm:px-7 py-4" style={{ color: T.muted }}>{r.label}</td>
                      <td className="px-5 sm:px-7 py-4 text-right font-bold" style={{ color: T.text, fontFamily: F.mono }}>{r.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-4" style={{ color: T.muted }}>{t.recipeNote}</p>
          </div>
        )}
      </section>
    </>
  );
}
