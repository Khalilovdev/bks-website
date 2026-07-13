import { T, F } from "../theme.js";
import { CountUp } from "../components/CountUp.jsx";

/* ---------- STATISTIKA (raqamlarda biz) ---------- */
export function StatsSection({ t }) {
  return (
    <section style={{ background: T.ink2, borderBottom: `1px solid ${T.line}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <p className="text-xs uppercase mb-8" style={{ color: T.muted, fontFamily: F.mono, letterSpacing: "0.22em" }}>
          {t.statsTitle}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {t.stats.map((s, i) => (
            <div key={i}>
              <div className="text-3xl sm:text-4xl font-semibold" style={{ color: T.text }}>
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm" style={{ color: T.muted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
