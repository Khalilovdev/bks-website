import { useSite } from "../site.js";
import { T } from "../theme.js";
import { Breadcrumb } from "../components/Breadcrumb.jsx";
import { CalculatorSection } from "../sections/Calculator.jsx";

/* ---------- KALKULYATOR SAHIFASI ---------- */
export default function CalculatorPage() {
  const { lang, t } = useSite();
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6" style={{ background: T.ink2 }}>
        <Breadcrumb items={[{ label: t.crumbHome, to: "/" }, { label: t.calcTitle }]} />
      </div>
      <CalculatorSection lang={lang} t={t} />
    </>
  );
}
