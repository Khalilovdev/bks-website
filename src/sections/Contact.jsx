import { useState } from "react";
import { T, F, goldA } from "../theme.js";
import { CONTACT, TG_USERNAME, MAP_EMBED, ORDER_ENDPOINT } from "../config.js";
import { sendOrder } from "../lib/order.js";

/* ---------- ALOQA ---------- */
export const CONTACT_ICONS = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a12 12 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />,
  tg: <path d="M21 4L3 11l5.5 2L10 19l3-3 4.5 3L21 4z" strokeLinecap="round" strokeLinejoin="round" />,
  address: <path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round" strokeLinejoin="round" />,
  hours: <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />,
};

export function ContactSection({ lang, t }) {
  /* Qayta aloqa formasi:
     ORDER_ENDPOINT sozlangan bo'lsa — to'liq avtomat (serverless orqali
     to'g'ridan-to'g'ri menejerga boradi), aks holda Telegram chat oqimi. */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState("");
  const [sending, setSending] = useState(false);
  const [autoOk, setAutoOk] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    const m = `${t.formMsgIntro}\n• ${t.formNameLabel}: ${name.trim()}\n• ${t.formPhoneLabel}: ${phone.trim()}`;

    if (ORDER_ENDPOINT) {
      setSending(true);
      try {
        const r = await fetch(ORDER_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), phone: phone.trim(), lang }),
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        setAutoOk(true);
        setName(""); setPhone("");
        setTimeout(() => setAutoOk(false), 8000);
        return;
      } catch { /* endpoint ishlamasa — pastdagi Telegram oqimiga tushamiz */ }
      finally { setSending(false); }
    }

    setSent(m);
    sendOrder(m, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 8000);
    });
  };

  const items = [
    { key: "phone", value: CONTACT.phone, href: CONTACT.phoneHref },
    { key: "tg", value: `@${TG_USERNAME}`, href: `https://t.me/${TG_USERNAME}` },
    { key: "address", value: lang === "uz" ? CONTACT.addressUz : CONTACT.addressRu },
    { key: "hours", value: lang === "uz" ? CONTACT.hoursUz : CONTACT.hoursRu },
  ];

  return (
    <section id="contact" style={{ background: T.ink2, borderTop: `1px solid ${T.line}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="sec-title font-black mb-3" style={{ fontFamily: F.display, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: T.text }}>
          {t.contactTitle}
        </h2>
        <p className="max-w-xl text-sm sm:text-base mb-10" style={{ color: T.muted }}>{t.contactSub}</p>

        <div data-reveal className="reveal grid lg:grid-cols-2 gap-5">
          {/* Aloqa ma'lumotlari */}
          <div className="grid sm:grid-cols-2 gap-4">
            {items.map((it) => {
              const inner = (
                <>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: goldA(9), border: `1px solid ${goldA(20)}` }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.8">
                      {CONTACT_ICONS[it.key]}
                    </svg>
                  </div>
                  <div className="text-xs uppercase mb-1" style={{ color: T.muted, fontFamily: F.mono, letterSpacing: "0.14em" }}>
                    {t.contactLabels[it.key]}
                  </div>
                  <div className="font-bold text-sm sm:text-base" style={{ color: T.text }}>{it.value}</div>
                </>
              );
              const st = { background: T.surface, border: `1px solid ${T.line}`, textDecoration: "none", display: "block" };
              return it.href ? (
                <a
                  key={it.key}
                  href={it.href}
                  target={it.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="card-lift relative rounded-2xl p-5"
                  style={st}
                >
                  {/* bosiladigan kartochka belgisi */}
                  <span className="absolute top-4 right-4" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="2">
                      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {inner}
                </a>
              ) : (
                <div key={it.key} className="rounded-2xl p-5" style={st}>{inner}</div>
              );
            })}
          </div>

          {/* CTA kartochka */}
          <div
            className="relative rounded-2xl p-7 sm:p-10 flex flex-col justify-center overflow-hidden"
            style={{ background: T.surface, border: `1px solid ${goldA(27)}` }}
          >
            <div
              className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              style={{ background: `radial-gradient(circle at top right, ${goldA(13)}, transparent 70%)` }}
              aria-hidden="true"
            />
            <h3 className="font-black text-xl sm:text-2xl mb-3" style={{ fontFamily: F.display, color: T.text }}>
              {t.contactCtaTitle}
            </h3>
            <p className="text-sm sm:text-base mb-6" style={{ color: T.muted }}>{t.contactCtaSub}</p>

            {/* Qayta aloqa formasi */}
            <form onSubmit={submitForm} className="flex flex-col gap-4">
              <div className={`ffield ${name !== "" ? "filled" : ""}`}>
                <input
                  id="cta-name"
                  type="text" autoComplete="name" required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl px-4 text-base font-semibold"
                  style={{ background: T.ink, color: T.text, border: `1px solid ${T.line}` }}
                />
                <label htmlFor="cta-name">{t.formName}</label>
              </div>
              <div className={`ffield ${phone !== "" ? "filled" : ""}`}>
                <input
                  id="cta-phone"
                  type="tel" inputMode="tel" autoComplete="tel" required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl px-4 text-base font-semibold"
                  style={{ background: T.ink, color: T.text, border: `1px solid ${T.line}`, fontFamily: F.mono }}
                />
                <label htmlFor="cta-phone">{t.formPhone}</label>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button type="submit" disabled={sending}
                  className="btn-gold flex-1 rounded-xl px-6 py-3.5 font-bold disabled:opacity-40 disabled:cursor-not-allowed">
                  {sending ? "…" : `${t.formSend} →`}
                </button>
                <a
                  href={CONTACT.phoneHref}
                  className="btn-ghost flex-1 rounded-xl px-6 py-3.5 text-center font-bold"
                  style={{ textDecoration: "none" }}
                >
                  {t.formCall}
                </a>
              </div>
            </form>
            {autoOk && (
              <div className="mt-3 text-sm text-center font-medium" style={{ color: "var(--success)" }}>
                ✓ {t.formSentOk}
              </div>
            )}
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
          </div>
        </div>

        {MAP_EMBED && (
          <div data-reveal className="reveal mt-5 rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.line}` }}>
            <iframe
              src={MAP_EMBED}
              title="Xarita"
              width="100%"
              height="320"
              className="map-frame"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}
