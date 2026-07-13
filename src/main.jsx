import React from "react";
import ReactDOM from "react-dom/client";

/* Shriftlar — self-host (@fontsource), tashqi so'rovsiz */
import "@fontsource/unbounded/500.css";
import "@fontsource/unbounded/700.css";
import "@fontsource/unbounded/900.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import "@fontsource/jetbrains-mono/600.css";

import "./index.css";
import BKSSite from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BKSSite />
  </React.StrictMode>
);
