import { createContext } from "react";
import { locales } from "./locales";
import { LocaleContextType } from "./types";

export const localeContext = createContext<LocaleContextType>({
  localesData: locales.getLocales(),
  currentLocale: locales.getLocales()[0],
  setCurrentLocale: () => {}
});
