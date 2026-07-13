/* ---------- BETON PANEL TEKSTURASI (imzo element) ----------
   Vertikal chok chiziqlari + forma-bog'lagich doiralari —
   haqiqiy ochiq beton panellarning detali. */
export function ConcretePanel() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* nozik donador tekstura */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.05 }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      {/* panel choklari */}
      {[22, 47, 72].map((x) => (
        <div
          key={x}
          className="absolute top-0 bottom-0 w-px"
          style={{ left: `${x}%`, background: "var(--panel-line)" }}
        />
      ))}
      {/* forma-bog'lagich doiralari */}
      {[
        [22, 18], [22, 78], [47, 18], [47, 78], [72, 18], [72, 78],
      ].map(([x, y], i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full border"
          style={{
            left: `calc(${x}% - 6px)`,
            top: `${y}%`,
            borderColor: "var(--panel-dot)",
            background: "var(--panel-dot-bg)",
          }}
        />
      ))}
    </div>
  );
}
