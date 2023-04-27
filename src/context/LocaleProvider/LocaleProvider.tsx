import { useContext, useState } from "react";
import { localeContext } from "./localeContext";
import { locales } from "./locales";
import { LocaleProviderProps, LocaleType } from "./types";

const LocaleProvider = ({ children }: LocaleProviderProps) => {
  let localeId: string | null = localStorage.getItem("locale");

  if (!localeId) localeId = "en";

  const [currentLocale, setCurrentLocale] = useState<LocaleType>(
    locales.find((l) => l.translateCode === localeId)!
  );

  const saveCurrentLocale = (locale: LocaleType) => {
    localStorage.setItem("locale", locale.translateCode);
    setCurrentLocale(locale);
  };

  const { Provider } = localeContext;

  return (
    <Provider value={{ currentLocale, locales: locales, setCurrentLocale: saveCurrentLocale }}>
      {children}
    </Provider>
  );
};

const useLanguage = () => {
  const context = useContext(localeContext);
  return context.currentLocale.lang;
};

const useLocales = () => {
  const context = useContext(localeContext);
  return context.locales;
};

const useSetLocale = () => {
  const context = useContext(localeContext);
  return context.setCurrentLocale;
};

export default LocaleProvider;
export { useLanguage, useLocales, useSetLocale };
