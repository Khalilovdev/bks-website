import { useSite } from "../site.js";
import { SHOW_STATS, SHOW_REVIEWS } from "../config.js";
import { Hero } from "../sections/Hero.jsx";
import { StatsSection } from "../sections/Stats.jsx";
import { TickerStrip } from "../components/TickerStrip.jsx";
import { CatalogSection } from "../sections/Catalog.jsx";
import { CalculatorSection } from "../sections/Calculator.jsx";
import { ProcessSection } from "../sections/Process.jsx";
import { WhySection } from "../sections/Why.jsx";
import { GallerySection } from "../sections/Gallery.jsx";
import { ReviewsSection } from "../sections/Reviews.jsx";
import { FAQSection } from "../sections/FAQ.jsx";
import { ContactSection } from "../sections/Contact.jsx";

/* ---------- BOSH SAHIFA ---------- */
export default function Home() {
  const { lang, t } = useSite();
  return (
    <>
      <Hero t={t} />
      {SHOW_STATS && <StatsSection t={t} />}
      <TickerStrip t={t} />
      <CatalogSection lang={lang} t={t} />
      <CalculatorSection lang={lang} t={t} />
      <ProcessSection t={t} />
      <WhySection t={t} />
      <GallerySection lang={lang} t={t} />
      {SHOW_REVIEWS && <ReviewsSection t={t} />}
      <FAQSection t={t} />
      <ContactSection lang={lang} t={t} />
    </>
  );
}
