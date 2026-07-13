import { T, F } from "../theme.js";

/* ---------- SHARHLAR ---------- */
export function ReviewsSection({ t }) {
  return (
    <section id="reviews" style={{ background: T.ink2, borderTop: `1px solid ${T.line}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="sec-title font-black mb-3" style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}>
          {t.reviewsTitle}
        </h2>
        <p className="max-w-xl text-sm sm:text-base mb-10" style={{ color: T.muted }}>{t.reviewsSub}</p>
        <div data-reveal className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {t.reviews.map((r, i) => (
            <figure
              key={i}
              className={`card-lift rounded-2xl p-6 sm:p-7 ${i === 0 || i === 3 ? "lg:col-span-2" : ""}`}
              style={{ background: T.surface, border: `1px solid ${T.line}` }}
            >
              <div className="gold-text text-4xl leading-none mb-4 select-none" style={{ fontFamily: F.display }} aria-hidden="true">
                “
              </div>
              <blockquote className="text-sm sm:text-base mb-5" style={{ color: T.text }}>
                {r.text}
              </blockquote>
              <figcaption>
                <div className="font-bold text-sm" style={{ color: T.text }}>{r.name}</div>
                <div className="text-xs mt-0.5" style={{ color: T.muted }}>{r.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
