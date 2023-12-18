import { en } from "@/locales/en";
import { pl } from "@/locales/pl";
import { de } from "@/locales/de";
import { LocaleType } from "./types";

export const locales: LocaleType[] = [
  {
    id: "en",
    name: "ENGLISH",
    lang: en,
    translateCode: "en-GB"
  },
  {
    id: "pl",
    name: "POLISH",
    lang: pl,
    translateCode: "pl-PL"
  },
  {
    id: "de",
    name: "GERMAN",
    lang: de,
    translateCode: "de-DE"
  }
];
