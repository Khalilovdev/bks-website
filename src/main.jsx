import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

/* Production'da BrowserRouter (toza URL). Preview build'da (VITE_PREVIEW=1)
   MemoryRouter — artifact ildiz bo'lmagan yo'lda ochilsa ham Home render bo'ladi. */
const Router = import.meta.env.VITE_PREVIEW ? MemoryRouter : BrowserRouter;

/* Shriftlar — self-host (@fontsource), tashqi so'rovsiz */
import "@fontsource/unbounded/500.css";
import "@fontsource/unbounded/700.css";
import "@fontsource/unbounded/900.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import "@fontsource/jetbrains-mono/600.css";

import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
