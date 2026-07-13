import { T } from "../theme.js";

/* ---------- HERO ILLYUSTRATSIYASI ----------
   Izometrik beton bloklar + armatura — chiziqli, oltin urg'ular bilan */
export function HeroArt() {
  const g = "var(--art-stroke)";
  return (
    <div className="hidden lg:flex items-center justify-center float-slow" aria-hidden="true">
      <svg width="380" height="400" viewBox="0 0 400 420" fill="none">
        {/* armatura (orqa) */}
        {[150, 180, 210, 240].map((x) => (
          <g key={x} stroke={T.gold} strokeWidth="2" opacity="0.7">
            <line x1={x} y1="30" x2={x} y2="150" />
            <path d={`M${x} 30 q 8 -10 16 -2`} />
          </g>
        ))}
        {/* yuqori blok */}
        <g stroke={g} strokeWidth="1.5">
          <polygon points="110,170 200,140 290,170 200,200" fill="var(--art-top)" />
          <polygon points="110,170 200,200 200,250 110,220" fill="var(--art-left)" />
          <polygon points="290,170 200,200 200,250 290,220" fill="var(--art-right)" />
        </g>
        <polyline points="110,170 200,200 290,170" stroke={T.gold} strokeWidth="2" fill="none" />
        {/* o'rta blok */}
        <g stroke={g} strokeWidth="1.5">
          <polygon points="70,260 200,215 330,260 200,305" fill="var(--art-top2)" />
          <polygon points="70,260 200,305 200,365 70,320" fill="var(--art-left2)" />
          <polygon points="330,260 200,305 200,365 330,320" fill="var(--art-right2)" />
        </g>
        <polyline points="70,260 200,305 330,260" stroke={T.gold} strokeWidth="2" fill="none" />
        {/* forma-bog'lagich doiralari */}
        {[[110, 300], [160, 322], [240, 322], [290, 300]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" stroke={g} strokeWidth="1.5" fill="var(--ink)" />
        ))}
        {/* pastki soya chizig'i */}
        <line x1="55" y1="392" x2="345" y2="392" stroke={g} strokeWidth="1" opacity="0.6" />
        <line x1="90" y1="402" x2="310" y2="402" stroke={g} strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
  );
}
