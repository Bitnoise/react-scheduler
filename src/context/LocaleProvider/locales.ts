import { en } from "@/locales/en";
import { pl } from "@/locales/pl";
import { sv } from "@/locales/sv";
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
    id: "sv",
    name: "SWEDISH",
    lang: sv,
    translateCode: "sv-SE"
  }
];
