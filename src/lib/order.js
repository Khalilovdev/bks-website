import { TG_BOT, TG_USERNAME } from "../config.js";

/* Buyurtmani yuborish: bot bo'lsa botga, bo'lmasa chatga + clipboard */
export function sendOrder(message, onCopied) {
  navigator.clipboard?.writeText(message).then(onCopied).catch(() => {});
  const url = TG_BOT
    ? `https://t.me/${TG_BOT}?start=web`
    : `https://t.me/${TG_USERNAME}`;
  window.open(url, "_blank", "noopener");
}
