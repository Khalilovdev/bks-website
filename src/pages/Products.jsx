import { useSite } from "../site.js";
import { T } from "../theme.js";
import { Breadcrumb } from "../components/Breadcrumb.jsx";
import { CatalogSection } from "../sections/Catalog.jsx";

/* ---------- MAHSULOTLAR KATALOGI SAHIFASI ---------- */
export default function Products() {
  const { lang, t } = useSite();
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6" style={{ background: T.ink }}>
        <Breadcrumb items={[{ label: t.crumbHome, to: "/" }, { label: t.catalogTitle }]} />
      </div>
      <CatalogSection lang={lang} t={t} />
    </>
  );
}
