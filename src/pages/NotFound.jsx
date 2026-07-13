import { Link } from "react-router-dom";
import { useSite } from "../site.js";
import { T, F } from "../theme.js";

/* ---------- 404 ---------- */
export default function NotFound() {
  const { t } = useSite();
  return (
    <section style={{ background: T.ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-28 sm:py-36 text-center">
        <div className="gold-text font-black mb-4" style={{ fontFamily: F.display, fontSize: "clamp(3rem, 12vw, 7rem)" }}>404</div>
        <h1 className="font-bold text-xl mb-8" style={{ color: T.text }}>{t.notFoundTitle}</h1>
        <Link to="/" className="btn-gold inline-block rounded-xl px-7 py-3.5 font-bold" style={{ textDecoration: "none" }}>
          {t.notFoundBack} →
        </Link>
      </div>
    </section>
  );
}
