import { useState, useEffect, useRef } from "react";
import { T, F } from "../theme.js";

/* ---------- RAQAM SANASH ANIMATSIYASI ---------- */
export function CountUp({ value, suffix }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(value); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const t0 = performance.now();
          const dur = 2200; // sekinroq — sanash ko'zga tashlanadi
          const tick = (t) => {
            const p = Math.min((t - t0) / dur, 1);
            // yumshoq ease-out (kvadrat) — boshidan oxirigacha bir tekis o'sadi
            setN(Math.round(value * (1 - Math.pow(1 - p, 2))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} style={{ fontFamily: F.mono }}>
      {n.toLocaleString("ru-RU")}
      <span style={{ color: T.gold }}>{suffix}</span>
    </span>
  );
}
