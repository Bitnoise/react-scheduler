import { JSX, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { localeContext } from "./localeContext";
import { locales } from "./locales";
import { LocaleProviderProps, Translation } from "./types";

const LocaleProvider = ({ children, lang, translations }: LocaleProviderProps): JSX.Element => {
  const [currentLocale, setCurrentLocale] = useState(
    locales.getLocales().filter((locale) => locale.id === "en")[0]
  );

  useEffect(() => {
    const overwrittenLocalesData = locales.locales.map((locale) => {
      let localeTemp = locale;
      translations?.forEach((translation) => {
        if (locale.id === translation.id) {
          localeTemp = translation;
        }
      });
      return localeTemp;
    });

    const location = overwrittenLocalesData?.find((locale) => locale.id === lang);
    if (location) {
      setCurrentLocale(location);
      dayjs.locale(location.dayjsTranslations);
    }
  }, [translations, lang]);

  return (
    <localeContext.Provider
      value={{
        currentLocale
      }}
    >
      {children}
    </localeContext.Provider>
  );
};

const useLanguage = (): Translation => {
  const context = useContext(localeContext);

  return context.currentLocale.lang;
};

export default LocaleProvider;
export { useLanguage };
