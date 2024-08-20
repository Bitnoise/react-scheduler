import { useCallback, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { localeContext } from "./localeContext";
import { locales } from "./locales";
import { LocaleProviderProps, LocaleType } from "./types";

const LocaleProvider = ({ children, lang, translations }: LocaleProviderProps) => {
  const [localLang, setLocalLang] = useState<string>("en");
  const localesData = locales.getLocales();

  const findLocale = useCallback(() => {
    const locale = localesData.find((l) => {
      return l.id === localLang;
    });

    if (typeof locale?.dayjsTranslations === "object") {
      dayjs.locale(locale.dayjsTranslations);
    }

    return locale || localesData[0];
  }, [localLang, localesData]);

  const [currentLocale, setCurrentLocale] = useState<LocaleType>(findLocale());

  const saveCurrentLocale = (locale: LocaleType) => {
    localStorage.setItem("locale", locale.translateCode);
    setCurrentLocale(locale);
  };

  useEffect(() => {
    translations?.forEach((translation) => {
      const localeData = localesData.find((el) => el.id === translation.id);
      if (!localeData) {
        locales.addLocales(translation);
      }
    });
  }, [localesData, translations]);

  useEffect(() => {
    const localeId = localStorage.getItem("locale");
    const language = lang ?? localeId ?? "en";
    localStorage.setItem("locale", language);
    setLocalLang(language);
    setCurrentLocale(findLocale());
  }, [findLocale, lang]);

  const { Provider } = localeContext;

  return (
    <Provider value={{ currentLocale, localesData, setCurrentLocale: saveCurrentLocale }}>
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
  return context.localesData;
};

const useSetLocale = () => {
  const context = useContext(localeContext);
  return context.setCurrentLocale;
};

export default LocaleProvider;
export { useLanguage, useLocales, useSetLocale };
