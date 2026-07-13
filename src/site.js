import { createContext, useContext } from "react";

/* Sayt bo'ylab umumiy holat: til, rejim, tarjimalar.
   Layout provider bilan beradi, sahifalar useSite() bilan oladi. */
export const SiteContext = createContext(null);
export const useSite = () => useContext(SiteContext);
