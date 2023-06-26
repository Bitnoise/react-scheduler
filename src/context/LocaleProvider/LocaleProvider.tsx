import { useContext, useState } from "react";
import dayjs from "dayjs";
import en from "dayjs/locale/en";
import pl from "dayjs/locale/pl";
import { localeContext } from "./localeContext";
import { locales } from "./locales";
import { LocaleProviderProps, LocaleType } from "./types";

const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const localeId: string = localStorage.getItem("locale") ?? "en";

  const findLocale = () => {
    const locale = locales.find((l) => l.translateCode === localeId);
    locale?.id === "en" ? dayjs.locale({ ...en }) : dayjs.locale({ ...pl });
    return locale || locales[0];
  };

  const [currentLocale, setCurrentLocale] = useState<LocaleType>(findLocale);

  const saveCurrentLocale = (locale: LocaleType) => {
    localStorage.setItem("locale", locale.translateCode);
    setCurrentLocale(locale);
  };

  const { Provider } = localeContext;

  return (
    <Provider value={{ currentLocale, locales, setCurrentLocale: saveCurrentLocale }}>
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
