/* ---------- DIZAYN TOKENLARI ----------
   Qiymatlar CSS o'zgaruvchilarda (quyidagi <style> blokida) —
   tungi/kunduzgi rejim shu tokenlar orqali almashadi. */
export const T = {
  ink: "var(--ink)",          // asosiy fon
  ink2: "var(--ink2)",        // ikkinchi qatlam
  surface: "var(--surface)",  // kartochkalar
  line: "var(--line)",        // chegaralar
  gold: "var(--gold)",        // asosiy urg'u (logo rangi)
  text: "var(--text)",
  muted: "var(--muted)",
  goldGrad: "var(--gold-grad)",
};

/* Oltinning shaffof tuslari — ikkala rejimda ham tokenga ergashadi */
export const goldA = (pct) => `color-mix(in srgb, var(--gold) ${pct}%, transparent)`;

export const F = {
  display: "'Unbounded', sans-serif",
  body: "'Manrope', sans-serif",
  mono: "'JetBrains Mono', monospace",
};
