import { T, F } from "../theme.js";

/* ---------- YUGURUVCHI LENTA ---------- */
export function TickerStrip({ t }) {
  const items = [...t.ticker, ...t.ticker, ...t.ticker, ...t.ticker]; // 4x — keng ekranlarda ham bo'shliqsiz
  return (
    <div
      className="overflow-hidden py-4 select-none"
      style={{ background: T.ink, borderBottom: `1px solid ${T.line}` }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 pr-6 whitespace-nowrap text-sm font-bold uppercase"
            style={{ color: T.muted, fontFamily: F.display, letterSpacing: "0.18em" }}
          >
            {item}
            <span style={{ color: T.gold }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
