import { Link } from "react-router-dom";
import { T } from "../theme.js";

/* ---------- BREADCRUMB (yo'l ko'rsatkich) ----------
   items: [{ label, to? }] — oxirgisi joriy sahifa (havolasiz) */
export function Breadcrumb({ items }) {
  return (
    <nav aria-label="breadcrumb" className="text-xs sm:text-sm" style={{ color: T.muted }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i}>
            {it.to && !last ? (
              <Link to={it.to} className="nav-link" style={{ color: T.muted }}>{it.label}</Link>
            ) : (
              <span style={{ color: last ? T.text : T.muted }}>{it.label}</span>
            )}
            {!last && <span className="mx-2" style={{ color: T.gold }}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
