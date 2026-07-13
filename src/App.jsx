import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CalculatorPage from "./pages/CalculatorPage.jsx";
import NotFound from "./pages/NotFound.jsx";

/* ============================================================
   BKS — BETON KLASS SAVDO · marshrutlar
   Barcha sahifalar Layout (Header/Footer/rejim) ichida.
   Sahifalar: pages/ · Bo'limlar: sections/ · Matnlar: data/i18n.js
   ============================================================ */

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:slug" element={<ProductDetail />} />
        <Route path="calculator" element={<CalculatorPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
