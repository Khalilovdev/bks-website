import { T, goldA } from "../theme.js";
import { CONTACT, TG_USERNAME } from "../config.js";
import { CONTACT_ICONS } from "../sections/Contact.jsx";

/* ---------- SUZUVCHI TUGMALAR (qo'ng'iroq + Telegram) ---------- */
export function FloatingButtons({ t }) {
  return (
    <>
      {/* Suzuvchi qo'ng'iroq tugmasi */}
      <a
        href={CONTACT.phoneHref}
        aria-label={t.contactLabels.phone}
        className="fixed right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          bottom: "5.75rem",
          background: T.surface,
          border: `1px solid ${goldA(45)}`,
          boxShadow: "0 8px 22px rgba(0,0,0,.35)",
          color: T.gold,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
          {CONTACT_ICONS.phone}
        </svg>
      </a>

      {/* Suzuvchi Telegram tugmasi */}
      <a
        href={`https://t.me/${TG_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: T.goldGrad, boxShadow: "0 8px 22px rgba(0,0,0,.5)" }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#1a1200">
          <path d="M21.9 4.6c.3-1.2-.9-2.2-2-1.7L2.7 10.1c-1.2.5-1.1 2.2.1 2.6l4.4 1.4 1.7 5.3c.3 1 1.6 1.3 2.3.5l2.4-2.5 4.5 3.3c.9.7 2.2.2 2.4-.9l1.4-15.2zM8.5 13.2l8.7-5.5c.2-.1.4.1.2.3l-7 6.6c-.2.2-.3.4-.4.7l-.4 2.6c0 .3-.5.3-.5 0l-.9-4c-.1-.3 0-.6.3-.7z"/>
        </svg>
      </a>
    </>
  );
}
