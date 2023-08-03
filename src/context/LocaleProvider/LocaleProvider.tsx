import { useCallback, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import en from "dayjs/locale/en";
import pl from "dayjs/locale/pl";
import { LangCodes } from "@/types/global";
import { localeContext } from "./localeContext";
import { locales } from "./locales";
import { LocaleProviderProps, LocaleType } from "./types";

const LocaleProvider = ({ children, lang }: LocaleProviderProps) => {
  const [localLang, setLocalLang] = useState<LangCodes>("en");

  const findLocale = useCallback(() => {
    const locale = locales.find((l) => {
      return l.id === localLang;
    });
    locale?.id === "en" ? dayjs.locale({ ...en }) : dayjs.locale({ ...pl });
    return locale || locales[0];
  }, [localLang]);

  const [currentLocale, setCurrentLocale] = useState<LocaleType>(findLocale());

  const saveCurrentLocale = (locale: LocaleType) => {
    localStorage.setItem("locale", locale.translateCode);
    setCurrentLocale(locale);
  };

  useEffect(() => {
    const localeId: LangCodes | null = localStorage.getItem("locale") as LangCodes;
    const language = lang ?? localeId ?? "en";
    localStorage.setItem("locale", language);
    setLocalLang(language);
    setCurrentLocale(findLocale());
  }, [findLocale, lang]);

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
