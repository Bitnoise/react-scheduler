import { Context, createContext } from "react";
import { locales } from "./locales";
import { LocaleContextType } from "./types";

export const localeContext: Context<LocaleContextType> = createContext<LocaleContextType>({
  currentLocale: locales.getLocales().filter((locale) => locale.id === "en")[0]
});
