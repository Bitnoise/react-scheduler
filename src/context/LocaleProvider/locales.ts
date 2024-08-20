import enDayjsTranslations from "dayjs/locale/en";
import plDayjsTranslations from "dayjs/locale/pl";
import deDayjsTranslations from "dayjs/locale/de";
import ltDayjsTranslations from "dayjs/locale/lt";
import frDayjsTranslations from "dayjs/locale/fr";
import itDayjsTranslations from "dayjs/locale/it";
import { en, pl, de, lt, fr, it } from "@/locales";
import { LocaleType } from "./types";

export const localesData: LocaleType[] = [
  {
    id: "de",
    lang: de,
    translateCode: "de-DE",
    dayjsTranslations: deDayjsTranslations
  },
  {
    id: "en",
    lang: en,
    translateCode: "en-GB",
    dayjsTranslations: enDayjsTranslations
  },
  {
    id: "fr",
    lang: fr,
    translateCode: "fr-FR",
    dayjsTranslations: frDayjsTranslations
  },
  {
    id: "it",
    lang: it,
    translateCode: "it-IT",
    dayjsTranslations: itDayjsTranslations
  },
  {
    id: "lt",
    lang: lt,
    translateCode: "lt-LT",
    dayjsTranslations: ltDayjsTranslations
  },
  {
    id: "pl",
    lang: pl,
    translateCode: "pl-PL",
    dayjsTranslations: plDayjsTranslations
  }
];

class Locales {
  public locales: LocaleType[] = localesData;

  getLocales() {
    return this.locales;
  }

  addLocales(locale: LocaleType) {
    this.locales.push(locale);
  }
}

const locales = new Locales();

export { locales };
