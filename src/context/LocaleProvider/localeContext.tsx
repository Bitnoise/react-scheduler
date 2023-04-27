import { createContext } from "react";
import { locales } from "./locales";
import { LocaleContextType } from "./types";

export const localeContext = createContext<LocaleContextType>({
  locales: locales,
  currentLocale: locales[0],
  setCurrentLocale: () => {}
});
