import { T, F } from "../theme.js";
import { GALLERY } from "../config.js";

/* ---------- GALEREYA (GALLERY to'ldirilganda ko'rinadi) ---------- */
export function GallerySection({ lang, t }) {
  if (!GALLERY.length) return null;
  return (
    <section style={{ background: T.ink2, borderTop: `1px solid ${T.line}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="sec-title font-black mb-10" style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}>
          {t.galleryTitle}
        </h2>
        <div data-reveal className="reveal grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {GALLERY.map((g, i) => (
            <figure key={i} className="card-lift rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.line}`, background: T.surface }}>
              <img
                src={g.src}
                alt={lang === "uz" ? g.uz : g.ru}
                loading="lazy"
                className="w-full h-40 sm:h-52 object-cover"
              />
              <figcaption className="px-4 py-3 text-xs" style={{ color: T.muted }}>
                {lang === "uz" ? g.uz : g.ru}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
